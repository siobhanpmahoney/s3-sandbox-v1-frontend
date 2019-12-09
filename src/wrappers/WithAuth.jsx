import React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import {Redirect, withRouter} from 'react-router'
import {fetchCurrentUserAction} from '../actions'
import ls from 'local-storage'


export default function (WrappedComponent) {
  class WithAuth extends React.Component {


    componentDidMount() {
       if (ls.get('jwt_token') && !this.props.user.id) {
        this.props.fetchCurrentUserAction(ls.get('jwt_token'))
        // .then(user_id => {
        //   debugger
        //   return user_id.json()
        // })

       }

    }

    componentDidUpdate(prevProps) {
      console.log('WithAuth did update');
      if (prevProps.user.id && !this.props.user.id && !ls.get('jwt_token')) {
        return (
          <Redirect to="/" />
        )
      }
    }

    render() {
      if (ls.get('jwt_token') && !!this.props.user.id) {
        return (
          <WrappedComponent {...this.props} />
        )
      } else if (ls.get('jwt_token')) {
        return <div>Loading</div>;
      } else {
        return (
          <Redirect to="/login" />
        )
      }
    }

  }

  function mapStateToProps(state) {
    return {
      user: Object.assign({}, state.user),
    }
  }


  return connect(mapStateToProps, {fetchCurrentUserAction})(WithAuth)
}
