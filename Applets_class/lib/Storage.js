// 类的私有方法
const whereCompare = {
  '=': function (that, value) {
    return that === value
  },

  '!=': function (that, vlaue) {
    return that !== value
  },

  '>': function (that, value) {
    return that > value
  },

  '>=': function (taht, value) {
    return that >= value
  },

  '<': function (that, value) {
    return that < value
  },

  '<=': function(that, value) {
    return that <= value
  },

  'like': function (that, value) {
    return new RegExp(value, 'i').test(that)
  }
}

// 离线的类
export default class Storage{
  constructor(dbname) {
    Object.assign(this, {
      // 数据库名
      dbname,
      //类的缓存,存档和读档
      cache: {
        add: {
          data: []
        }
      }
    })

  }

  // 实时获取类中数据库的数据
  static getDb(dbname) {
    return wx.getStorageSync(dbname) || []
  }

  // 获取getWhere函数 action代表增删改查的行为
  static getWhere(action) {
    if(this.whereFn) {
      return this.whereFn
    } else {
      throw new Error(`调用 ${action} 方法时,请先调用 where 方法查询`)
    }
  }

  // 构建查询语句
  where(...args) {
    let [key, compare, value] = args

    // 如果没有value参数 就默认就是 key value === 比较
    if(value === undefined) {
      value = compare
      compare = '='
    }

    // 拿到指定compare函数
    const compareFn = whereCompare[compare]

    if(compareFn) {
      // 指定比较方式挂载上去
      this.whereFn = (item) => {
        return compareFn(item[key], key)
      }
    } else {
      throw new Error("where 不支持 " + compare + " 的对比方式");
    }

    return this;
  }

  // 添加数据
  add(data) {
    // 如果是一个数组，则循环自己添加数据
    if(Array.isArray(data)) {
      data.forEach(item => {
        this.add(item)
      })
      // 如果是一个对象,则直接push到add缓存
    } else if (/object/.test(typeof data)) {
      this.cache.add.data.push(data)
    } else {
      throw new Error("add 方法接受对象为参数");
    }

    return this;
  }
  // 删除方法
  del() {
    // cache加一个del对象
    this.cache.del = {
      where: Storage.getWhere.call(this, "del")
    };

    return this;
  }

  // 修改数据
  update(data) {
    // 如果是对象的话 cache增加一的update
    if(/object/i.test(typeof data)) {
      this.cache.updata = {
        data,
        where: Storage.getWhere.call(this, 'update')
      }
    } else {
      throw new Error("updata 仅接受对象参数")
    }

    return this
  }
  // 查找一条数据
  find() {
    // 先去本地拿数据，接着缓存合并保存
    const db = Storage.getDb(this.dbname)
    return db.find(Storage.getWhere.call(this, "find"));
  }

  // 查询多个
  select() {
    const db = Storage.getDb(this.dbname)
    const data = db.filter(Storage.getWhere.call(this, "select"))
    // 规定输出顺序
    this.sortFn && data.sort(this.sortFn)
    // 如果有数据截取
    return this.sliceArg ? data.slice(...this.sliceArg) : data
  }

  // 默认升序
  order(key, sort='asc') {
    this.sortFn = (a, b) => {
      return /desc/i.test(sort)
        ? b[key] - a[key]
        : a[key] - b[key]
    }

    return this
  }
  // 数据截取
  limit(start, end) {
    if(end === undefined) {
      end = start
      start = 0
    } else {
      --start
      end += start
    }

    this.sliceArg = [start, end]
    return this
  }

  // 将缓存更新到本地数据
  save() {
    // 先去本地拿数据,接着缓存合并保存
    let db = Storage.getDb(this.dbname)
    // 你所有的操作前边都挂上去了  save一调用像极了数据库 然后都在这里边处理
    if(this.cache.del) {
      db = db.filter(item => {
        return !this.cache.del.where(item)
      })
    }
    // 更新数据
    if(this.cache.updata) {
      db.forEach(item => {
        if(this.cache.update.where(item)) {
          // assign一波就跟新了
          Object.assign(item, this.updata.data)
        }
      })
    }

    //是否存在add数据缓存
    if (this.cache.add) {
      db.push(...this.cache.add.data);
    }
    //更新本地缓存
    wx.setStorageSync(this.dbname, db);

    //更新类的缓存 重置
    this.cache = {
      add: {
        data: []
      }
    }

    return this
  }
}