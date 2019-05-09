import React from 'react'
import { connect } from 'react-redux'

const List = props => {
  console.log('如果不是直出就会是决定前端redux里边的数据,带有闪烁')
  console.log(props)
  return (
    <ul>
      { props.list.map(item => <li key={item}>{item}</li>) }
    </ul>
  )
}


function mapStateToProps(state) {
  return { ...state.list }
}

export default connect(mapStateToProps)(List)

