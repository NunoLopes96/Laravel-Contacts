import React from 'react'

export default props => (
    <div className="alert alert-success alert-dismissible fade show" hidden={props.message === ''} role="alert">
        {props.message}
        <button type="button" className="close" onClick={props.handleCloseAlert} aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
)
