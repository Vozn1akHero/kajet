import {GraphQLString} from "graphql";

import CardType from "../types/Card";

import Card from "../../models/Card";

const CardQueries = {
    card: {
        type: CardType,
        args: { id: { type: GraphQLString }},
        resolve(parent, { id }){
            return Card.findOne({_id: id}).then(res => res);
        }
    }
};

export default CardQueries;
