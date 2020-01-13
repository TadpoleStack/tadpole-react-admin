import React, {Component} from 'react'

export default class Header extends Component {
   constructor(props) {
      super(props)
      this.state = {
         height:this.props.height||'60px'
      }
   }

   render() {
      return (<div style={{width: '100%', height: this.state.height, backgroundColor: '#00d0b1'}}>header</div>)
   }
}