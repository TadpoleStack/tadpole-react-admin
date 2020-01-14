import React, { Component } from 'react'
import {
   Switch,
   Route,
} from 'react-router-dom'
import loadable from 'utils/loadable'

const Header = loadable(() => import('components/basics/Header'))
const Sidebar = loadable(() => import('components/basics/Sidebar'))
const NotFound = loadable(() => import('components/basics/NotFound'))
const Start = loadable(() => import('components/business/Start'))

class Home extends Component {
   constructor(props) {
      super(props)
      this.state = {
         headerHeight: '60px',
         sidebarWidth: '260px'
      }
   }


   render() {
      return (
         <div style={{ width: '100%', height: '100%' }}>
            <Header height={this.state.headerHeight} />
            <div style={{ width: '100%', height: `calc(100% - ${this.state.headerHeight})`, display: 'flex' }}>
               <Sidebar width={this.state.sidebarWidth} />
               <div style={{ height: '100%', flex: 1 }}>
                  <Switch>
                     <Route exact path="/home" component={Start}></Route>
                     <Route exact path="/home/start" render={() => <div>homestart</div>}></Route>
                     <Route component={NotFound}></Route>
                  </Switch>
               </div>

            </div>
         </div>
      )
   }
}

export default Home