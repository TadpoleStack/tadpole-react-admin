import React, {Component, Suspense, lazy} from 'react'
import './index.scss'
import {Form, Icon, Input, Button, message} from 'antd';
import Timer from '../../../assets/lib/timer.js'

const WebGLbg = lazy(() => import('../WebGLbg'));

class Login extends Component {
    constructor(props) {
        super(props)
        this.Timer = null
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

    componentDidMount() {
        window.innerWidth >= 1366 && (this.Timer = new Timer({el: '#timer'}))
    }

    componentWillUnmount() {
        this.Timer !== null && this.Timer.destroyTime()
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="login-wrap">
                <Suspense>
                    <WebGLbg></WebGLbg>
                    {
                        window.innerWidth >= 1366 ?
                            <div id="timer" style={{
                                width: window.innerWidth / 4,
                                height: window.innerHeight,
                                position: 'fixed',
                                top: 0,
                                right: '100px',
                                zIndex: 11,
                                fontWeight: '900'
                            }}></div> : null
                    }
                </Suspense>
                <div className="login-form-wrap">
                    <h2 align="center">Tadpole React Admin</h2>
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{required: true, message: '请输入用户名!'}],
                            })(
                                <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                       placeholder="用户名 Tadpole"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: '请填写密码!'}],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
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
            </div>
        )
    }
}

export default Form.create()(Login)