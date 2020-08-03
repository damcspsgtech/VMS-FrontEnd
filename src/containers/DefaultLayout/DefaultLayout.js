import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';
import Cookies from "js-cookie";
import Can from "../../containers/Can";
import Axios from "axios";
import {
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import routes from '../../routes';
// routes config
var count = async () => {
  await Axios.get('/api/students/count')
    .then((req, res) => {
      if (res.data.result === 'success') {
        return res.data.count;
      }
    })
}
const navigation_admin = require('../../_nav_admin')(count)
const navigation_tutor = require('../../_nav_tutor')(count)
const navigation_student = require('../../_nav_student')(count)


const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));



class DefaultLayout extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
    e.preventDefault()
    Cookies.remove("session")
    this.props.history.push('/login')
  }

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader onLogout={e => this.signOut(e)} />
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
              <AppSidebarNav navConfig={(JSON.parse(Cookies.get("session")).role === "admin")? navigation_admin : (JSON.parse(Cookies.get("session")).role === "tutor")? navigation_tutor:navigation_student} {...this.props} router={router} />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes} router={router} />
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {(routes.map((route, idx) => {

                    return route.component ? (
          
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <Can
                            role={JSON.parse(Cookies.get("session")).role}
                            perform={route.path + "-page:visit"}
                            yes={() => (

                              <route.component {...props} />

                            )}
                          //  no={() => (null)}
                              no={() =><Redirect to={{ pathname: "/" }}/>}
                          />
                        )}
                      />
                    ) : (null)
                  }))}
                  <Redirect from="/" to={(JSON.parse(Cookies.get("session")).role=='student')?"/studentHome":"/dashboard"} />
                
                </Switch>
              </Suspense>
            </Container>
          </main>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

export default DefaultLayout;
