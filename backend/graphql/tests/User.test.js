'use strict';

require('dotenv').config();

import {describe, it} from 'mocha'
import chai from 'chai';
const { expect } = chai;
import request from 'supertest';

const token = process.env.JWT_FOR_TESTING;

describe('GraphQL Group Queries and Mutations', () => {
    let server;

    beforeEach(() => {
        server = require('../../index.js').default;
    });

    afterEach((done) => {
        server.close();
        done();
    });

    it('Should pass if returns id of requested user by temporary token', done => {
        request(server).post('/graphql')
            .send({ query: `{ user(temporaryToken: "${token}") { id } }`})
            .set('Authorization', 'Bearer ' + token)
            .set('Accept', 'application/json')
            .end((err,res) => {
                if (err) return done(err);
                expect(JSON.parse(res.text).data.user.id).to.not.be.null;
                done();
            })
    })
});