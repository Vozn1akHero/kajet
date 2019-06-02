import {
    GET_GROUPS,
    ADD_GROUP,
    REMOVE_GROUP_BY_ID
} from '../actions/types';

const initialState = {
    groups: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_GROUPS:
            return {
                ...state,
                groups: action.payload
            };
        case ADD_GROUP:
            return {
                ...state,
                groups: [...state.groups, action.payload]
            };
        case REMOVE_GROUP_BY_ID:
            return {
                ...state,
                groups: state.groups
                    .filter(group => group.id !== action.payload)
            };
        default:
            return state;
    }
}
