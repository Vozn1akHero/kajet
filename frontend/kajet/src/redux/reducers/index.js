import { combineReducers } from 'redux'
import collectionReducer from './collectionReducer'
import groupReducer from './groupReducer'
import userReducer from "./userReducer";

export default combineReducers({
    collection: collectionReducer,
    group: groupReducer,
    user: userReducer
})
