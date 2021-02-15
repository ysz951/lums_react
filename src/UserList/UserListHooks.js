import {useState, useEffect} from 'react';
import MemberRESTService from '../RESTService/MemberRESTService';
import { Link } from 'react-router-dom';

function UserListHooks() {
    const [searchName, setSearchName] = useState("");
    const [users, setUsers] = useState([]);
    const [orgUsers, setOrgUsers] = useState([]);
    useEffect(() => {
        MemberRESTService.listAllMembers()
            .then(res => {
                setUsers(res.data);
                setOrgUsers(res.data);
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
                <td>{item.blocked.toString()}</td>
                <td>{item.email}</td>
                <td><Link className="badge badge-secondary" to={`/person/${item.id}`}>View</Link></td>
            </tr>
        )
    };

    const searchUser = (e) => {
        e.preventDefault();
        const searchList = searchName === "" ? orgUsers
        : orgUsers.filter(user => user.name.toLowerCase().includes(searchName.toLowerCase()));
        setUsers(searchList);
    }

    const sortById = () => {
        setUsers([...users].sort((a, b) => a.id - b.id));
    }

    const sortByEmail = () => {
        setUsers([...users].sort((a, b) => a.email > b.email ? 1 : a.email === b.email ? 0 : -1));
    }

    const sortByName = () => {
        setUsers([...users].sort((a, b) => a.name > b.name ? 1 : a.name === b.name ? 0 : -1));
    }

    return (
        <>
            <form onSubmit={searchUser}>
                <div className="form-group">
                    <input type="text" placeholder="Recipient's username" onChange={e => setSearchName(e.target.value)}
                        aria-label="Recipient's username" name="searchName" aria-describedby="basic-addon2" />
                    {' '}
                    <button>Search</button>
                </div>
            </form>
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th scope="col"><button type="button" onClick={sortById} className="cursor">#</button></th>
                        <th scope="col"><button type="button" onClick={sortByName} className="cursor">Name</button></th>
                        <th scope="col">Role</th>
                        <th scope="col">Blocked</th>
                        <th scope="col"><button type="button" onClick={sortByEmail} className="cursor">Email</button></th>
                        <th scope="col">Detail</th>
                    </tr>
                </thead>
                <tbody>
                    {renderUsers()}
                </tbody>
            </table>
        </>
    )
}

export default UserListHooks;