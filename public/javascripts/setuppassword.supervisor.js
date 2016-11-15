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
    let leftBar = {
      float: "left"
    }
    let rightBar = {
      float: "right",
      marginTop: "auto",
      marginBottom: "auto",
      marginRight: "20px"
    }

    let containerStyle = {
      width: "80%",
      marginRight: "auto",
      marginLeft: "auto",
      marginTop: "20px",
      marginBottom: "20px",
      fontFamily: "Prompt",
      fontWeight: "bold",
    }

    let topBarStyle = {
      borderStyle: "solid",
      borderColor: "#91D8F7",
      padding: "15px",
      height: "80px",
      borderRadius: "10px"
    }

    let faviconStyle= {
      height: "100%",
      marginLeft: "10px",
      marginRight: "10px"
    }

    let contentContainerStyle={
      marginTop: "10px",
      padding: "10px",
      borderStyle: "solid",
      borderColor: "#91D8F7",
      color: "#91D8F7",
      borderRadius: "10px"
    }

    let contentStyle={
      marginRight: "10px",
      marginLeft: "10px",
      marginTop: "20px",
      marginBottom: "20px"
    }

    if(this.state.done == false){
      return(
        <div style={containerStyle}>
          <div style={topBarStyle}>
            <div style={leftBar}>
              <img style={faviconStyle} alt="Brand" src="/images/favicon.png" />
              <img style={faviconStyle} src="/images/logo-block-theme.png" />
            </div>
            <div style={rightBar}>
              {this.state.userEmail} <br />
              <a href="/api/users/logout">Logout</a>
            </div>
          </div>
          <div style={contentContainerStyle}>
            <div style={contentStyle}>
            <div>
              <div>Please input the password for your email ({this.state.email})</div><br />
              <InputBox id={this.state.id} email={this.state.email} successfulInput={this.giveSuccessMessage} failedInput={this.giveFailedMessage}/>
              <Messages messages={this.state.messages} />
            </div>
            </div>
          </div>
        </div>
      )
    } else {
      return(
        <div style={containerStyle}>
          <div style={topBarStyle}>
            <div style={leftBar}>
              <img style={faviconStyle} alt="Brand" src="/images/favicon.png" />
              <img style={faviconStyle} src="/images/logo-block-theme.png" />
            </div>
            <div style={rightBar}>
              {this.state.userEmail} <br />
              <a href="/api/users/logout">Logout</a>
            </div>
          </div>
          <div style={contentContainerStyle}>
            <div style={contentStyle}>
            <div>
              <div>Please input the password for your email ({this.state.email})</div><br />
              <Messages messages={this.state.messages} />
            </div>
            </div>
          </div>
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
          Password: <input type="password" value={this.state.input} onChange={this.handleInputChange}/><br /><br />
          <button style={buttonStyle} className="btn btn-primary" type="submit">Submit</button>
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
          Please login <a href="/api/users/login">here</a>
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

let fontStyle = {
  color: "#00AFEF",
  fontSize: "14px"
}

let buttonStyle = {
  color: "white",
  backgroundColor: "#00AFEF"
}

let headingStyle = {
  fontSize: "20px",
  color: "#00AFEF"
}
