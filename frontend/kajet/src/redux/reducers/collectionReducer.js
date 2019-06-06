import {
    GET_COLLECTIONS_PENDING,
    GET_COLLECTIONS,
    GET_COLLECTION_BY_ID,
    ADD_COLLECTION,
    REMOVE_COLLECTION_BY_ID,
    UPDATE_COLLECTION_CARDS_BY_ID, UPDATE_COLLECTION_TITLE_BY_ID
} from '../actions/types';


const initialState = {
    pending: false,
    collections: [],
    collection: {}
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_COLLECTIONS_PENDING:
            return {
                ...state,
                pending: true
            };
        case GET_COLLECTIONS:
            return {
                ...state,
                pending: false,
                collections: action.payload
            };
        case GET_COLLECTION_BY_ID:
            return {
              ...state,
              collection: action.payload
            };
        case ADD_COLLECTION:
            return{
                ...state,
                collections: [...state.collections, action.payload]
            };
        case REMOVE_COLLECTION_BY_ID:
            return{
                ...state,
                collections: state.collections.filter(collection => collection.id !== action.payload)
            };
        case UPDATE_COLLECTION_CARDS_BY_ID:
            return{
                ...state,
                collection: {
                    ...state.collection,
                    cards: [...state.collection.cards.map(card => card.id === action.payload.id ?
                        {
                            ...card,
                            title: action.payload.newTitle,
                            description: action.payload.newDescription
                        } : card)]
                }
            };
        case UPDATE_COLLECTION_TITLE_BY_ID:
            return{
                ...state,
                collections: state.collections.map(collection => collection.id === action.payload.id ? {
                    ...collection,
                    title: action.payload.newTitle
                } : collection )
            };
        default:
            return state;
    }
}

export const getCollectionsSelector = state => state.collections;
