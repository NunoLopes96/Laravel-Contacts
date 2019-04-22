document.addEventListener('DOMContentLoaded', function() {

    // In all delete buttons.
    document.querySelectorAll(".contact-delete").forEach(input => {

        // Add a click event.
        input.addEventListener('click', (e) => {

            // If the user doesn't confirm, prevent to submit and blur the button.
            if (!confirm('Are you sure you wan\'t to delete this contact?')) {
                e.preventDefault();
                input.blur();
            }
        });
    });
});
