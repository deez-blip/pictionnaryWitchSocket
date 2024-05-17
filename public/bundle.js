(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var wordList = [
//  "Swing",
 "Coat",
 "Shoe",
 "Ocean",
 "Dog",
 "Mouth",
 "Milk",
 "Duck",
 "Skateboard",
 "Bird",
 "Mouse",
 "Whale",
 "Jacket",
 "Shirt",
 "Hippo",
 "Beach",
 "Egg",
 "Cookie",
 "Cheese",
 "Skip",
 "Drum",
 "homework",
 "Glue",
 "Eraser",
 "Peace",
//  "panic",
 "Alarm",
//  "far",
 "Comfy",
 "dripping",
 "boring",
 "hot",
 "cold",
 "parents",
 "closet",
 "laugh",
 "falling",
 "sleepover",
 "calendar",
 "sunscreen",
 "panda",
//  "detention",
 "hair",
 "ice skating",
//  "afraid",
 "dictionary",
 "homerun",
 "root beer float",
//  "hibernation",
 "street sweeper",
 "spitball",
 "drinking fountain",
 "imagination",
 "Angry",
 "Fireworks",
 "Pumpkin",
 "Baby",
 "Flower",
 "Rainbow",
 "Beard",
 "Flying saucer",
 "Recycle",
 "Bible",
 "Giraffe",
 "Sand castle",
 "Bikini",
 "Glasses",
 "Snowflake",
 "Book",
 "High heel",
 "Stairs",
 "Bucket",
 "Ice cream cone",
 "Starfish",
 "Bumble bee",
 "Igloo",
 "Strawberry",
 "Butterfly",
 "Lady bug",
 "Sun",
 "Camera",
 "Lamp",
 "Tire",
 "Cat",
 "Lion",
 "Toast",
 "Church",
 "Mailbox",
 "Toothbrush",
 "Crayon",
 "Night",
 "Toothpaste",
 "Dolphin",
 "Nose",
 "Truck",
 "Egg",
 "Olympics",
 "Volleyball",
 "Eiffel Tower",
 "Peanut",
 "cardboard box",
 "oar",
 "baby-sitter",
//  "drip",
 "shampoo",
 "point",
 "time machine",
 "yardstick",
 "think",
//  "lace darts", // undefined
 "World",
 "Avocado",
 "shower",
 "Curtain",
//  "extension cord dent", // undefined
//  "birthday lap", // undefined
 "Sandbox",
 "Bruise",
 "Quicksand",
 "Fog",
 "Gasoline",
 "pocket",
//  "honk",
 "sponge",
//  "rim",
 "bride",
 "wig",
 "zipper",
//  "wag",
//  "letter opener", // undefined
 "fiddle",
 "water buffalo",
 "pilot",
//  "brand pail", // nudefined
 "baguette",
//  "rib mascot", // undefined
 "fireman",
//  "pole zoo sushi", // undefined
//  "fizz ceiling",  // undefined
//  "fan bald", // underfind
//  "banister punk",  // underfind
 "post office",
 "season",
 "Internet",
 "chess",
 "puppet",
 "chime",
 "ivy",
 "applause",
//  "application",
 "avocato",
 "award",
 "badge",
 "baggage",
 "baker",
 "barber",
 "bargain",
 "basket",
 "bedbug",
 "bettle",
 "beggar",
 "birthday",
 "biscuit",
 "bleach",
 "blinds",
 "bobsled",
 "Bonnet",
 "bookend",
 "boundary",
 "brain",
 "bruise",
 "bubble",
 "Brain",
 "Kitten",
 "Playground",
 "Bubble bath",
 "Kiwi",
 "Pumpkin pie",
 "Buckle",
 "Lipstick",
 "Raindrop",
 "Bus",
 "Lobster",
 "Robot",
 "Car accident",
 "Lollipop",
 "Sand castle",
 "Castle",
 "Magnet",
 "Slipper",
 "Chain saw",
 "Megaphone",
 "Snowball",
 "Circus tent",
 "Mermaid",
 "Sprinkler",
 "Computer",
 "Minivan",
 "Statue of Liberty",
 "Crib",
 "Mount Rushmore",
 "Tadpole",
 "Dragon",
 "Music",
 "Teepee",
 "Dumbbell",
 "North pole",
 "Telescope",
 "Eel",
 "Nurse",
 "Train",
 "Ferris wheel",
 "Owl",
 "Tricycle",
 "Flag",
 "Pacifier",
 "Tutu",
 "Junk mail",
 "Piano",
 "Garbage",
 "Park",
 "Pirate",
 "Ski",
 "Whistle",
 "State",
 "Baseball",
 "Coal",
 "Queen",
 "Photograph",
 "Computer",
 "Hockey",
 "Hot Dog",
 "Salt and Pepper",
 "iPad",
 "Frog",
 "Lawnmower",
 "Mattress",
 "Pinwheel",
 "Cake",
 "Circus",
 "Battery",
 "Mailman",
 "Cowboy",
//  "Password",
//  "Harry Potter",
//  "Teacher",
//  "George Washington",
//  "Justin Bieber",
//  "Batman",
//  "Spongebob",
//  "Zendaya",
//  "Superman",
//  "Thomas the Tank Engine",
//  "Ariana Grande",
//  "Wonder Woman",
//  "President Donald Trump",
//  "Nemo",
//  "Black Panther",
//  "Teenage Mutant Ninja Turtles",
// //  "Incredible",
//  "Spiderman",
//  "Vampire",
// //  "Andi Mack",
//  "Captain America",
//  "Selena Gomez",
 "Back seat",
 "Highchair",
 "Rock band",
 "Birthday",
 "Hockey",
 "Sasquatch",
 "Black hole",
 "Hotel",
 "Scrambled eggs",
 "Blizzard",
 "Jump rope",
 "Seat belt",
 "Burrito",
 "Koala",
//  "Skip",
 "Captain",
 "Leprechaun",
 "Solar eclipse",
 "Chandelier",
 "Light",
 "Space",
 "Crib",
 "Mask",
 "Stethoscope",
 "Cruise ship",
//  "Carry",
 "Run",
 "Jump",
 "Swim",
//  "Skip",
 "Fly",
 "Row",
 "Catch",
 "Watch",
 "Swing",
//  "Learn",
 "Love",
 "Drink",
 "Burp",
 "Eat",
//  "Read",
//  "Type",
//  "Download",
//  "Call",
//  "Snap",
 "Text",
 "Pose",
 "Shout",
 "Sleep",
 "Scratch",
 "Hug",
 "Cut",
//  "Bang", // Hard to find
 "Spit",
 "Tie",
 "Open",
 "Listen",
 "Write",
 "Sing",
 "Pray",
//  "Close",
 "Dance",
 "Dispatch",
 "Trade",
 "Drive",
 "Unite",
 "Multiply",
 "Cook",
 "Unplug",
 "Purchase",
 "Mechanic",
 "Stork",
 "Dance",
 "Mom",
 "Sunburn",
 "Deodorant",
 "Mr Potato Head",
 "Thread",
 "Facebook",
//  "Pantyhose", // inappropreate
 "Tourist",
 "Flat",
 "Paper plate",
 "United States",
 "Frame",
 "Photo",
 "WIFI",
 "Full moon",
 "Pilgram",
 "Zombie",
 "Game",
 "Pirate",
//  "business",
 "cabin",
 "cardboard",
 "carpenter",
 "carrot",
//  "catalog",
 "ceiling",
 "channel",
 "charger",
 "cheerleader",
 "chef",
 "chess",
 "chestnut",
 "chime",
//  "Chuck Norris",
 "cliff",
 "cloak",
 "clog",
 "coach",
 "comedian",
 "comfy",
 "commercial",
 "computer monitor",
 "conversation",
 "convertible",
 "cowboy",
 "cramp",
 "criticize",
 "cruise",
 "crumbs",
 "crust",
 "cuff",
 "cupcake",
 "curtain",
//  "darkness",
 "darts",
 "dashboard",
 "Bicycle",
 "Skate",
 "Electricity",
 "Thief",
 "Teapot",
//  "Deep",
 "Spring",
 "Nature",
 "Shallow",
 "Outside",
 "America",
 "Bow tie",
 "Wax",
 "Light Bulb",
 "Music",
 "Popsicle",
 "Brain",
 "Birthday Cake",
 "Knee",
 "Pineapple",
 "Tusk",
 "Sprinkler",
 "Money",
 "Pool",
//  "Lighthouse",
 "Doormat",
 "Face",
 "Flute",
 "Rug",
 "Snowball",
 "Purse"]

function words(options) 
{
    function word() 
    {
      if (options && options.maxLength > 1) 
      {
        return generateWordWithMaxLength();
      } 
      else 
      {
        return generateRandomWord();
      }
    }
  
    function generateWordWithMaxLength() 
    {
      var rightSize = false;
      var wordUsed;
      while (!rightSize) 
      {  
        wordUsed = generateRandomWord();
        if(wordUsed.length <= options.maxLength) 
        {
          rightSize = true;
        }
      }
      return wordUsed;
    }
  
    function generateRandomWord() 
    {
      return wordList[randInt(wordList.length)];
    }
  
    function randInt(lessThan) 
    {
      return Math.floor(Math.random() * lessThan);
    }
  
    // No arguments = generate one word
    if (typeof(options) === 'undefined') 
    {
      return word();
    }
  
    // Just a number = return that many words
    if (typeof(options) === 'number') 
    {
      options = { exactly: options };
    }
  
    // options supported: exactly, min, max, join
    if (options.exactly) 
    {
      options.min = options.exactly;
      options.max = options.exactly;
    }
    
    // not a number = one word par string
    if (typeof(options.wordsPerString) !== 'number') 
    {
      options.wordsPerString = 1;
    }
  
    //not a function = returns the raw word
    if (typeof(options.formatter) !== 'function') 
    {
      options.formatter = (word) => word;
    }
  
    //not a string = separator is a space
    if (typeof(options.separator) !== 'string') 
    {
      options.separator = ' ';
    }
  
    var total = options.min + randInt(options.max + 1 - options.min);
    var results = [];
    var token = '';
    var relativeIndex = 0;
  
    for (var i = 0; (i < total * options.wordsPerString); i++) 
    {
      if (relativeIndex === options.wordsPerString - 1) 
      {
        token += options.formatter(word(), relativeIndex);
      }
      else 
      {
        token += options.formatter(word(), relativeIndex) + options.separator;
      }
      relativeIndex++;
      if ((i + 1) % options.wordsPerString === 0) 
      {
        results.push(token);
        token = ''; 
        relativeIndex = 0;
      }
    }
    if (typeof options.join === 'string') 
    {
      results = results.join(options.join);
    }
    return results;
  }
  
  module.exports = words;
  // Export the word list as it is often useful
  words.wordList = wordList;
},{}],2:[function(require,module,exports){
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

},{"word-pictionary-list":1}]},{},[2]);
