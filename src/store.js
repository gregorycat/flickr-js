import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './front/reducers';

export default initialState => {
    const composeEnhancers =
        /* eslint-disable no-underscore-dangle */
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    return createStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(thunk)),
    );
};
