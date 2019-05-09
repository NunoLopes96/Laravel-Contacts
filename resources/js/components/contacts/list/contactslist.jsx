import React, {Component} from "react";
import { Link } from 'react-router-dom'
import axios from "axios/index";

import Alert from '../../template/alert';

export default class ListContacts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contacts: [],
            alert: {
                message: ''
            }
        };

        this.refresh();
    }

    refresh() {
        axios.get("/api/contacts")
             .then((resp) => {
                 this.setState({...this.state, contacts: resp.data.contacts});
             });
    }

    handleDelete(e, contact) {
        // If the user doesn't confirm, prevent to submit and blur the button.
        if (confirm('Are you sure you want to delete this contact?')) {
            axios.delete(`/api/contacts/${contact.id}`)
                .then((resp) => {
                    this.refresh();
                    this.setState({...this.state, alert: { message: resp.data.success}})
                });
        } else {
            e.target.blur();
        }
    }

    handleCloseAlert() {
        this.setState({...this.state, alert: {message: ''}});
    }

    returnList() {
        return this.state.contacts.map(contact => (
            <li key={contact.id} className="list-group-item">
                <div className="pull-left">
                    <b>{contact.first_name}</b>
                    <small>({contact.phone_number})</small>
                    <br/>
                    <small>Email: {contact.email}</small>
                </div>
                <button onClick={(e) => this.handleDelete(e, contact)} className="btn btn-lg btn-outline-danger float-right mx-2 contact-delete">
                    <i className="fa fa-trash"></i>
                </button>
                <Link className="btn btn-lg btn-outline-warning float-right mx-2" to={`/contacts/${contact.id}/edit`} >
                    <i className="fa fa-edit"></i>
                </Link>
            </li>
        ))
    };

    render() {
        return (
            <main className="container py-4">
                <Alert
                    message={this.state.alert.message}
                    handleCloseAlert={() => this.handleCloseAlert()}/>
                <div className="clearfix">
                    <Link to='/contacts/create' className="btn btn-outline-success float-right my-2">
                        <i className="fa fa-plus"></i> Create new contact
                    </Link>
                </div>
                <div>
                    <ul className="list-group">
                        {this.returnList()}
                    </ul>
                </div>
            </main>
        )
    }
}
