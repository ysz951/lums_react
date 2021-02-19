import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import MemberRESTService from '../RESTService/MemberRESTService';
function RegisterUserHooks() {
    const history = useHistory();
    const [state, setState] = useState({
        userRole: "",
        userEmail: "",
        userPassword: "",
        userName: "",
        err: null
    })
    const register = (e) => {
        e.preventDefault();
        setState({
            ...state,
            err: null
        });
        const member = {
            name: state.userName,
            username: state.userName,
            email: state.userEmail,
            password: state.userPassword,
            role: state.userRole
        }
        console.log(member);
        MemberRESTService.createMember(member)
            .then(res => {
                history.push("/person");
            })
            .catch(err => {
                const error = err.response.data;
                console.log(err.response.data);
                if (error.errors && error.errors.length > 0) {
                    alert(error.errors[0].defaultMessage)
                }
                else {
                    alert(error.message)
                }
            })
    }

    const goBack =() => {
        history.push("/login");
    }

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>
            <form onSubmit={register} className="container">
                <div className="form-col align-items-center justify-content-center">
                    <div className="form-group">
                        <label> Name: </label>
                        <input placeholder="Name" type="text" name="userName" className="form-control"
                            value={state.userName} onChange={handleChange} required/>
                        {/* <p className="text-danger" >{this.state.err.name}</p> */}
                    </div>
                    <div className="form-group">
                        <label className="mr-sm-2" htmlFor="inlineFormCustomSelect">Role</label>
                        <select className="custom-select mr-sm-2" id="inlineFormCustomSelect" name="userRole"
                            value={state.userRole} onChange={handleChange} required>
                            <option value="">Choose...</option>
                            <option value="ROLE_USER">User</option>
                            <option value="ROLE_ADMIN">Admin</option>
                            <option value="ROLE_SUPERUSER">Superuser</option>
                            <option value="ROLE_EXPERT">Expert</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label> Email: </label>
                        <input placeholder="Email" type="email" name="userEmail" className="form-control"
                            value={state.userEmail} onChange={handleChange} required/>
                        {/* <p className="text-danger" >{this.state.err.email}</p> */}
                    </div>
                    <div className="form-group">
                        <label> Password: </label>
                        <input placeholder="Password" type="password" name="userPassword" className="form-control"
                            onChange={handleChange} required/>
                    </div>
                    
                    <div className="form-group">
                        <div className="d-flex">
                            <button onClick={goBack} type="button" className="btn btn-outline-info">Back</button>
                            <button type="submit" className="btn btn-primary ml-2">Submit</button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default RegisterUserHooks;