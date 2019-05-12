import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getSongUrl } from '../redux/reducers/list'


// 如果是走js来到 该界面 通过componetDidMount dispatch来一波数据
// 如果是node直接(或者js来到 之后 刷新) 通过getInitialProps获取数据 componentDidMount获取
class List extends React.Component {

  // 如果直出的话
  static getInitialProps(store, match) {
    const { getSongUrl } = mapDispatchToProps(store.dispatch)
    
    return getSongUrl(match.params.id)
  }
  // 如果直出那么songUrl就有了 不需要再一次请求 反之则需要
  componentDidMount() {
    const { getSongUrl, match, songUrl } = this.props
    songUrl || getSongUrl(match.params.id)
  }

  render() {
    console.log(this.props)
    const { loaded, songUrl, location} = this.props
    return (
      <ul>
        <Link to='/'>回到首页</Link>
        真实歌曲路径是 <br/>
        { loaded ? <div>正在请求</div> : <a href={songUrl} target="_blank">点击此处听{location.state.songname}</a> }
      </ul>
    )
  }
}

function mapStateToProps(state) {
  return { ...state.list }
}

function mapDispatchToProps(dispatch) {
  return {
    getSongUrl: (mid) => dispatch(getSongUrl(mid))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(List)

