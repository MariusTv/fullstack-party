import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import {getToken} from "../data/api";

const PrivateRoute = ({ component:Component, ...rest }) => (
    <Route {...rest} component={(props) => (
        getToken() !== '' ? (
            <div>
                <Header/>
                <Component {...props} />
            </div>
        ) : (
            <Redirect to="/login"/>
        )
    )} />
);

export default PrivateRoute;