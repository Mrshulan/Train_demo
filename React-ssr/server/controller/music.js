import axios from 'axios'

module.exports = {
  getTopid: async (ctx, next) => {
    const { id } = ctx.query
    const songList = await axios.get('http:/mrshulan/musicapi/getTopid?id=' + id).then(res => res.data)
    ctx.body = songList
    ctx.type = 'json'
  },
  getSongUrl: async (ctx, next) => {
    
  }
}