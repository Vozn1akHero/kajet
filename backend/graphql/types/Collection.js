import {GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString} from "graphql";
import CardType from "./Card";

const CollectionType = new GraphQLObjectType({
    name: 'Collection',
    fields: () => ({
        id: { type: GraphQLID},
        title: { type: GraphQLString },
        cards: {
            type: new GraphQLList(CardType)
        },
        creationDate: { type: GraphQLString }
    })
});

export default CollectionType;
