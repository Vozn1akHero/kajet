import apolloFetch from "../../../../cfg/apollo-fetch";
import {logOut} from "../../../../security/auth/Auth";

export const changeUserPassword = async (oldPassword, newPassword) => {
    const res = await apolloFetch({
        query :  `
              mutation{
                  changeUserPassword(oldPassword: "${oldPassword}",
                   newPassword: "${newPassword}")
              }
        `
    }).then(res => res.data.changeUserPassword);

    if(res) {
        logOut();
    }
    else alert("Stare hasło nie jest prawidłowe");
};