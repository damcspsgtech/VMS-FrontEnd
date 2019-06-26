import React from 'react';

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Settings = React.lazy(() => import('./views/Settings'));

const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));

const Guides = React.lazy(() => import('./views/Guides/Guides'));
const Guide = React.lazy(() => import('./views/Guides/Guide'));

const Students = React.lazy(() => import('./views/Students/Students'));
const Student = React.lazy(() => import('./views/Students/Student'));
const Allotment = React.lazy(() => import('./views/Students/Allotment'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/users', exact: true, name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },

  { path: '/guides/list', exact: true, name: 'Guides', component: Guides },
  { path: '/guides/:id', exact: true, name: 'Guide Details', component: Guide },
  { path: '/students', exact: true, name: 'Students', component: Students },
  { path: '/students/:id', exact: true, name: 'Student Details', component: Student },
  { path: '/students/allotment', exact: true, name: 'Guide Allotment', component: Allotment },
  { path: '/admin/settings', exact: true, name: 'Settings', component: Settings },
];

export default routes;
