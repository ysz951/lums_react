import React, { Component } from 'react';
import LogRESTService from '../RESTService/LogRESTService';
import { withRouter } from 'react-router-dom';

class LicenseList extends Component {
    state = {
        logs: [],
        orgLogs: []
    }

    componentDidMount() {
        LogRESTService.listAllLogs()
            .then(res => {
                this.setState({
                    logs: res.data,
                    orgLogs: res.data
                })
            })
            .catch(err => {

            })
    }

    renderLogs() {
        var moment = require('moment');
        return this.state.logs.map((item, i) =>
            <tr key={i}>
                <th scope="row">{item.id}</th>
                <td>{item.user}</td>
                <td>{item.admin}</td>
                <td>{item.license}</td>
                <td>{moment(item.time).format('YYYY-MM-DD HH:mm:ss')}</td>
            </tr>
        )
    }

    sortById = () => {
        const newList = this.state.orgLogs.sort((a, b) => a.id - b.id);
        this.setState({logs: newList});
    }

    sortByTime = () => {
        const newList = this.state.orgLogs.sort((a, b) => a.time - b.time);
        this.setState({logs: newList});
    }

    render() {
        return (
            <>
                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th scope="col"><button type="button" onClick={this.sortById} className="cursor">#</button></th>
                            <th scope="col">User</th>
                            <th scope="col">Admin</th>
                            <th scope="col">License</th>
                            <th scope="col"><button type="button" onClick={this.sortByTime} className="cursor">Time</button></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderLogs()}
                    </tbody>
                </table>
            </>

        )
    }
}

export default withRouter(LicenseList);
