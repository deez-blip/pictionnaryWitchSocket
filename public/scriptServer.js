document.addEventListener('DOMContentLoaded', (event) => {
    let i = 0;
    let currentRoom = '';
    const text = document.querySelector('#message');
    const currentRoomElement = document.querySelector('#current-room');
    const dataElement = document.querySelector('.data');
    const socket = io('http://localhost:3001');

    socket.on('connect', () => {
        console.log('Connected 1234', text, currentRoom, data);
    });

    socket.on('message', (data) => {
        console.log('Received message:', data);
        dataElement.innerText += data + '\n';
    });

    socket.on('disconnect', () => {
        console.log('Disconnected');
    });

    window.changeRoom = () => {
        currentRoom = `room${i++}`;
        currentRoomElement.innerText = currentRoom;
        socket.emit('leave', currentRoom);
        socket.emit('join', currentRoom);
        console.log(`Changed to room: ${currentRoom}`);
    };

    window.sendMessage = () => {
        const message = text.value;
        socket.emit('room', currentRoom, message);
        console.log(`Sent message to ${currentRoom}: ${message}`);
    };

    socket.on('join', (room) => {
        console.log(`Joined room: ${room}`);
        // dataElement.innerText += `Joined room: ${room}\n`;
    });

    socket.on('leave', (room) => {
        console.log(`Left room: ${room}`);
        // dataElement.innerText += `Left room: ${room}\n`;
    });
});
