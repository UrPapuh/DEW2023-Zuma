// Parametres
const numColors = 3;
const initialCells = 20;
const maxCells = 20;
const spawnTime = 2; // seg

const timer = document.getElementById('timer');
const interval = setInterval(update, 1000); // Contador
const box = document.getElementById('box'); // Recuadro


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
  if (timer.textContent <= 3) timer.className = 'red'; // time < 2
  if (timer.textContent == '0') {
    timer.textContent = spawnTime;
    timer.classList.remove("red");
  } else {
    timer.textContent--;
  }
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
  event.target.remove();
}