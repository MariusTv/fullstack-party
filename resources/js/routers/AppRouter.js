import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LoginPage from '../components/LoginPage';
import IssueListPage from '../components/IssueListPage';
import IssuePage from '../components/IssuePage';
import PrivateRoute from './PrivateRoute';

const AppRouter = (props) => (
    <BrowserRouter>
        <div>
            <Switch>
                <Route path="/login" component={LoginPage}/>
                <PrivateRoute issues={props.issues} exact path="/" component={IssueListPage}/>
                <PrivateRoute path="/issues/:id" component={IssuePage}/>
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;