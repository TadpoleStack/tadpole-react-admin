import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { SidebarWrap } from './style'
import { Menu } from 'antd'
import {
    HomeOutlined,
    AppstoreOutlined,
    AreaChartOutlined,
    EditOutlined,
    TableOutlined,
    FormOutlined,
    HighlightOutlined,
    QuestionOutlined,
} from '@ant-design/icons'

const { SubMenu } = Menu

class Sidebar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            width: this.props.width || '260px',
            theme: 'dark',
            current: '/home',
        }
    }
    handleClick = e => {
        console.log('click ', e)
        this.props.history.push(e.key)
        this.setState({
            current: e.key,
        })
    }
    render() {
        return (
            <SidebarWrap width={this.state.width}>
                <Menu
                    theme={this.state.theme}
                    onClick={this.handleClick}
                    style={{ minHeight: '100%' }}
                    defaultOpenKeys={['/home']}
                    selectedKeys={[this.state.current]}
                    mode="inline"
                    inlineCollapsed={false}
                >
                    <Menu.Item key="/home">
                        <HomeOutlined />
                        <span>首页</span>
                    </Menu.Item>
                    <SubMenu
                        key="ui"
                        title={
                            <span>
                                <AppstoreOutlined />
                                <span>UI</span>
                            </span>
                        }
                    >
                        <Menu.Item key="/home/iconpage">小图标</Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="charts"
                        title={
                            <span>
                                <AreaChartOutlined />
                                <span>charts</span>
                            </span>
                        }
                    >
                        <Menu.Item key="/home/echarts">Echarts</Menu.Item>
                        <Menu.Item key="/home/highcharts">HighCharts</Menu.Item>
                        <Menu.Item key="/home/recharts">ReCharts</Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="richtext"
                        title={
                            <span>
                                <EditOutlined />
                                <span>富文本</span>
                            </span>
                        }
                    >
                        <Menu.Item key="/home/richtext">富文本编辑器</Menu.Item>
                        <Menu.Item key="/home/markdown">
                            markdown编辑器
                        </Menu.Item>
                        <Menu.Item key="/home/jsonedit">JSON编辑器</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="/home/table">
                        <TableOutlined />
                        <span>Table</span>
                    </Menu.Item>
                    <Menu.Item key="/home/form">
                        <FormOutlined />
                        <span>Form</span>
                    </Menu.Item>
                    <Menu.Item key="/home/typedplugin">
                        <HighlightOutlined />
                        <span>TypedPlugin</span>
                    </Menu.Item>
                    <Menu.Item key="/404">
                        <QuestionOutlined />
                        <span>404</span>
                    </Menu.Item>
                </Menu>
            </SidebarWrap>
        )
    }
}
export default withRouter(Sidebar)
