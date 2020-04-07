import React, { Component } from 'react'
import { HeaderWrap } from './style'
import { Button, Avatar } from 'antd'
import EventEmitter from 'utils/EventEmitter.js'
import { MenuFoldOutlined } from '@ant-design/icons'
import './index.scss'
export default class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            height: this.props.height || '60px',
            isPC: this.props.isPC,
        }
    }
    changeSidebarState() {
        EventEmitter.emit('changeSidebarState')
    }
    render() {
        return (
            <HeaderWrap
                height={this.state.height}
                className="header-components"
            >
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
                <div
                    className="avatar-wrap"
                    style={{
                        float: 'right',
                        height: this.state.height,
                        width: this.state.height,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Avatar
                        size={this.state.isPC ? 64 : 48}
                        src="https://s.gravatar.com/avatar/4770ccdd197bff1ab146a978c26cca6a?s=128&r=X"
                    />
                </div>
            </HeaderWrap>
        )
    }
}
