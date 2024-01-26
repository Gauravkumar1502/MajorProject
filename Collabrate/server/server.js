const io = require('socket.io')(4000, {
    cors: {
        // allow access from any origin
        origin: '*',
    }
});

// map of room to list of users
const rooms = new Map();

console.log('Server is up and running on port 4000');

io.on('connection', socket => {
    console.log('New user with id: ' + socket.id);

    // create-room
    socket.on('create-room', (roomID, callback) => {
        if (rooms.has(roomID)) {
            callback(false);
        } else {
            socket.join(roomID);
            rooms.set(roomID, new Map([['roomID', socket]]));
            callback(true);
        }
        // print rooms map
        console.log(rooms);
    });

    socket.on('join-room', (roomID, callback) => {
        if (rooms.has(roomID)) {
            socket.join(roomID);
            rooms.get(roomID).set(socket.id, socket);
            callback(true);
        } else {
            callback(false);
        }
        // print rooms map
        console.log(rooms);
    });

    socket.on('sync-text', (roomID, text) => {
        console.log('sync-text event received from room: ' + roomID);
        console.log('text: ' + text);
        socket.to(roomID).emit('sync-text', text);
    });

    socket.on('disconnect', () => {
        console.log('\u001b[31m', 'User with id: ' + socket.id + ' disconnected \u001b[0m');
    });

});