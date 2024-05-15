document.addEventListener('DOMContentLoaded', (event) => {
    let i = 0;
    let currentRoom = '';
    const text = document.querySelector('#message');
    const currentRoomElement = document.querySelector('#current-room');
    const dataElement = document.querySelector('.data');
    const socket = io('http://localhost:3001');
    
    const canvas = document.getElementById('drawing-canvas');
    const ctx = canvas.getContext('2d');
    let drawing = false;
    let current = { color: 'black' };

    socket.on('connect', () => {
        console.log('Connected', text, currentRoom, dataElement);
    });

    socket.on('message', (data) => {
        console.log('Received message:', data);
        dataElement.innerText += data + '\n';
    });

    socket.on('draw', (data) => {
        const { x0, y0, x1, y1, color } = data;
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.stroke();
        ctx.closePath();
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
    });

    socket.on('leave', (room) => {
        console.log(`Left room: ${room}`);
    });

    const drawLine = (x0, y0, x1, y1, color, emit) => {
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.stroke();
        ctx.closePath();

        if (!emit) { return; }
        const w = canvas.width;
        const h = canvas.height;

        socket.emit('draw', {
            x0: x0 / w,
            y0: y0 / h,
            x1: x1 / w,
            y1: y1 / h,
            color
        });
    };

    const onMouseDown = (e) => {
        drawing = true;
        current.x = e.clientX;
        current.y = e.clientY;
    };

    const onMouseUp = (e) => {
        if (!drawing) { return; }
        drawing = false;
        drawLine(current.x, current.y, e.clientX, e.clientY, current.color, true);
    };

    const onMouseMove = (e) => {
        if (!drawing) { return; }
        drawLine(current.x, current.y, e.clientX, e.clientY, current.color, true);
        current.x = e.clientX;
        current.y = e.clientY;
    };

    const throttle = (callback, delay) => {
        let previousCall = new Date().getTime();
        return function() {
            const time = new Date().getTime();

            if ((time - previousCall) >= delay) {
                previousCall = time;
                callback.apply(null, arguments);
            }
        };
    };

    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mouseup', onMouseUp, false);
    canvas.addEventListener('mouseout', onMouseUp, false);
    canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false);
});
