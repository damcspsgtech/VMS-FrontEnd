import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.scss';
import { createBrowserHistory } from "history";

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/Pages/Login'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));

export default class App extends Component {
  constructor(props) {
    super(props)

    this.isLoggedIn = this.isLoggedIn.bind(this);
  }
  isLoggedIn() {
    return true;
  }
  render() {
    return (
      <HashRouter history={createBrowserHistory()}>
        <ToastContainer autoClose={4000} />
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route exact path="/login" name="Login Page" render={props => <Login {...props} />} />
            <Route exact path="/404" name="Page 404" render={props => <Page404 {...props} />} />
            <Route exact path="/500" name="Page 500" render={props => <Page500 {...props} />} />
            {this.isLoggedIn() ? (<Redirect push from="/login" to="/" />) : (<Redirect from="/" to="/login" />)}
            <Route path="/" name="Home" render={props => <DefaultLayout {...props} />} />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}
