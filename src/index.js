import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Main';
import Controller from './components/Controller';
import Test from './components/Test';
import { Router, Route, hashHistory } from 'react-router';

// Render the main component into the dom
ReactDOM.render(
	<Router history={hashHistory}>
	    <Route path="/">
	    	<Route path="app" component={App}/>
		    <Route path="test" component={Test}/>
		    <Route path="ctrl" component={Controller}/>
	    </Route>
	</Router>
	, document.getElementById('app'));

