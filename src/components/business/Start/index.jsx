import React, { Component } from 'react'
import Typed from 'typed.js'

export default class Start extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Typed: null,
        }
    }
    componentDidMount() {
        let typed = new Typed('#typed-box', {
            strings: [
                'npm install^1000<br/> `installing components...` ^1000 <br/> `Fetching from source...`',
            ],
            typeSpeed: 40,
            backSpeed: 0,
            loop: true,
        })
        this.setState({ Typed: typed })
    }
    render() {
        return (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#fff'
                }}
            >
                <span id="typed-box"></span>
            </div>
        )
    }
}
