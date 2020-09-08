var monkey, monkey_running;
var banana, bananaImage, bananaGroup;
var obstacle, obstacleImage, obstacleGroup;
var ground;
var survivalTime= 0;

var PLAY= 1;
var END= 0;
var gameState= PLAY;

function preload(){
  monkey_running =            loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  
  bananaImage= loadImage("banana.png");
  obstacleImage= loadImage("obstacle.png");
}

function setup() {
  createCanvas(400, 400)
  
  monkey= createSprite(100, 340, 20, 50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale= 0.1;
  
  ground= createSprite(400, 350, 800, 10);
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
 
}

function draw() {
   background("white");
  
   monkey.collide(ground);
  
   
  
  if(ground.x<0){
   ground.x= ground.width/2;
  }
  
  
   
  
  if(gameState===PLAY){
    ground.velocityX= -4;
    
    stroke("black");
    fill("black");
    textSize(20);
    survivalTime= Math.ceil(frameCount/frameRate()); 
    text("Survival Time: "+survivalTime, 100, 50);

    
  if(bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
   }
  
  if(keyDown("space") && monkey.y >= 310){
    monkey.velocityY= -12; 
  }
  
   monkey.velocityY = monkey.velocityY+ 0.8;
  
   spawnBananas();
   spawnObstacles();
  
  if(monkey.isTouching(obstacleGroup)){
    gameState= END;
  }
   if(gameState=== END){
     monkey.velocityY= 0;
    
    ground.velocityX= 0;
    
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1); 
   }
  }
  
   drawSprites();
}

function spawnBananas() {
  if (frameCount % 80 === 0){
    banana= createSprite(200,Math.round(random(180, 230)), 10, 30);
    banana.addImage(bananaImage);
    banana.scale= 0.05;
    banana.velocityX= -3;
    banana.lifetime= 130;
    
    monkey.depth= banana.depth+1;
    
    bananaGroup.add(banana);
    
    
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle= createSprite(200, 328 ,50, 95);
    obstacle.addImage(obstacleImage);
    obstacle.scale= 0.1;
    obstacle.velocityX= -4;
    obstacle.lifetime= 120;
     
    obstacleGroup.add(obstacle);
  }
}