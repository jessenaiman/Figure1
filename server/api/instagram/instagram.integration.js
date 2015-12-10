'use strict';

var app = require('../..');
var request = require('supertest');

var newInstagram;

describe('Instagram API:', function() {

  describe('GET /api/instagrams', function() {
    var instagrams;

    beforeEach(function(done) {
      request(app)
        .get('/api/instagrams')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          instagrams = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      instagrams.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/instagrams', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/instagrams')
        .send({
          name: 'New Instagram',
          info: 'This is the brand new instagram!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newInstagram = res.body;
          done();
        });
    });

    it('should respond with the newly created instagram', function() {
      newInstagram.name.should.equal('New Instagram');
      newInstagram.info.should.equal('This is the brand new instagram!!!');
    });

  });

  describe('GET /api/instagrams/:id', function() {
    var instagram;

    beforeEach(function(done) {
      request(app)
        .get('/api/instagrams/' + newInstagram._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          instagram = res.body;
          done();
        });
    });

    afterEach(function() {
      instagram = {};
    });

    it('should respond with the requested instagram', function() {
      instagram.name.should.equal('New Instagram');
      instagram.info.should.equal('This is the brand new instagram!!!');
    });

  });

  describe('PUT /api/instagrams/:id', function() {
    var updatedInstagram

    beforeEach(function(done) {
      request(app)
        .put('/api/instagrams/' + newInstagram._id)
        .send({
          name: 'Updated Instagram',
          info: 'This is the updated instagram!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedInstagram = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedInstagram = {};
    });

    it('should respond with the updated instagram', function() {
      updatedInstagram.name.should.equal('Updated Instagram');
      updatedInstagram.info.should.equal('This is the updated instagram!!!');
    });

  });

  describe('DELETE /api/instagrams/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/instagrams/' + newInstagram._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when instagram does not exist', function(done) {
      request(app)
        .delete('/api/instagrams/' + newInstagram._id)
        .expect(404)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
