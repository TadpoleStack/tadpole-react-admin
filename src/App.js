import React, { Suspense, lazy } from 'react';
import {
   HashRouter as Router,
   Switch,
   Route,
   Redirect
} from 'react-router-dom'
import './App.scss';
import './assets/lib/animate.css'
import 'antd/dist/antd.css';

// import { Spin } from 'antd';
import Login from './components/basics/Login'
import NotFound from './components/basics/NotFound'
const Home = lazy(() => import('./components/business/Home'));

function App() {
   return (
      <Router>
         <Suspense fallback={<div className="login-wrap" style={{ height: '100%', width: '100%', position: 'fixed', top: 0, left: 0, zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(255, 255, 255, .7)' }}>
            {/* <Spin /> */}
         </div >}>
            <Switch>
               <Route exact path="/" render={() => <Redirect to="/login" push />}></Route>
               <Route path="/login" component={Login}></Route>
               <Route path="/home" component={Home}></Route>
               <Route path="/404" component={NotFound}></Route>
               <Route render={() => <Redirect to="/404" />} />
            </Switch>
         </Suspense>
      </Router>
   );
}

export default App;

