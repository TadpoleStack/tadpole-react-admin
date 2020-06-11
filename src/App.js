import React from 'react';
import {
   HashRouter as Router,
   Switch,
   Route,
   Redirect
} from 'react-router-dom'
import './App.scss';
import 'animate.css'
import LazyLoading from '@src/components/basics/LazyLoading'
import ErrorBoundary from '@src/components/basics/ErrorBoundary'

const Login = React.lazy(() => import('@src/components/basics/Login'))
const NotFound = React.lazy(() => import('@src/components/basics/NotFound'))
const Home = React.lazy(() => import('@src/components/business/Home'))

function App() {
   return (
        <Router>
           <ErrorBoundary>
               <React.Suspense fallback={<LazyLoading style={{zIndex:10000,position:'fixed'}} />}>
                  <Switch>
                     <Route exact path="/" render={() => <Redirect to="/login" push />}></Route>
                     <Route exact path="/login" component={Login}></Route>
                     <Route path="/home" component={Home}></Route>
                     <Route exact path="/404" component={NotFound}></Route>
                     <Route render={() => <Redirect to="/404" />} />
                  </Switch>
               </React.Suspense>
            </ErrorBoundary>
         </Router>
   );
}

export default App;