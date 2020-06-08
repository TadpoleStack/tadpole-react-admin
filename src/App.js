import React from 'react';
import {
   HashRouter as Router,
   Switch,
   Route,
   Redirect
} from 'react-router-dom'
import './App.scss';
import 'animate.css'
import 'antd/dist/antd.css';
import addGlobalMethods from './utils/index'
addGlobalMethods(React)

const Login = React.$loadable(() => import('components/basics/Login'))
const NotFound = React.$loadable(() => import('components/basics/NotFound'))
const Home = React.$loadable(() => import('components/business/Home'))

function App() {
   return (
      <Router>
         <Switch>
            <Route exact path="/" render={() => <Redirect to="/login" push />}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route path="/home" component={Home}></Route>
            <Route exact path="/404" component={NotFound}></Route>
            <Route render={() => <Redirect to="/404" />} />
         </Switch>
      </Router>
   );
}

export default App;