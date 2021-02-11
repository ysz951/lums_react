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
class App extends Component {

  render() {
    return (
      <>
        <Switch>
          <Route path={["/person", "/license", "/sale", "/log", "/adminResetPW"]} component={Header}/>
          <Route component={NoContent}/>
        </Switch>
        <Switch>
          <PublicOnlyRoute exact path="/" component={HomePage}/>
          <PublicOnlyRoute exact path="/login" component={Login} />
          <PrivateRoute exact path="/person" component={UserList} />
          <PrivateRoute exact path="/person/:id" component={UserPage}/>
          <PrivateRoute path="/person/:id/log" component={UserLog}/>
          <PublicOnlyRoute path="/register_user" component={RegisterUser} />
          <PrivateRoute exact path="/license" component={LicenseList} />
          <PrivateRoute exact path="/license/:id" component={LicensePage} />
          <PrivateRoute exact path="/sale" component={SaleList} />
          <PrivateRoute exact path="/sale/:id" component={SalePage} />
          <PrivateRoute exact path="/log" component={LogList} />
          <PrivateRoute path="/person/:id/email" component={ManualEmail} />
          <PrivateRoute exact path="/adminResetPW" component={AdminResetPW} />
          <PrivateRoute path="/adminResetPW/:id" component={ResetPassword} />
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

export default App;
