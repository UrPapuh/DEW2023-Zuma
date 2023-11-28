// Parametres
const numColors = 1;
const initialCells = 20;
const maxCells = 21;
const spawnTime = 2; // seg

// Variables
const box = document.getElementById('box'); // Recuadro
const timer = document.getElementById('timer'); // Contador
let interval = setInterval(update, 1000);

// Initialize timer
timer.textContent = spawnTime;

// Generate colors
const colors = [];
for (let i = 0; i < numColors; i++) {
  let color = random(0xFFFFFF).toString(16).padStart(6, '0');;
  console.log(color);
  colors.push(`#${color}`);
  //`rgb(${random256()},${random256()},${random256()})`
}

// Create initals cells
for (let i = 0; i < initialCells; i++) {
  add();  
}

// Functions
function update() {
  if (timer.textContent <= 3) timer.classList.add("red"); // time < 2
  if (timer.textContent == '0') {
    timer.textContent = spawnTime;
    timer.classList.remove("red");
    add();
  } else {
    timer.textContent--;
  }
  results();
}

function add(){
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.style.backgroundColor = colors[random(colors.length)];
  cell.addEventListener('click', remove);
  box.append(cell);
}

function random(max) {
  return Math.floor(Math.random()*max);
}

function remove(event) {
  const target = event.target;
  const elements = [target];
  // Previous
  let element = target.previousElementSibling;
  while (element && element.style.backgroundColor == target.style.backgroundColor) {
    elements.push(element)
    element = element.previousElementSibling;
  }
  // Next
  element = target.nextElementSibling;
  while (element && element.style.backgroundColor == target.style.backgroundColor) {
    elements.push(element)
    element = element.nextElementSibling;
  }
  // Remove
  if (elements.length >= 3) {
    elements.forEach(element => {
      element.remove();
    });
  }
}

function results() {
  const cells = document.getElementsByClassName('cell');
  if (cells.length == 0 || cells.length >= maxCells) {
    // Clear time
    timer.textContent = '0';
    clearInterval(interval);
    interval = null;
    // View results
    if (cells.length == 0) { // WIN
      document.write('WIN');
    } else { // GAME OVER
      document.write('GAME OVER');
    }
  }
}