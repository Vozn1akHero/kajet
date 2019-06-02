import {GraphQLInputObjectType, GraphQLNonNull, GraphQLString} from "graphql";

export const CardInputType = new GraphQLInputObjectType({
    name: 'CardInput',
    description: 'Card user payload',
    fields: () => ({
        title: {
            type: new GraphQLNonNull(GraphQLString),
        },
        description: {
            type: new GraphQLNonNull(GraphQLString)
        }
    }),
});

