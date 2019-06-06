import {
    GET_GROUPS_PENDING,
    GET_GROUPS,
    ADD_GROUP,
    REMOVE_GROUP_BY_ID
} from '../actions/types';

const initialState = {
    pending: false,
    groups: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_GROUPS_PENDING:
            return {
                ...state,
                pending: true
            };
        case GET_GROUPS:
            return {
                ...state,
                pending: false,
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
