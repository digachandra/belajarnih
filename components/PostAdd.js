import React, {Component, PropTypes} from 'react'

class PostAdd extends Component{
  constructor(props, context){
    super(props, context)
    this.state = {
      picture: 'https://randomuser.me/api/portraits/men/2.jpg',
      name: 'Sahbana Lubis',
      post: this.props.post || ''
    }
  }

  handlePostChange(e){
    this.setState({post: e.target.value})
  }

  handleSubmit(e){
    e.preventDefault()
    let picture = this.state.picture.trim()
    let name = this.state.name.trim()
    let post = this.state.post.replace(/\r\n|\r|\n/g,"<br />").trim()

    if(!picture && !name && !post) return
    this.props.onSave(picture, name, post)
    this.setState({
      post: ''
    })
  }

  render(){
    const textareaStyle = {
      "resize": "vertical"
    }
    return(
      <form className="form" onSubmit={this.handleSubmit.bind(this)}>
        <div className="row">
          <div className="form-group col-sm-12">
            <textarea className="form-control" value={this.state.post} placeholder="What's in your mind?" rows="4" onChange={this.handlePostChange.bind(this)} style={textareaStyle}>
            </textarea>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <button className="btn btn-info btn-block" type="submit">Post</button>
          </div>
        </div>
      </form>
    )
  }
}

PostAdd.propTypes = {
  post: PropTypes.string,
  onSave: PropTypes.func.isRequired
}

export default PostAdd
