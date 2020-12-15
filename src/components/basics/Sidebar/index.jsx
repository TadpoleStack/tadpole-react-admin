import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { SidebarWrap } from './style'
import { Menu } from 'antd'
import IconFont from '@src/components/basics/IconFont'
import { ResponsiveContext } from '@src/context'

class Sidebar extends Component {
   static contextType = ResponsiveContext;

   constructor(props) {
      super(props)
      this.state = {
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
                     key: '/admin/echartsmap',
                     icon: 'Tadpoletubiao',
                     text: 'EchartsMap'
                  },
                  // {
                  //    key: '/admin/highcharts',
                  //    icon: 'Tadpoletubiaozhexiantu',
                  //    text: 'HighCharts'
                  // },
                  // {
                  //    key: '/admin/recharts',
                  //    icon: 'Tadpoletubiao1',
                  //    text: 'ReCharts'
                  // }
               ]
            },
            {
               key: 'rich',
               icon: 'Tadpoleedit-profile',
               text: '富文本',
               children: [
                  {
                     key: '/admin/richtext',
                     icon: 'Tadpolexiepinglun',
                     text: 'BraftEditor'
                  },
                  {
                     key: '/admin/richmarkdown',
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
               key:'table',
               icon: 'Tadpoletable1',
               text: 'Table',
               children: [
                  {
                     key: '/admin/simpletable',
                     icon: 'Tadpoletable1',
                     text: 'SimpleTable'
                  },
                  {
                     key: '/admin/sortablehoctable',
                     icon: 'Tadpoletable1',
                     text: 'SortableHocTable'
                  },
                  {
                     key: '/admin/editabletable',
                     icon: 'Tadpoletable1',
                     text: 'EditableTable'
                  }
               ]
            },
            {
               key: '/admin/form',
               icon: 'Tadpole17',
               text: 'Form'
            },
            {
               key: '/admin/dataexport',
               icon: 'Tadpole17',
               text: '数据导出'
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
      if (this.context === 'MOBILE') this.setState({ sidebarState: false })

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
            device={this.context}
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
