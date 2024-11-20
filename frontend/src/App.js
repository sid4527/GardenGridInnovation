import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Home';
import Inventory from './Inventory';
import Resources from './Resources';
import Reports from './Reports';
import InventoryManagement from './InventoryManagement';
import CareScheduling from './CareScheduling';
import GrowthTracking from './GrowthTracking';
import Login from './Login';
import UserProfile from './UserProfie';
import './App.css';

// Define routes with future flags enabled
const router = createBrowserRouter(
  [
    { path: "/", element: <Home /> },
    { path: "/inventory", element: <Inventory /> },
    { path: "/inventory-management", element: <InventoryManagement /> },
    { path: "/resources", element: <Resources /> },
    { path: "/reports", element: <Reports /> },
    { path: "/care-scheduling", element: <CareScheduling /> },
    { path: "/growth-tracking", element: <GrowthTracking /> },
    { path: "/login", element: <Login /> },
    { path: "/userprofiles", element: <UserProfile /> },
  ],
  {
    future: {
      v7_startTransition: true, // Enables React's `startTransition` usage
      v7_relativeSplatPath: true, // Enables better relative path handling
    },
  }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
