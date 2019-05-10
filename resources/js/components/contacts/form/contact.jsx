import React, {Component} from "react";

export default class Contact extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            alert: {
                message: '',
                errors: null,
            },
            contact: {
                first_name:   {
                    value: '',
                    valid: true,
                },
                last_name:   {
                    value: '',
                    valid: true,
                },
                email:   {
                    value: '',
                    valid: true,
                },
                phone_number:   {
                    value: '',
                    valid: true,
                },
            },
        };

        if (this.props.location.state) {
            this.state.redirect.message = this.props.location.state.message;
        }

        // Saves initial state as JSON.
        this._initialState = JSON.stringify(this.state.contact);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.canSubmit         = this.canSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            contact: {
                ...this.state.contact,
                [name]: {
                    value: value,
                    valid: target.checkValidity()
                }
            }
        });
    }

    canSubmit() {
        return this.stateChanged() && this.allFieldsValid();
    }

    stateChanged() {
        return JSON.stringify(this.state.contact) !== this._initialState;
    }

    allFieldsValid() {
        let contact = this.state.contact;

        return !Object.keys(contact)
                      .map(field => contact[field])
                      .some(field => !field.valid);
    };

    handleCloseMessage() {
        this.setState({...this.state, alert: {...this.state.alert, message: ''}});
    }

    handleCloseErrors() {
        this.setState({...this.state, alert: {...this.state.alert, errors: null}});
    }
}
