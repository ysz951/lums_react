import React, { Component } from 'react';
import axios from 'axios';
import MemberRESTService from '../RESTService/MemberRESTService';
import { withRouter } from 'react-router-dom';

class RegisterUser extends Component {

    state = {
        userRole: "",
        userEmail:"",
        userPassword:"",
        userName:"",
        err: {
            name:"",
            email:""
        },
    }

    register = (e) => {
        e.preventDefault();
        this.setState({
            err: {
                name:"",
                email:""
            }
        });
        const member = {
            name: this.state.userName,
            email: this.state.userEmail,
            password: this.state.userPassword,
            role: this.state.userRole
        }
        MemberRESTService.createMember(member)
            .then(res => {
                this.props.history.push("/person");
            })
            .catch(err => {
                const error = err.response.data;
                this.setState({
                    err: {
                        name: error.name,
                        email: error.email
                    }
                })
            })
    }

    goBack =() => {
        this.props.history.push("/login");
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <>
                <form onSubmit={this.register} className="container">
                    <div className="form-col align-items-center justify-content-center">
                        <div className="form-group">
                            <label> Name: </label>
                            <input placeholder="Name" type="text" name="userName" className="form-control"
                                value={this.state.userName} onChange={this.handleChange} required/>
                            <p className="text-danger" >{this.state.err.name}</p>
                        </div>
                        <div className="form-group">
                            <label className="mr-sm-2" htmlFor="inlineFormCustomSelect">Role</label>
                            <select className="custom-select mr-sm-2" id="inlineFormCustomSelect" name="userRole"
                                value={this.state.userRole} onChange={this.handleChange} required>
                                <option value="">Choose...</option>
                                <option value="CUSTOMER">Customer</option>
                                <option value="ADMIN">Admin</option>
                                <option value="SUPERUSER">Superuser</option>
                                <option value="EXPERT">Expert</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label> Email: </label>
                            <input placeholder="Email" type="email" name="userEmail" className="form-control"
                                value={this.state.userEmail} onChange={this.handleChange} required/>
                            <p className="text-danger" >{this.state.err.email}</p>
                        </div>
                        <div className="form-group">
                            <label> Password: </label>
                            <input placeholder="Password" type="password" name="userPassword" className="form-control"
                                onChange={this.handleChange} required/>
                        </div>
                        
                        <div className="form-group">
                            <div className="d-flex">
                                <button onClick={this.goBack} type="button" className="btn btn-outline-info">Back</button>
                                <button type="submit" className="btn btn-primary ml-2">Submit</button>
                            </div>
                        </div>
                    </div>
                </form>
            </>
        )
    }
}

export default withRouter(RegisterUser);
