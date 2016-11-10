import React, {Component, PropTypes} from 'react'
import PostData from './PostData'

class ListItem extends Component{
  constructor(props, context){
    super(props, context)
  }

  render(){
    const {data, actions} = this.props

    let nodeData = null
    if(data.length > 0){
      nodeData = data.map(function(data){
        return (
          <PostData key={data.id} data={data} actions={actions} onEdit={actions.editData} />
        )
      })
    }

    let ulStyle = {
      "marginBottom": "0px"
    }
    return (
      <ul className="list-group" style={ulStyle}>
        {nodeData}
      </ul>
    )
  }
}

ListItem.propTypes = {
  data: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

export default ListItem
