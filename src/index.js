import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import {BrowserRouter} from 'react-router-dom';
import App from '../src/components/App';
import registerServiceWorker from './registerServiceWorker';
import promise from "redux-promise";
import reducers from "./reducers";

import './style/main.css';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
	<Provider store={createStoreWithMiddleware(reducers)}>
		<BrowserRouter>
			<div>
				<App/>
			</div>
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);
registerServiceWorker();
