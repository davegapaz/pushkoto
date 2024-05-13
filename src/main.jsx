import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

//Account
import MainRoot from './MainRoot';
import Register from './frontend/authentication/Register';
import LogIn from './frontend/authentication/LogIn';

//Customer
import RootCustomer from './frontend/customer/RootCustomer';
import CustomerAccount from './frontend/customer/CustomerAccount';
import CCatalog from './frontend/customer/Catalog';
import ShoppingCart from './frontend/customer/ShoppingCart';

//Merchant
import RootMerchant from './frontend/merchant/RootMerchant';
import MCatalog from './frontend/merchant/Catalog';
import MerchantAccount from './frontend/merchant/MerchantAccount';
import CustomerList from './frontend/merchant/CustomerList';

//token is use to know if a user is currently log in
const router = createBrowserRouter([
  { path: '/', element: <MainRoot />, children: [
	{ path: '/', element: <LogIn />},
	{ path: '/Register', element: <Register />},
	//path below will show differnt UI depending onisUserSignedIn
	{path: '/RootCustomerAccount', element: <RootCustomer />, children: [
		{ path: 'CustomerAccount', element: <CustomerAccount />},
		{ path: 'CCatalog', element: <CCatalog />},
		{ path: 'ShoppingCart', element: <ShoppingCart />},
	]},
	{path: '/RootMerchantAccount', element: <RootMerchant />, children: [
		{ path: 'MerchantAccount', element: <MerchantAccount />},
		{ path: 'Customers', element: <CustomerList />},
		{ path: 'MCatalog', element: <MCatalog />},
	]},
  ]}, 
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />    
  </React.StrictMode>
);
