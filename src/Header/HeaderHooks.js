import {useContext } from 'react';
import TokenService from '../services/token-service';
import { Link, NavLink } from 'react-router-dom';
import { useHistory, useParams } from 'react-router-dom';
import Context from '../Context/Context';
import IdleService from '../services/idle-service';
function HeaderHooks() {
    const { logout } = useContext(Context);
    // console.log(TokenService._getMsUntilExpiry(
    //     TokenService.readJwtToken()
    // ));
    const handleLogoutClick = () => {
        TokenService.clearAuthToken();
        TokenService.clearCallbackBeforeExpiry();
        IdleService.unRegisterIdleResets();
        logout();
    }
    const role = localStorage.getItem('role');
    return (
        <>
        <p className="bg-light mb-0" >{role}</p>
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
                {TokenService.hasAuthToken() && <Link onClick={handleLogoutClick} to="/">Log out</Link>}
            </div>
        </nav>
        </>
    )
}

export default HeaderHooks;