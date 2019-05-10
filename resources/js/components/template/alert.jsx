import React from 'react'

function toUpperCase(string) {
    return (string.charAt(0).toUpperCase() + string.slice(1)).replace('_', ' ');
}

function processErrors(errors) {
    if (errors) {
        return Object.keys(errors).map((error, index) => (
            <li key={index}>{toUpperCase(error)}
                <ul>
                    {errors[error].map((message, index) => (
                        <li key={index}>{message}</li>
                    ))}

                </ul>
            </li>
        ));
    }
}

export default props => (
    <div>
        <div className="alert alert-success alert-dismissible fade show" hidden={props.message === ''} role="alert">
            {props.message}
            <button type="button" className="close" onClick={props.handleCloseMessage} aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div className="alert alert-danger alert-dismissible fade show" hidden={!props.errors} role="alert">
            <ul className="my-0">
                {processErrors(props.errors)}
            </ul>
            <button type="button" className="close" onClick={props.handleCloseErrors} aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    </div>
)
