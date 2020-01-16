import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { SidebarWrap } from './style'
export default class Sidebar extends Component {
   constructor(props) {
      super(props)
      this.state = {
         width: this.props.width || '260px'
      }
   }
   render() {
      return (
         <SidebarWrap width={this.state.width}>
            <div><Link to="/login">login</Link></div>
            <div><Link to="/404">404</Link></div>
            <div><Link to="/home">home</Link></div>
            <div><Link to="/home/overview">home-overview</Link></div>
         </SidebarWrap>
      )
   }
}