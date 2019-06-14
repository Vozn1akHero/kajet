import {
    GET_COLLECTIONS_PENDING,
    GET_COLLECTIONS,
    GET_COLLECTION_BY_ID,
    ADD_COLLECTION,
    REMOVE_COLLECTION_BY_ID,
    UPDATE_COLLECTION_CARDS_BY_ID,
    UPDATE_COLLECTION_TITLE_BY_ID
} from './types';

import apolloFetch from "../../cfg/apollo-fetch"

export const getCollections = () => async (dispatch, getState) => {
    if(getState().collection.collections.length > 0) return;

    dispatch({
        type: GET_COLLECTIONS_PENDING
    });

    await apolloFetch({
        query :  `
          query{
              getCollections{
                id
                title
                cards {
                  id
                  title
                  description
                }
              }
            }
        `
    }).then(res => {
        dispatch({
        type: GET_COLLECTIONS,
        payload: res.data.getCollections
        })
    });
};

export const getCollectionById = id => async dispatch => {
    const collectionsRes = await apolloFetch({
        query :  `
          query{
              collection(id: "${id}"){
                id
                title
                cards{
                  id
                  title
                  description
                }
              }
            }
        `
    }).then(res => res.data.collection);


    dispatch({
        type: GET_COLLECTION_BY_ID,
        payload: collectionsRes
    })
};

export const addCollection = collection => async dispatch => {
    let cardsString="";

    for(const [index, card] of collection.cards.entries()){
        if(collection.cards.length - index === 1){
            cardsString += `{title: "${card.title}", description: "${card.description}"}`;
        }
        else cardsString += `{title: "${card.title}", description: "${card.description}"}, `;
    }

    const newCollectionRes = await apolloFetch({
      query: `
        mutation {
          addCollection(title: "${collection.title}", cards: [${cardsString}]){
            id
            title
            cards{
              title
            }
          }
        }
      `
    }).then(res => res.data.addCollection);

    dispatch({
      type: ADD_COLLECTION,
      payload: newCollectionRes
    })
};

export const removeCollectionById = id => async dispatch => {
    await apolloFetch({
        query: `
            mutation{
              removeCollection(id: "${id}")
            }
        `
    }).then(res => res.data);

    dispatch({
        type: REMOVE_COLLECTION_BY_ID,
        payload: id
    })
};

export const updateCollectionCardsById = ({ id, newTitle, newDescription }) => dispatch => {
    dispatch({
        type: UPDATE_COLLECTION_CARDS_BY_ID,
        payload: {
            id, newTitle, newDescription
        }
    })
};

export const updateCollectionTitleById = ({ id, newTitle }) => dispatch => {
    dispatch({
        type: UPDATE_COLLECTION_TITLE_BY_ID,
        payload: {
            id, newTitle
        }
    })
};
