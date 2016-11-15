var FieldForm = React.createClass({
  getInitialState: function(){
    return {field:"", message:"", userID:document.getElementById('container').getAttribute('userEmail')}
  },
  handleFormChange(e){
    this.setState({field: e.target.value, userID: this.state.userID})
  },
  handleFormSubmit(e){
    e.preventDefault()
    $.ajax({
      url: '/map/addMap',
      dataType: 'json',
      type: 'POST',
      data: {value: this.state.field, userID: this.state.userID},
      success: function(data){
        if("proceed"==data.message)window.location.replace("http://localhost:3000/api/users/login")
        else this.setState({field:"", message:data.message})
      }.bind(this),
      error: function(xhr, status, err){
        this.setState({message:"error, cobalagi"})
      }.bind(this)
    })
  },
  render: function(){
    return(
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <h2>Business Name</h2>
          <input type="text" value={this.state.field} onChange = {this.handleFormChange}/>
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
