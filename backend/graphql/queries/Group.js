import {GraphQLList} from "graphql";

import GroupType from "../types/Group";

import User from "../../models/User";
import Group from "../../models/Group";

import {sliceToken} from "../../helpers/jwt";

const GroupQueries = {
    getGroups: {
        type: GraphQLList(GroupType),
        args: {},
        resolve: async (parent, args, context) => {
            let groupsToReturn = [];

            const groupsTemp = await User.findOne({ temporaryToken: sliceToken(context.headers.authorization) }).populate({path: 'groups', model: 'Group'}).exec()
                .then(user => user.groups);

            for(const group of groupsTemp){
                const collectionsOfGroup = await Group.findOne({ _id: group._id })
                    .populate({path: 'collections', model: 'Collection'})
                    .exec().then(group => group.collections);

                const groupObJTemp = {
                    id: group._id,
                    title: group.title,
                    collections: collectionsOfGroup
                };

                groupsToReturn.push(groupObJTemp);
            }

            return groupsToReturn;
        }
    }
};

export default GroupQueries;
