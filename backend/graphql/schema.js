import {
    GraphQLID,
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean, GraphQLInputObjectType, GraphQLScalarType
} from "graphql";

import CollectionMutations from './mutations/Collection'
import GroupMutations from './mutations/Group'
import UserMutations from "./mutations/User";
import CardMutations from "./mutations/Card";

import UserQueries from "./queries/User";
import CardQueries from "./queries/Card";
import CollectionQueries from "./queries/Collection";
import GroupQueries from "./queries/Group";


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        ...UserQueries,
        ...CardQueries,
        ...CollectionQueries,
        ...GroupQueries
    }
});


const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        ...CollectionMutations,
        ...GroupMutations,
        ...UserMutations,
        ...CardMutations
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
});

