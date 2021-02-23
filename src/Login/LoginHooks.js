import {useState, useContext} from 'react';
import MemberRESTService from '../RESTService/MemberRESTService';
import TokenService from '../services/token-service';
import IdleService from '../services/idle-service';
import { useHistory, useLocation } from 'react-router-dom';
import AuthApiService from '../services/auth-api-service';
import Context from '../Context/Context';
import { Link } from 'react-router-dom';
function LoginHooks() {
    const {setRole} = useContext(Context);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [err, setErr] = useState(null);
    const history = useHistory();
    const location = useLocation();
    // state = {
    //     password: "",
    //     email: "",
    //     err: null
    // }
    const handleLoginSuccess = () => {
        const destination = (location.state || {}).from || '/person';
        history.push(destination);
    };

    const login = (e) => {
        e.preventDefault();
        setErr(null);
        const member = {
            usernameOrEmail: email,
            password: password
        }
        MemberRESTService.memberLogin(member)
            .then(res => {
                console.log(res.data);
                TokenService.saveAuthToken(res.data.accessToken);
                setRole(res.data.role);
                IdleService.regiserIdleTimerResets();
                TokenService.queueCallbackBeforeExpiry(() => {
                    AuthApiService.postRefreshToken();
                })
                // setTimeout(AuthApiService.postRefreshToken(), 2000)
                // AuthApiService.postRefreshToken();
                return res;
            })
            .then(res => {
                // AuthApiService.postRefreshToken();
                handleLoginSuccess();
            })
            .catch(err => {
                setErr("Unauthorized");
                // this.setState({err: err.response.data.error})
            });
    }

    const goBack = () => {
        history.push("/");
    }

    return (
        <>
            <form onSubmit={login} className="container">
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp"
                        value={email} onChange={e => setEmail(e.target.value)} />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name="password" onChange={e => setPassword(e.target.value)} />
                </div>
                {err && <p className="text-danger" >{err}</p>}
                <div className="d-flex">
                    <button onClick={goBack} type="button" className="btn btn-outline-info">Back</button>
                    <button type="submit" className="btn btn-primary ml-2">Login</button>
                </div>      
                <p>Don't have an acount yet? <Link to="/register_user">Sign up</Link></p>
            </form>
        </>
    )
}

export default LoginHooks;