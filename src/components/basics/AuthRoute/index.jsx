import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

export default class AutnRoute extends Component {
   constructor(props){
      super(props)
   }
   render() {
      console.info(this.props.route)
      return (
         React.$getToken()
            ? <Route {...this.props.route}></Route>
            : <Redirect to="/login" />
      )
   }
}
