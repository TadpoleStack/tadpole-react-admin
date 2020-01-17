import React, { Component } from 'react'
import { NotFoundWrap } from './style'
class NotFound extends Component {
   constructor(props) {
      super(props)
      this.state = {
         animated: ''
      }
   }
   enter = () => {
      this.setState({ animated: 'hinge' });
   };

   render() {
      return (
         <NotFoundWrap>
            <img
               src={process.env.PUBLIC_URL + '/images/404.png'}
               alt="404"
               className={`animated swing ${this.state.animated} img-404`}
               onMouseEnter={this.enter}
            />
         </NotFoundWrap>
      )
   }
}

export default NotFound