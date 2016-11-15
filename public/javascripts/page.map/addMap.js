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
      url: '/map/addMap',
      dataType: 'json',
      type: 'POST',
      data: {value: this.state.field},
      success: function(data){
        this.setState({field:"", message:data.message})
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
