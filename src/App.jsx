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

function App() {
   return (
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
   );
}

export default App;