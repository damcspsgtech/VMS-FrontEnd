import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.scss';
import { createBrowserHistory } from "history";
import  Cookies from "js-cookie";


const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages

const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));

const LoginHandler = React.lazy(() => import('./views/Pages/Login'));



export default class App extends Component {
  constructor(props) {
    super(props)

    this.isLoggedIn = this.isLoggedIn.bind(this);
  }
  isLoggedIn() {
    const sessionCookie = Cookies.get("session");

    console.log("cookie set",sessionCookie)

    if (sessionCookie === undefined) {
      console.log("cookie undefined")
      return false
    } else {
     // return JSON.parse(sessionCookie);
    
     return true
    }
  }

  handleRender = props => {
    if (!this.isLoggedIn()) {
      return <Redirect to="/login" />
    } else {
      return  <DefaultLayout {...props}/>
    }
  }

  render() {
    return (
      <HashRouter history={createBrowserHistory()}>
        <ToastContainer autoClose={4000} />
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route exact path="/login" name="Login Page" render={props => <LoginHandler {...props} />} />
            <Route exact path="/404" name="Page 404" render={props => <Page404 {...props} />} />
            <Route exact path="/500" name="Page 500" render={props => <Page500 {...props} />} />
            {/* {this.isLoggedIn() ? (<Redirect push from="/login" to="/" />) : (<Redirect push from="/" to="/login" />)} */}
            <Route path="/" name="Home" render={this.handleRender}  />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}
