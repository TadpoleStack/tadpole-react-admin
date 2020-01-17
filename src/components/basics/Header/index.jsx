import React, { Component } from 'react'
import { HeaderWrap } from './style'
export default class Header extends Component {
   constructor(props) {
      super(props)
      this.state = {
         height: this.props.height || '60px'
      }
   }

   render() {
      return (<HeaderWrap height={this.state.height}>header</HeaderWrap>)
   }
}