import { useContext } from 'react';
import TokenService from '../services/token-service';
import { Link, NavLink } from 'react-router-dom';
import Context from '../Context/Context';
import IdleService from '../services/idle-service';
function HeaderHooks() {
    const { logout, role } = useContext(Context);
    const handleLogoutClick = () => {
        TokenService.clearAuthToken();
        TokenService.clearCallbackBeforeExpiry();
        IdleService.unRegisterIdleResets();
        logout();
    }
    return (
        <>
            <p className="bg-light mb-0 ml-4" >{role}</p>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        {(role === 'ROLE_SUPERUSER' || role === 'ROLE_ADMIN') &&
                            <li className="nav-item">
                                <NavLink to="/person" className="nav-link" activeClassName="active"> Person </NavLink>
                            </li>
                        }
                        <li className="nav-item">
                            <NavLink to="/license" className="nav-link" activeClassName="active"> License </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/sale" className="nav-link" activeClassName="active"> Sales </NavLink>
                        </li>
                        {(role === 'ROLE_SUPERUSER' || role === 'ROLE_ADMIN') &&

                            <li className="nav-item">
                                <NavLink to="/log" className="nav-link" activeClassName="active"> Log </NavLink>
                            </li>
                        }
                        {role === 'ROLE_SUPERUSER' &&
                            <li className="nav-item">
                                <NavLink to="/adminResetPW" className="nav-link" activeClassName="active"> Reset Admin Password </NavLink>
                            </li>
                        }

                    </ul>
                    {TokenService.hasAuthToken() && <Link onClick={handleLogoutClick} to="/" className="mr-2">Log out</Link>}
                </div>
            </nav>
        </>
    )
}

export default HeaderHooks;