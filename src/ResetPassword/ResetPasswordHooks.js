import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MemberRESTService from '../RESTService/MemberRESTService';
import { Link } from 'react-router-dom';
function ResetPasswordHooks() {
    const [userName, setUserName] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [passwordSet, SetPasswordSet] = useState(false);
    const [err, setErr] = useState(null);
    const { id } = useParams();
    useEffect(() => {
        MemberRESTService.lookupMemberById(id)
            .then(res => {
                const user = res.data;
                setUserName(user.name);
            })
            .catch(err => {

            })
    }, [])

    const onSubmit = () => {
        setErr(null);
        MemberRESTService.changePassword(id, oldPassword, newPassword)
            .then(res => {
                SetPasswordSet(true);
            })
            .catch(err => {
                setErr(err.response.data.password)
            })

    }
    return (
        <div>
            {!passwordSet ?
                <div>
                    <h1>Reset Password</h1>
                    {err && <p className="text-danger">{err}</p>}
                    <div>
                        <label>Username: </label>
                        {userName}
                    </div>
                    <div>
                        <label>Old Password: </label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name="oldPassword" onChange={e => setOldPassword(e.target.value)} />

                    </div>
                    <div>
                        <label>New Password: </label>
                        <input type="password" className="form-control" id="exampleInputPassword2" name="newPassword" onChange={e => setNewPassword(e.target.value)} />

                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary" onClick={onSubmit}>Submit</button>
                        <Link to={'/adminResetPW'}>
                            <button type="submit" className="btn btn-danger">Cancel</button>
                        </Link>
                    </div>
                </div>
                :
                <div>
                    <h1>Password for {userName} has been reset</h1>
                    <div>
                        <Link className="badge badge-secondary" to={'/adminResetPW'}>Return</Link>
                    </div>
                </div>
            }

        </div>
    )
}

export default ResetPasswordHooks;