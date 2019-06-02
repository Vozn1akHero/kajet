import mongoose from "mongoose";
import Collection from "./Collection";
import Group from "./Group";

import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    collections: [{
        type: Schema.Types.ObjectId,
        ref: 'Collection',
        required: false
    }],
    groups: [{
        type: [Schema.Types.ObjectId],
        ref: 'Group',
        required: false
    }],
    temporaryToken: {
        type: String,
        required: false
    }
});

UserSchema.statics.changeUserName = async (token, newName) => {
    return await User.findOneAndUpdate({ temporaryToken: token },
        { name: newName }
    );
};

UserSchema.statics.getUserNameAndEmail = async token => {
    return await User.findOne({temporaryToken: token}).select('name email')
};

UserSchema.statics.changeUserEmail = async (token, newEmail) => {
    return await User.findOneAndUpdate({ temporaryToken: token },
        { email: newEmail});
};

UserSchema.statics.changeUserPassword = async (token, oldPassword, newPassword) => {
    const userRealPassword = await User.findOne({ temporaryToken: token }).select('password');
    bcrypt.compare(oldPassword, userRealPassword.password,(err, result) => {
        if(result) {
            bcrypt.hash(newPassword, 10, async (err, hash) => {
                await User.findOneAndUpdate({ temporaryToken: token }, { password: hash});
            });

            return true;
        }

        else return false;
    });
};

const User = mongoose.model("User", UserSchema);

export default User;
