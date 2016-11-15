var FieldForm = React.createClass({
  getInitialState: function(){
    console.log('businessName',document.getElementById('container').getAttribute('businessName'));
    return {message:"",pindropName:"",totalSales:"",salesCond:"", supervisor:"", userID:document.getElementById('container').getAttribute('userId'),
            businessName:document.getElementById('container').getAttribute('businessName')}
  },
  handlePinDropChange(e){
    this.setState({pindropName: e.target.value})
  },
  handleTotalSales(e){
    this.setState({totalSales: e.target.value})
  },
  handleSalesCond(e){
    this.setState({salesCond: e.target.value})
  },
  handleSupervisorChange(e){
    this.setState({supervisor: e.target.value})
  },
  handleFormSubmit(e){
    e.preventDefault()
    $.ajax({
      url: '/marker/addMarker',
      dataType: 'json',
      type: 'POST',
      data: {pindropName: this.state.pindropName, totalSales: this.state.totalSales, salesCond: this.state.salesCond, supervisor: this.state.supervisor, userID: this.state.userID, businessName:this.state.businessName },
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
          Pin Drop Name <input type="text" value={this.state.pindropName} onChange = {this.handlePinDropChange}/>
          <br/>
          Total Sales <input type="text" value={this.state.totalSales} onChange = {this.handleTotalSales}/>
          <br/>
          Sales Condition
          <select onChange = {this.handleSalesCond}>
            <option value="">-</option>
            <option value="gt">Greater Than</option>
            <option value="lt">Less Than</option>
          </select>
          <br/>
          Supervisor Email
          <input type="text" value={this.state.supervisor} onChange = {this.handleSupervisorChange}/>
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
