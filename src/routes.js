import React from 'react';

const Login = React.lazy(() => import('./views/Pages/Login'))
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Settings = React.lazy(() => import('./views/Settings'));
const Faculty = React.lazy(() => import('./views/Faculty'));
const Students = React.lazy(() => import('./views/Students'));
const Allotment = React.lazy(() => import('./views/Allotment'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/login', name: 'Login', component: Login },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/faculty', exact: true, name: 'Faculty', component: Faculty },
  { path: '/students', exact: true, name: 'Students', component: Students },
  { path: '/allotment', exact: true, name: 'Allotment', component: Allotment },
  { path: '/settings', exact: true, name: 'Settings', component: Settings },
];

export default routes;
