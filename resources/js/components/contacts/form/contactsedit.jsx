import React from "react";
import axios from 'axios';
import { Link } from 'react-router-dom'

import FirstName from './fields/FirstName'
import LastName from './fields/LastName'
import Email from './fields/Email'
import PhoneNumber from './fields/PhoneNumber'

import Alert from '../../template/alert'
import If from '../../template/if'
import Error from '../../template/error'

import Contact from "./contact";

export default class EditContact extends Contact {

    constructor(props) {
        super(props);

        this._id = this.props.match.params.id;

        axios.get(`/api/contacts/${this._id}/edit`)
             .then((resp) => {
                 let data = resp.data;

                 this.refresh(data);

                 this.setState({...this.state, isLoading: false})
             })
             .catch(error => {
                 this.setState({...this.state, error: error })
             });
    }

    refresh(data) {
        let contact = this.state.contact;

        Object.keys(contact).map((key) => {
            contact[key] = {
                value: data.contact[key] || '',
                valid: true,
            };
        });

        this._initialState = JSON.stringify(contact);

        this.setState({...this.state, contact: contact});
    }

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
        payload._method = 'PUT';

        axios.put(`/api/contacts/${this._id}`, payload)
             .then((resp) => {
                 let data = resp.data;

                 this.refresh(data);

                 this.setState({...this.state, alert: {errors: null, message: data.success}});
             })
            .catch(error => {

                // Send Error to Alert that will process inside.
                this.setState({...this.state, alert: {...this.state.alert, errors: error.response.data.errors}});
            });
    }

    render() {
        if (this.state.error) {
            return <Error code={this.state.error.response.status} message={this.state.error.statusText}/>;
        }

        return (
            <main className="container py-4">
                <Alert
                    errors={this.state.alert.errors}
                    message={this.state.alert.message}
                    handleCloseMessage={() => this.handleCloseMessage()}
                    handleCloseErrors={() => this.handleCloseErrors()}/>
                <form onSubmit={(e) => this.handleSubmit(e)} className="contact-form" method="POST">
                    <If test={!this.state.isLoading}>
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
                        <button onSubmit={(e) => this.handleSubmit(e)} type="submit" className="btn btn-success" disabled={!this.canSubmit()}>Update</button>
                        <Link to='/contacts' className="btn btn-primary">Close</Link>
                    </If>
                </form>
            </main>
        )
    }
}
