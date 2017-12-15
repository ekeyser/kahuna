import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import Admin from './containers/Admin';
// import Upload from './containers/Upload';
import Login from './containers/Login';
// import LoginFailure from './containers/LoginFailure';
// import Logout from './containers/Logout';
// import Inventory from './containers/Inventory';
// import NotFound from './containers/NotFound';
import Callback from './containers/Callback';
import PrivateRoute from './components/PrivateRoute';

export default () =>
	(<Switch>
		<Route path="/" exact component={Home} />
		<Route path="/login" exact component={Login} />
		<Route path="/callback" component={Callback} />
		<PrivateRoute path="/admin" authed="false" component={Admin} />
	</Switch>);
