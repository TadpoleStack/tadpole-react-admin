import React from 'react'
import { createFromIconfontCN } from '@ant-design/icons';
const Icon = createFromIconfontCN({ scriptUrl: '//at.alicdn.com/t/font_1883324_2lxdrlbk6en.js' })
/**
 * iconfont图标
 */
class IconFont extends React.Component{
   render(){
      return <Icon {...this.props}></Icon>
   }
}
export default IconFont