import React from 'react'

export default props => (
    <fieldset className="form-group">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input type="email"
               className={"form-control " + (props.field.valid ? '' : 'is-invalid')}
               name="email"
               id="exampleInputEmail1"
               placeholder="Enter email"
               value={props.field.value}
               onChange={props.handleInputChange}
               pattern="\S+@\S+\.\S+"/>
    </fieldset>
)
