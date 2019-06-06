import {GraphQLBoolean, GraphQLList, GraphQLNonNull, GraphQLString} from "graphql";

import CollectionType from "../types/Collection";

import {CardInputType} from "../inputTypes";

import Card from "../../models/Card";
import User from "../../models/User";
import Collection from "../../models/Collection";

import {sliceToken} from "../../helpers/jwt";

const CollectionMutations = {
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

            await newCollection.save((err, collection) => {
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
    }
};

export default CollectionMutations;
