import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from '../reducers/rootReducer';
// import { rootSaga } from '../sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware)
);

export default function configureStore () {
  return createStore(rootReducer, enhancer);
};

// export default function configureStore () {
//   return createStore(
//     rootReducer,
//     applyMiddleware(sagaMiddleware)
//   );
// };

// sagaMiddleware.run(rootSaga);