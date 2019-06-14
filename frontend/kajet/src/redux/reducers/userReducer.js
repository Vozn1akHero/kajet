import {
    GET_USER_DATA_PENDING,
    GET_USER_DATA,
    CHANGE_USER_NAME,
    CHANGE_USER_EMAIL
} from '../actions/types';

const initialState = {
    pending: false,
    userData: {}
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_USER_DATA_PENDING:
            return {
                ...state,
                pending: true
            };
        case GET_USER_DATA:
            return {
                ...state,
                pending: false,
                userData: action.payload
            };
        case CHANGE_USER_NAME:
            return {
                ...state,
                userData: { ...state.userData, ...action.payload }
            };
        case CHANGE_USER_EMAIL:
            return {
                ...state,
                userData: { ...state.userData, ...action.payload }
            };
        default:
            return state;
    }
}