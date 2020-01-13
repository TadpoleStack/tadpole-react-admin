import React,{Component} from 'react'
import {Link} from "react-router-dom";

export default class Sidebar extends Component{
   constructor(props){
      super(props)
      this.state={
         width:this.props.width||'260px'
      }
   }
   render() {
      return(
         <div style={{width: this.state.width, height: '100%',transition:'300ms'}}>
            <div><Link to="/login">login</Link></div>
            <div><Link to="/404">404</Link></div>
            <div><Link to="/home">home</Link></div>
            <div><Link to="/home/start">home-start</Link></div>
         </div>
      )
   }
}