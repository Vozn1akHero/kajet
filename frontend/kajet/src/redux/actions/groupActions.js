import {
    GET_GROUPS,
    ADD_GROUP,
    REMOVE_GROUP_BY_ID, GET_GROUPS_PENDING
} from './types';

import apolloFetch from "../../cfg/apollo-fetch"


export const addGroup = (title, collections) => dispatch => {
    let collectionsString = "";
    for(const [index, collectionId] of collections.entries()){
        if(collections.length - index === 1) collectionsString += `"${collectionId}"`;
        else collectionsString += `"${collectionId}", `;
    }

    apolloFetch({
        query: `
            mutation {
              addGroup(title: "${title}", collections: [
                ${collectionsString}
              ]){
                id
                title
                collections{
                  id
                  title
                  cards{
                    title
                  }
                }
              }
            }
        `
    }).then(res => {
        dispatch({
            type: ADD_GROUP,
            payload: res.data.addGroup
        })
    });
};

export const getGroups = () => async (dispatch, getState) => {
    if(getState().group.groups.length > 0) return;

    dispatch({
        type: GET_GROUPS_PENDING
    });

    await apolloFetch({
        query: `
            query{
              getGroups{
                id
                title
                collections{
                  id
                  title
                  cards{
                    title
                  }
                }
              }
            }
        `
    }).then(res => {
        dispatch({
            type: GET_GROUPS,
            payload: res.data.getGroups
        })
    });
};

export const removeGroupById = id => async dispatch => {
    await apolloFetch({
        query: `
            mutation{
              removeGroup(id: "${id}")
            }
        `
    });

    dispatch({
        type: REMOVE_GROUP_BY_ID,
        payload: id
    })
};
