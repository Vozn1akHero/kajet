import { createApolloFetch } from 'apollo-fetch';



const uri = 'http://localhost:4000/graphql';
const apolloFetch = createApolloFetch({ uri });

apolloFetch.use(({ request, options }, next) => {
    if (!options.headers) {
        options.headers = {};
    }
    options.headers['authorization'] = 'Bearer ' + localStorage.getItem('authToken');

    next();
});

export default apolloFetch;
