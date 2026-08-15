import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './components/Root';
import Provider from './Provider';
import Home from './components/Homepage/Home';
import Login from './components/Login';
import PrivateRoute from './PrivateRoute';
import PropertyListing from './components/Properties/PropertyListing';
import PropertySubmit from './components/Properties/PropertySubmit';
import ErrorPage from './components/otherPages/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/properties', element: <PropertyListing /> },
      { path: '/add-property', element: <PrivateRoute><PropertySubmit /></PrivateRoute> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
