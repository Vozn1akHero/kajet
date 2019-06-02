import {GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString} from "graphql";
import CollectionType from "./Collection";
import User from "../../models/User";
import GroupType from "./Group";

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID},
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        collections: {
            type: new GraphQLList(CollectionType),
            resolve: (parent, args) => {
                return User.findOne({ id: parent.id }).populate({path: 'collections', model: 'Collection'}).exec()
                    .then(user => user.collections); //nie działa
            }
        },
        groups: {
            type: new GraphQLList(GroupType)
        }
    })
});


export default UserType;
