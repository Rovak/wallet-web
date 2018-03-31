import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

export function configureStore() {
  const enhancer = compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return createStore(reducer, enhancer);
}
