import React from 'react'

export default props => (
    <fieldset className="form-group">
        <label htmlFor="first_name">First Name</label>
        <input type="text"
               className={"form-control " + (props.field.valid ? '' : 'is-invalid')}
               name="first_name"
               minLength="3"
               maxLength="255"
               id="first_name"
               placeholder="Enter first name"
               value={props.field.value}
               onChange={props.handleInputChange}
               required/>
    </fieldset>
)
