import React, {Component} from 'react';
import {HashRouter, Route, Switch } from 'react-router-dom';
import App from '@/App.js';
import Container from '../Container';
import loadable from '@/utils/loadable'; // 引入封住好的 react-loadable

const Home = loadable(() => import("@/pages/home"))

const Music = loadable(() => import("@/pages/music"))

// const Login = loadable(() => import("@/pages/login"))

const NoMatch = loadable(() => import("@/pages/nomatch"))

class Router extends Component {
  render() { 
    return ( 
      <HashRouter>
        <App>
          {/* 用switch包裹的话，只要匹配到一个，就不会继续往下匹配 */}
          {/* <Switch> */}
            <Route path='/' render={() => 
              <Container>
                <Switch>
                  <Route path="/home" component={Home} />
                  <Route path="/music" component={Music} />
                  <Route component={NoMatch}/>
                </Switch>
              </Container>
            }/>
          {/* </Switch> */}
        </App>
      </HashRouter>
     );
  }
}
 
export default Router;