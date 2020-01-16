import React, { Component } from 'react'
import { Spin } from "antd";
import { ErrorLoading, PastDelayLoading } from './style'

export default class Loading extends Component {
   render() {
      if (this.props.error) {
         return (
            <ErrorLoading>
               页面走丢了！
            </ErrorLoading>)
      } else if (this.props.pastDelay) {
         return (
            <PastDelayLoading>
               <Spin />
            </PastDelayLoading>)
      } else {
         return null
      }
   }
}