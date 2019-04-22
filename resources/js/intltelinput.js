import intlTelInput from 'intl-tel-input/build/js/intlTelInput.min';

/**
 * IntlTelInput handling class.
 *
 * This uses an external library to validate phone numbers and autoformat them.
 */
class IntlTelInput
{
    /**
     * Initializes the IntlTelInput instance.
     */
    constructor(form) {

        this._input = form.querySelector("#phone");
        this._iti = intlTelInput(this._input, {
            utilsScript: require('intl-tel-input/build/js/utils'),
            initialCountry: "pt",
            autoHideDialCode: true,
            nationalMode: false,
            formatOnDisplay: true
        });

        this._input.addEventListener("input", () => this.resetIntlTelInput(this._iti));
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
}

export default IntlTelInput;