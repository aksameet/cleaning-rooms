import React from 'react';
import { Route, Link } from 'react-router-dom';
import AddRecord from '../containers/AddRecord';
import List from '../containers/List';

export default () => (
	<div className="container d-flexflex-wrap">
		<nav className="w-100 mt-3">
			<div className="d-flex w-100 justify-content-end">
				<Link to="/" className="btn btn-primary mr-2">List</Link>
				<Link to="/add" className="btn btn-primary">Add new record</Link>
			</div>
			<hr/>
		</nav>

		<section className="w-100">
			<Route exact path="/" component={List}/>
			<Route exact path="/add" component={AddRecord}/>
		</section>
	</div>
);
