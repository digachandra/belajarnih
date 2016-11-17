var ResetForm = React.createClass({
  getInitialState: function(){
    return {password:"",confirm:""}
  },
  inputPasswordChange(e){
    this.setState({password: e.target.value})
  },
  inputConfirmChange(e){
    this.setState({confirm: e.target.value})
  },
  render: function(){
    return(
      <form method='POST'>
        <div className="form-group">
          <label htmlFor="password">New Password</label>
          <input type="password" name="password" value={this.state.password} id="password" placeholder="New password" autofocus className="form-control" onChange = {this.inputPasswordChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="confirm">Confirm Password</label>
          <input type="password" name="confirm" value={this.state.confirm} id="confirm" placeholder="Confirm password" className="form-control" onChange = {this.inputConfirmChange}/>
        </div>
        <input type="submit" className="btn btn-block btn-warning" value='Change Password'/>
        <div className="form-action text-center">
          <a href="/login">Direct me to login page</a>
        </div>
      </form>
    )
  }
})

ReactDOM.render(
  <ResetForm />,
  document.getElementById('content-form')
)
