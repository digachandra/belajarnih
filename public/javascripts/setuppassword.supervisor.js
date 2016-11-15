var Container = React.createClass({
  getInitialState: function(){
    return {id:document.getElementById('container').getAttribute('userid'), email:document.getElementById('container').getAttribute('useremail'), messages:"", done: false }
  },

  giveSuccessMessage: function(){
    this.setState({messages: "successful", done: true})
  },

  giveFailedMessage: function(){
    this.setState({messages: "failed"})
  },

  render: function(){
    if(this.state.done == false){
      return(
        <div>
          <div>Please input the password for your email ({this.state.email})</div>
          <InputBox id={this.state.id} email={this.state.email} successfulInput={this.giveSuccessMessage} failedInput={this.giveFailedMessage}/>
          <Messages messages={this.state.messages} />
        </div>
      )
    } else {
      return(
        <div>
          <div>Please input the password for your email ({this.state.email})</div>
          <Messages messages={this.state.messages} />
        </div>
      )
    }
  }
})

var InputBox = React.createClass({
  getInitialState: function(){
    return {input: ""}
  },

  handleInputChange: function(e){
    this.setState({input: e.target.value})
  },

  handleSubmitPassword: function(e){
    e.preventDefault()
    $.ajax({
      url: '/api/supervisor/setuppassword',
      dataType: 'json',
      type: 'POST',
      data: {userid: this.props.id, password: this.state.input},
      success: function(data){
        this.props.successfulInput()
      }.bind(this),
      error: function(xhr,status, err){
        this.props.failedInput()
      }.bind(this)
    })
  },

  render: function(){
    return (
      <div>
        <form onSubmit={this.handleSubmitPassword}>
          Password: <input type="text" value={this.state.input} onChange={this.handleInputChange}/><br />
          <input type="submit" />
        </form>
      </div>
    )
  }
})

var Messages = React.createClass({
  render: function(){
    if (this.props.messages == "successful"){
      return (
        <div>
          You successfully input your password <br />
          Please login <a href="/api/user/login">here</a>
        </div>
      )
    } else {
      return(
        <div>
          {this.props.messages}
        </div>
      )
    }
  }
})

ReactDOM.render(
  <Container />, document.getElementById('container')
)
