import React, { Component } from 'react';
import MemberRESTService from '../RESTService/MemberRESTService';
import { withRouter, Link } from 'react-router-dom';
import LUMSLogo from '../LUMSLogo.PNG';

class HomePage extends Component {

    state = {
        number: 0
    }

    componentDidMount = () => {
        MemberRESTService.countUser()
            .then(res => this.setState({number: res.data.count}))
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="home-div mt-4">
                <h1>Welcome</h1>
                <img alt="err" src={LUMSLogo}/>
                <h2>Registered Users: {this.state.number}</h2>
                <Link to="/login">Find more</Link>
            </div>
        )
    }
}

export default withRouter(HomePage);