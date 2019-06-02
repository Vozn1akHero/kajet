import {
    GET_GROUPS,
    ADD_GROUP,
    REMOVE_GROUP_BY_ID
} from '../actions/types';

import apolloFetch from "../cfg/apollo-fetch"


export const addGroup = (title, collections) => async dispatch => {
    console.log(title, collections);

    let collectionsString = "";
    for(const [index, collectionId] of collections.entries()){
        if(collections.length - index === 1) collectionsString += `"${collectionId}"`;
        else collectionsString += `"${collectionId}", `;
    }
    const groups = await apolloFetch({
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
    }).then(res => { return res.data.addGroup });

    dispatch({
        type: ADD_GROUP,
        payload: groups
    })
};

export const getGroups = () => async dispatch => {
    const groupsRes = await apolloFetch({
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
    }).then(res => res.data.getGroups);

    dispatch({
        type: GET_GROUPS,
        payload: groupsRes
    })
};

export const removeGroupById = id => async dispatch => {
    await apolloFetch({
        query: `
            mutation{
              removeGroup(id: "${id}")
            }
        `
    }).then(res => res.data);

    dispatch({
        type: REMOVE_GROUP_BY_ID,
        payload: id
    })
};
