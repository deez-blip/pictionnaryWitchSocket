document.addEventListener("DOMContentLoaded", (event) => {
  let i = 0;
  let currentRoom = "";
  let selectedWord = ""; // Variable pour stocker le mot sélectionné localement
  const text = document.querySelector("#message");
  const currentRoomElement = document.querySelector("#current-room");
  const chatElement = document.getElementById("chat");
  // const socket = io("http://localhost:3001");
  const socket = io('https://pictionnarywitchsocket.onrender.com');

  const canvas = document.getElementById("drawing-canvas");
  const ctx = canvas.getContext("2d");
  let drawing = false;
  let current = { color: "black" };
  let username = localStorage.getItem("username");
  let role = "";
  let lineWidth = 1;
  let erasing = false;
  let drawingCircle = false;
  let filling = false;

  if (!username) {
    window.location.href = "/";
    return;
  }

  if (role !== "drawer") {
    document.getElementById("pick-word").style.display = "none";
  }

  // Liste des mots
  const wordsList = [
    "arbre",
    "voiture",
    "maison",
    "chien",
    "chat",
    "oiseau",
    "poisson",
    "éléphant",
    "bateau",
    "avion",
    "fleur",
    "soleil",
    "lune",
    "étoile",
    "montagne",
    "plage",
    "mer",
    "rivière",
    "pont",
    "vélo",
    "train",
    "bus",
    "ordinateur",
    "téléphone",
    "livre",
    "chaise",
    "table",
    "lit",
    "télévision",
    "guitare",
    "piano",
    "violon",
    "tambour",
    "arbre de Noël",
    "cadeau",
    "ballon",
    "cerf-volant",
    "clown",
    "robot",
    "dinosaure",
    "pirate",
    "sorcière",
    "fantôme",
    "château",
    "roi",
    "reine",
    "prince",
    "princesse",
    "super-héros",
    "dragon",
    "magicien",
    "fée",
    "extraterrestre",
    "monstre",
    "ninja",
    "samouraï",
    "viking",
    "gladiateur",
    "chevalier",
    "épée",
    "arc",
    "flèche",
    "bouclier",
    "casque",
    "armure",
    "dinosaure",
    "mamouth",
    "grotte",
    "cascade",
    "volcan",
    "désert",
    "jungle",
    "forêt",
    "île",
    "iceberg",
    "igloo",
    "esquimau",
    "pingouin",
    "ours polaire",
    "renne",
    "traîneau",
    "Père Noël",
    "lutin",
    "cadeau",
    "bonhomme de neige",
    "carotte",
    "écharpe",
    "chapeau",
    "gants",
    "bottes",
    "pull",
    "pantalon",
    "robe",
    "jupe",
    "chemise",
    "cravate",
    "lunettes",
    "montre",
    "sac à main",
    "valise",
  ];

  // ? MODAL POP UP START
  const modal = document.getElementById("word-modal");
  const closeModalButton = document.getElementById("close-modal");
  const modalButtonsContainer = document.getElementById("modal-buttons");

  closeModalButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Fonction pour obtenir des mots aléatoires
  const getRandomWords = (count) => {
    const shuffled = wordsList.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  document.getElementById("pick-word").addEventListener("click", () => {
    if (role !== "drawer") return;

    const words = getRandomWords(3);

    modalButtonsContainer.innerHTML = "";

    document.querySelector("#pick-word-title").innerHTML = "Pick a word:";

    words.forEach((word) => {
      const button = document.createElement("button");
      button.textContent = word;
      button.addEventListener("click", () => {
        console.log(`Chosen word: ${word}`);

        // Display the selected word to all users in the room
        socket.emit("selectedWordToServer", { word: word, room: currentRoom });
        console.log("done");
        modal.style.display = "none";
      });
      modalButtonsContainer.appendChild(button);
    });

    modal.style.display = "block";
  });

  // ? MODAL POP UP END

  // Display the selected word to all users in the room
  socket.on("selectedWord", (data) => {
    const selectedWordElement = document.getElementById("selected-word");
    if (role === "drawer") {
      selectedWordElement.textContent = `Selected word: ${data.word}`;
    } else {
      selectedWordElement.textContent = `Selected word: ${"-".repeat(data.word.length)}`; // Affiche le mot masqué
    }
    selectedWord = data.word; // Stocker le mot sélectionné localement
    console.log(`Mot sélectionné reçu : ${selectedWord}`);
  });

  socket.on("connect", () => {
    console.log("Connected");
  });

  socket.on("message", (data) => {
    const msg = `${data.username}: ${data.message}`;
    console.log("Received message:", msg);
    chatElement.innerHTML += `<p>${msg}</p>`;
  });

  socket.on("draw", (data) => {
    console.log("Drawing data received:", data);
    const { x0, y0, x1, y1, color } = data;
    drawLine(
      x0 * canvas.width,
      y0 * canvas.height,
      x1 * canvas.width,
      y1 * canvas.height,
      color,
      false
    );
  });

  socket.on("clearCanvas", () => {
    clearCanvas(false);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected");
  });

  window.changeRoom = () => {
    if (currentRoom) {
      socket.emit("leave", currentRoom);
    }
    currentRoom = `room${i++}`;
    currentRoomElement.innerText = currentRoom;
    const username = document.getElementById("username").value;
    socket.emit("join", currentRoom, username);
    console.log(`Changed to room: ${currentRoom}`);
    clearWhenChangingRoom();
  };

  let clearWhenChangingRoom = () => {
    clearCanvas(true);
    document.querySelector("#chat").innerHTML = "";
    document.getElementById("pick-word").style.display = "none";
    role = "";
    selectedWord = "";
  };

  window.sendMessage = () => {
    const message = text.value;
    console.log(`Message envoyé : ${message}`);
    console.log(`Mot sélectionné : ${selectedWord}`);

    // Normaliser les chaînes pour supprimer les accents avant comparaison
    const normalizeString = (str) =>
      str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    socket.emit("room", currentRoom, { message, username });

    // Comparer le message normalisé avec le mot sélectionné normalisé
    if (
      role === "guesser" &&
      normalizeString(message.toLowerCase()) ===
        normalizeString(selectedWord.toLowerCase())
    ) {
        socket.emit("room", currentRoom, { message : "a trouvé le bon mot", username });
      socket.emit("wordGuessed", currentRoom);
      modal.style.display = "block";
      document.querySelector("#pick-word-title").innerHTML = "";
      const p = document.createElement("p");
      p.textContent = "vous avez trouvé le mot!";
      modalButtonsContainer.innerHTML = "";
      modalButtonsContainer.appendChild(p);
      socket.emit("selectedWordToServer", { word: "", room: currentRoom });
    } else {
      console.log("Mot incorrect");
    }

    text.value = "";
  };

  socket.on("join", (room) => {
    console.log(`Joined room: ${room}`);
  });

  socket.on("leave", (room) => {
    console.log(`Left room: ${room}`);
  });

  window.increaseLineWidth = () => {
    lineWidth = 5;
    erasing = false;
  };

  window.decreaseLineWidth = () => {
    lineWidth = 1;
    erasing = false;
  };

  window.toggleEraser = () => {
    erasing = !erasing;
    lineWidth = 20;
  };

  window.toggleCircleDrawing = () => {
    drawingCircle = !drawingCircle;
    erasing = false;
  };

  window.toggleFill = () => {
    filling = !filling;
    drawingCircle = false;
    erasing = false;
  };

  const drawLine = (x0, y0, x1, y1, color, emit) => {
    console.log(
      `Drawing line from (${x0}, ${y0}) to (${x1}, ${y1}) with color ${color}`
    );
    ctx.strokeStyle = erasing ? "white" : color;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
    ctx.closePath();

    if (!emit) {
      return;
    }
    const w = canvas.width;
    const h = canvas.height;

    socket.emit("draw", {
      x0: x0 / w,
      y0: y0 / h,
      x1: x1 / w,
      y1: y1 / h,
      color,
      room: currentRoom,
    });
  };

  const drawCircle = (x0, y0, radius, color, lineWidth, emit) => {
    console.log(
      `Drawing circle at (${x0}, ${y0}) with radius ${radius} and color ${color}`
    );
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.arc(x0, y0, radius, 0, Math.PI * 2, false);
    ctx.stroke();
    ctx.closePath();

    if (!emit) {
      return;
    }
    const w = canvas.width;
    const h = canvas.height;

    socket.emit("drawCircle", {
      x0: x0 / w,
      y0: y0 / h,
      radius: radius / Math.sqrt(w * w + h * h), // Normalize radius
      color,
      room: currentRoom,
    });
  };

  const floodFill = (startX, startY, newColor) => {
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const startPixel = ctx.getImageData(startX, startY, 1, 1);
    const startColor = startPixel.data;
    const newColorData = [
      parseInt(newColor.slice(1, 3), 16),
      parseInt(newColor.slice(3, 5), 16),
      parseInt(newColor.slice(5, 7), 16),
    ];
    const pixelData = ctx.getImageData(0, 0, canvasWidth, canvasHeight).data;
    const pixelsChecked = new Set();

    function checkPixel(x, y) {
      const idx = (y * canvasWidth + x) * 4;
      return (
        pixelData[idx] === startColor[0] &&
        pixelData[idx + 1] === startColor[1] &&
        pixelData[idx + 2] === startColor[2]
      );
    }

    function drawPixel(x, y) {
      const idx = (y * canvasWidth + x) * 4;
      pixelData[idx] = newColorData[0];
      pixelData[idx + 1] = newColorData[1];
      pixelData[idx + 2] = newColorData[2];
    }

    function scanLine(x, y) {
      let left = x;
      let right = x;
      while (left > 0 && checkPixel(left - 1, y)) left--;
      while (right < canvasWidth - 1 && checkPixel(right + 1, y)) right++;
      for (let i = left; i <= right; i++) {
        drawPixel(i, y);
        pixelsChecked.add(`${i},${y}`);
      }
      if (y > 0) {
        for (let i = left; i <= right; i++) {
          if (!pixelsChecked.has(`${i},${y - 1}`) && checkPixel(i, y - 1)) {
            scanLine(i, y - 1);
          }
        }
      }
      if (y < canvasHeight - 1) {
        for (let i = left; i <= right; i++) {
          if (!pixelsChecked.has(`${i},${y + 1}`) && checkPixel(i, y + 1)) {
            scanLine(i, y + 1);
          }
        }
      }
    }

    scanLine(startX, startY);
    ctx.putImageData(new ImageData(pixelData, canvasWidth, canvasHeight), 0, 0);

    socket.emit("floodFill", {
      x: startX,
      y: startY,
      color: newColor,
      room: currentRoom,
    });
  };

  const clearCanvas = (emit) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!emit) {
      return;
    }
    socket.emit("clearCanvas", { room: currentRoom });
  };

  const getMousePos = (canvas, evt) => {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.pageX - rect.left - window.scrollX,
      y: evt.pageY - rect.top - window.scrollY,
    };
  };
  const onMouseDown = (e) => {
    if (role !== "drawer") return;
    const pos = getMousePos(canvas, e);
    if (filling) {
      floodFill(pos.x, pos.y, current.color);
    } else {
      drawing = true;
      current.x = pos.x;
      current.y = pos.y;
      console.log(`Mouse down at (${current.x}, ${current.y})`);
    }
  };

  const onMouseUp = (e) => {
    if (!drawing || role !== "drawer") return;
    drawing = false;
    const pos = getMousePos(canvas, e);
    console.log(`Mouse up at (${pos.x}, ${pos.y})`);
    if (!drawingCircle) {
      drawLine(current.x, current.y, pos.x, pos.y, current.color, true);
    } else {
      const radius = Math.sqrt(
        Math.pow(pos.x - current.x, 2) + Math.pow(pos.y - current.y, 2)
      );
      drawCircle(current.x, current.y, radius, current.color, true);
    }
  };

  const onMouseMove = (e) => {
    if (!drawing || role !== "drawer") return;
    const pos = getMousePos(canvas, e);
    console.log(`Mouse move at (${pos.x}, ${pos.y})`);
    if (!drawingCircle) {
      drawLine(current.x, current.y, pos.x, pos.y, current.color, true);
      current.x = pos.x;
      current.y = pos.y;
    }
  };

  const throttle = (callback, delay) => {
    let previousCall = new Date().getTime();
    return function () {
      const time = new Date().getTime();
      if (time - previousCall >= delay) {
        previousCall = time;
        callback.apply(null, arguments);
      }
    };
  };

  canvas.addEventListener("mousedown", onMouseDown, false);
  canvas.addEventListener("mouseup", onMouseUp, false);
  canvas.addEventListener("mouseout", onMouseUp, false);
  canvas.addEventListener("mousemove", throttle(onMouseMove, 10), false);

  document.querySelector("#become-drawer").addEventListener("click", () => {
    socket.emit("role", { role: "drawer", username });
    document.getElementById("pick-word").style.display = "block";
    role = "drawer";
  });

  document.querySelector("#become-guesser").addEventListener("click", () => {
    socket.emit("role", { role: "guesser", username });
    document.getElementById("pick-word").style.display = "none";
    role = "guesser";
  });

  document.querySelector("#color-picker").addEventListener("input", (e) => {
    current.color = e.target.value;
  });

  document.querySelector("#clear-canvas").addEventListener("click", () => {
    clearCanvas(true);
  });

  socket.on("role", (data) => {
    role = data.role;
    const { role: newRole, username } = data;
    const roleMessage = `${username} is now the ${newRole}`;
    console.log(roleMessage);
    chatElement.innerHTML += `<p>${roleMessage}</p>`;

    if (newRole === "drawer") {
      document.getElementById("pick-word").style.display = "block";
    } else {
      document.getElementById("pick-word").style.display = "none";
    }
  });
});
