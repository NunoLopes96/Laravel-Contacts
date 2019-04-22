import TextInput from "./input";

/**
 * FormValidator handling class.
 */
class FormValidator {

    /**
     * Initializes the TextInput instance.
     */
    constructor(form) {

        // Get the button and add event listener to validate the click.
        this._submitButton = form.querySelector('button[type=submit');
        this._submitButton.addEventListener('click', (e) => this.onClick(e));

        // Create instance of all inputs, to save their initial state.
        this._inputs = [];
        form.querySelectorAll('input:not([type=hidden]').forEach(input => {

            // Add event to the input.
            input.addEventListener('input', () => this.handleChange());
            input.addEventListener('changed', () => this.handleChange());

            // Add to the list of inputs.
            this._inputs.push(new TextInput(input));
        });

        this.handleChange();
    }

    /**
     * Event handler for when the submit button is clicked.
     */
    onClick(e) {

        // Prevent the button to submit form if the button is disabled.
        if (this._submitButton.classList.contains('disabled')) {
            e.preventDefault();
        }
    }

    /**
     * Event handler if the value of an input is changed.
     */
    handleChange() {

        // Check if any input was changed.
        let changed = false;
        this._inputs.forEach(input => {
            changed = changed || input.changed();
        });

        // If any filter was changed, we make sure the button is not disabled,
        // otherwise, we disable the button because no changes were made.
        if (changed) {
            if (this._submitButton.classList.contains('disabled')) {
                this._submitButton.classList.remove('disabled');
            }
        } else {
            if (!this._submitButton.classList.contains('disabled')) {
                this._submitButton.classList.add('disabled');
            }
        }
    }
}

export default FormValidator;
