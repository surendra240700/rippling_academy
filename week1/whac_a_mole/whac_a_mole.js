const MAX_TIME = 10;
var timeLeft = MAX_TIME;
var holes;
var moles;
var timeUp = false;
var score = 0;
var scorer,timer;
var min_moles = 1;
var max_moles = 2;
var curr_moles = 0;
var m=3,n=2;
var timerUpdater,moleCaller,game;
var username = null;
var hiscores, scoreList;
var updated = false;
function updateTime() {
  document.getElementById('timer').innerHTML = timeLeft;
  document.getElementById('scorer').innerHTML = score;
}
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function populateTable() {
  // console.log(hiscores);
  if(hiscores==undefined)
    return;
  scoreList.innerHTML = hiscores.map((row) => {
    return `<tr><td>${row.username}</td><td>${row.score}</tr>`;
  }).join('');
}

function checkScore() {
  let worstScore = 0;
  if (hiscores.length > 4) {
    worstScore = hiscores[hiscores.length - 1].score;
  }
  if (score > worstScore) {
    hiscores.push({score, username});
    hiscores.sort((a, b) => a.score > b.score ? -1 : 1);
  }
  if (hiscores.length > 5) {
    hiscores.pop();
  }
  // populateTable();
  localStorage.setItem('hiscores', JSON.stringify(hiscores));
  console.log(hiscores);
}

function gameOver() {
  // This cancels the setInterval, so the updateTimer stops getting called
  clearInterval(timerUpdater);
  clearInterval(moleCaller);
  // re-show the button, so they can start it again
  document.getElementById('start').style.visibility = 'visible';
  document.getElementById('showScoreboard').style.visibility = 'visible';
  timeUp = true;
  // moles.forEach(hole => hole.removeEventListener('click', bonk));
  // holes.forEach(hole => hole.classList.remove('up'));
  curr_moles = 0;
  holes.forEach(hole => hole.remove());
  moles.forEach(mole => mole.remove());
  if(!updated)
    checkScore();
  score = 0;
  updated = true;
}
function leaderboard() {
  scoreList = document.querySelector('.scoreboard');
  populateTable();
}

function changeBgBack(){
  document.body.style.background =  'green';
}

function changeBgRed(){
  document.body.style.background = 'orange';
  const revert_back = setTimeout(changeBgBack,100);
}

function updateTimer() {
  timeLeft = timeLeft - 1;
  if(timeLeft > 0)
    timer.innerHTML = timeLeft;
  else {
    timer.innerHTML = timeLeft;
    gameOver();
  }
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole.classList.contains('up')) {
    return randomHole(holes);
  }
  return hole;
}

function peep() {
  if(curr_moles>=max_moles)
    return;
  const time = randomIntFromInterval(300, 700);
  const hole = randomHole(holes);
  curr_moles++;
  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    if (!timeUp) {curr_moles--;}
  }, time);
}

function makeGrid(m,n){
  for(let i=0;i<m*n;i++){
    var hole = document.createElement('div');
    var mole = document.createElement('div');
    hole.classList.add('hole');
    mole.classList.add('mole');
    hole.appendChild(mole);
    game.appendChild(hole);
  }
}


function startGame() {
  // username = document.getElementById
  hiscores = JSON.parse(localStorage.getItem('hiscores')) || [];
  username = document.getElementById('username').value;
  if(username.trim()==''){
    alert("Please enter your name");
    return;
  }
  console.log(username);
  updated = false;
  game = document.querySelector('.game');
  makeGrid(m,n);
  holes = document.querySelectorAll('.hole');
  moles = document.querySelectorAll('.mole');
  scorer = document.getElementById('scorer');
  timer = document.getElementById('timer');
  document.getElementsByClassName('controls')[0].style.visibility = 'hidden';

  timeUp = false;
  score = 0;
  scorer.innerHTML = score;
  timeLeft = MAX_TIME;
  moleCaller = setInterval(peep,100);
  setTimeout(() => timeUp = true, timeLeft*1000);
  timerUpdater = setInterval(updateTimer,1000);
  moles.forEach(mole => mole.addEventListener('click', bonk));
}

function bonk(e) {
  if(!e.isTrusted) return; // cheater!
  score++;
  this.parentNode.classList.remove('up');
  scorer.innerHTML = score;
  changeBgRed();
}
