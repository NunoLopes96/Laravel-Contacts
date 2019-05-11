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

/**
 * This class will handle the edition of a contact, validating all its data
 * before submitting an update and handle validation errors in real time.
 * The user won't be able to submit an update request if any field is invalid or
 * if the fields haven't changed.
 */
export default class EditContact extends Contact {

    /**
     * Edit Contact constructor.
     * @param props
     */
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

    /**
     * Refresh the contact fields, after an update or to
     * fill initially the fields.
     * @param data
     */
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

    /**
     * Handles the submission of the form, preventing the submission if
     * any fields are invalid or if there is nothing to update.
     * @param e
     */
    handleSubmit(e) {
        // Prevents the default submission.
        e.preventDefault();

        // Blurs the activeElement in case that is the submit button.
        document.activeElement.blur();

        // Cancels the submission if any fields are invalid or
        // there is nothing to update.
        if (!this.canSubmit()) {
            return;
        }

        // Collects the data from the form.
        let payload = {};
        Object.keys(this.state.contact).map((key) => {
            payload[key] = this.state.contact[key].value;
        });

        // Laravel can't handle PUT submission, so we have to send a token.
        payload._method = 'PUT';

        // Try to update the contact.
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
        // If there was an error for example contact was not found or no permissions to see the contact,
        // we will display an error page.
        if (this.state.error) {
            return <Error code={this.state.error.response.status} message={'Contact ' + this.state.error.response.statusText}/>;
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
