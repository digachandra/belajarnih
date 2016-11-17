var ForgotPasswordForm = React.createClass({
  getInitialState: function(){
    return {email:""}
  },
  inputEmailChange(e){
    this.setState({email: e.target.value})
  },
  render: function(){
    return(
      <div className="panel">
        <div className="panel-body">
          <form method='POST'>
            <h3>Forgot Password</h3>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" placeholder="your@email.com" autofocus className="form-control" onChange = {this.inputEmailChange}/>
            </div>
            <div className="form-group">
              <input type="submit" className="btn btn-success" value='Request Reset Password'/>
            </div>
          </form>
        </div>
      </div>
    )
  }
})

ReactDOM.render(
  <ForgotPasswordForm />,
  document.getElementById('container')
)
