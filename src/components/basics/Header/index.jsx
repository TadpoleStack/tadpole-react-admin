import React, { Component } from 'react'
import { HeaderWrap } from './style'
import { Button } from 'antd'
import EventEmitter from 'utils/EventEmitter.js'
import { MenuFoldOutlined } from '@ant-design/icons'
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
                <div
                    style={{
                        float: 'left',
                        width: '80px',
                        height: this.state.height,
                        textAlign: 'center',
                        lineHeight: this.state.height,
                    }}
                >
                    <Button
                        ghost={true}
                        icon={<MenuFoldOutlined />}
                        onClick={this.changeSidebarState.bind(this)}
                    ></Button>
                </div>
                header
            </HeaderWrap>
        )
    }
}
