import FormValidator from "./formvalidator/formvalidator";
import IntlTelInput from "./intltelinput";

document.addEventListener('DOMContentLoaded', function(){

    this._form = document.querySelector('.contact-form');

    this._formValidator = new FormValidator(this._form);
    this._phoneLibrary  = new IntlTelInput(this._form);
});
