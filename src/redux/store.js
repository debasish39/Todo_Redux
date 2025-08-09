// // src/redux/store.js
// import { createStore } from 'redux';
// import todoReducer from './reducers';

// // Load todos from localStorage
// const loadState = () => {
//   try {
//     const serializedState = localStorage.getItem('todoList');
//     if (serializedState === null) {
//       return undefined; // No saved state, use default
//     }
//     return JSON.parse(serializedState);
//   } catch (e) {
//     console.error("Could not load state", e);
//     return undefined;
//   }
// };

// // Save todos to localStorage
// const saveState = (state) => {
//   try {
//     const serializedState = JSON.stringify(state);
//     localStorage.setItem('todoList', serializedState);
//   } catch (e) {
//     console.error("Could not save state", e);
//   }
// };

// const persistedState = loadState();
// const store = createStore(todoReducer, persistedState);

// // Listen for changes and save them
// store.subscribe(() => {
//   saveState(store.getState());
// });

// export default store;

// src/redux/store.js
import { createStore } from 'redux';
import todoReducer from './reducers';

const store = createStore(
  todoReducer,
  JSON.parse(localStorage.getItem('todoList')) || undefined
);

store.subscribe(() => {
  localStorage.setItem('todoList', JSON.stringify(store.getState()));
});

export default store;
