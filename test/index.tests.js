var should = require("should");
var redis = require('../index');
var distro = require('distro');
var sinon = require('sinon');
var logger = {log: sinon.spy()};

describe('redis', function () {
  var factory = distro.create(redis);
  var serverInfo = {port: 6379};

  it('should receive a message', function (done) {
    var headers = {uri: "MSG", verb: 'POST', address: "127.0.0.1", port: 6379};
    var obj = distro.message(headers, "payload");
    var server = factory.server(serverInfo);
    server.receive(function (err, msg) {
      msg.payload.should.equal("payload");
      server.close();
      done();
    });
    setTimeout(function () {
      factory.client(serverInfo).send(obj);
    }, 50);
  });

  it('should handle HEAD', function (done) {
    var headers = {uri: "MSG", verb: 'HEAD', address: "127.0.0.1", port: 41235};
    var obj = distro.message(headers, "head-payload");
    var server = factory.server(serverInfo);
    server.head("MSG", function (err, msg) {
      msg.payload.should.equal("head-payload");
      server.close();
      done();
    });
    setTimeout(function () {
      factory.client(serverInfo).send(obj);
    }, 50);
  });

  it('should handle GET', function (done) {
    var headers = {uri: "MSG", verb: 'GET', address: "127.0.0.1", port: 41235};
    var obj = distro.message(headers, "get-payload");
    var server = factory.server(serverInfo);
    server.get("MSG", function (err, msg) {
      msg.payload.should.equal("get-payload");
      server.close();
      done();
    });
    setTimeout(function() {
      factory.client(serverInfo).send(obj);
    }, 50);
  });

  it('should handle POST', function (done) {
    var headers = {uri: "MSG", verb: 'POST', address: "127.0.0.1", port: 41235};
    var obj = distro.message(headers, "post-payload");
    var server = factory.server(serverInfo);
    server.post("MSG", function (err, msg) {
      msg.payload.should.equal("post-payload");
      server.close();
      done();
    });
    setTimeout(function() {
      factory.client(serverInfo).send(obj);
    }, 50);
  });
  
  it('should handle PUT', function (done) {
    var headers = {uri: "MSG", verb: 'PUT', address: "127.0.0.1", port: 41235};
    var obj = distro.message(headers, "put-payload");
    var server = factory.server(serverInfo);
    server.put("MSG", function (err, msg) {
      msg.payload.should.equal("put-payload");
      server.close();        
      done();
    });
    setTimeout(function() {
      factory.client(serverInfo).send(obj);
    }, 50);
  });
  
  it('should handle DELETE', function (done) {
    var headers = {uri: "MSG", verb: 'DELETE', address: "127.0.0.1", port: 41235};
    var obj = distro.message(headers, "del-payload");
    var server = factory.server(serverInfo);
    server.del("MSG", function (err, msg) {
      msg.payload.should.equal("del-payload");
      server.close();
      done();
    });
    setTimeout(function() {
      factory.client(serverInfo).send(obj);
    }, 50);
  });

  it('should not handle POST in the wrong URL', function (done) {
    var headers = {uri: "MSG", verb: 'POST', address: "127.0.0.1", port: 41235};
    var obj = distro.message(headers, "post-payload");
    var server = factory.server(serverInfo);
    var spyCb = sinon.spy();
    server.post("NON", spyCb);
    factory.client(serverInfo).send(obj);
    setTimeout(function() {
      spyCb.called.should.be.false;
      server.close();
      done();
    }, 50);
  });

  it('should not handle if no registration for the verb', function (done) {
    var headers = {uri: "MSG", verb: 'POST', address: "127.0.0.1", port: 41235};
    var obj = distro.message(headers, "post-payload");
    var server = factory.server(serverInfo);
    var spyCb = sinon.spy();
    server.get("MSG", spyCb);
    factory.client(serverInfo).send(obj);
    setTimeout(function() {
      spyCb.called.should.be.false;
      server.close();
      done();
    }, 50);
  });
});