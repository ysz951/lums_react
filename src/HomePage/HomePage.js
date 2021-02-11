import React, { Component } from 'react';
import LicenseRESTService from '../RESTService/LicenseRESTService';
import { withRouter, Link } from 'react-router-dom';
import LUMSLogo from '../LUMSLogo.PNG';

class HomePage extends Component {

    state = {
        number: 0
    }

    connect = (server) => {
        return new Promise(function(resolve, reject) {
            server.onopen = function() {
                console.log("open");
                resolve(server);
            };
            server.onerror = function(err) {
                reject(err);
            };
    
        });
    }

    componentDidMount = () => {
        const wsProtocol = window.location.protocol == "https:" ? "wss" : "ws";
        const wsURI = wsProtocol + '://' + "localhost:8080/lums" + "/websocket/helloName";
        const websocket = new WebSocket(wsURI);

        this.connect(websocket)
            .then(() => {
                console.log("ok")
                websocket.send("");
                websocket.onmessage = event => {
                    console.log(event.data);
                    this.setState({number: event.data}) 
                }
            })
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