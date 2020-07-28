import React from 'react';

const Login = React.lazy(() => import('./views/Pages/Login'))
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Settings = React.lazy(() => import('./views/Settings'));
const Faculty = React.lazy(() => import('./views/Faculty'));
const Guides = React.lazy(() => import('./views/Guides'));
const Students = React.lazy(() => import('./views/Students'));
const StudentInfoForm = React.lazy(() => import('./views/StudentForms/StudentInfoForm'));
const StudentProjectForm = React.lazy(() => import('./views/StudentForms/StudentProjectForm'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/login',exact:true, name: 'Login', component: Login },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/faculty', exact: true, name: 'Faculty', component: Faculty },
  { path: '/guides', exact: true, name: 'Guides', component: Guides },
  { path: '/students', exact: true, name: 'Students', component: Students },
  { path: '/settings', exact: true, name: 'Settings', component: Settings },
  { path: '/studentInfoForm', exact:true, name: 'Student Form',component: StudentInfoForm},
  { path: '/studentProjectForm', exact:true, name: 'Project Form',component: StudentProjectForm}
];

export default routes;
