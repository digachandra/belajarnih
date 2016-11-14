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
      url: '/api/supervisor/postdata',
      dataType: 'json',
      type: 'POST',
      data: {value: this.state.field},
      success: function(data){
        this.setState({field:"", message:"berhasil di upload"})
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
