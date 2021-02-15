import React, { Component } from 'react';
import { withRouter, Switch, Route, Link, NavLink } from 'react-router-dom';
import TokenService from '../services/token-service';

class Header extends Component {
    handleLogoutClick = () => {
        TokenService.clearAuthToken();
        // this.forceUpdate();
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink to="/person" className="nav-link" activeClassName="active"> Person </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/license" className="nav-link" activeClassName="active"> License </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/sale" className="nav-link" activeClassName="active"> Sales </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/log" className="nav-link" activeClassName="active"> Log </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/adminResetPW" className="nav-link" activeClassName="active"> Reset Admin Password </NavLink>
                        </li>
                    </ul>
                    {TokenService.hasAuthToken() && <Link onClick={this.handleLogoutClick} to="/">Log out</Link>}
                </div>
            </nav>
        )
    }
}

export default withRouter(Header);
