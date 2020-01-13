import React, {Component, lazy, Suspense} from 'react'
import {
   Switch,
   Route,
} from 'react-router-dom'
import Loading from "components/basics/Loading";

const Header = lazy(()=>import('components/basics/Header'))
const Sidebar = lazy(()=>import('components/basics/Sidebar'))
const NotFound = lazy(() => import('components/basics/NotFound'))
const Start = lazy(() => import('components/business/Start'))

class Home extends Component {
   constructor(props) {
      super(props)
      this.state = {
         headerHeight: '60px',
         sidebarWidth:'260px'
      }
   }


   render() {
      return (
         <div style={{width: '100%', height: '100%'}}>
            <Header height={this.state.headerHeight}/>
            <div style={{width: '100%', height: `calc(100% - ${this.state.headerHeight})`, display: 'flex'}}>
               <Sidebar width={this.state.sidebarWidth}/>
               <div style={{height: '100%', flex: 1}}>
                  <Suspense fallback={<div><Loading/></div>}>
                     <Switch>
                        <Route exact path="/home" component={Start}></Route>
                        <Route exact path="/home/start" render={() => <div>homestart</div>}></Route>
                        <Route component={NotFound}></Route>
                     </Switch>
                  </Suspense>
               </div>

            </div>
         </div>
      )
   }
}

export default Home