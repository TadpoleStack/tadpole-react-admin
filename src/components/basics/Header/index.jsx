import React, { Component } from 'react'
import { HeaderWrap } from './style'
import { Button } from 'antd'
import EventEmitter from 'utils/EventEmitter.js'
export default class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            height: this.props.height || '60px',
        }
    }
    changeSidebarState() {
        EventEmitter.emit('changeSidebarState')
    }
    render() {
        return (
            <HeaderWrap height={this.state.height}>
                <Button
                    type="primary"
                    onClick={this.changeSidebarState.bind(this)}
                >
                    Primary
                </Button>
                header
            </HeaderWrap>
        )
    }
}
