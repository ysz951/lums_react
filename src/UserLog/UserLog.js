import React, { Component } from 'react';
import LogRESTService from '../RESTService/LogRESTService';
import { withRouter, Link } from 'react-router-dom';

class UserLog extends Component {
    state = {
        logs: []
    }
    componentDidMount() {
        const { id } = this.props.match.params;
        LogRESTService.listAllLogsByUser(id)
            .then(res => {
                this.setState({
                    logs: res.data
                })
            })

    }

    renderLogs = () => {
        var moment = require('moment');
        return this.state.logs.map((item, i) =>
            <tr key={i}>
                <th scope="row">{item.id}</th>
                <td>{item.user}</td>
                <td>{item.admin}</td>
                <td>{item.log}</td>
                <td>{moment(item.time).format('YYYY-MM-DD HH:mm:ss')}</td>
                <td>{item.prevRole}</td>
                <td>{item.newRole}</td>
            </tr>
        )
    }

    goBack = () => {
        const { id } = this.props.match.params;
        this.props.history.push(`/person/${id}`);
    }

    render() {
        const { id } = this.props.match.params;
        return (
            <>
                <h1>User {id}</h1>
                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">User</th>
                            <th scope="col">Admin</th>
                            <th scope="col">Log</th>
                            <th scope="col">Time</th>
                            <th scope="col">Prev Role</th>
                            <th scope="col">New Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderLogs()}
                    </tbody>
                </table>
                <button onClick={this.goBack} className="btn btn-outline-info">Back </button>
            </>
        )
    }
}

export default withRouter(UserLog);
