import React from 'react'

export default props => (
    <fieldset className="form-group">
        <label htmlFor="last_name">Last Name</label>
        <input type="text"
               className={"form-control " + (props.field.valid ? '' : 'is-invalid')}
               name="last_name"
               maxLength="255"
               id="last_name"
               value={props.field.value}
               onChange={props.handleInputChange}
               placeholder="Enter last name"/>
    </fieldset>
)
