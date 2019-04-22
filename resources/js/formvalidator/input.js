/**
 * TextInput handling class.
 */
class TextInput {
    /**
     * Initializes the TextInput instance.
     * @param {object} element
     */
    constructor(element) {
        this._element = element;
        this._initial = this._element.value;
    }

    /**
     * Checks if the value is different from the initial.
     * @return {boolean}
     */
    changed() {
        return this._initial !== this._element.value;
    }
}

export default TextInput;
