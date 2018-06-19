var cvs = document.getElementById("game");
var ctx = cvs.getContext("2d");

var aster = [];
var fire = [];
var timer = 0;
var expl = [];
var ship = {x:300, y:300};

var shipImg = new Image();
shipImg.src = "img/ship.png"
var ast = new Image();
ast.src = "img/ast.png";

var fireImg = new Image();
fireImg.src = "img/fire.png";

var fon = new Image();
fon.src = "img/fon.png";

var explImg = new Image();
explImg.src = "img/expl.png";

aster.push({x:300, y:0, dx:1, dy:2});
fon.onload = game;

//отслеживание местоположения мышы
window.addEventListener('mousemove', function(e) {
  e.screenX;
  e.screenY;
  e.pageX;
  e.pageY;
  ship.x =  e.clientX;
  ship.y = e.clientY;
}, false);

function game () {
  update();
  render();
  requestAnimationFrame(game);
}

function update() {
  ++timer;
  if(timer % 10 == 0){
    aster.push({
      x:Math.random() * 600,
      y:-50,
      dx:Math.random() * 2 - 1,
      dy:Math.random() * 2,
      del:0});
  }

//выстрел
if(timer%30 == 0){
  fire.push({x:ship.x+10, y:ship.y,dx:0,dy:-5.2});
  fire.push({x:ship.x+10, y:ship.y,dx:0.5,dy:-5});
  fire.push({x:ship.x+10, y:ship.y,dx:-0.5,dy:-5});
}
for(i in expl){
  expl[i].animx=expl[i].animx+0.8;
  if(expl[i].animx>7){
    ++expl[i].animy;
    expl[i].animx = 0;
  }
  if(expl[i].animy>7){
    expl.splice(i,1);
  }
}
  //физика пуль
  for(i in fire) {
    fire[i].x = fire[i].x + fire[i].dx;
    fire[i].y = fire[i].y + fire[i].dy;
    if(fire[i].y < -30) {
      fire.splice(i,1);
    }
  }
  //физика корабля
  for(i in aster) {
  aster[i].x += aster[i].dx;
  aster[i].y += aster[i].dy;

  //границы
    if((aster[i].x >= 550)||(aster[i].x < 0)){
      aster[i].dx = -aster[i].dx;
    }
    //если вышел за пределы, удаляем
    if(aster[i].y >= 600){
    aster.splice(i, 1);
    }
    //проверяем каждый астероид на столкновение
    for (j in fire){
      if((Math.abs(aster[i].x+25-fire[j].x-15)<50)&&(Math.abs(aster[i].y-fire[j].y)<25)){
        expl.push({x:aster[i].x-25, y:aster[i].y-25, animx:0, animy:0});
        aster[i].del = 1;
        fire.splice(j, 1);break;
      }
    }
    if(aster[i].del == 1){
      aster.splice(i, 1);
    }
  }
}

function render () {
  ctx.drawImage(fon, 0, 0, 600, 600);
  ctx.drawImage(shipImg, ship.x, ship.y);
  for(i in fire) {
    ctx.drawImage(fireImg, fire[i].x, fire[i].y, 30, 30);
  }
  for(i in aster){
    ctx.drawImage(ast, aster[i].x, aster[i].y, 30, 30);
  }
  for(i in expl){
    ctx.drawImage(explImg, 128*Math.floor(expl[i].animx),128*Math.floor(expl[i].animy),128,128, expl[i].x, expl[i].y, 100, 100);
  }
}
