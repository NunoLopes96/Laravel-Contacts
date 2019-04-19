bootstrap    = require('./bootstrap');
intlTelInput = require('intl-tel-input');

document.addEventListener('DOMContentLoaded', function(){
    var input = document.querySelector("#phone");
    intlTelInput(input, {
        utilsScript: require('intl-tel-input/build/js/utils'),
        initialCountry: "pt",
        separateDialCode: 'true',
        hiddenInput: input.getAttribute('name'),
    });
}, false);
