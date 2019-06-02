import {GraphQLID, GraphQLObjectType, GraphQLString} from "graphql";

const CardType = new GraphQLObjectType({
    name: 'Card',
    fields: {
        id: { type: GraphQLID},
        title: { type: GraphQLString },
        description: { type: GraphQLString }
    }
});

export default CardType;
