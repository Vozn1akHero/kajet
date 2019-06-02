import mongoose from "mongoose";
import Card from "./Card"

const Schema = mongoose.Schema;

const CollectionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    cards: [{
        type: Schema.Types.ObjectId,
        ref: 'Card',
        required: false
    }],
    creationDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const Collection = mongoose.model("Collection", CollectionSchema);

export default Collection;
