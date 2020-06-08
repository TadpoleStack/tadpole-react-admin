import React, { Component } from 'react'
import './index.scss'
import { Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
const WebGLbg = React.$loadable(() => import('../WebGLbg'))
const Timer = React.$loadable(() => import('../Timer'))

class Login extends Component {
   constructor(props) {
      super(props)
      this.state = {
         Timer: null,
      }
   }

   handleSubmit(values) {
      if (values.username === 'Tadpole' && values.password === 'admin') {
         message.success('登录成功！')
         this.props.history.push('/home')
      } else message.error('登录失败！用户名和密码不匹配')
   }
   //阻止默认
   prevetDefault(e) {
      e.preventDefault()
   }
   render() {
      return (
         <div className="login-wrap" onContextMenu={this.prevetDefault}>
            <WebGLbg></WebGLbg>
            <Timer
               width={window.innerWidth / 3}
               height={window.innerHeight}
            ></Timer>
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
