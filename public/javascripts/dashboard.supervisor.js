var Container = React.createClass({
  getInitialState: function(){
    return {page: "ownerlist", businessName: "", pinDropName: "", owner_id: "", pinDate: "", message: ""}
  },

  toPinPage: function(businessName){
    this.setState({page: "pinlist", businessName: businessName, message: ""})
  },

  toDatePage: function(pinDropName){
    this.setState({page: "datelist", pinDropName: pinDropName, message: ""})
  },

  toInputDataPage: function(pinDate){
    this.setState({page: "inputdata", pinDate: pinDate, message: ""})
  },

  toBusinessPage: function(owner_id){
    this.setState({page: "businesslist", owner_id: owner_id, message: ""})
  },

  successfulInput: function(){
    this.setState({page: "ownerlist", message: "data berhasil diinput"})
  },

  handleHomeButton: function(){
    this.setState({page: "ownerlist", businessName: "", pinDropName: "", owner_id: "", pinDate: "", message: ""})
  },

  render: function(){
    if(this.state.page == "ownerlist"){
      return (
        <div>
          <OwnerList toBusinessList = {this.toBusinessPage} />
          <Messages messages={this.state.message} goToHome={this.handleHomeButton} />
        </div>
      )
    } else if(this.state.page == "businesslist"){
      return (
        <div>
          <BusinessList toPinList={this.toPinPage} owner_id={this.state.owner_id}/>
          <Messages messages={this.state.message} goToHome={this.handleHomeButton} />
        </div>
      )
    } else if (this.state.page == "pinlist") {
      return (
        <div>
          <PinList businessName={this.state.businessName} toDateList={this.toDatePage}/>
          <Messages messages={this.state.message} goToHome={this.handleHomeButton} />
        </div>
      )
    } else if (this.state.page == "datelist") {
      return (
        <div>
          <DateList pinDropName={this.state.pinDropName} owner_id={this.state.owner_id} businessName={this.state.businessName} toInputList={this.toInputDataPage} />
          <Messages messages={this.state.message} goToHome={this.handleHomeButton} />
        </div>
      )
    } else if (this.state.page == "inputdata") {
      return (
        <div>
          <InputData pinDropName={this.state.pinDropName} owner_id={this.state.owner_id} businessName={this.state.businessName} pinDate={this.state.pinDate} handleSuccessfulInput={this.successfulInput}/>
          <Messages messages={this.state.message} goToHome={this.handleHomeButton} />
        </div>
      )
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
            <button onClick={function(){this.props.toDateList(data.pinDropName)}.bind(this)}  >{data.pinDropName}</button>
          </div>
        )
      }.bind(this))
    } else {
      arrayPin = (<p>No Pin Found</p>)
    }

    return (
      <div>
        <h1>Select Pin</h1>
        {arrayPin}
      </div>
    )
  }
})

var DateList = React.createClass({
  getInitialState: function(){
    return {list: "", pinDropName: this.props.pinDropName}
  },

  componentDidMount: function(){
    $.ajax({
      url: `/api/supervisor/getpindate?ownerid=${this.props.owner_id}&businessname=${this.props.businessName}&pindropname=${this.props.pinDropName}`,
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

  render(){
    let arrayDate
    if(this.state.list != ""){
      let dateList = []
      for (let i in this.state.list){
        if(dateList.map(function(data){return data.createdAt}).indexOf(this.state.list[i].createdAt)== -1){
          dateList.push(this.state.list[i])
        }
      }
      arrayDate = dateList.map(function(data){
        return (
          <div key={data.createdAt}>
            <button onClick={function(){this.props.toInputList(data.createdAt)}.bind(this)}  >{data.createdAt}</button>
          </div>
        )
      }.bind(this))
    } else {
      arrayDate = (<p>All Reports have been Completed</p>)
    }

    return (
      <div>
        <h1>Select Date</h1>
        {arrayDate}
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
        this.props.handleSuccessfulInput()
      }.bind(this),
      error: function(xhr, status, err){
        this.setState({input:"error"})
      }.bind(this)
    })
  },

  render: function(){
    return(
      <div>
        <h1>Input Data of Pin: {this.props.pinDate}</h1>
        <form onSubmit={this.handleSubmitInput}>
          Penjualan: <input type="text" value={this.state.input} onChange={this.handleInputChange} /><br />
          <input type = "submit" />
        </form>
      </div>
    )
  }
})

var Messages = React.createClass({
  render: function(){
    return(
      <div>
        {this.props.messages}<br />
        <button onClick={this.props.goToHome}>Home</button>
      </div>
    )
  }
})

ReactDOM.render(
  <Container />, document.getElementById('container')
)
