import React from 'react'
import {
    createBrowserRouter,
  } from "react-router-dom";

import App from '../App';
import Admin from '../Admin';

 

  const router = createBrowserRouter([
    {
      path: "/",
      element:<App/>,
    },
    {
      path: "/admin",
      element:<Admin/>,
    }
  ]);

  


export default router