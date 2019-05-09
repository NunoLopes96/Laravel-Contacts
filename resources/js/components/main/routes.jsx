import React, { Suspense, lazy } from 'react'
import {BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom"

const CreateContact = lazy(() => import(/* webpackChunkName: 'CreateContact' */ "../contacts/form/contactscreate"));
const EditContact   = lazy(() => import(/* webpackChunkName: 'EditContact' */ "../contacts/form/contactsedit"));
const ContactLists  = lazy(() => import(/* webpackChunkName: 'ContactLists' */ "../contacts/list/contactslist"));

export default props => (
    <Router>
        <Suspense fallback={<div>Loading...</div>}>
            <Switch>
                <Route exact path='/contacts' component={ContactLists} />
                <Route path='/contacts/create' component={CreateContact} />
                <Route path='/contacts/:id/edit' component={EditContact} />
            </Switch>
        </Suspense>
    </Router>
)
