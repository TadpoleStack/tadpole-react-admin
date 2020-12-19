import React, { Component } from 'react'
import { HashRouter as Router, Route, Redirect, Switch, withRouter } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from "react-transition-group";
import './index.scss'
import LazyLoading from '@src/components/basics/LazyLoading'
import ErrorBoundary from '@src/components/basics/ErrorBoundary'
import { adminRoutes } from '@src/routes'
const Header = React.lazy(() => import('@src/components/basics/Header'))
const Sidebar = React.lazy(() => import('@src/components/basics/Sidebar'))
// const AuthRoute = React.lazy(() => import('@src/components/basics/AuthRoute'))

const RouterView = (props) => {
   const routes = props.routes
   const currRootPath = props.rootPath?props.rootPath:''
   return (
      routes.map((route, index) =>{
         const nextRootPath = currRootPath+route.path
         return (
            route.children
            ?<RouterView key={index} routes={route.children} rootPath={nextRootPath} />
            :<Route 
               key={currRootPath+route.path}
               path={currRootPath+route.path}
               exact={route.exact}
               component={route.component}
            />
            // <>
            // <Route 
            //    key={currRootPath+route.path+' '+index}
            //    path={currRootPath+route.path}
            //    exact={route.exact}
            //    component={route.component}
            // />
            // {route.children?<RouterView routes={route.children} rootPath={nextRootPath} />:null}
            // </>
         )
      }
      )
   )
}
class Admin extends Component {
   constructor(props) {
      super(props)
      this.state = {
         windowWidth: window.innerWidth + 'px',
         headerHeight: '60px',
         sidebarWidth: '200px',
      }
   }
   render() {
      const {location} = this.props
      return (
         <div style={{ width: '100%', height: '100%' }}>
            <Header
               height={this.state.headerHeight}
            />
            <div
               style={{
                  width: '100%',
                  height: `calc(100% - ${this.state.headerHeight})`,
                  display: 'flex',
                  position: 'relative',
               }}
            >
               <Sidebar
                  width={this.state.sidebarWidth}
               />
               <div
                  style={{ height: '100%', flex: 1, overflowY: 'auto' }}
               >
                  <Router>
                     <ErrorBoundary>
                        <React.Suspense fallback={<LazyLoading />}>
                           <TransitionGroup style={{height:'100%'}}>
                              <CSSTransition style={{height:'100%'}} key={location.pathname} classNames="fade" timeout={300}>
                                 <Switch location={location}>
                                 {
                                    React.$getToken()
                                       ? <RouterView routes={adminRoutes}></RouterView>
                                       : <Redirect to="/login" />
                                 }
                                 </Switch>
                              </CSSTransition>
                           </TransitionGroup>
                        </React.Suspense>
                     </ErrorBoundary>
                  </Router>
               </div>
            </div>
         </div>
      )
   }
}

export default withRouter(Admin)
