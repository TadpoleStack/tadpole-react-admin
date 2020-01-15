import React, { Component } from 'react'
import { Spin } from "antd";

export default class Loading extends Component {
   render() {
      if (this.props.error) {
         return (<div style={{ height: '100%', width: '100%', position: 'fixed', top: 0, left: 0, zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(255, 255, 255, .4)' }}>
            页面走丢了！
      </div >)
      } else if (this.props.pastDelay) {
         return (
            <div style={{ height: '100%', width: '100%', position: 'fixed', top: 0, left: 0, zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(255, 255, 255, .4)' }}>
               <Spin />
            </div >
         )
      } else {
         return null
      }
   }
}