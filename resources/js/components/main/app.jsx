import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

import React from 'react'
import Nav from '../template/navigation'
import Routes from './routes'

export default props => (
    <div className='container'>
        <Nav/>
        <Routes/>
    </div>
)
