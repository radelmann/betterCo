var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');
var app = require('../server.js');

describe("better company api - Server - REST API Routes", function() {

  describe('/api/get', function() {
    it('responds with a 200 (successful) and the json array of messages', function(done) {

      request(app)
        .get('/api/get/')
        .expect(function(res) {
          expect(res.body.data).to.exist;
          expect(res.body.data).to.be.array;
        })
        .expect(200, done);
    });
  });

  describe('/api/post', function() {
    it('responds with a 200 (successful) and returned json object of new comment post', function(done) {

      var data = {
          message: 'this is a new message',
          userName: 'spec test user'
        };

      request(app)
        .post('/api/post/')
        .send(data)
        .expect(function(res) {
          expect(res.body).to.exist;
          //expect(res.body.id).to.exist;
          //expect(res.body.name).to.equal('new_user_api_test');
        })
        .expect(200, done);
    });
  });
});