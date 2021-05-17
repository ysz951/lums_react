import React, { Component } from 'react';
import MemberRESTService from '../RESTService/MemberRESTService';
import { withRouter, Link } from 'react-router-dom';
import Context from '../Context/Context';
import config from '../config';
import * as emailjs from 'emailjs-com';
const { EMAIL_SERVICE_ID, EMAIL_USER_ID, EMAIL_TEMPLATE_ID } = config;
class ManualEmail extends Component {
    state = {
        username: "",
        email: "",
        message:"This is filler text for the email to be sent",
        subject: "default",
        example: "This is filler text for the email to be sent",
        emailSent: false,
        id: "",
        content: ""
    }
    static contextType = Context;
    onSubmit = this.onSubmit.bind(this);

    componentDidMount() {
        const { id } = this.props.match.params;
        MemberRESTService.lookupMemberById(id)
            .then(res => {
                const user = res.data;
                this.setState({
                    userName: user.name,
                    email: user.email.toLowerCase(),
                    id: id
                })
            })
            .catch(err => {

            })
    }

    handleChange = (e) => {
        let text = "Subject: ";
        let subj = "";
        let msg = "";
        switch(e.target.value){
            case "CW":
                text += "Content Warning \n Message: \n This is a warning that you are close to getting blocked.";
                subj = "Content Warning";
                msg = "This is a warning that you are close to getting blocked.";
                break;
            case "NLPC":
                text += "New License Prices Coming \n Message: \n There are new prices being rolled out for our license!";
                subj = "New License Prices Coming";
                msg = "There are new prices being rolled out for our license!";
                break;
            case "IW":
                text += "Inactivity Warning \n Message: \n This is a warning that you have not been active with our service. You are close to being blocked.";
                subj = "Inactivity Warning";
                msg = "This is a warning that you have not been active with our service. You are close to being blocked.";
                break;
            default:
                subj = "This message was not meant to be sent";
                text = "This is filler text for the email to be sent";
                msg = "This message was sent by mistake. Carry on.";

        }
        this.setState({ example : text, message : msg, subject: subj });
    }

    onSubmit(){
        emailjs.send(
            EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID,{
            subject: this.state.subject,
            to_name: this.state.username,
            from_name: "LUMS",
            message: this.state.message,
            to_email: this.state.email,
            }, EMAIL_USER_ID).then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
             }, function(error) {
                console.log('FAILED...', error);
             });
             
             this.setState({ emailSent: true });
    }

    render(){
        return(
            <div>
                {!this.state.emailSent &&
                <div>
                <h1>Send Email To: {this.state.email}</h1>
                <label>Subject: </label>
                    <select className="custom-select mr-1" id="sub" name="sub" onChange={this.handleChange}>
                        <option value="default">Select a Subject</option>
                        <option value="CW">Content Warning</option>
                        <option value="NLPC">New License Prices Coming</option>
                        <option value="IW">Inactivity Warning</option>
                    </select>
                    <br />
                    <label>Example Email: </label>
                    <textarea className="w-100 h-100" value={this.state.example} onChange={e => {this.setState({content: e.target.value})}}/>
                    <Link to={`/person/${this.state.id}`}>
                            <button type="cancel" className="btn btn-danger">Cancel</button>
                        </Link>
                        <button type="submit" className="btn btn-primary ml-2" onClick={this.onSubmit}>Submit</button>           
                    
                </div>
                }{this.state.emailSent &&
                    <div>
                        <h1>Email Sent To {this.state.email} Was a Success!</h1>
                        <div>
                            <Link className="badge badge-secondary" to={`/person/${this.state.id}`}>Return</Link>
                        </div>
                    </div>
                }
            </div>
        );
    }

}

export default withRouter(ManualEmail);