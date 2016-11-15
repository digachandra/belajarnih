var FieldForm = React.createClass({
  getInitialState: function(){
    return {field:"", message:"", userID:document.getElementById('container').getAttribute('userEmail')}
  },
  handleFormChange(e){
    this.setState({field: e.target.value, userID: this.state.userID})
  },
  render: function(){
    return(
      <div>
        <form method="POST">
          <h2>Business Name</h2>
          <input type="text" name="businessName"/>
          <input type="text" name="userId" value={this.state.userID}/>
          <input type="submit" />
        </form>
        <p>{this.state.message}</p>
      </div>
    )
  }
})

ReactDOM.render(
  <FieldForm />,
  document.getElementById('container')
)
