import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import PostAdd from '../components/PostAdd'
import PostList from '../components/PostList'
import * as AppActions from '../actions'

class App extends Component{
  render(){
    const {data, actions} = this.props
    return(
      <div className="container">
      <div className="row">
        <div className="col-sm-8 col-sm-offset-2">
          <div className="panel panel-info">
            <div className="panel-heading text-center">
              <h4><strong>Hallo </strong></h4>
              <h6>mapinc</h6>
            </div>
            <div className="panel-body">
              <PostAdd name="" phone="" onSave={actions.addData} />
            </div>
            <ul className="list-group">
              <PostList data={data} actions={actions} />
            </ul>
          </div>
        </div>
      </div>
      </div>
    )
  }
}

App.propTypes = {
  data: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state){
  return {data: state.data}
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(AppActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
