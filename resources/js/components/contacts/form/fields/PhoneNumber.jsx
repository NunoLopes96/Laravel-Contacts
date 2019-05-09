import React, {Component} from 'react'
import ReactDOM from "react-dom";
import intlTelInput from 'intl-tel-input/build/js/intlTelInput.min';
import "intl-tel-input/build/css/intlTelInput.min.css";

export default class Contact extends Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this._input = ReactDOM.findDOMNode(this).querySelector("input");
        this._iti = intlTelInput(this._input, {
            utilsScript: require('intl-tel-input/build/js/utils'),
            initialCountry: "pt",
            autoHideDialCode: true,
            nationalMode: false,
            formatOnDisplay: true
        });
    }

    handleChange(e) {
        this.resetIntlTelInput(this._iti);

        e.target.setCustomValidity( this.isValid() ? '' : 'Field is invalid');

        this.props.handleInputChange(e);
    }

    isValid() {
        return this._input.value === '' || this._iti.isValidNumber();
    }

    /**
     * The current auto-format of the library was discontinued, here is a fix
     */
    resetIntlTelInput() {
        if (typeof intlTelInputUtils !== 'undefined') {
            let currentText = this._iti.getNumber(intlTelInputUtils.numberFormat.E164);
            if (typeof currentText === 'string') {
                this._iti.setNumber(currentText);
                this._input.dispatchEvent(new Event('changed'));
            }
        }
    }

    render() {
        return (
            <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <div className="d-block">
                    <input type="tel"
                           className={"form-control " + (this.props.field.valid ? '' : 'is-invalid')}
                           name="phone_number"
                           value={this.props.field.value}
                           onChange={this.handleChange}
                           id="phone"/>
                </div>
            </div>
        )
    }
}
