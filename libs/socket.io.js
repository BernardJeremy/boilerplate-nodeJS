
module.exports = function (io) {
  io.on('connection', function (socket) {
    console.log('New connection');
    socket.on('msg', function (data) {
      console.log(data);
      io.emit('broadcast', data);
    });
  });
};
