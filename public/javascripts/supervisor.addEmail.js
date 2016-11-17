var FieldForm = React.createClass({
  getInitialState: function(){
    return {field:"", message:""}
  },
  handleFormChange(e){
    this.setState({field: e.target.value})
  },
  handleFormSubmit(e){
    e.preventDefault()
    $.ajax({
      url: '/api/supervisor/postAddEmail',
      dataType: 'json',
      type: 'POST',
      data: {value: this.state.field},
      success: function(data){
        if(data.message)this.setState({field:"", message:data.message})
        else{
            this.setState({field:"", message:"link has been sent to "+data.userEmail})
        }
      }.bind(this),
      error: function(xhr, status, err){
        this.setState({message:"error, cobalagi"})
      }.bind(this)
    })
  },
  render: function(){
    return(
      <div>
        <h2>Add Supervisor Email</h2>
        <form onSubmit={this.handleFormSubmit}>
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
