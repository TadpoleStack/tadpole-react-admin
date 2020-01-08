import React, { Component } from 'react'
import img from '../../../assets/images/404.png';
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
                    src={img}
                    alt="404"
                    className={`animated swing ${this.state.animated} img-404`}
                    onMouseEnter={this.enter}
                />
            </div>
        )
    }
}

export default NotFound