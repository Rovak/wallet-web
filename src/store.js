import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

export function configureStore() {
  const enhancer = compose(
    applyMiddleware(thunk),
  );

  return createStore(reducer, enhancer);
}
