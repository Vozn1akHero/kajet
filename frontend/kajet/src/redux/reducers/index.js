import { combineReducers } from 'redux'
import collectionReducer from './collectionReducer'
import groupReducer from './groupReducer'

export default combineReducers({
    collection: collectionReducer,
    group: groupReducer
})
