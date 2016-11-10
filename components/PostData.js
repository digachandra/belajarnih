import React, {Component, PropTypes} from 'react'
import PostCommentAdd from './PostCommentAdd'
import PostComment from './PostComment'

class PostData extends Component{
  constructor(props, context){
    super(props, context)
    this.state = {
      recordId: this.props.data.id,
      picture: this.props.data.picture || '',
      name: this.props.data.name || '',
      postContent: this.props.data.post || '',
      isUpdate: this.props.data.update || false
    }
  }

  handlePostChange(e){
    this.setState({postContent: e.target.value.replace(/\r\n|\r|\n/g,"<br />").trim()})
  }

  handlePostKeyUp(e){
    if(e.key === 'Enter' && !e.shiftKey){
      this.setState({isUpdate: false})

      var recordId = this.state.recordId
      var postContent = this.state.postContent.trim()

      if(!postContent) return
      this.props.onEdit(recordId, postContent)
    }
  }

  handlePostUpdate(e){
    this.setState({isUpdate: true})
  }

  render(){
    const {data, actions} = this.props

    let commentData = null
    if(data.comment){
      if(data.comment.length > 0){
        commentData = data.comment.map(function(data){
          return (
            <PostComment key={data.id} data={data} actions={actions} />
          )
        })
      }
    }

    let imgStyle = {
      "width": "50px",
      "height": "50px"
    }
    let dropdownStyle = {
      "position": "absolute",
      "top": "25px",
      "right": "15px"
    }
    let dropdownTriggerStyle = {
      "cursor": "pointer",
      "textDecoration": "none !important"
    }
    let dropdownTriggerCaretStyle = {
      "borderTopWidth": "8px",
      "borderRightWidth": "6px",
      "borderLeftWidth": "6px"
    }
    let dropdownWrapperStyle = {
      "borderRadius": "0px",
      "boxShadow": "none",
      "padding": "0px",
      "left": "initial",
      "right": "0px"
    }
    let dropdownItemStyle = {
      "padding": "5px 10px"
    }
    let postPrint = { __html: this.state.postContent }

    let postBlock = null
    if(this.state.isUpdate){
      postBlock = <div><textarea className="form-control" rows="4" onKeyPress={this.handlePostKeyUp.bind(this)} onChange={this.handlePostChange.bind(this)} value={this.state.postContent.replace(/<br\s?\/?>/g, '\n')}></textarea><h6>Press <strong>shift + enter</strong> to add new line</h6></div>
    } else {
      postBlock = <p dangerouslySetInnerHTML={postPrint}></p>
    }

    return(
      <li className="list-group-item">
        <div className="dropdown" style={dropdownStyle}>
          <a className="dropdown-toggle" type="button" data-toggle="dropdown" style={dropdownTriggerStyle}>
            <span className="caret" style={dropdownTriggerCaretStyle}></span>
          </a>
          <ul className="dropdown-menu" style={dropdownWrapperStyle}>
            <li><a href="javascript:void(0)" style={dropdownItemStyle} onClick={this.handlePostUpdate.bind(this)}>Edit</a></li>
            <li><a href="javascript:void(0)" style={dropdownItemStyle} onClick={() => actions.deleteData(data.id)}>Delete</a></li>
          </ul>
        </div>
        <div className="media">
          <div className="media-left">
            <a><img className="media-object" src={this.state.picture} style={imgStyle} /></a>
          </div>
          <div className="media-body">
            <h4 className="media-heading">{this.state.name}</h4>
            {postBlock}
            {commentData}
          </div>
        </div>
        <PostCommentAdd data={data} onSave={actions.addComment} />
      </li>
    )
  }
}

PostData.propTypes = {
  data: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default PostData
