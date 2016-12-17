var net = require('net');
var _ = require('lodash');
var EventEmitter = require('eventemitter3');

var net = require('net');

class TcpServer extends EventEmitter {
  constructor() {
    super();
    this.server = net.createServer();
  }

  // sensor:1111111111,pid_error:0;sensor:1111111111,pid_error:0;
  parseMessage(msg) {
    console.log(msg);

    var self = this;

    var messages = msg.split(";");

    _.each(messages, function(message){
      var valuePairs = message.split(",");

      _.each(valuePairs, function(valuePair){
        var statValue = {}
        statValue[valuePair.split(":")[0]] = valuePair.split(":")[1];

        self.emit('newStat', statValue);
      });
    })

    var stat = {};
    stat["sensors"] = msg;

  }

  launch() {

    var self = this;

    function handleConnection(connection) {
      var remoteAddress = connection.remoteAddress + ':' + connection.remotePort;
      console.log('new client connection from %s', remoteAddress);

      connection.on('data', dataReceived);
      connection.once('close', onConnClose);
      connection.on('error', onConnError);

      function dataReceived(data){
        self.parseMessage(data.toString('binary'));
      }

      function onConnClose() {
        console.log('connection from %s closed', remoteAddress);
      }

      function onConnError(err) {
        console.log('Connection %s error: %s', remoteAddress, err.message);
      }
    }

    this.server.on('connection', handleConnection);
    var self = this;
    this.server.listen(1337, "192.168.4.2", function() {
      console.log('server listening to %j', self.server.address());
    });
  }
}

export let tcpServer = new TcpServer();
