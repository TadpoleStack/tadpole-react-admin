import React, { Component } from 'react'
import { ErrorLoading } from './style'

export default class ErrorBoundary extends Component {
   constructor(props) {
     super(props);
     this.state = { hasError: false };
   }
 
   static getDerivedStateFromError(error) {
     // 更新 state 使下一次渲染能够显示降级后的 UI
     return { hasError: true };
   }
 
   componentDidCatch(error, errorInfo) {
     // 错误日志上报给服务器
   //   logErrorToMyService(error, errorInfo);
   }
 
   render() {
     if (this.state.hasError) {
       // 自定义降级后的 UI 并渲染
       return (
            <ErrorLoading><h1>页面走丢了！</h1></ErrorLoading>
       )
     }
 
     return this.props.children; 
   }
 }