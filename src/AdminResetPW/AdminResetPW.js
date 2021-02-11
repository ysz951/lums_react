import React, { Component } from 'react';
import MemberRESTService from '../RESTService/MemberRESTService';
import { withRouter, Link } from 'react-router-dom';


class AdminResetPW extends Component {
    state = {
        users: [],
    }
    componentDidMount() {
        MemberRESTService.getAdminMembers()
            .then(res => {
                this.setState({
                    users: res.data,
                })
            })
            .catch(err => {

            })
    }

    renderUsers() {
        return this.state.users.map((item, i) =>
            <tr key={i}>
                <th scope="row">{item.id}</th>
                <td>{item.name}</td>
                <td>{item.role}</td>
                <td>{item.email}</td>
                <td><Link className="badge badge-secondary" to={`/adminResetPW/${item.id}`}>Edit</Link></td>
            </tr>
        )
    }

    render(){
        return(
            <div>
                {localStorage.getItem("Role") == 'SUPERUSER' &&
                <div>
                    <table className="table table-dark">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Role</th>
                            <th scope="col">Email</th>
                            <th scope="col">Edit Password</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderUsers()}
                    </tbody>
                </table>
                </div> 
                }
                {localStorage.getItem("Role") != 'SUPERUSER' &&
                <div>
                    <h1>Only the super admin can change passwords of other admin</h1>
                </div>
                }
            </div>
        );
    }
    
}

export default withRouter(AdminResetPW);