import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore"; // <- needed if using firestore

export default combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});
