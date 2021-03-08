import './App.css';
import React, { Component } from 'react';
import { Switch, Link, Route, withRouter } from 'react-router-dom';
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
import TokenService from './services/token-service';
import IdleService from './services/idle-service';
import AuthApiService from './services/auth-api-service';
import AdminAndSuperRoute from './Route/AdminAndSuperRoute';
class App extends Component {
  componentDidMount() {
    /*
      set the function (callback) to call when a user goes idle
      we'll set this to logout a user when they're idle
    */
    IdleService.setIdleCallback(this.logoutFromIdle);

    /* if a user is logged in */
    if (TokenService.hasAuthToken()) {
      // this.forceUpdate()
      /*
        tell the idle service to register event listeners
        the event listeners are fired when a user does something, e.g. move their mouse
        if the user doesn't trigger one of these event listeners,
          the idleCallback (logout) will be invoked
      */
      IdleService.regiserIdleTimerResets();

      /*
        Tell the token service to read the JWT, looking at the exp value
        and queue a timeout just before the token expires
      */
      TokenService.queueCallbackBeforeExpiry(() => {
        /* the timoue will call this callback just before the token expires */
        AuthApiService.postRefreshToken();
      });
    }
  }

  componentWillUnmount() {
    /*
      when the app unmounts,
      stop the event listeners that auto logout (clear the token from storage)
    */
    IdleService.unRegisterIdleResets();
    /*
      and remove the refresh endpoint request
    */
    TokenService.clearCallbackBeforeExpiry();
  }

  logoutFromIdle = () => {
    console.log("logout idle");
    /* remove the token from localStorage */
    TokenService.clearAuthToken();
    localStorage.removeItem('role');
    /* remove any queued calls to the refresh endpoint */
    TokenService.clearCallbackBeforeExpiry();
    /* remove the timeouts that auto logout when idle */
    IdleService.unRegisterIdleResets();
    /*
      react won't know the token has been removed from local storage,
      so we need to tell React to rerender
    */
    this.forceUpdate();
    // this.props.history.push('/');
  }
  
  render() {
    // if (TokenService.hasAuthToken()) {
    //   console.log(TokenService._getMsUntilExpiry(
    //     TokenService.readJwtToken()
    //   ));
    // }
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
          {/* <PrivateRoute exact path="/person/:id" component={UserPage} /> */}
          <AdminAndSuperRoute exact path="/person/:id" component={UserPage} />
          {/* <PrivateRoute path="/person/:id/log" component={UserLog}/> */}
          <PrivateRoute path="/person/:id/log" component={UserLogHooks} />
          {/* <PublicOnlyRoute path="/register_user" component={RegisterUser} /> */}
          <PublicOnlyRoute path="/register_user" component={RegisterUserHooks} />
          <PrivateRoute exact path="/license" component={LicenseListHooks} />
          {/* <PrivateRoute exact path="/license" component={LicenseList} /> */}
          {/* <PrivateRoute exact path="/license/:id" component={LicensePage} /> */}
          {/* <PrivateRoute exact path="/license/:id" component={LicensePageHooks} /> */}
          <AdminAndSuperRoute exact path="/license/:id" component={LicensePageHooks} />
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

export default withRouter(App);
