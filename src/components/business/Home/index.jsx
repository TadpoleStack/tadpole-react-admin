import React, { Component } from 'react'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
// import { TransitionGroup, CSSTransition } from 'react-transition-group'
import loadable from 'utils/loadable'
import './index.scss'
const Header = loadable(() => import('components/basics/Header'))
const Sidebar = loadable(() => import('components/basics/Sidebar'))
const NotFound = loadable(() => import('components/basics/NotFound'))
const Start = loadable(() => import('components/business/Start'))
const TypedPlugin = loadable(() => import('components/business/TypedPlugin'))
const IconPage = loadable(() => import('components/business/UI/IconPage'))

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            windowWidth: window.innerWidth + 'px',
            headerHeight: '60px',
            sidebarWidth: '260px',
        }
    }

    componentWillMount() {}
    render() {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <Header height={this.state.headerHeight} />
                <div
                    style={{
                        width: '100%',
                        height: `calc(100% - ${this.state.headerHeight})`,
                        display: 'flex',
                    }}
                >
                    <Sidebar width={this.state.sidebarWidth} />
                    <div
                        style={{ height: '100%', flex: 1, overflowY: 'hidden' }}
                    >
                        {/* <TransitionGroup>
                     <CSSTransition classNames="fade" key={this.props.location.pathname} timeout={500}> */}
                        <Router>
                            <Switch>
                                <Route
                                    exact
                                    path="/home"
                                    component={Start}
                                ></Route>
                                <Route
                                    exact
                                    path="/home/iconpage"
                                    component={IconPage}
                                ></Route>
                                <Route
                                    exact
                                    path="/home/typedplugin"
                                    component={TypedPlugin}
                                ></Route>
                                <Route
                                    exact
                                    path="/home/404"
                                    component={NotFound}
                                ></Route>
                                <Route
                                    render={() => <Redirect to="/home/404" />}
                                />
                            </Switch>
                        </Router>
                        {/* </CSSTransition>
                  </TransitionGroup> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default Home
