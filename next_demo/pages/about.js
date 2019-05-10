import { connect } from 'react-redux'
import { Tag } from 'antd'
import { useState } from 'react'

import { actions } from '../store'

const { CheckableTag } = Tag

const About =  ({content, addCount}) => {
  const [checked, setChecked] = useState(true)

  const handleChange = (checked) => {
    setChecked(checked)
    addCount()
  }

  return (
    <div>
      this is the redux data page
      <br/>
      <CheckableTag checked={checked} onChange={handleChange}>{content || '点击开始计数'}</CheckableTag>
    </div>
  )
}

const mapStateToProps = (state) => ({
  content: state.count
})
const mapDispatchToProps = dispatch => {
  return {
    addCount: (...arg) => dispatch(actions.addCount(...arg))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(About) 

