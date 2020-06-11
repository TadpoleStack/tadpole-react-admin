import React, { Component } from 'react'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
// import { TransitionGroup, CSSTransition } from 'react-transition-group'
import './index.scss'
import LazyLoading from '@src/components/basics/LazyLoading'
import ErrorBoundary from '@src/components/basics/ErrorBoundary'
const Header = React.lazy(() => import('@src/components/basics/Header'))
const Sidebar = React.lazy(() => import('@src/components/basics/Sidebar'))
const NotFound = React.lazy(() => import('@src/components/basics/NotFound'))
const Start = React.lazy(() => import('@src/components/business/Start'))
const TypedPlugin = React.lazy(() => import('@src/components/business/TypedPlugin'))
const IconPage = React.lazy(() => import('@src/components/business/UI/IconPage'))

class Admin extends Component {
   constructor(props) {
      super(props)
      this.state = {
         windowWidth: window.innerWidth + 'px',
         headerHeight: window.innerWidth >= 768 ? '80px' : '60px',
         sidebarWidth: '260px',
         isPC: window.innerWidth >= 768,
      }
   }

   componentWillMount() { }
   render() {
      return (
         <div style={{ width: '100%', height: '100%' }}>
            <Header
               isPC={this.state.isPC}
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
                  isPC={this.state.isPC}
                  width={
                     this.state.isPC ? this.state.sidebarWidth : '100%'
                  }
               />
               <div
                  style={{ height: '100%', flex: 1, overflowY: 'hidden' }}
               >
                  {/* <TransitionGroup>
                     <CSSTransition classNames="fade" key={this.props.location.pathname} timeout={500}> */}
                  <Router>
                  <ErrorBoundary>
                    <React.Suspense fallback={<LazyLoading/>}>
                     <Switch>
                        <Route
                           exact
                           path="/admin"
                           component={Start}
                        ></Route>
                        <Route
                           exact
                           path="/admin/iconpage"
                           component={IconPage}
                        ></Route>
                        <Route
                           exact
                           path="/admin/typedplugin"
                           component={TypedPlugin}
                        ></Route>
                        <Route
                           exact
                           path="/admin/404"
                           component={NotFound}
                        ></Route>
                        <Route
                           render={() => <Redirect to="/admin/404" />}
                        />
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

export default Admin
