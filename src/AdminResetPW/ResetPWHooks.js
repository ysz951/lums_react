import {useState, useEffect, useContext} from 'react';
import Context from '../Context/Context';
import { Link } from 'react-router-dom';
import MemberRESTService from '../RESTService/MemberRESTService';
function ResetPWHooks() {
    const {role} = useContext(Context);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        MemberRESTService.getAdminMembers()
            .then(res => {
                setUsers(res.data);
            })
            .catch(err => {
                
            })
    }, [])

    const renderUsers = () => {
        return users.map((item, i) =>
            <tr key={i}>
                <th scope="row">{item.id}</th>
                <td>{item.name}</td>
                <td>{item.role}</td>
                <td>{item.email}</td>
                <td><Link className="badge badge-secondary" to={`/adminResetPW/${item.id}`}>Edit</Link></td>
            </tr>
        )
    }

    return(
        <div>
            {role === 'ROLE_SUPERUSER' &&
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
                    {renderUsers()}
                </tbody>
            </table>
            </div> 
            }
            {role !== 'ROLE_SUPERUSER' &&
            <div>
                <h1>Only the super admin can change passwords of other admin</h1>
            </div>
            }
        </div>
    );
}

export default ResetPWHooks;