var towerImage, tower;
var doorImage, door, doorsGroup;
var climberImage,climber, climberGroup;
var ghost, ghostImage;
var invisible, invisibleGroup;
var gameState = "play";

function preload(){
  towerImage = loadImage ("tower.png");
  doorImage = loadImage ("door.png");
  climberImage = loadImage("climber.png");
  ghostImage = loadImage("ghost-standing.png");

}


function setup(){
  createCanvas (600,600);
  tower = createSprite (300,300);
  tower.addImage (towerImage);
  tower.velocityY = 1;
  ghost = createSprite(200,200,50,50);
  ghost.addImage (ghostImage);
  ghost.scale = 0.3;
  
  doorsGroup = new Group();
  climberGroup = new Group();
  invisibleGroup = new Group();
}

function draw(){
  background ("grey");
  if(gameState === "play"){
    
  if(tower.y > 400){
    tower.y = 300;
  }
  if(keyDown("left_arrow")){
    ghost.x = ghost.x -3;
  }
  if(keyDown("right_arrow")){
    ghost.x = ghost.x +3;
  }
  if(keyDown("space")){
    ghost.velocityY = -5;
  }
  ghost.velocityY = ghost.velocityY + 0.8;
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
  if(invisibleGroup.isTouching(ghost) || ghost.y> 600){
    ghost.destroy();
    gameState = "end";
  }
  
  spawnDoors();
  
  drawSprites();
  }
  if(gameState === "end"){
    stroke("red");
    fill("black");
    textSize(30);
    text("gameOver",230,250);
  }
}

function spawnDoors(){
  if(frameCount % 240 === 0){
    var door = createSprite(200,-50);
   door.addImage(doorImage);
  door.velocityY = 1;
    door.x = Math.round(random(120,400));
    door.lifetime = 800;
    doorsGroup.add(door);
    var climber = createSprite(200,10);
    climber.addImage(climberImage);
    climber.x = door.x;
    climber.velocityY = 1;
    climber.lifetime = 800;
    climberGroup.add(climber);
    ghost.depth =door.depth;
    ghost.depth = ghost.depth +1;
    var invisible = createSprite(200,15);
    invisible.width = climber.width;
    invisible.height = 2;
    invisible.x = door.x;
    invisible.velocityY = 1;
    invisible.debug = true;
    invisibleGroup.add(invisible);
  }
  
}