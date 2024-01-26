import { io } from "socket.io-client"

const socket = io('http://localhost:4000');
let roomID = ''; 

const createRoom = document.getElementById('create-room');
const joinRoom = document.getElementById('join-room');

const logging = document.getElementById('logging');
const peopleList = document.getElementById('people-list');
const textArea = document.getElementById('text-area');

createRoom.addEventListener('click', () => {
    roomID = prompt('Enter room ID: ');
    if (!roomID) {
        alert('Please enter a valid room ID');
        return;
    }
    if (roomID) {
        // emit event to server with callback
        socket.emit('create-room', roomID, (success) => {
            if (!success) {
                alert('Room already exists');
                return;
            }
            logging.innerHTML += "<p>Room created successfully</p>";
            logging.innerHTML += "<p>you joined room: " + roomID + "</p>";
            textArea.disabled = false;
            textArea.focus();
            textArea.addEventListener('input', () => {
                socket.emit('sync-text', roomID, textArea.value);
            });
        });
        // socket.emit('create-room', roomID);
    }
});

joinRoom.addEventListener('click', () => {
    roomID = prompt('Enter room ID: ');
    if (!roomID) {
        alert('Please enter a valid room ID');
        return;
    }
    if (roomID) {
        // emit event to server with callback
        socket.emit('join-room', roomID, (success) => {
            if (!success) {
                alert('Room does not exist');
                return;
            }
            logging.innerHTML += "<p>you joined room: " + roomID + "</p>";
            textArea.disabled = false;
            textArea.focus();
            textArea.addEventListener('input', () => {
                socket.emit('sync-text', roomID, textArea.value);
            });
        });
    }
});

socket.on('connect', () => {
    console.log('You are connected with id: ' + socket.id);
    logging.innerHTML += "<p>You are connected with id: " + socket.id + "</p>";
    peopleList.innerHTML += `<div class="avatar">
    <p>${(socket.id).substring(0, 3)}</p></div>`;
});

socket.on('sync-text', (text) => {
    textArea.value = text;
});