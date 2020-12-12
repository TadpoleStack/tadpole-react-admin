import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { HeaderWrap } from './style'
import { Button, Avatar, Popover} from 'antd'
import { MenuFoldOutlined } from '@ant-design/icons'
import './index.scss'
import {ResponsiveContext} from '@src/context'

class Header extends Component {
    static contextType = ResponsiveContext;

    constructor(props) {
        super(props)
        this.state = {
            height: this.props.height || '60px',
        }
    }
    loginOut = ()=>{
        React.$clearToken()
        this.props.history.replace('/')
    }
    changeSidebarState() {
      React.$eventEmitter.emit('changeSidebarState')
    }
    render() {
        const LoginOutView = ()=> {
            return(
                <div style={{cursor:'pointer'}} onClick={this.loginOut}>登出</div>
            )
        }
        return (
            <HeaderWrap
                height={this.state.height}
                className="header-components"
            >
                <div
                    style={{
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
                <div className="header-center">Tadpole-react-admin</div>
                <div
                    className="avatar-wrap"
                    style={{
                        height: this.state.height,
                        width: this.state.height,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Popover content={<LoginOutView></LoginOutView>}>
                        <Avatar
                            size={this.context==='PC'? 48 : 42}
                            src="https://s.gravatar.com/avatar/4770ccdd197bff1ab146a978c26cca6a?s=128&r=X"
                        />
                    </Popover>
                </div>
            </HeaderWrap>
        )
    }
}

export default withRouter(Header)