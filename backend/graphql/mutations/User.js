import {GraphQLBoolean, GraphQLNonNull, GraphQLString} from "graphql";

import UserType from "../types/User";

import User from "../../models/User";
import Group from "../../models/Group";
import Collection from "../../models/Collection";
import Card from "../../models/Card";

import {sliceToken} from "../../helpers/jwt";

const UserMutations = {
    changeUserName: {
        type: GraphQLBoolean,
        args: { newName: { type: new GraphQLNonNull(GraphQLString)}},
        resolve: (parent, { newName }, context) => {
            return User.changeUserName(sliceToken(context.headers.authorization), newName);
        }
    },
    changeUserEmail: {
        type: GraphQLBoolean,
        args: { newEmail: { type: new GraphQLNonNull(GraphQLString)}},
        resolve: (parent, { newEmail }, context) => {
            return User.changeUserEmail(sliceToken(context.headers.authorization), newEmail);
        }
    },
    getUserNameAndEmail: {
        type: UserType,
        args: {},
        resolve: (parent, args, context) => {
            return User.getUserNameAndEmail(sliceToken(context.headers.authorization));
        }
    },
    changeUserPassword: {
        type: GraphQLBoolean,
        args: { oldPassword: {type: new GraphQLNonNull(GraphQLString)},
            newPassword: {type: new GraphQLNonNull(GraphQLString)}
        },
        resolve: (parent, { oldPassword, newPassword }, context) => {
            return User.changeUserPassword(sliceToken(context.headers.authorization),
                oldPassword, newPassword);
        }
    },
    deleteAccount: {
        type: GraphQLBoolean,
        args: {},
        resolve: (parent, { oldPassword, newPassword }, context) => {
            User.findOneAndDelete({token: sliceToken(context.headers.authorization)} , (err, removedUser) => {
                if (err)
                    throw err;

                for(const group of removedUser.groups){
                    Group.findByIdAndDelete({id: group.id});
                }

                for(const collection of removedUser.collections){
                    Collection.findByIdAndDelete({id: collection.id}, (err, removedCollection) => {
                        for(const card of removedCollection.cards){
                            Card.findOneAndDelete({id: card.id});
                        }
                    })
                }
            });
        }
    },
};

export default UserMutations;
