import {GraphQLBoolean, GraphQLList, GraphQLNonNull, GraphQLString} from "graphql";

import GroupType from "../types/Group";

import Collection from "../../models/Collection";
import Group from "../../models/Group";
import User from "../../models/User";

import {sliceToken} from "../../helpers/jwt";

const GroupMutations = {
    addGroup: {
        type: GroupType,
        args: { title: { type: new GraphQLNonNull(GraphQLString) },
            collections: {type: new GraphQLNonNull(GraphQLList(GraphQLString))}
        },
        resolve: async (parent, { title, collections }, context) => {
            let collectionsArray = [];

            for(const collection of collections){
                collectionsArray.push(await Collection.findOne({ _id: collection }));
            }

            const newGroup = new Group({title: title, collections: collectionsArray});
            await newGroup.save();

            await User.updateOne(
                { temporaryToken: sliceToken(context.headers.authorization) },
                {
                    $push:{
                        groups: newGroup
                    }
                });

            return newGroup;
        }
    },
    removeGroup: {
        type: GraphQLBoolean,
        args: { id: { type: new GraphQLNonNull(GraphQLString)}},
        resolve: async (parent, { id }) => {
            await Group.deleteOne({ _id: id });
            return true;
        }
    }
};

export default GroupMutations;
