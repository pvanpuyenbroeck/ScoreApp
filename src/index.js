import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import reducer from './store/reducers/reducer';
import teamReducer from './store/reducers/team';
import navigationReducer from './store/reducers/navigation';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    team:teamReducer,
    navigation:navigationReducer,
})

const store = createStore(rootReducer,composeEnhancers(
    applyMiddleware(thunk)
));



const app = (
<Provider store={store}><BrowserRouter><App/></BrowserRouter></Provider>
);
ReactDOM.render(app, document.getElementById('root'));

registerServiceWorker();