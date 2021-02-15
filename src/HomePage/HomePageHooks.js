import { useState, useEffect } from 'react';
import MemberRESTService from '../RESTService/MemberRESTService';
import { withRouter, Link } from 'react-router-dom';
import LUMSLogo from '../LUMSLogo.PNG';

function HomePageHooks() {
    const [number, setNumber] = useState(0);

    useEffect(() => {
        MemberRESTService.countUser()
            .then(res => {
                setNumber(res.data.count)
            })
            .catch(err => console.log(err));
    }, []);
    return (
        <div className="home-div mt-4">
            <h1>Welcome</h1>
            <img alt="err" src={LUMSLogo}/>
            <h2>Registered Users: {number}</h2>
            <Link to="/login">Find more</Link>
        </div>
    )

}

export default HomePageHooks;