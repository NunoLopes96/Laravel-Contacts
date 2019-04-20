import intlTelInput from 'intl-tel-input/build/js/intlTelInput.min';

document.addEventListener('DOMContentLoaded', function(){
    var input = document.querySelector("#phone");
    var iti = intlTelInput(input, {
        utilsScript: require('intl-tel-input/build/js/utils'),
        initialCountry: "pt",
        autoHideDialCode: true,
        nationalMode: false,
        formatOnDisplay: true
    });

    input.addEventListener("input", () => resetIntlTelInput());

    function resetIntlTelInput() {
        if (typeof intlTelInputUtils !== 'undefined') { // utils are lazy loaded, so must check
            let currentText = iti.getNumber(intlTelInputUtils.numberFormat.E164);
            if (typeof currentText === 'string') { // sometimes the currentText is an object :)
                iti.setNumber(currentText); // will autoformat because of formatOnDisplay=true
            }
        }
    }

}, false);
