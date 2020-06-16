import React from 'react';
import {
   HashRouter as Router,
   Switch,
   Route,
} from 'react-router-dom'
import './App.scss';
import 'animate.css'
import LazyLoading from '@src/components/basics/LazyLoading'
import ErrorBoundary from '@src/components/basics/ErrorBoundary'
import { mainRoutes } from '@src/routes'
import {ResponsiveContext} from '@src/context'

class App extends React.Component{
   constructor(props){
      super(props)
      this.state = {
         ResponsiveValue:{currdevice:'PC',responsiveDevice:{'PC':'curr>=1366','MOBILE':'curr<768','TABLET_PC':'curr>=768&&curr<1366'}}
      }
   }
   render(){
      return(
      <ResponsiveContext.Provider value={this.state.ResponsiveValue}>
         <Router>
            <ErrorBoundary>
               <React.Suspense fallback={<LazyLoading style={{ zIndex: 10000, position: 'fixed' }} />}>
                  <Switch>
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