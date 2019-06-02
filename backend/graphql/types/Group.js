import {GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString} from "graphql";
import CollectionType from "./Collection";

const GroupType = new GraphQLObjectType({
    name: 'Group',
    fields: () => ({
        id: { type: GraphQLID},
        title: { type: GraphQLString },
        collections: {
            type: new GraphQLList(CollectionType)
        },
        creationDate: { type: GraphQLString }
    })
});

export default GroupType;
