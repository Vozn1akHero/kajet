import UserType from "../types/User";

import User from "../../models/User";

import {sliceToken} from "../../helpers/jwt";

const UserQueries = {
    user: {
        type: UserType,
        args: { },
        resolve: async (parent, args, context) => {
            return await User.findOne({ temporaryToken: sliceToken(context.headers.authorization)});
        }
    }
};

export default UserQueries;
