import React from 'react'

//const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const MainClassification = React.lazy(() => import('./views/MainClassification/MainClassification'))


const routes = [
  //{ path: '/', exact: true, name: 'Home' },
  { path: '/', name: 'MainClassification', element: MainClassification, exact: true },
  
]

export default routes
