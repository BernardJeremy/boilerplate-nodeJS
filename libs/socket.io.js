module.exports.init = function(server) {
  let io = require('socket.io')(server);

  io.on('connection', function(socket){
    // add socket management here
  });

  return io;
};
