import { createStore } from 'redux';
import rootReducer from './reducer'; // Import your rootReducer

const store = createStore(rootReducer);

export default store;