var Container = React.createClass({
  getInitialState: function(){
    return {page: "ownerlist", businessName: "", pinDropName: "", owner_id: "", pinDate: "", message: "", userEmail: document.getElementById('container').getAttribute('email')}
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
    this.setState({page: "ownerlist", businessName: "", pinDropName: "", owner_id: "", pinDate: "", message: "data berhasil diinput"})
  },

  handleHomeButton: function(){
    this.setState({page: "ownerlist", businessName: "", pinDropName: "", owner_id: "", pinDate: "", message: ""})
  },

  navigationOwners: function(){
    this.setState({page: "ownerlist", businessName: "", pinDropName: "", owner_id: "", pinDate: ""})
  },

  navigationBusinesses: function(){
    this.setState({page: "businesslist", businessName: "", pinDropName: "", pinDate: ""})
  },

  navigationPins: function(){
    this.setState({page: "pinlist", pinDropName: "", pinDate: ""})
  },

  navigationDates: function(){
    this.setState({page: "datelist", pinDate: ""})
  },

  render: function(){
    let leftBar = {
      float: "left"
    }
    let rightBar = {
      float: "right",
      marginTop: "auto",
      marginBottom: "auto",
      marginRight: "20px"
    }

    let containerStyle = {
      width: "80%",
      marginRight: "auto",
      marginLeft: "auto",
      marginTop: "20px",
      marginBottom: "20px",
      fontFamily: "Prompt",
      fontWeight: "bold",
    }

    let topBarStyle = {
      borderStyle: "solid",
      borderColor: "#91D8F7",
      padding: "15px",
      height: "80px",
      borderRadius: "10px"
    }

    let faviconStyle= {
      height: "100%",
      marginLeft: "10px",
      marginRight: "10px"
    }

    let contentContainerStyle={
      marginTop: "10px",
      padding: "10px",
      borderStyle: "solid",
      borderColor: "#91D8F7",
      color: "#91D8F7",
      borderRadius: "10px"
    }

    let contentStyle={
      marginRight: "10px",
      marginLeft: "10px",
      marginTop: "20px",
      marginBottom: "20px"
    }

    let navigationStyle={
      marginRight: "10px",
      marginLeft: "10px",
      marginTop: "5px",
      marginBottom: "5px"
    }

    if(this.state.page == "ownerlist"){
      return (
        <div style={containerStyle}>
          <div style={topBarStyle}>
            <div style={leftBar}>
              <img style={faviconStyle} alt="Brand" src="/images/favicon.png" />
              <img style={faviconStyle} src="/images/logo-block-theme.png" />
            </div>
            <div style={rightBar}>
              {this.state.userEmail} <br />
              <a href="/api/users/logout">Logout</a>
            </div>
          </div>
          <div style={contentContainerStyle}>
            <div style={navigationStyle}>
              <Navigation page={this.state.page} handleClickOwners={this.navigationOwners} handleClickBusinesses={this.navigationBusinesses} handleClickPins={this.navigationPins} handleClickDates = {this.navigationDates}/>
            </div>
          </div>
          <div style={contentContainerStyle}>
            <div style={contentStyle}>
              <OwnerList toBusinessList = {this.toBusinessPage} />
            </div>
          </div>
          <div>
            <div style={contentStyle}>
              <Messages messages={this.state.message} goToHome={this.handleHomeButton} />
            </div>
          </div>
        </div>
      )
    } else if(this.state.page == "businesslist"){
      return (
        <div style={containerStyle}>
          <div style={topBarStyle}>
          <div style={leftBar}>
            <img style={faviconStyle} alt="Brand" src="/images/favicon.png" />
            <img style={faviconStyle} src="/images/logo-block-theme.png" />
          </div>
          <div style={rightBar}>
            {this.state.userEmail} <br />
            <a href="/api/users/logout">Logout</a>
          </div>
          </div>
          <div style={contentContainerStyle}>
            <div style={navigationStyle}>
              <Navigation page={this.state.page} handleClickOwners={this.navigationOwners} handleClickBusinesses={this.navigationBusinesses} handleClickPins={this.navigationPins} handleClickDates = {this.navigationDates} />
            </div>
          </div>
          <div style={contentContainerStyle}>
            <div style={contentStyle}>
              <BusinessList toPinList={this.toPinPage} owner_id={this.state.owner_id}/>
            </div>
          </div>
          <div>
            <div style={contentStyle}>
              <Messages messages={this.state.message} goToHome={this.handleHomeButton} />
            </div>
          </div>
        </div>


      )
    } else if (this.state.page == "pinlist") {
      return (
        <div style={containerStyle}>
          <div style={topBarStyle}>
            <div style={leftBar}>
              <img style={faviconStyle} alt="Brand" src="/images/favicon.png" />
              <img style={faviconStyle} src="/images/logo-block-theme.png" />
            </div>
            <div style={rightBar}>
              {this.state.userEmail} <br />
              <a href="/api/users/logout">Logout</a>
            </div>
          </div>
          <div style={contentContainerStyle}>
            <div style={navigationStyle}>
              <Navigation page={this.state.page} handleClickOwners={this.navigationOwners} handleClickBusinesses={this.navigationBusinesses} handleClickPins={this.navigationPins} handleClickDates = {this.navigationDates} />
            </div>
          </div>
          <div style={contentContainerStyle}>
            <div style={contentStyle}>
              <PinList businessName={this.state.businessName} toDateList={this.toDatePage}/>
            </div>
          </div>
          <div>
            <div style={contentStyle}>
              <Messages messages={this.state.message} goToHome={this.handleHomeButton} />
            </div>
          </div>
        </div>
      )
    } else if (this.state.page == "datelist") {
      return (
        <div style={containerStyle}>
          <div style={topBarStyle}>
            <div style={leftBar}>
              <img style={faviconStyle} alt="Brand" src="/images/favicon.png" />
              <img style={faviconStyle} src="/images/logo-block-theme.png" />
            </div>
            <div style={rightBar}>
              {this.state.userEmail} <br />
              <a href="/api/users/logout">Logout</a>
            </div>
          </div>
          <div style={contentContainerStyle}>
            <div style={navigationStyle}>
              <Navigation page={this.state.page} handleClickOwners={this.navigationOwners} handleClickBusinesses={this.navigationBusinesses} handleClickPins={this.navigationPins} handleClickDates = {this.navigationDates} />
            </div>
          </div>
          <div style={contentContainerStyle}>
            <div style={contentStyle}>
              <DateList pinDropName={this.state.pinDropName} owner_id={this.state.owner_id} businessName={this.state.businessName} toInputList={this.toInputDataPage} />
            </div>
          </div>
          <div>
            <div style={contentStyle}>
              <Messages messages={this.state.message} goToHome={this.handleHomeButton} />
            </div>
          </div>
        </div>

      )
    } else if (this.state.page == "inputdata") {
      return (
        <div style={containerStyle}>
          <div style={topBarStyle}>
            <div style={leftBar}>
              <img style={faviconStyle} alt="Brand" src="/images/favicon.png" />
              <img style={faviconStyle} src="/images/logo-block-theme.png" />
            </div>
            <div style={rightBar}>
              {this.state.userEmail} <br />
              <a href="/api/users/logout">Logout</a>
            </div>
          </div>
          <div style={contentContainerStyle}>
            <div style={navigationStyle}>
              <Navigation page={this.state.page} handleClickOwners={this.navigationOwners} handleClickBusinesses={this.navigationBusinesses} handleClickPins={this.navigationPins} handleClickDates = {this.navigationDates} />
            </div>
          </div>
          <div style={contentContainerStyle}>
            <div style={contentStyle}>
              <InputData pinDropName={this.state.pinDropName} owner_id={this.state.owner_id} businessName={this.state.businessName} pinDate={this.state.pinDate} handleSuccessfulInput={this.successfulInput}/>
            </div>
          </div>
          <div>
            <div style={contentStyle}>
              <Messages messages={this.state.message} goToHome={this.handleHomeButton} />
            </div>
          </div>
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
          <button className="list-group-item" key={data.owner._id} style={fontStyle} onClick={function(){this.props.toBusinessList(data.owner._id)}.bind(this)}>{data.owner._id} || {data.owner.userEmail}</button>
        )
      }.bind(this))
    } else {
      arrayOwner = (
        <div>No Owner Found</div>
      )
    }

    return (
      <div>
        <h1 style={headingStyle}>Select Owner</h1>
        <ul className="list-group">
          {arrayOwner}
        </ul>
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
            <button className="list-group-item" key={data.owner._id} style={fontStyle} onClick={function(){this.props.toPinList(data.businessName)}.bind(this)}>{data.businessName} || {data.owner.userEmail}</button>
          </div>
        )
      }.bind(this))
    } else {
      arrayBusiness = (<div>No Business Found</div>)
    }

    return (
      <div>
        <h1 style={headingStyle}>Select Business</h1>
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
            <button className="list-group-item" key={data.owner._id} style={fontStyle} onClick={function(){this.props.toDateList(data.pinDropName)}.bind(this)}  >{data.pinDropName}</button>
          </div>
        )
      }.bind(this))
    } else {
      arrayPin = (<div>No Pin Found</div>)
    }

    return (
      <div>
        <h1 style={headingStyle}>Select Pin</h1>
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
        let date = new Date(data.createdAt);  // dateStr you get from mongodb
        let d = date.getDate();
        let m = date.getMonth()+1;
        let y = date.getFullYear()
        let formattedDate = `${d}-${m}-${y}`

        return (
          <div key={data.createdAt}>
            <button className="list-group-item" key={data.owner._id} style={fontStyle} onClick={function(){this.props.toInputList(data.createdAt)}.bind(this)}  >{formattedDate}</button>
          </div>
        )
      }.bind(this))
    } else {
      arrayDate = (<div>All Reports have been Completed</div>)
    }

    return (
      <div>
        <h1 style={headingStyle}>Select Date</h1>
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
    let date = new Date(this.props.pinDate);  // dateStr you get from mongodb
    let d = date.getDate();
    let m = date.getMonth()+1;
    let y = date.getFullYear()
    let formattedDate = `${d}-${m}-${y}`

    return(
      <div>
        <h1 style={headingStyle}>Input Data of Pin: "{this.props.pinDropName}" on {formattedDate}</h1><br />
        <form onSubmit={this.handleSubmitInput}>
          <span style={fontStyle}>Penjualan: </span><input type="number" value={this.state.input} onChange={this.handleInputChange} />    <button style={buttonStyle} className="btn btn-primary" type="submit">Submit</button>
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
      </div>
    )
  }
})


var Navigation = React.createClass({
  getInitialState: function(){
    return {page: this.props.page}
  },

  componentDidUpdate:function(){
    if(this.state.page == this.props.page){

    } else {
      this.setState({page: this.props.page})
    }
  },

  clickOwners: function(){
    this.props.handleClickOwners()
  },

  clickBusinesses: function(){
    this.props.handleClickBusinesses()
  },

  clickPins: function(){
    this.props.handleClickPins()
  },

  clickDates: function(){
    this.props.handleClickDates()
  },

  render: function(){
    if(this.state.page == "ownerlist"){
      return (
        <div>
          <u>owners</u>
        </div>
      )
    } else if (this.state.page == "businesslist"){
      return (
        <div>
          <a href="#" onClick={this.clickOwners}>owners</a> > <u>businesses</u>
        </div>
      )
    } else if (this.state.page == "pinlist"){
      return (
        <div>
          <a href="#" onClick={this.clickOwners}>owners</a> > <a href="#" onClick={this.clickBusinesses}>businesses</a> > <u>pins</u>
        </div>
      )
    } else if (this.state.page == "datelist"){
      return (
        <div>
          <a href="#" onClick={this.clickOwners}>owners</a> > <a href="#" onClick={this.clickBusinesses}>businesses</a> > <a href="#" onClick={this.clickPins}>pins</a> > <u>dates</u>
        </div>
      )
    } else if (this.state.page == "inputdata"){
      return (
        <div>
          <a href="#" onClick={this.clickOwners}>owners</a> > <a href="#" onClick={this.clickBusinesses}>businesses</a> > <a href="#" onClick={this.clickPins}>pins</a> > <a href="#" onClick={this.clickDates}>dates</a> > <u>input data</u>
        </div>
      )
    }
  }
})

ReactDOM.render(
  <Container />, document.getElementById('container')
)

let fontStyle = {
  color: "#00AFEF",
  fontSize: "14px"
}

let buttonStyle = {
  color: "white",
  backgroundColor: "#00AFEF"
}

let headingStyle = {
  fontSize: "20px",
  color: "#00AFEF"
}
