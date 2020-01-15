import React, { Component } from 'react'
import Typed from 'typed.js'

export default class Start extends Component {
   constructor(props) {
      super(props)
      this.state = {
         Typed: null
      }
   }
   componentDidMount() {
      this.state.Typed = new Typed('#typed-box', {
         strings: ['npm install^1000<br/> `installing components...` ^1000 <br/> `Fetching from source...`'],
         typeSpeed: 40,
         backSpeed: 0,
         loop: true
      });
   }
   render() {
      return (
         <div style={{ width: '100%', height: '100%', backgroundColor: '#eee', overflowY: 'scroll' }}>
            <span id="typed-box"></span>
         </div >
      )
   }
}