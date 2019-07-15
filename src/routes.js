import React from 'react';

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Settings = React.lazy(() => import('./views/Settings'));

const Faculty = React.lazy(() => import('./views/Faculty/Faculty'));
const FacultyMember = React.lazy(() => import('./views/Faculty/FacultyMember'));

const Students = React.lazy(() => import('./views/Students/Students'));
const Allotment = React.lazy(() => import('./views/Students/Allotment'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/faculty', exact: true, name: 'Faculty', component: Faculty },
  { path: '/faculty/:id', exact: true, name: 'Faculty Member', component: FacultyMember },
  { path: '/students', exact: true, name: 'Students', component: Students },
  { path: '/students/allotment', exact: true, name: 'Guide Allotment', component: Allotment },
  { path: '/settings', exact: true, name: 'Settings', component: Settings },
];

export default routes;
