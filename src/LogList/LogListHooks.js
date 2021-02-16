import { useState, useEffect } from 'react';
import LogRESTService from '../RESTService/LogRESTService';
const moment = require('moment');
function LogListHooks() {
    const [state, setState] = useState({
        logs: [],
        orgLogs: []
    });
    useEffect(() => {
        LogRESTService.listAllLogs()
            .then(res => {
                setState({
                    logs: res.data,
                    orgLogs: res.data
                })
            })
            .catch(err => {

            })
    }, []);
    const renderLogs = () => {
        
        return state.logs.map((item, i) =>
            <tr key={i}>
                <th scope="row">{item.id}</th>
                <td>{item.user}</td>
                <td>{item.admin}</td>
                <td>{item.license}</td>
                <td>{moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}</td>
            </tr>
        )
    }

    const sortById = () => {
        const newList = [...state.orgLogs].sort((a, b) => a.id - b.id);
        setState({...state, logs: newList});
    }

    const sortByTime = () => {
        const newList = [...state.orgLogs].sort((a, b) => a.time - b.time);
        setState({...state, logs: newList});
    }

    return (
        <>
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th scope="col"><button type="button" onClick={sortById} className="cursor">#</button></th>
                        <th scope="col">User</th>
                        <th scope="col">Admin</th>
                        <th scope="col">License</th>
                        <th scope="col"><button type="button" onClick={sortByTime} className="cursor">Time</button></th>
                    </tr>
                </thead>
                <tbody>
                    {renderLogs()}
                </tbody>
            </table>
        </>

    )
}

export default LogListHooks;