var ForgotPasswordForm = React.createClass({
  getInitialState: function(){
    return {email:""}
  },
  inputEmailChange(e){
    this.setState({email: e.target.value})
  },
  render: function(){
    return(
      <div className="form-group">
        <label for="txt-email">Email</label>
        <input id="txt-email" type="email" className="form-control" onChange = {this.inputEmailChange} autocomplete="off" placeholder="your@email.com" autofocus required />
      </div>
      <button type="submit" className="btn btn-warning btn-block">SUBMIT</button>
      <div className="form-action text-center">
        <a href="/login">Already have an account?</a>
      </div>
    )
  }
})

ReactDOM.render(
  <ForgotPasswordForm />,
  document.getElementById('content-form')
)
