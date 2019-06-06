import {GraphQLNonNull, GraphQLString} from "graphql";

import CardType from "../types/Card";

import Card from "../../models/Card";

const CardMutations = {
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
};

export default CardMutations;
