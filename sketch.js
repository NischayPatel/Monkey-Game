
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var survivalTime;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x);

  FoodGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  background(255);

  if(ground.x < 0) {
    ground.x = ground.width/2;
  }
  
   if(keyDown("space")) {
     monkey.velocityY = -12;
   }
  monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(ground);
  
  spawnBananas();
  spawnObstacles();
  
  
  survivalTime = Math.ceil(frameCount/frameRate())
  stroke("black");
  textSize(20);
  fill("black");
  text("Survival Time: " + survivalTime, 100,50);
  
  if(obstacleGroup.isTouching(monkey)){ ground.velocityX = 0; monkey.velocityY = 0; obstacleGroup.setVelocityXEach(0); FoodGroup.setVelocityXEach(0); obstacleGroup.setLifetimeEach(-1); FoodGroup.setLifetimeEach(-1); }
  drawSprites();
}

function spawnBananas() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(400,Math.round(random(120,200)),40,10);
    banana.addImage("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -5;
    banana.lifetime = 150;
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if (frameCount % 200 === 0) {
    var obstacle = createSprite(400,318,40,10);
    obstacle.addImage("obstacles", obstacleImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -4;
    obstacle.lifetime = 150;
    obstacleGroup.add(obstacle);
  }
}



