document.addEventListener('DOMContentLoaded', (event) => {
    let i = 0;
    let currentRoom = '';
    const text = document.querySelector('#message');
    const currentRoomElement = document.querySelector('#current-room');
    const chatElement = document.getElementById('chat');
    const socket = io('http://localhost:3001');

    const canvas = document.getElementById('drawing-canvas');
    const ctx = canvas.getContext('2d');
    let drawing = false;
    let current = { color: 'black' };
    let username = localStorage.getItem('username');
    let role = '';

    if (!username) {
        window.location.href = '/';
        return;
    }

    if (role !== "drawer") {
        document.getElementById("pick-word").style.display = "none";
    }

    // Liste des mots
    const wordsList = [
        'arbre', 'voiture', 'maison', 'chien', 'chat', 'oiseau', 'poisson', 'éléphant', 'bateau', 'avion',
        'fleur', 'soleil', 'lune', 'étoile', 'montagne', 'plage', 'mer', 'rivière', 'pont', 'vélo',
        'train', 'bus', 'ordinateur', 'téléphone', 'livre', 'chaise', 'table', 'lit', 'télévision', 'guitare',
        'piano', 'violon', 'tambour', 'arbre de Noël', 'cadeau', 'ballon', 'cerf-volant', 'clown', 'robot', 'dinosaure',
        'pirate', 'sorcière', 'fantôme', 'château', 'roi', 'reine', 'prince', 'princesse', 'super-héros', 'dragon',
        'magicien', 'fée', 'extraterrestre', 'monstre', 'ninja', 'samouraï', 'viking', 'gladiateur', 'chevalier', 'épée',
        'arc', 'flèche', 'bouclier', 'casque', 'armure', 'dinosaure', 'mamouth', 'grotte', 'cascade', 'volcan',
        'désert', 'jungle', 'forêt', 'île', 'iceberg', 'igloo', 'esquimau', 'pingouin', 'ours polaire', 'renne',
        'traîneau', 'Père Noël', 'lutin', 'cadeau', 'bonhomme de neige', 'carotte', 'écharpe', 'chapeau', 'gants', 'bottes',
        'pull', 'pantalon', 'robe', 'jupe', 'chemise', 'cravate', 'lunettes', 'montre', 'sac à main', 'valise'
    ];

    // ? MODAL POP UP START
    const modal = document.getElementById('word-modal');
    const closeModalButton = document.getElementById('close-modal');
    const modalButtonsContainer = document.getElementById('modal-buttons');

    closeModalButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Fonction pour obtenir des mots aléatoires
    const getRandomWords = (count) => {
        const shuffled = wordsList.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    document.getElementById('pick-word').addEventListener('click', () => {
        if (role !== 'drawer') return;

        const words = getRandomWords(3);

        modalButtonsContainer.innerHTML = '';

        words.forEach(word => {
            const button = document.createElement('button');
            button.textContent = word;
            button.addEventListener('click', () => {
                console.log(`Chosen word: ${word}`);

                // Display the selected word to all users in the room
                socket.emit('selectedWordToServer', { word: word, room: currentRoom });
                console.log('done')
                modal.style.display = 'none';
            });
            modalButtonsContainer.appendChild(button);
        });

        modal.style.display = 'block';
    });

    // ? MODAL POP UP END

    // Display the selected word to all users in the room
    socket.on('selectedWord', (word) => {
        const selectedWordElement = document.getElementById('selected-word');
        selectedWordElement.textContent = `Selected word: ${word}`;
    });

    socket.on('connect', () => {
        console.log('Connected');
    });

    socket.on('message', (data) => {
        const msg = `${data.username}: ${data.message}`;
        console.log('Received message:', msg);
        chatElement.innerHTML += `<p>${msg}</p>`;
    });

    socket.on('draw', (data) => {
        console.log('Drawing data received:', data);
        const { x0, y0, x1, y1, color } = data;
        drawLine(x0 * canvas.width, y0 * canvas.height, x1 * canvas.width, y1 * canvas.height, color, false);
    });

    socket.on('clearCanvas', () => {
        clearCanvas(false);
    });

    socket.on('disconnect', () => {
        console.log('Disconnected');
    });

    window.changeRoom = () => {
        socket.emit('leave', currentRoom);
        currentRoom = `room${i++}`;
        currentRoomElement.innerText = currentRoom;
        socket.emit('join', currentRoom);
        console.log(`Changed to room: ${currentRoom}`);
    };

    window.sendMessage = () => {
        const message = text.value;
        socket.emit('room', currentRoom, { message, username });
        console.log(`Sent message to ${currentRoom}: ${message}`);
    };

    socket.on('join', (room) => {
        console.log(`Joined room: ${room}`);
    });

    socket.on('leave', (room) => {
        console.log(`Left room: ${room}`);
    });

    const drawLine = (x0, y0, x1, y1, color, emit) => {
        console.log(`Drawing line from (${x0}, ${y0}) to (${x1}, ${y1}) with color ${color}`);
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
            color,
            room: currentRoom
        });
    };

    const clearCanvas = (emit) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (!emit) { return; }
        socket.emit('clearCanvas', { room: currentRoom });
    };

    const getMousePos = (canvas, evt) => {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.pageX - rect.left - window.scrollX,
            y: evt.pageY - rect.top - window.scrollY
        };
    };    

    const onMouseDown = (e) => {
        if (role !== 'drawer') return;
        drawing = true;
        const pos = getMousePos(canvas, e);
        current.x = pos.x;
        current.y = pos.y;
        console.log(`Mouse down at (${current.x}, ${current.y})`);
    };

    const onMouseUp = (e) => {
        if (!drawing || role !== 'drawer') return;
        drawing = false;
        const pos = getMousePos(canvas, e);
        console.log(`Mouse up at (${pos.x}, ${pos.y})`);
        drawLine(current.x, current.y, pos.x, pos.y, current.color, true);
    };

    const onMouseMove = (e) => {
        if (!drawing || role !== 'drawer') return;
        const pos = getMousePos(canvas, e);
        console.log(`Mouse move at (${pos.x}, ${pos.y})`);
        drawLine(current.x, current.y, pos.x, pos.y, current.color, true);
        current.x = pos.x;
        current.y = pos.y;
    };

    const throttle = (callback, delay) => {
        let previousCall = new Date().getTime();
        return function () {
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

    document.querySelector('#become-drawer').addEventListener('click', () => {
        socket.emit('role', { role: 'drawer', username });
        document.getElementById("pick-word").style.display = "block";
        role = 'drawer';
    });

    document.querySelector('#become-guesser').addEventListener('click', () => {
        socket.emit('role', { role: 'guesser', username });
        document.getElementById("pick-word").style.display = "none";
        role = 'guesser';
    });

    document.querySelector('#color-picker').addEventListener('input', (e) => {
        current.color = e.target.value;
    });

    document.querySelector('#clear-canvas').addEventListener('click', () => {
        clearCanvas(true);
    });

    socket.on('role', (data) => {
        role = data.role;
        const { role: newRole, username } = data;
        const roleMessage = `${username} is now the ${newRole}`;
        console.log(roleMessage);
        chatElement.innerHTML += `<p>${roleMessage}</p>`;
    });
});
