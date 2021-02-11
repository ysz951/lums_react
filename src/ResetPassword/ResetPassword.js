import React, { Component } from 'react';
import MemberRESTService from '../RESTService/MemberRESTService';
import { withRouter, Link } from 'react-router-dom';

class ResetPassword extends Component{
    state = {
        userName: "",
        originalPassword: "",
        password: "password",
        confirmedPassword: "confPassword",
        passwordSet: false,
        id: "",
    }

    onSubmit = this.onSubmit.bind(this);

    componentDidMount() {
        const { id } = this.props.match.params;
        MemberRESTService.lookupMemberById(id)
            .then(res => {
                const user = res.data;
                this.setState({
                    userName: user.name,
                    originalPassword: user.password,
                    id: id
                })
            })
            .catch(err => {

            })
    }


    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit(){
        if(this.state.password === this.state.confirmedPassword){
            MemberRESTService.changePassword(this.state.id, this.state.originalPassword, this.state.password);
            this.setState({passwordSet: true});
        }
    }

    render(){
        return(
            <div>
                {!this.state.passwordSet &&
                <div>
                <h1>Reset Password</h1>
                <div>
                    <label>Username: </label>
                    {this.state.userName}
                </div>
                <div>
                    <label>Password: </label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name="password" onChange={this.handleChange} />

                </div>
                <div>
                    <label>Confirm Password: </label>
                    <input type="password" className="form-control" id="exampleInputPassword2" name="confirmedPassword" onChange={this.handleChange} />

                </div>
                <div>
                    <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>Submit</button>
                    <Link to={'/adminResetPW'}>
                        <button type="submit" className="btn btn-danger">Cancel</button>
                    </Link>
                </div>
                </div>
                }
                {this.state.passwordSet &&
                <div>
                    <h1>Password for {this.state.userName} has been reset</h1>
                    <div>
                            <Link className="badge badge-secondary" to={'/adminResetPW'}>Return</Link>
                    </div>
                </div>
                }
            </div>
        )
    }
}

export default withRouter(ResetPassword);