var Container = React.createClass({
  getInitialState: function(){
    return {page: "ownerlist", businessName: "", pinDropName: "", owner_id: ""}
  },

  toPinPage: function(businessName){
    this.setState({page: "pinlist", businessName: businessName})
  },

  toInputDataPage: function(pinDropName){
    this.setState({page: "inputdata", pinDropName: pinDropName})
  },

  toBusinessPage: function(owner_id){
    this.setState({page: "businesslist", owner_id: owner_id})
  },

  render: function(){
    if(this.state.page == "ownerlist"){
      return <OwnerList toBusinessList = {this.toBusinessPage} />
    } else if(this.state.page == "businesslist"){
      return <BusinessList toPinList={this.toPinPage} owner_id={this.state.owner_id}/>
    } else if (this.state.page == "pinlist") {
      return <PinList businessName={this.state.businessName} toInputData={this.toInputDataPage}/>
    } else if (this.state.page == "inputdata") {
      return <InputData pinDropName={this.state.pinDropName} owner_id={this.state.owner_id} businessName={this.state.businessName} />
    }
  }
})

var OwnerList = React.createClass({
  getInitialState: function(){
    return {list: ""}
  },

  componentDidMount: function(){
    $.ajax({
      url: '/api/supervisor/getownerlist',
      dataType: 'json',
      type: 'GET',
      success: function(data){
        this.setState({list: data})
      }.bind(this),
      error: function(xhr,status,err){
        this.setState({list: ["error"]})
      }.bind(this)
    })
  },

  render: function(){
    let arrayOwner
    if(this.state.list != ""){
      let OwnerList = []
      for (let i in this.state.list){
        if(OwnerList.map(function(data){return data.owner._id}).indexOf(this.state.list[i].owner._id)== -1){
          OwnerList.push(this.state.list[i])
        }
      }

      arrayOwner = OwnerList.map(function(data){
        return (
          <div key={data.owner._id}>
            <button onClick={function(){this.props.toBusinessList(data.owner._id)}.bind(this)}>{data.owner._id} || {data.owner.userEmail}</button>
          </div>
        )
      }.bind(this))
    } else {
      arrayOwner = (<div>No Owner Found</div>)
    }

    return (
      <div>
        <h1>Select Owner</h1>
        {arrayOwner}
      </div>
    )
  }
})


var BusinessList = React.createClass({
  getInitialState: function(){
    return {list: ""}
  },

  componentDidMount: function(){
    $.ajax({
      url: `/api/supervisor/getbusinesslist/${this.props.owner_id}`,
      dataType: 'json',
      type: 'GET',
      success: function(data){
        this.setState({list: data})
      }.bind(this),
      error: function(xhr,status,err){
        this.setState({list: ["error"]})
      }.bind(this)
    })
  },

  render: function(){
    let arrayBusiness
    if(this.state.list != ""){
      let businessList = []
      for (let i in this.state.list){
        if(businessList.map(function(data){return data.businessName}).indexOf(this.state.list[i].businessName)== -1){
          businessList.push(this.state.list[i])
        }
      }
      arrayBusiness = businessList.map(function(data){
        return (
          <div key={data.businessName}>
            <button onClick={function(){this.props.toPinList(data.businessName)}.bind(this)}>{data.businessName} || {data.owner.userEmail}</button>
          </div>
        )
      }.bind(this))
    } else {
      arrayBusiness = (<div>No Business Found</div>)
    }

    return (
      <div>
        <h1>Select Business</h1>
        {arrayBusiness}
      </div>
    )
  }
})

var PinList = React.createClass({
  getInitialState: function(){
    return {list: "", businessName: this.props.businessName}
  },

  componentDidMount: function(){
    $.ajax({
      url: `/api/supervisor/getpinlist/${this.state.businessName}`,
      dataType: 'json',
      type: 'GET',
      success: function(data){
        this.setState({list: data})
        console.log("biz name",this.state.businessName)
        console.log(data)
      }.bind(this),
      error: function(xhr,status,err){
        this.setState({list: ["error"]})
      }.bind(this)
    })
  },

  render(){
    let arrayPin
    if(this.state.list != ""){
      let pinList = []
      for (let i in this.state.list){
        if(pinList.map(function(data){return data.pinDropName}).indexOf(this.state.list[i].pinDropName)== -1){
          pinList.push(this.state.list[i])
        }
      }
      arrayPin = pinList.map(function(data){
        return (
          <div key={data.pinDropName}>
            <button onClick={function(){this.props.toInputData(data.pinDropName)}.bind(this)}  >{data.pinDropName}</button>
          </div>
        )
      }.bind(this))
    } else {
      arrayPin = (<p>No Business Found</p>)
    }

    return (
      <div>
        <h1>Select Pin</h1>
        {arrayPin}
      </div>
    )
  }
})

var InputData = React.createClass({
  getInitialState: function(){
    return {input: ""}
  },

  handleInputChange: function(e){
    this.setState({input: e.target.value})
  },

  handleSubmitInput: function(e){
    e.preventDefault()
    $.ajax({
      url: '/api/supervisor/postdata',
      dataType: 'json',
      type: 'POST',
      data: {value: this.state.input, owner: this.props.owner_id, businessname: this.props.businessName, pindropname: this.props.pinDropName},
      success: function(data){
        this.setState({input:""})
      }.bind(this),
      error: function(xhr, status, err){
        this.setState({input:"error"})
      }.bind(this)
    })
  },

  render: function(){
    return(
      <div>
        <h1>Input Data of Pin: {this.props.pindropname}</h1>
        <form onSubmit={this.handleSubmitInput}>
          Penjualan: <input type="text" value={this.state.input} onChange={this.handleInputChange} /><br />
          <input type = "submit" />
        </form>
      </div>
    )
  }
})

ReactDOM.render(
  <Container />, document.getElementById('container')
)
