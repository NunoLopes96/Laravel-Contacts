bootstrap    = require('./bootstrap');
intlTelInput = require('intl-tel-input');

document.addEventListener('DOMContentLoaded', function(){
    var input = document.querySelector("#phone");
    intlTelInput(input, {
        initialCountry: "pt",
        separateDialCode: 'true',
    });
}, false);
