import React from 'react'
import '../../../css/error.css';

let divStyle = {
    padding: '10px'
};

export default props => (
    <div className="flex-center position-ref full-height">
        <div className="code">
            {props.code || 404}
        </div>

        <div className="message" style={divStyle}>
            {props.message || 'Page Not Found'}
        </div>
    </div>
)
