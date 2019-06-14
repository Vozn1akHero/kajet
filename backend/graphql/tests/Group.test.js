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

    it('Should pass if the query returns any groups', (done) => {
        request(server).post('/graphql')
            .send({ query: '{ getGroups { title } }'})
            .set('Authorization', 'Bearer ' + token)
            .set('Accept', 'application/json')
            .end((err,res) => {
                if (err) return done(err);
                expect(JSON.parse(res.text).data.getGroups.length > 0).be.true;
                done();
            })
    });

    it('Should pass if the query returns inserted data of created group', done => {
        request(server).post('/graphql')
            .send({ query: `mutation {
              addGroup(title: "test", collections: ["5cefb9abbbe29a0d78d6565d"]){
                title
                collections{
                  id
                }
              }
            }`})
            .set('Authorization', 'Bearer ' + token)
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) return done(err);
                expect(JSON.parse(res.text)).to.deep.equal({
                    data: {
                        addGroup: {
                            title: "test",
                            collections: [
                                {
                                    id: "5cefb9abbbe29a0d78d6565d"
                                }
                            ]
                        }
                    }
                });
                done();
            })
    });

    it('Should return true if a group was successfully removed', done => {
        request(server).post('/graphql')
            .send({ query: `mutation {
              addGroup(title: "test", collections: ["5cefb9abbbe29a0d78d6565d"]){
                id
              }
            }`})
            .set('Authorization', 'Bearer ' + token)
            .set('Accept', 'application/json')
            .end((err, res) => {
                server.close();

                request(server).post('/graphql')
                    .send({ query: `mutation{
                        removeGroup(id: "${JSON.parse(res.text).data.addGroup.id}")
                    }`})
                    .set('Authorization', 'Bearer ' + token)
                    .set('Accept', 'application/json')
                    .end((err, res) => {
                        if (err) return done(err);

                        expect(JSON.parse(res.text).data.removeGroup).be.true;
                        done();
                    });
            });
    })
});