export const sliceToken = token => {
    const bearer = token.split(' ');
    const bearerToken = bearer[1];

    return bearerToken;
};
