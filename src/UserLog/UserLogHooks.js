import { useEffect, useState } from 'react';
import LogRESTService from '../RESTService/LogRESTService';
import { useHistory, useParams } from 'react-router-dom';

function UserLogHooks() {
    const [logs, setLogs] = useState([]);
    const { id } = useParams();
    const history = useHistory();
    useEffect(() => {
        LogRESTService.listAllLogsByUser(id)
            .then(res => {
                setLogs(res.data)
            })
    }, []);

    const renderLogs = () => {
        const moment = require('moment');
        return logs.map((item, i) =>
            <tr key={i}>
                <th scope="row">{item.id}</th>
                <td>{item.user}</td>
                <td>{item.admin}</td>
                <td>{item.log}</td>
                <td>{moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}</td>
                <td>{item.prevRole}</td>
                <td>{item.newRole}</td>
            </tr>
        )
    }

    const goBack = () => {
        history.push(`/person/${id}`);
    }

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
                    {renderLogs()}
                </tbody>
            </table>
            <button onClick={goBack} className="btn btn-outline-info">Back </button>
        </>
    )
}

export default UserLogHooks;