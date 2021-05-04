import React from 'react';
import { Route, Redirect } from "react-router-dom";

const GuardedRouteStudent = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        
        localStorage.getItem("Student_Login") === "true"
            ? <Component {...props} />
            : <Redirect to='/' />
    )} />
)

export default GuardedRouteStudent;