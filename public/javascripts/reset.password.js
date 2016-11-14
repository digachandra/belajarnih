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
  handleFormSubmit(e){
    $.ajax({
      url: '/',
      dataType: 'json',
      type: 'POST',
      data: {password: this.state.password}
    })
  },
  render: function(){
    return(
      <div className="panel">
        <div className="panel-body">
          <form onSubmit={this.handleFormSubmit}>
            <h3>Reset Password</h3>
            <div className="form-group">
              <label htmlFor="password">New Password</label>
              <input type="password" name="password" value={this.state.password} id="password" placeholder="New password" autofocus className="form-control" onChange = {this.inputPasswordChange}/>
            </div>
            <div className="form-group">
              <label htmlFor="confirm">Confirm Password</label>
              <input type="password" name="confirm" value={this.state.confirm} id="confirm" placeholder="Confirm password" className="form-control" onChange = {this.inputConfirmChange}/>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-success">Change Password</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
})

ReactDOM.render(
  <ResetForm />,
  document.getElementById('container')
)
