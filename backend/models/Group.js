import mongoose from "mongoose";
import Collection from "./Collection";

const Schema = mongoose.Schema;

const GroupSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    collections: [{
        type: Schema.Types.ObjectId,
        ref: 'Collection',
        required: false
    }],
    creationDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});

GroupSchema.statics.findById = function(id, cb){
    return this.find({_id: id});
};

GroupSchema.statics.findByTitle = function(name, cb){
    return this.find({ title: "/^"+name+"/"});
};

const Group = mongoose.model("Group", GroupSchema);


export default Group;
