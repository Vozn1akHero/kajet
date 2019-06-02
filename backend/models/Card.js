import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CardSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const Card = mongoose.model("Card", CardSchema);

export default Card;
