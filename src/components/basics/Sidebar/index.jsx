import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { SidebarWrap } from './style'
import { Menu } from 'antd'
import IconFont from '@src/components/basics/IconFont'

class Sidebar extends Component {
   constructor(props) {
      super(props)
      this.state = {
         isPC: this.props.isPC === undefined ? true : this.props.isPC,
         width: this.props.width || '260px',
         theme: 'dark',
         current: '/admin',
         sidebarState: false,
         openKeys: [],
         sidebarList: [//侧边栏导航
            {
               key: '/admin',
               icon: 'Tadpoleshouye',
               text: '首页'
            },
            {
               key: 'ui',
               icon: 'Tadpolegongju',
               text: 'UI',
               children: [
                  {
                     key: '/admin/iconpage',
                     icon: 'Tadpoleview',
                     text: '小图标',
                  }
               ]
            },
            {
               key: 'charts',
               icon: 'Tadpoletubiao1-copy',
               text: 'charts',
               children: [
                  {
                     key: '/admin/echarts',
                     icon: 'Tadpoletubiao',
                     text: 'Echarts'
                  },
                  {
                     key: '/admin/highcharts',
                     icon: 'Tadpoletubiaozhexiantu',
                     text: 'HighCharts'
                  },
                  {
                     key: '/admin/recharts',
                     icon: 'Tadpoletubiao1',
                     text: 'ReCharts'
                  }
               ]
            },
            {
               key: 'richtext',
               icon: 'Tadpoleedit-profile',
               text: '富文本',
               children: [
                  {
                     key: '/admin/richtext',
                     icon: 'Tadpolexiepinglun',
                     text: '富文本编辑器'
                  },
                  {
                     key: '/admin/markdown',
                     icon: 'Tadpoleedit1',
                     text: 'markdown编辑器'
                  },
                  {
                     key: '/admin/jsonedit',
                     icon: 'Tadpoleedit',
                     text: 'JSON编辑器'
                  }
               ]
            },
            {
               key: '/admin/table',
               icon: 'Tadpoletable1',
               text: 'Table'
            },
            {
               key: '/admin/form',
               icon: 'Tadpole17',
               text: 'Form'
            },
            {
               key: '/admin/typedplugin',
               icon: 'TadpoleLC_icon_edit_line_1',
               text: 'TypedPlugin'
            },
            {
               key: '/404',
               icon: 'Tadpoleapptubiao-',
               text: '404'
            },
            {
               key: '/login',
               icon: 'Tadpoleai207',
               text: '返回登录'
            },
         ]
      }
   }
   /**
    * 点击跳转路由
    * @param {*} e 
    */
   handleClick = e => {
      if (e.keyPath.length < 2) this.setState({ openKeys: [] })
      this.props.history.push(e.key)
      this.setState({ current: e.key })
      if (!this.props.isPC) this.setState({ sidebarState: false })

   }
   /**
    * 侧边栏折叠
    * @param {*} openKeys 
    */
   handleOpenChange = openKeys => {
      if (openKeys[openKeys.length - 1]) {
         this.setState({ openKeys: [openKeys[openKeys.length - 1]] })
      } else {
         this.setState({ openKeys: [] })
      }
   }
   /**
    * 初始化设置sidebar的高亮状态及展开项
    */
   initSidebarState() {
      if (this.props.location.pathname) {
         this.setState({ current: this.props.location.pathname })
         let item = this.state.sidebarList.find(v => v.children && v.children.find(v2 => v2.key === this.props.location.pathname))
         item && this.setState({ openKeys: [item.key] })
      }
   }
   /**
    * 监听事件分发处理sidebar状态
    */
   EventEmitterListener() {
      React.$eventEmitter.on('changeSidebarState', () => {
         this.setState(state => {
            return { sidebarState: !state.sidebarState }
         })
      })
   }
   componentDidMount() {
      this.EventEmitterListener()
      this.initSidebarState()
   }
   componentWillUnmount() {
      React.$eventEmitter.removeAllListeners('changeSidebarState')
   }
   render() {
      return (
         <SidebarWrap
            width={this.state.width}
            isPC={this.state.isPC}
            sidebarState={this.state.sidebarState}
         >
            <Menu
               theme={this.state.theme}
               onClick={this.handleClick}
               onOpenChange={this.handleOpenChange}
               style={{ minHeight: '100%' }}
               openKeys={this.state.openKeys}
               selectedKeys={[this.state.current]}
               mode="inline"
            >
               {
                  this.state.sidebarList.map(item => {
                     return item.children && item.children.length > 0
                        ? <Menu.SubMenu
                           key={item.key}
                           icon={item.icon ? <IconFont type={item.icon} /> : null}
                           title={item.text}>
                           {item.children.map(subItem =>
                              <Menu.Item key={subItem.key} icon={subItem.icon ? <IconFont type={subItem.icon} /> : null}>
                                 {subItem.text}
                              </Menu.Item>)}
                        </Menu.SubMenu>
                        : <Menu.Item key={item.key} icon={item.icon ? <IconFont type={item.icon} /> : null}>
                           {item.text}
                        </Menu.Item>
                  })
               }
            </Menu>
         </SidebarWrap>
      )
   }
}
export default withRouter(Sidebar)
