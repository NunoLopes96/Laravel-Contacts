import React, {Component} from "react";

/**
 * Parent Contact class that will handle common operations between
 * editing and creating a contact.
 */
export default class Contact extends Component {

    /**
     * Parent Contact class constructor.
     * @param props
     */
    constructor(props) {
        super(props);

        // Sets initial state.
        this.state = {
            error: null,
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

        // Check if there are any alerts (ex: Redirect from Create View).
        if (this.props.location.state) {
            this.state.alert.message = this.props.location.state.message;
        }

        // Saves initial state as JSON.
        this._initialState = JSON.stringify(this.state.contact);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.canSubmit         = this.canSubmit.bind(this);
    }

    /**
     * Handles an input change.
     * @param event
     */
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

    /**
     * Checks if the form can be summited.
     * The fields must be different from the initial and they all should be valid.
     * @return {boolean}
     */
    canSubmit() {
        return this.stateChanged() && this.allFieldsValid();
    }

    /**
     * Checks if the fields were changed.
     * @return {boolean}
     */
    stateChanged() {
        return JSON.stringify(this.state.contact) !== this._initialState;
    }

    /**
     * Checks if all fields are valid.
     * @return {boolean}
     */
    allFieldsValid() {
        let contact = this.state.contact;

        return !Object.keys(contact)
                      .map(field => contact[field])
                      .some(field => !field.valid);
    };

    /**
     * Closes the success alert.
     */
    handleCloseMessage() {
        this.setState({...this.state, alert: {...this.state.alert, message: ''}});
    }

    /**
     * Close the error alert.
     */
    handleCloseErrors() {
        this.setState({...this.state, alert: {...this.state.alert, errors: null}});
    }
}
