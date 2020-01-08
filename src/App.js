import React, { Suspense, lazy } from 'react';
import {
    HashRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom'
import './App.scss';
import './assets/lib/animate.css'

import Login from './components/basics/Login'
const NotFound = lazy(() => import('./components/basics/NotFound'));
const Home = lazy(() => import('./components/business/Home'));

function App() {
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
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

