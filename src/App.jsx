import React from 'react';
import {
   HashRouter as Router,
   Switch,
   Route
} from 'react-router-dom'
import './App.scss';
import 'animate.css'
import LazyLoading from '@src/components/basics/LazyLoading'
import ErrorBoundary from '@src/components/basics/ErrorBoundary'
import { mainRoutes } from '@src/routes'
import { ResponsiveContext } from '@src/context'
const Admin = React.lazy(() => import('@src/components/business/Admin'))
// const AuthRoute = React.lazy(() => import('@src/components/basics/AuthRoute'))

class App extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         ResponsiveValue: 'PC',
      }
   }
   /**
    * 计算窗口宽度-对应响应的响应设备
    */
   resizeComputed() {
      const responsiveDevice = { 'PC': 'curr>=992', 'MOBILE': 'curr<992' }
      const width = (document.body && document.body.clientWidth) || (document.documentElement && document.documentElement.clientWidth) || (window && window.innerWidth)
      for (let item in responsiveDevice) {
         let element = responsiveDevice[item];
         element = element.replace('curr', width)
         element && eval(element) && this.setState({ ResponsiveValue: item })
      }
   }
   componentDidMount() {
      this.resizeComputed()
      window.addEventListener('resize', this.resizeComputed.bind(this))
   }
   render() {
      return (
         <ResponsiveContext.Provider value={this.state.ResponsiveValue}>
            <Router>
               <ErrorBoundary>
                  <React.Suspense fallback={<LazyLoading style={{ zIndex: 10000, position: 'fixed' }} />}>
                     <Switch>
                        <Route path="/admin" render={routeProps => <Admin {...routeProps}></Admin>}></Route>
                        {
                           mainRoutes.map((route, index) => {
                              return <Route {...route} key={index}></Route>
                           })
                        }
                     </Switch>
                  </React.Suspense>
               </ErrorBoundary>
            </Router>
         </ResponsiveContext.Provider>
      )
   }
}

export default App;