import React, { Component } from 'react';
import MemberRESTService from '../RESTService/MemberRESTService';
import SaleRESTService from '../RESTService/SaleRESTService';
import { withRouter, Link } from 'react-router-dom';

class UserPage extends Component {
    state = {
        role: "",
        blocked: "false",
        userName: "",
        sales: [],
        email: ""
    }
    componentDidMount() {
        
        const { id } = this.props.match.params;
        MemberRESTService.lookupMemberById(id)
            .then(res => {
                const user = res.data;
                this.setState({
                    userName: user.name,
                    email: user.email.toLowerCase(),
                    orgEmail: user.email.toLowerCase(),
                    role: user.role,
                    orgRole: user.role,
                    blocked: user.blocked.toString(),
                    orgBlocked: user.blocked.toString()
                })
                return SaleRESTService.listUserSales(id);
            })
            .then(res => {
                this.setState({ sales: res.data });
            })
            .catch(err => {
                console.log(err.response.data)
            })
    }

    goBack = () => {
        // console.log(this.props.match.params);
        this.props.history.push("/person");
    }

    changeUser = (e) => {
        e.preventDefault();
        let wrong_check = false;
        if (this.state.role !== this.state.orgRole) {
            this.changeRole().then(res => {
                this.setState({orgRole: this.state.role})
            }).catch(err => {wrong_check = true})
        }
        if (this.state.email.toLowerCase() !== this.state.orgEmail.toLowerCase()) {
            this.changeEmail().then(res => {
                this.setState({orgEmail: this.state.email})
            }).catch(err => {console.log(err.response.data); 
                wrong_check = true})
        }
        if (this.state.blocked !== this.state.orgBlocked) {
            this.changeBlock().then(res => {
                this.setState({orgBlocked: this.state.blocked})
            }).catch(err => {wrong_check = true})
        }
    }

    changeRole = () => {
        const { id } = this.props.match.params;
        return MemberRESTService.modifyUserRole(id, this.state.role);
    }

    changeBlock = () => {
        const { id } = this.props.match.params;
        if (this.state.blocked === "false") {
            return MemberRESTService.unblock(id);
        }
        return MemberRESTService.block(id);
    }

    changeEmail = () => {
        const { id } = this.props.match.params;
        return MemberRESTService.updateMemberEmail(id, this.state.email.toLowerCase())
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    renderSales() {
        return this.state.sales.map((item, i) =>
            <tr key={i}>
                <th scope="row">{item.id}</th>
                <td>{item.purchasedDate}</td>
                <td>{item.expireDate}</td>
                <td>{item.active.toString()}</td>
            </tr>
        )
    }

    render() {
        const { id } = this.props.match.params;
        const role = localStorage.getItem('role');
        if (role !== 'ROLE_ADMIN' && role !== 'ROLE_SUPERUSER') this.props.history.goBack();
        return (
            <>
                
                <h1>User Id: {id}</h1>
                <form onSubmit={this.changeUser}>
                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Blocked</th>
                            <th scope="col">Role</th>
                            <th scope="col">Email</th>
                            <th scope="col">Log</th>
                            <th scope="col">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr >
                            <th scope="row">{id}</th>
                            <td>
                                {this.state.userName}
                            </td>
                            <td>
                                <select className="custom-select mr-1" id="activateSelect" name="blocked" value={this.state.blocked}
                                    onChange={this.handleChange} required>
                                    <option value={"false"}>False</option>
                                    <option value={"true"}>True</option>
                                </select>
                            </td>
                            <td>
                                <select className="custom-select mr-1" id="roleSelect" name="role" value={this.state.role}
                                    onChange={this.handleChange} required>
                                    <option value="ROLE_USER">User</option>
                                    <option value="ROLE_ADMIN">Admin</option>
                                </select>
                            </td>
                            <td>
                                <input placeholder="" type="email" name="email" className="form-control"
                                    value={this.state.email} onChange={this.handleChange} required/>
                            </td>
                            <td>
                                <Link className="badge badge-secondary" to={`/person/${id}/log`}>View</Link>
                            </td>
                            <td>
                                <Link className="badge badge-secondary" to={`/person/${id}/email`}>Email</Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="d-flex">
                    <button onClick={this.goBack} type="button" className="btn btn-outline-info">Back </button>
                    <button className="btn btn-primary ml-2" type="submit">Save</button>
                </div>
                </form>
                <h2>Sale</h2>
                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Purchased Date</th>
                            <th scope="col">Expire Date</th>
                            <th scope="col">Active</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderSales()}
                    </tbody>
                </table>
                
            </>
        )
    }
}

export default withRouter(UserPage);
