import {
    GraphQLID,
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean, GraphQLInputObjectType, GraphQLScalarType
} from "graphql";

import Card from "../models/Card";
import User from "../models/User";
import Collection from "../models/Collection";
import Group from "../models/Group";

import { CardInputType } from './inputTypes'

import CardType from './types/Card';
import CollectionType from './types/Collection';
import GroupType from './types/Group';
import UserType from './types/User';

import { sliceToken } from '../helpers/jwt'

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { },
            resolve: async (parent, args, context) => {
                return await User.findOne({ temporaryToken: sliceToken(context.headers.authorization)});
            }
        },
        card: {
            type: CardType,
            args: { id: { type: GraphQLString }},
            resolve(parent, { id }){
                return Card.findOne({_id: id}).then(res => res);
            }
        },
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
        },
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
    }
});


const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addCollection: {
            type: CollectionType,
            args: { title: { type: new GraphQLNonNull(GraphQLString) },
                cards: {type: new GraphQLNonNull(GraphQLList(CardInputType))}
            },
            resolve: async (parent, { title, cards }, context) => {
                let newCards = [];

                for await(const card of cards) {
                    const newCard = new Card(card);
                    newCard.save();
                    newCards.push(newCard);
                }

                const newCollection = new Collection({ title: title, cards: newCards });

                const savedCollection = await newCollection.save((err, collection) => {
                    return collection;
                });


                await User.updateOne(
                    { temporaryToken: sliceToken(context.headers.authorization) },
                    {
                        $push:{
                            collections: newCollection
                        }
                    });

                return newCollection;
            }
        },
        removeCollection: {
            type: GraphQLBoolean,
            args: { id: { type: new GraphQLNonNull(GraphQLString)}},
            resolve: async (parent, { id }) => {
                await Collection.deleteOne({ _id: id });
                return true;
            }
        },
        removeCollectionOfGroup: {
            type: GraphQLBoolean,
            args: { id: { type: new GraphQLNonNull(GraphQLString)}},
            resolve: async (parent, { id }) => {
                /*await Group.*/
                return true;
            }
        },
        changeCollectionTitle: {
            type: CollectionType,
            args: { id: { type: new GraphQLNonNull(GraphQLString)},
                newTitle: { type: new GraphQLNonNull(GraphQLString)}},
            resolve: async (parent, { id, newTitle }) => {
                return await Collection.findOneAndUpdate({ _id: id },
                    { title: newTitle },
                    (err, newtitle) => newtitle);
            }
        },
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
        },
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
        updateCard: {
            type: CardType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString)},
                newTitle: { type:  new GraphQLNonNull(GraphQLString)},
                newDescription: { type:  new GraphQLNonNull(GraphQLString)}
            },
            resolve: async (parent, {id, newTitle, newDescription}) => {
                return await Card.findOneAndUpdate({ _id: id },
                    { $set: { title: newTitle, description: newDescription }},
                    (err, updatedCard) => updatedCard)
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
});

