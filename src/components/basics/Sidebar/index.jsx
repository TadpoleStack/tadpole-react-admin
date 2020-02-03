import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { SidebarWrap } from './style'
import { Menu, Icon } from 'antd';

const { SubMenu } = Menu;


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
      console.log('click ', e);
      this.props.history.push(e.key)
      this.setState({
         current: e.key,
      });
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
            >
               <Menu.Item
                  key="/home"
               >
                  <Icon type="home" />
                  <span>首页</span>
               </Menu.Item>
               <SubMenu
                  key="ui"
                  title={
                     <span>
                        <Icon type="appstore" />
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
                        <Icon type="area-chart" />
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
                        <Icon type="area-chart" />
                        <span>富文本</span>
                     </span>
                  }
               >
                  <Menu.Item key="/home/richtext">富文本编辑器</Menu.Item>
                  <Menu.Item key="/home/markdown">markdown编辑器</Menu.Item>
                  <Menu.Item key="/home/jsonedit">JSON编辑器</Menu.Item>
               </SubMenu>
               <Menu.Item key="/home/table">
                  <Icon type="table" />
                  <span>Table</span>
               </Menu.Item>
               <Menu.Item key="/home/form">
                  <Icon type="form" />
                  <span>Form</span>
               </Menu.Item>
               <Menu.Item key="/home/typedplugin">
                  <Icon type="edit" />
                  <span>TypedPlugin</span>
               </Menu.Item>
               <Menu.Item key="/404">
                  <Icon type="question-circle" />
                  <span>404</span>
               </Menu.Item>
            </Menu>
         </SidebarWrap>
      )
   }
}
export default withRouter(Sidebar)