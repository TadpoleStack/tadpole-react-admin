import React, { Component } from 'react'
import './index.scss'
import { Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import LazyLoading from '@src/components/basics/LazyLoading'
import ErrorBoundary from '@src/components/basics/ErrorBoundary'
import {ResponsiveContext} from '@src/context'
const WebGLbg = React.lazy(() => import('@src/components/basics/WebGLbg'))
const Timer = React.lazy(() => import('@src/components/basics/Timer'))

class Login extends Component {
   static contextType = ResponsiveContext;

   handleSubmit(values) {
      if (values.username === 'Tadpole' && values.password === 'admin') {
         message.success('登录成功！')
         this.props.history.push('/admin')
      } else message.error('登录失败！用户名和密码不匹配')
   }
   //阻止默认
   prevetDefault(e) {
      e.preventDefault()
   }
   render() {
      return (
         <div className="login-wrap" onContextMenu={this.prevetDefault}>
            <ErrorBoundary>
               <React.Suspense  fallback={<LazyLoading style={{zIndex:10000,position:'fixed'}} />}>
                  <WebGLbg></WebGLbg>
                  <Timer
                     width={window.innerWidth / 3}
                     height={window.innerHeight}
                  ></Timer>
               </React.Suspense>
            </ErrorBoundary>
            <div
               className="login-form-wrap"
               style={{
                  width: window.innerWidth < 768 ? '280px' : '360px',
               }}
            >
               <h2 align="center">Tadpole React Admin</h2>
               <Form onFinish={this.handleSubmit.bind(this)}>
                  <Form.Item
                     name="username"
                     rules={[
                        { required: true, message: '请输入用户名!' },
                     ]}
                  >
                     <Input
                        prefix={
                           <UserOutlined
                              style={{ color: 'rgba(0,0,0,.25)' }}
                           />
                        }
                        placeholder="用户名 Tadpole"
                     />
                  </Form.Item>
                  <Form.Item
                     name="password"
                     rules={[{ required: true, message: '请填写密码!' }]}
                  >
                     <Input.Password
                        prefix={
                           <LockOutlined
                              style={{ color: 'rgba(0,0,0,.25)' }}
                           />
                        }
                        placeholder="密码 admin"
                     />
                  </Form.Item>
                  <Form.Item>
                     <Button
                        block={true}
                        type="primary"
                        htmlType="submit"
                     >
                        登录
                            </Button>
                  </Form.Item>
               </Form>
            </div>
         </div>
      )
   }
}
export default Login
