import React, { Component } from 'react'
// import img from 'assetsc';
import './index.scss'
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
         <div
            className="not-found"
         >
            <img
               src={process.env.PUBLIC_URL + '/images/404.png'}
               alt="404"
               className={`animated swing ${this.state.animated} img-404`}
               onMouseEnter={this.enter}
            />
         </div>
      )
   }
}

export default NotFound