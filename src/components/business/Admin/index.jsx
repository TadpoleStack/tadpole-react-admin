import React, { Component } from 'react'
import { HashRouter as Router, Route, Redirect, Switch, withRouter } from 'react-router-dom'
// import { TransitionGroup, CSSTransition } from 'react-transition-group'
import './index.scss'
import LazyLoading from '@src/components/basics/LazyLoading'
import ErrorBoundary from '@src/components/basics/ErrorBoundary'
import { adminRoutes } from '@src/routes'
const Header = React.lazy(() => import('@src/components/basics/Header'))
const Sidebar = React.lazy(() => import('@src/components/basics/Sidebar'))
// const AuthRoute = React.lazy(() => import('@src/components/basics/AuthRoute'))

class Admin extends Component {
   constructor(props) {
      super(props)
      this.state = {
         windowWidth: window.innerWidth + 'px',
         headerHeight: '60px',
         sidebarWidth: '260px',
      }
   }
   render() {
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
                  style={{ height: '100%', flex: 1, overflowY: 'hidden' }}
               >
                  {/* <TransitionGroup>
                     <CSSTransition classNames="fade" key={this.props.location.pathname} timeout={500}> */}
                  <Router>
                     <ErrorBoundary>
                        <React.Suspense fallback={<LazyLoading />}>
                           <Switch>
                              {
                                 adminRoutes.map((route, index) => {
                                    // return <AuthRoute route={route} key={route.path + index}></AuthRoute>
                                    return React.$getToken()
                                    ? <Route {...route} key={route.path+''+index}></Route>
                                    : <Redirect to="/login" />
                                 })
                              }
                           </Switch>
                        </React.Suspense>
                     </ErrorBoundary>
                  </Router>
                  {/* </CSSTransition>
                  </TransitionGroup> */}
               </div>
            </div>
         </div>
      )
   }
}

export default withRouter(Admin)
