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

    it('Should pass if the query returns correct data of newly created collection', (done) => {
        request(server).post('/graphql')
            .send({ query: `mutation {
                addCollection(title: "test", cards: [{
                    title: "testCardTitle",
                    description: "testCardDesc"
                }]){
                    title
                    cards{
                        title
                    }
                }
            }`})
            .set('Authorization', 'Bearer ' + token)
            .set('Accept', 'application/json')
            .end((err,res) => {
                if (err) return done(err);

                expect(JSON.parse(res.text).data.addCollection).to.deep.equal({
                    title: "test",
                    cards: [
                        {
                            title: "testCardTitle"
                        }
                    ]
                });

                done();
            })
    });

    it('Should pass if query returns true which means the collection was successfully removed', done => {
        const collectionId = "";

        request(server).post('/graphql')
            .send({ query: `mutation {
                removeCollection(id: "${collectionId}")
            }`})
            .set('Authorization', 'Bearer ' + token)
            .set('Accept', 'application/json')
            .end((err,res) => {
                if (err) return done(err);

                expect(JSON.parse(res.text).data.addCollection).be.true;

                done();
            })
    });

    it('Should pass if query returns data of collection which title was updated', done => {
        const collectionId = "";
        const collectionTitle = "testUpdatedTitle";

        request(server).post('/graphql')
            .send({ query: `mutation {
                changeCollectionTitle(id: "${collectionId}", newTitle: "${collectionTitle}"){
                    title
                }
            }`})
            .set('Authorization', 'Bearer ' + token)
            .set('Accept', 'application/json')
            .end((err,res) => {
                if (err) return done(err);

                expect(JSON.parse(res.text).data.changeCollectionTitle).to.deep.equal({
                    title: collectionTitle
                });

                done();
            })
    });

    it('Should pass if query returns data of requested collection', done => {
        const collectionId = "";

        request(server).post('/graphql')
            .send({ query: `{
                collection(id: "${collectionId}"){
                    title
                    cards
                }
            }`})
            .set('Authorization', 'Bearer ' + token)
            .set('Accept', 'application/json')
            .end((err,res) => {
                if (err) return done(err);

                expect(JSON.parse(res.text).data.collection.length > 0).be.true;

                done();
            })
    });

    it('Should pass if query returns data of requested collections', done => {
        request(server).post('/graphql')
            .send({ query: `{
                        getCollections{
                            title
                            cards
                        }
                    }`})
            .set('Authorization', 'Bearer ' + token)
            .set('Accept', 'application/json')
            .end((err,res) => {
                if (err) return done(err);

                expect(JSON.parse(res.text).data.getCollections.length > 0).be.true;

                done();
            })
    });
});