require('dotenv').config();
import express from "express";
import graphqlHTTP from "express-graphql";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import jwt from 'express-jwt'

import { ApolloServer } from 'apollo-server-express';

import schema from './graphql/schema';

const app = express();
const PORT = process.env.PORT || "4000";
const db = `mongodb+srv://${process.env.DB_LOGIN}:${process.env.DB_PASS}@cluster0-v3amg.azure.mongodb.net/test?retryWrites=true`;

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors(corsOptions));

const authRoute = require('./auth/index');
app.use('/auth', authRoute);

mongoose
    .connect(
        db,
        {
            useCreateIndex: true,
            useNewUrlParser: true
        }
    )
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

const auth = jwt({
    secret: process.env.JWT_KEY,
    credentialsRequired: true
});


app.use(
    "/graphql",
    cors(corsOptions),
    bodyParser.json(),
    auth,
    graphqlHTTP( {
        schema: schema,
        graphiql: true
    })
);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


