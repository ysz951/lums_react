import './App.css';
import React, { Component } from 'react';
import { Switch, Link, Route } from 'react-router-dom';
import UserList from './UserList/UserList';
import RegisterUser from './RegisterUser/RegisterUser';
import UserPage from './UserPage/UserPage';
import LicenseList from './LicenseList/LicenseList';
import LicensePage from './LicensePage/LicensePage';
import SaleList from './SaleList/SaleList';
import LogList from './LogList/LogList';
import UserLog from './UserLog/UserLog';
import Login from './Login/Login';
import ManualEmail from './ManualEmail/ManualEmail';
import AdminResetPW from './AdminResetPW/AdminResetPW';
import ResetPassword from './ResetPassword/ResetPassword';
import PublicOnlyRoute from './Route/PublicOnlyRoute';
import PrivateRoute from './Route/PrivateRoute';
import Header from './Header/Header';
import HomePage from './HomePage/HomePage';
import SalePage from './SalePage/SalePage';
import LicenseListHooks from './LicenseList/LicenseListHooks';
import LicensePageHooks from './LicensePage/LicensePageHooks';
import LoginHooks from './Login/LoginHooks';
import HeaderHooks from './Header/HeaderHooks';
import HomePageHooks from './HomePage/HomePageHooks';
import UserListHooks from './UserList/UserListHooks';
import ResetPWHooks from './AdminResetPW/ResetPWHooks';
import ResetPasswordHooks from './ResetPassword/ResetPasswordHooks';
import SaleListHooks from './SaleList/SaleListHooks';
import SalePageHooks from './SalePage/SalePageHooks';
import LogListHooks from './LogList/LogListHooks';
import RegisterUserHooks from './RegisterUser/RegisterUserHooks';
import UserLogHooks from './UserLog/UserLogHooks';

function App () {
  return (
    <>
      <Switch>
        {/* <Route path={["/person", "/license", "/sale", "/log", "/adminResetPW"]} component={Header}/> */}
        <Route path={["/person", "/license", "/sale", "/log", "/adminResetPW"]} component={HeaderHooks} />
        <Route component={NoContent} />
      </Switch>
      <Switch>
        {/* <PublicOnlyRoute exact path="/" component={HomePage}/> */}
        <PublicOnlyRoute exact path="/" component={HomePageHooks} />
        {/* <PublicOnlyRoute exact path="/login" component={Login} /> */}
        <PublicOnlyRoute exact path="/login" component={LoginHooks} />
        {/* <PrivateRoute exact path="/person" component={UserList} /> */}
        <PrivateRoute exact path="/person" component={UserListHooks} />
        <PrivateRoute exact path="/person/:id" component={UserPage} />
        {/* <PrivateRoute path="/person/:id/log" component={UserLog}/> */}
        <PrivateRoute path="/person/:id/log" component={UserLogHooks} />
        {/* <PublicOnlyRoute path="/register_user" component={RegisterUser} /> */}
        <PublicOnlyRoute path="/register_user" component={RegisterUserHooks} />
        <PrivateRoute exact path="/license" component={LicenseListHooks} />
        {/* <PrivateRoute exact path="/license" component={LicenseList} /> */}
        {/* <PrivateRoute exact path="/license/:id" component={LicensePage} /> */}
        <PrivateRoute exact path="/license/:id" component={LicensePageHooks} />
        {/* <LicensePageHooks></LicensePageHooks> */}
        {/* <PrivateRoute exact path="/sale" component={SaleList} /> */}
        <PrivateRoute exact path="/sale" component={SaleListHooks} />
        {/* <PrivateRoute exact path="/sale/:id" component={SalePage} /> */}
        <PrivateRoute exact path="/sale/:id" component={SalePageHooks} />
        {/* <PrivateRoute exact path="/log" component={LogList} /> */}
        <PrivateRoute exact path="/log" component={LogListHooks} />
        <PrivateRoute path="/person/:id/email" component={ManualEmail} />
        {/* <PrivateRoute exact path="/adminResetPW" component={AdminResetPW} /> */}
        <PrivateRoute exact path="/adminResetPW" component={ResetPWHooks} />
        {/* <PrivateRoute path="/adminResetPW/:id" component={ResetPassword} /> */}
        <PrivateRoute path="/adminResetPW/:id" component={ResetPasswordHooks} />

        <Route component={NotFoundPage} />
      </Switch>
    </>
  )
}

function NoContent() {
  return (
    <p></p>
  )
}

function NotFoundPage() {
  return (
    <>
      <h1>Not Found</h1>
      <Link to="/person">Go Back</Link>
    </>

  )
}

export default App;
