import React, {Component} from 'react';
import {HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import App from '@/App.js';
import Container from '../Container';
import loadable from '@/utils/loadable'; // 引入封住好的 react-loadable

const Home = loadable(() => import("@/pages/home"))

const Music = loadable(() => import("@/pages/music"))

const Login = loadable(() => import("@/pages/login"))

const Tools = loadable(() => import("@/pages/tools/smallTools"))

const Editor = loadable(() => import("@/pages/tools/editor"))

const TodoList = loadable(() => import("@/pages/tools/todoList"))

const Album = loadable(() => import("@/pages/gallary/album"))

const waterFall = loadable(() => import("@/pages/gallary/waterfall"))

const Search = loadable(() => import("@/pages/search"))

const Mock = loadable(() => import("@/pages/mock/useMock"))

const reform = loadable(() => import("@/pages/mock/reform"))

const todo = loadable(() => import("@/pages/mock/todo"))

const Follow = loadable(() => import("@/pages/follow"))

const NoMatch = loadable(() => import("@/pages/nomatch"))

class Router extends Component {
  render() {
    return ( 
      <HashRouter>
        <App>
          {/* 用switch包裹的话，只要匹配到一个，就不会继续往下匹配 */}
          <Switch>
            <Route path="/login" component={Login} />
            <Route path='/' render={() => // 注意这里没有括号
              <Container>
                <Switch>
                  <Route path="/home" component={Home} />
                  <Route path="/music" component={Music} />
                  <Route path="/tools" component={Tools} />
                  <Route path="/editor" component={Editor} />
                  <Route path="/todoList" component={TodoList} />
                  <Route path="/album" component={Album} />
                  <Route path="/waterfall" component={waterFall} />
                  <Route path="/searchEngine" component={Search} />
                  <Route path="/mock" component={Mock} />
                  <Route path="/reform" component={reform} />
                  <Route path="/todo" component={todo} />
                  <Route path="/follow" component={Follow} />
                  { window.location.hash === '#/' ? <Redirect to="/login"/> : ''}
                  <Route component={NoMatch}/>
                </Switch>
              </Container>
            }/>
          </Switch>
        </App>
      </HashRouter>
     );
  }
}
 
export default Router;