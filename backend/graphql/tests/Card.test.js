'use strict';

require('dotenv').config();

import {describe, it} from 'mocha'
import chai from 'chai';
const { expect } = chai;
import request from 'supertest';

const token = process.env.JWT_FOR_TESTING;

describe('GraphQL Card Queries and Mutations', () => {
    let server;

    beforeEach(() => {
        server = require('../../index.js').default;
    });

    afterEach((done) => {
        server.close();
        done();
    });

    it('Should pass if the query returns specific card', (done) => {
        const cardId = "5cefb9abbbe29a0d78d6565b";

        request(server).post('/graphql')
            .send({ query: `{ card(id: "${cardId}") { id } }`})
            .set('Authorization', 'Bearer ' + token)
            .set('Accept', 'application/json')
            .end((err,res) => {
                if (err) return done(err);
                expect(JSON.parse(res.text).data.card.id).to.equal("5cefb9abbbe29a0d78d6565b");
                done();
            })
    });

    it('Should pass if the query returns correct data of new card', (done) => {
        const newCardData = {
            id: "5cefb9abbbe29a0d78d6565b",
            newTitle: "testUpdatedTitle",
            newDescription: "testUpdatedDescription",
        };

        request(server).post('/graphql')
            .send({ query: `mutation {
                updateCard(id: "${newCardData.id}", newTitle: "${newCardData.newTitle}", newDescription: "${newCardData.newDescription}"){
                    title
                    description
                }
              }`})
            .set('Authorization', 'Bearer ' + token)
            .set('Accept', 'application/json')
            .end((err,res) => {
                if (err) return done(err);
                expect(JSON.parse(res.text).data.updateCard).to.deep.equal({
                    title: newCardData.newTitle,
                    description: newCardData.newDescription
                });
                done();
            })
    });
});