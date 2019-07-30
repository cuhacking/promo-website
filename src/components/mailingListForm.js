import React, {Component} from 'react';
import lightMailingText from '../assets/images/mailingText-black.svg';
import darkMailingText from '../assets/images/mailingText-white.svg';

const API_URL = 'http://localhost:8080/mailinglist/subscribe'; 

export default class MailingListForm extends Component {

    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        
        event.preventDefault();
        
        const post = {
            email: this.state.value
        }

        const options = {
            mode: 'cors',
            method: 'POST',
            body: JSON.stringify(post), 
            headers: {
                'Access-Control-Request-Method': 'POST', 
                'Authorization': 'Bearer test',
                'Content-Type': 'application/json'
            }
        }; 

        fetch(API_URL, options)
            .then(res => res.json())    
            .then(res => {
                if(res.status === "success") {
                    // Server added email successfully. 
                } else {
                    // Server found an error 
                }
            })
            .catch(err => console.log('Error sending email to API Server'));
        
    }

    text() {
        let config = this.props.darkMode ? darkMailingText : lightMailingText; 
        return <img id="mailingListText" draggable={false} src={config} alt='Be the first to know about all things cuHacking!'/>
    }

    render() {
        return (
            <div id="mailingListForm">
                {this.text()}
                <form id="emailForm" onSubmit={this.handleSubmit}>
                    <input id="emailField" type="text" placeholder="Enter your email address.." value={this.state.value} onChange={this.handleChange} />
                    <input id="submitButton" type="submit" value="Submit" />
                </form>
            </div>
        );  
    } 

}

