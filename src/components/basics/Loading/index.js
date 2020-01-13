import React,{Component} from 'react'
import {Spin} from "antd";

export default class Loading extends Component{
   render() {
      // console.info('loading')
      return(
         <div style={{ height: '100%', width: '100%', position: 'fixed', top: 0, left: 0, zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(255, 255, 255, .7)' }}>
            <Spin/>
         </div >
      )
   }
}