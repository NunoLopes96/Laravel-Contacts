import React, {Component} from "react";

import FirstName from './fields/FirstName'
import LastName from './fields/LastName'
import Email from './fields/Email'
import PhoneNumber from './fields/PhoneNumber'

import { Link, Redirect } from 'react-router-dom'
import axios from "axios/index";
import Contact from "./contact";

export default class CreateContact extends Contact {

    handleSubmit(e) {
        e.preventDefault();
        document.activeElement.blur();

        if (!this.canSubmit()) {
            return;
        }

        let payload = {};
        Object.keys(this.state.contact).map((key) => {
            payload[key] = this.state.contact[key].value;
        });

        axios.post(`/api/contacts`, payload)
             .then((resp) => {

                 this.props.history.push({
                     pathname: resp.data.redirect,
                     state: {message: resp.data.success}
                 });
             });
    }

    render() {
        return (
            <main className="container py-4">
                <div className="alert alert-success alert-dismissible fade show" hidden={this.state.redirect.message !== null} role="alert">
                    {this.state.alert}
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form onSubmit={(e) => this.handleSubmit(e)} className="contact-form" method="POST">
                    <FirstName
                        field={this.state.contact.first_name}
                        handleInputChange={this.handleInputChange}
                    />
                    <LastName
                        field={this.state.contact.last_name}
                        handleInputChange={this.handleInputChange}
                    />
                    <Email
                        field={this.state.contact.email}
                        handleInputChange={this.handleInputChange}
                    />
                    <PhoneNumber
                        field={this.state.contact.phone_number}
                        handleInputChange={this.handleInputChange}
                    />
                    <button type="submit" className="btn btn-success" disabled={!this.canSubmit()}>Create</button>
                    <Link to='/contacts' className="btn btn-primary">Close</Link>
                </form>
            </main>
        )
    }
}
