import {GraphQLList, GraphQLString} from "graphql";

import CollectionType from "../types/Collection";

import Collection from "../../models/Collection";
import User from "../../models/User";

import {sliceToken} from "../../helpers/jwt";

const CollectionQueries = {
    collection: {
        type: CollectionType,
        args: { id: { type: GraphQLString }},
        resolve: async (parent, { id }) => {
            return await Collection.findOne({_id: id}).populate('cards').exec().then(collection =>
            {
                return collection;
            })
        }
    },
    getCollections: {
        type: GraphQLList(CollectionType),
        args: { },
        resolve: (parent, args, context) => {
            return User.findOne({ temporaryToken: sliceToken(context.headers.authorization) }).populate({path: 'collections', model: 'Collection'}).exec()
                .then(user => user.collections);
        }
    }
};

export default CollectionQueries;
