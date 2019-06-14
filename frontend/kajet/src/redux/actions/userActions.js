import {
    GET_USER_DATA,
    CHANGE_USER_NAME,
    CHANGE_USER_EMAIL,
    GET_USER_DATA_PENDING
} from "./types";

import apolloFetch from "../../cfg/apollo-fetch"

export const getUserData = () => async (dispatch, getState) => {
    if(Object.keys(getState().user.userData).length > 0) return;

    dispatch({
        type: GET_USER_DATA_PENDING
    });

    await apolloFetch({
        query :  `
              mutation{
                  getUserNameAndEmail{
                    name
                    email
                  }
              }
        `
    }).then(res => {
            dispatch({
                type: GET_USER_DATA,
                payload: res.data.getUserNameAndEmail
            })
        }
    );
};

export const changeUserName = newUserName => async (dispatch) => {
    await apolloFetch({
        query :  `
              mutation{
                  changeUserName(newName: "${newUserName}")
              }
        `
    }).then(() => {
        dispatch({
            type: CHANGE_USER_NAME,
            payload: {
                name: newUserName
            }
        });

        alert("Twoje imię zostało zmienione")
    });
};

export const changeUserEmail = newUserEmail => async (dispatch) => {
    await apolloFetch({
        query :  `
              mutation{
                  changeUserEmail(newEmail: "${newUserEmail}")
              }
        `
    }).then(() => {
        dispatch({
            type: CHANGE_USER_EMAIL,
            payload: {
                email: newUserEmail
            }
        });

        alert("Twój email został zmieniony")
    });
};