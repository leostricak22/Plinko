const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

let engine;
let world;
let circles = [];
let bounds = [];
let pegs = [];
let cols = 19;
let rows = 16;
let bucketCounts = new Array(cols).fill(0);
let boundaryPositions = [];

const urlParams = new URLSearchParams(window.location.search);
if(urlParams.get("space") == null)
    SPACECONSTANT = 2
else
    SPACECONSTANT = urlParams.get('space');       

let input, button;

let money=100;

let sideBoundary1 = new Boundary(0, windowHeight / 2, 10, windowHeight);
let sideBoundary2 = new Boundary(windowWidth, windowHeight / 2, 10, windowHeight);
bounds.push(sideBoundary1);
bounds.push(sideBoundary2);

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    engine = Engine.create();
    world = engine.world;
    world.gravity.y = 1;

    let maxPegsPerRow = rows + 2;
    let spacing = windowWidth / ((maxPegsPerRow + 1) * SPACECONSTANT); 

    for (let j = 0; j < rows - 2; j++) {
        let pegsThisRow = j + 3;
        let totalPegsWidth = pegsThisRow * spacing;
        let leftoverSpace = windowWidth - totalPegsWidth;
        let offset = leftoverSpace / 2;
        for (let i = 0; i < pegsThisRow; i++) {
            let x = i * spacing + offset;
            let y = spacing + j * spacing;
            let p = new Peg(x, y, 10);
            pegs.push(p);
        }
    }

    let bucketWidth = spacing;
    let totalBucketsWidth = (maxPegsPerRow + 1) * bucketWidth;
    let leftoverSpace = windowWidth - totalBucketsWidth;  
    let adjustment = -25;
    let offset = (leftoverSpace / 2) + adjustment; 

    let multipliers = [100, 25, 10, 5, 2, 1, 0.2];
    let colors = ['palegoldenrod', 'lightcoral', 'orange', 'peachpuff', 'yellow', 'yellow', 'palegoldenrod'];
    
    for (let i = 0; i < maxPegsPerRow + 2; i++) {
      let x = i * spacing + offset;
      boundaryPositions.push(x);
      let h = 100;
      let w = 10;
      let y = windowHeight - h / 2;
    
      let color, multiplier;
    
      if (i === 0 || i === maxPegsPerRow) {
        color = colors[0];
        multiplier = multipliers[0];
      } else if (i === 1 || i === maxPegsPerRow - 1) {
        color = colors[0];
        multiplier = multipliers[1];
      } else if (i === 2 || i === maxPegsPerRow - 2) {
        color = colors[0];
        multiplier = multipliers[2];
      } else if (i === 3 || i === maxPegsPerRow - 3) {
        color = colors[0];
        multiplier = multipliers[3];
      } else if (i === 4 || i === maxPegsPerRow - 4) {
        color = colors[0];
        multiplier = multipliers[4];
      } else if (i === 5 || i === maxPegsPerRow - 5) {
        color = colors[0];
        multiplier = multipliers[5];
      } else {
        color = colors[0];
        multiplier = multipliers[6];
      }
    
      let b = new Boundary(x, y, w, h, multiplier, color);
      bounds.push(b);
    }
    
    input = document.createElement("input");
    input.style.position = 'absolute';
    input.type = "number"
    input.min = 1
    input.id="inp"
    input.style.right = '20px';
    input.style.top = '50px';
    input.style.padding="10px"
    input.style.width="50px"
    input.style.outline="none"
    input.value = "1"
    document.body.appendChild(input);
}

function calculateStatistics(ballX) {
    let index = -1;
    for (let i = 0; i < boundaryPositions.length; i++) {
        if (ballX > boundaryPositions[i]) {
            index = i;
      } else {
        break;
      }
    }
}


function keyPressed() {
    if (keyCode === 32) {
        inp = document.getElementById("inp")
        if(parseInt(inp.value) <= money){
            money = money - parseInt(inp.value)
            circles.push(new Circle(width/2+getRandomInt(12)-6, 10, 10));
            inp.style.border = ""
        } else {
            inp.style.border = "red 2px solid"
        }
    }
}

function draw() {
    background(51);

    Engine.update(engine);
    for (let i = 0; i < bounds.length; i++) {
        bounds[i].show();
    }
    for (let i = 0; i < pegs.length; i++) {
        pegs[i].show();
    }
    for (let i = 0; i < circles.length; i++) {
        circles[i].show();
        if (circles[i].isOffScreen()) {
            circles[i].removeFromWorld();
            circles.splice(i, 1);
            i--;
        }
    }

    textSize(18);
    for (let i = 0; i < bucketCounts.length; i++) {
        fill('white');
        text(`${cols- i}: ${bucketCounts[cols-i-1]}`, 50, windowHeight - i * 20 - 30);
    }

    text(`Uloži ovoliko novaca po kuglici`, windowWidth-145, 30);

    textSize(13);
    text(`Pritisnite razmak za bacanje kuglice`, windowWidth-125, 120);

    textSize(13);
    text(`Izradio: Leo Stričak, 4.RT`, windowWidth-88, windowHeight-40);
    text(`Tehnička škola Čakovec`, windowWidth-85, windowHeight-20);

    textSize(25);
    text(`Novac: ${money.toFixed(2)}€`, 100, 50);

    textSize(24);
    fill("white"); 
    for (let i = 0; i < bounds.length - 1; i++) {
        let textX = (bounds[i].body.position.x + bounds[i + 1].body.position.x) / 2;
        let textY = bounds[i].body.position.y;
        textAlign(CENTER, CENTER);
        text(bounds[i].multiplier, textX, textY);
    }
}
