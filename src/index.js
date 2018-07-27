import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './RootReducer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import initialState from './components/initialState';

const store = createStore(rootReducer, initialState);

ReactDOM.render(
	<Provider store={store}>
		  <App />
	</Provider>, 
	document.getElementById('root')
);
registerServiceWorker();
