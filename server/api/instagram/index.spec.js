'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var instagramCtrlStub = {
  index: 'instagramCtrl.index',
  show: 'instagramCtrl.show',
  create: 'instagramCtrl.create',
  update: 'instagramCtrl.update',
  destroy: 'instagramCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var instagramIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './instagram.controller': instagramCtrlStub
});

describe('Instagram API Router:', function() {

  it('should return an express router instance', function() {
    instagramIndex.should.equal(routerStub);
  });

  describe('GET /api/instagrams', function() {

    it('should route to instagram.controller.index', function() {
      routerStub.get
        .withArgs('/', 'instagramCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/instagrams/:id', function() {

    it('should route to instagram.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'instagramCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/instagrams', function() {

    it('should route to instagram.controller.create', function() {
      routerStub.post
        .withArgs('/', 'instagramCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/instagrams/:id', function() {

    it('should route to instagram.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'instagramCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/instagrams/:id', function() {

    it('should route to instagram.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'instagramCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/instagrams/:id', function() {

    it('should route to instagram.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'instagramCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
