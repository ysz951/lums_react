import React, { Component } from 'react';
import MemberRESTService from '../RESTService/MemberRESTService';
import TokenService from '../services/token-service';
import { withRouter, Link } from 'react-router-dom';

class Login extends Component {

    state = {
        password: "",
        email: "",
        err: null
    }

    handleLoginSuccess = () => {
        const { location, history } = this.props;
        const destination = (location.state || {}).from || '/person';
        history.push(destination);
    };

    login = (e) => {
        e.preventDefault();
        this.setState({err: null});
        const member = {
            email: this.state.email,
            password: this.state.password
        }
        MemberRESTService.memberLogin(member)
            .then(res => {
                TokenService.saveAuthToken(res.data.id);
                localStorage.setItem('Role', res.data.role);
                return res;
            })
            .then(res => {
                this.handleLoginSuccess();
            })
            .catch(err => {
                this.setState({err: err.response.data.error})
            });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    goBack = () => {
        this.props.history.push("/");
    }

    render() {
        return (
            <>
                <form onSubmit={this.login} className="container">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp"
                            value={this.state.email} onChange={this.handleChange} />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name="password" onChange={this.handleChange} />
                    </div>
                    {this.state.err && <p className="text-danger" >{this.state.err}</p>}
                    <div className="d-flex">
                        <button onClick={this.goBack} type="button" className="btn btn-outline-info">Back</button>
                        <button type="submit" className="btn btn-primary ml-2">Login</button>
                    </div>      
                    <p>Don't have an acount yet? <Link to="/register_user">Sign up</Link></p>
                </form>
            </>
        )
    }
}

export default withRouter(Login);