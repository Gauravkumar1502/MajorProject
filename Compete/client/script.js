import { io } from "socket.io-client"

const messages = document.getElementById('messages');
messages.innerHTML = "<h1>Messages</h1><hr>";

// create a variable to hold roomID
let roomID = ''; 

// const io = require('socket.io-client');

const socket = io('http://localhost:3000');

socket.on('connect', () => {
    console.log('You are connected with id: ' + socket.id);
    messages.innerHTML += "<p>You are connected with id: " + socket.id + "</p>";
});

socket.on('broadcast-message', message => {
    messages.innerHTML += "<p>" + message + "</p>";
});

socket.on('wait-for-user', message => {
    messages.innerHTML += "<p>" + message + "</p>";
    console.log('wait-for-user: ' + socket.rooms);
});

socket.on('start-game', (question, room) => {
    roomID = room;
    messages.innerHTML += 'start-game: ' + socket.id + ' user joined room: ' + roomID
    messages.innerHTML += "<p>" + question + "</p>";
});

socket.on('private-message', message => {
    messages.innerHTML += "<p>" + message + "</p>";
});

// Handle disconnect event
socket.on('disconnect', () => {
    console.log('You are disconnected');
    messages.innerHTML += "<p>You are disconnected</p>";
});

document.getElementById('send')
.addEventListener('click', sendMessage);

function sendMessage() {
    // console.log('Sending message...');
    const message = document.getElementById('message');
    // messages.innerHTML += "<p>" + message.value + "</p>";
    // socket.emit('send-message', message.value);
    // message.value = '';
    console.log('Sending answer...');
    // list all rooms of the current socket
    console.log(message);
    // console.log('Type of socket.rooms: ' + typeof socket.rooms);
    socket.emit('send-answer', message.value, roomID);
}

