import React, {Component, PropTypes} from 'react'

class PostComment extends Component{
  constructor(props, context){
    super(props, context)
    this.state = {
      picture: this.props.data.picture || '',
      name: this.props.data.name || '',
      postContent: this.props.data.post || ''
    }
  }

  render(){
    const {data, deleteData} = this.props
    let imgStyle = {
      "width": "50px",
      "height": "50px"
    }
    return(
      <div className="media">
        <div className="media-left">
          <a><img className="media-object" src={this.state.picture} style={imgStyle} /></a>
        </div>
        <div className="media-body">
          <h4 className="media-heading">{this.state.name}</h4>
          <p>{this.state.postContent}</p>
        </div>
      </div>
    )
  }
}

PostComment.propTypes = {
  data: PropTypes.object.isRequired
}

export default PostComment
