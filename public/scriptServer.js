document.addEventListener("DOMContentLoaded", (event) => {
  let i = 0;
  let currentRoom = "";
  const text = document.querySelector("#message");
  const currentRoomElement = document.querySelector("#current-room");
  const chatElement = document.getElementById("chat");
  const socket = io("http://localhost:3001");

  const canvas = document.getElementById("drawing-canvas");
  const ctx = canvas.getContext("2d");
  let drawing = false;
  let current = { color: "black" };
  let username = localStorage.getItem("username");
  let role = "";
  const randomPictionaryWords = require("word-pictionary-list");
  let selectedWord = "";
  let randomWords = "";
  let word = "";

  if (!username) {
    window.location.href = "/";
    return;
  }

  if (role !== "drawer") {
    document.getElementById("pick-word").style.display = "none";
  }

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
    socket.emit("leave", currentRoom);
    currentRoom = `room${i++}`;
    currentRoomElement.innerText = currentRoom;
    socket.emit("join", currentRoom);
    console.log(`Changed to room: ${currentRoom}`);
    clearWhenChangingRoom();
  };

  clearWhenChangingRoom = () => {
    clearCanvas(true);
    document.querySelector("#chat").innerHTML = "";
    socket.emit("role", { role: "", username }); //TODO FIX TEXTE QUI S'AFFICHE
    role = "";
    selectedWord = null;
  };

  window.sendMessage = () => {
    const message = text.value;
    socket.emit("room", currentRoom, { message, username });
    console.log(`Sent message to ${currentRoom}: ${message}`);

    if (message.toLowerCase() === selectedWord.toLowerCase()) {
      alert("You won!");
      socket.emit("room", currentRoom, {
        username: "Game",
        message: username + " has won!",
      });
    }
  };

  socket.on("join", (room) => {
    console.log(`Joined room: ${room}`);
  });

  socket.on("leave", (room) => {
    console.log(`Left room: ${room}`);
  });

  const drawLine = (x0, y0, x1, y1, color, emit) => {
    console.log(
      `Drawing line from (${x0}, ${y0}) to (${x1}, ${y1}) with color ${color}`
    );
    ctx.strokeStyle = color;
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

  const clearCanvas = (emit) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!emit) {
      return;
    }
    socket.emit("clearCanvas", { room: currentRoom });
  };

  const onMouseDown = (e) => {
    if (role !== "drawer") return;
    drawing = true;
    current.x = e.clientX - canvas.offsetLeft;
    current.y = e.clientY - canvas.offsetTop;
    console.log(`Mouse down at (${current.x}, ${current.y})`);
  };

  const onMouseUp = (e) => {
    if (!drawing || role !== "drawer") return;
    drawing = false;
    console.log(
      `Mouse up at (${e.clientX - canvas.offsetLeft}, ${e.clientY - canvas.offsetTop})`
    );
    drawLine(
      current.x,
      current.y,
      e.clientX - canvas.offsetLeft,
      e.clientY - canvas.offsetTop,
      current.color,
      true
    );
  };

  const onMouseMove = (e) => {
    if (!drawing || role !== "drawer") return;
    console.log(
      `Mouse move at (${e.clientX - canvas.offsetLeft}, ${e.clientY - canvas.offsetTop})`
    );
    drawLine(
      current.x,
      current.y,
      e.clientX - canvas.offsetLeft,
      e.clientY - canvas.offsetTop,
      current.color,
      true
    );
    current.x = e.clientX - canvas.offsetLeft;
    current.y = e.clientY - canvas.offsetTop;
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
  });

  document.querySelector("#become-guesser").addEventListener("click", () => {
    socket.emit("role", { role: "guesser", username });
    document.getElementById("pick-word").style.display = "none";
  });

  document.querySelector("#color-picker").addEventListener("input", (e) => {
    current.color = e.target.value;
  });

  document.querySelector("#clear-canvas").addEventListener("click", () => {
    clearCanvas(true);
  });

  document.querySelector("#pick-word").addEventListener("click", () => {
    randomWords = randomPictionaryWords(3);
    let modal = document.querySelector(".modal");
    let span = modal.querySelector(".close");
    let modalButton = modal.querySelector(".modal-button");
    modal.style.display = "block";

    span.onclick = () => {
      modal.style.display = "none";
    };

    window.onclick = (event) => {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };

    modalButton.innerHTML = "";

    for (let word of randomWords) {
      let button = document.createElement("button");
      button.textContent = word;

      button.onclick = function () {
        console.log(`Button with word ${word} was clicked.`);
        modal.style.display = "none";

        selectedWord = word;
        console.log(`Stored local value: ${selectedWord}`);
        randomWords = "";

        socket.emit("selectedWord", { word: selectedWord });
      };
      modalButton.appendChild(button);
    }
  });

  socket.on("role", (data) => {
    role = data.role;
    const { role: newRole, username } = data;
    const roleMessage = `${username} is now the ${newRole}`;
    console.log(roleMessage);
    chatElement.innerHTML += `<p>${roleMessage}</p>`;
  });
});
