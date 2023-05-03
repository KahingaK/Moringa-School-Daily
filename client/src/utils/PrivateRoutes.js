import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import Dashboards from '../pages/Dashboards'

function PrivateRoutes() {
  let user = (localStorage.getItem("user"));

  let auth = user
    
  return (
    auth? <Outlet /> : <Navigate to="/login"/>
  )
}

export default PrivateRoutes