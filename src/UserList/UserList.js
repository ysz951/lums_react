
import React, { Component } from 'react';
import MemberRESTService from '../RESTService/MemberRESTService';
import { withRouter, Link } from 'react-router-dom';

class UserList extends Component {
    state = {
        searchName: "",
        users: [],
        orgUsers: []
    }
    componentDidMount() {
        MemberRESTService.listAllMembers()
            .then(res => {
                this.setState({
                    users: res.data,
                    orgUsers: res.data
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
                <td>{item.blocked.toString()}</td>
                <td>{item.email}</td>
                <td><Link className="badge badge-secondary" to={`/person/${item.id}`}>View</Link></td>
            </tr>
        )
    }

    searchUser = (e) => {
        e.preventDefault();
        const searchList = this.state.searchName === "" ? this.state.orgUsers
        : this.state.orgUsers.filter(user => user.name.toLowerCase().includes(this.state.searchName.toLowerCase()));
        this.setState ({
            users: searchList
        })
    }

    sortById = () => {
        const newList = this.state.users.sort((a, b) => a.id - b.id);
        this.setState({users: newList});
    }

    sortByEmail = () => {
        const newList = this.state.users.sort((a, b) => a.email > b.email ? 1 : a.email === b.email ? 0 : -1);
        this.setState({users: newList})
    }

    sortByName = () => {
        const newList = this.state.users.sort((a, b) => a.name > b.name ? 1 : a.name === b.name ? 0 : -1);
        this.setState({users: newList})
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <>
                <form onSubmit={this.searchUser}>
                    <div className="form-group">
                        <input type="text" placeholder="Recipient's username" onChange={this.handleChange}
                            aria-label="Recipient's username" name="searchName" aria-describedby="basic-addon2" />
                        {' '}
                        <button>Search</button>
                    </div>
                </form>
                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th scope="col"><button type="button" onClick={this.sortById} className="cursor">#</button></th>
                            <th scope="col"><button type="button" onClick={this.sortByName} className="cursor">Name</button></th>
                            <th scope="col">Role</th>
                            <th scope="col">Blocked</th>
                            <th scope="col"><button type="button" onClick={this.sortByEmail} className="cursor">Email</button></th>
                            <th scope="col">Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderUsers()}
                    </tbody>
                </table>
            </>
        )
    }
}

export default withRouter(UserList);
