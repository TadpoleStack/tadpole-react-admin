import React, { Component } from 'react'
import './index.scss'
import { Form, Icon, Input, Button, message } from 'antd';
import loadable from 'utils/loadable'
const WebGLbg = loadable(() => import('../WebGLbg'))
const Timer = loadable(() => import('../Timer'))

class Login extends Component {
   constructor(props) {
      super(props)
      this.state = {
         Timer: null
      }
   }

   handleSubmit(e) {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
         if (!err) {
            if (values.username === 'Tadpole' && values.password === 'admin') {
               message.success('登录成功！')
               this.props.history.push('/home')
               console.log('Received values of form: ', values);
            } else {
               message.error('登录失败！')
            }
         }
      });
   };

   render() {
      const { getFieldDecorator } = this.props.form;
      return (
         <div className="login-wrap">
            <WebGLbg></WebGLbg>
            <Timer width={window.innerWidth / 3} height={window.innerHeight}></Timer>
            <div className="login-form-wrap" style={{ width: window.innerWidth < 992 ? '280px' : '360px' }}>
               <h2 align="center">Tadpole React Admin</h2>
               <Form onSubmit={this.handleSubmit.bind(this)}>
                  <Form.Item>
                     {getFieldDecorator('username', {
                        rules: [{ required: true, message: '请输入用户名!' }],
                     })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                           placeholder="用户名 Tadpole"
                        />,
                     )}
                  </Form.Item>
                  <Form.Item>
                     {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请填写密码!' }],
                     })(
                        <Input
                           prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                           type="password"
                           placeholder="密码 admin"
                        />,
                     )}
                  </Form.Item>
                  <Form.Item>
                     <Button block={true} type="primary" htmlType="submit">登录</Button>
                  </Form.Item>
               </Form>
            </div>
         </div >
      )
   }
}

export default Form.create()(Login)