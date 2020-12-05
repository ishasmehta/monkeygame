
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400, 400);
  
  monkey = createSprite(80,315,30,30);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.15;
  monkey.setCollider("circle",0,0,300);
  //monkey.debug = true;

  ground = createSprite(400, 390, 800, 20);
  ground.velocityX = -5;
  ground.x = ground.width/2;
  
  obstacleGroup = new Group();
  foodGroup = new Group();
  
  score = 0;
}


function draw() {
  background("white");
  textSize(20);
  fill("black");  
  text("Survival Time: "+score, 120, 50);
  
  score = Math.round(frameCount/frameRate());
  
  if(ground.x < 0){
    ground.x = ground.width/2;
  }
  if(keyDown("space") && monkey.y > 330){
    monkey.velocityY = -13;
  }
  console.log(monkey.y);
  monkey.velocityY = monkey.velocityY + 0.5;
  monkey.collide(ground);
  
  spawnObstacles();
  spawnFood();
  
  if(obstacleGroup.isTouching(monkey)){
        ground.velocityX = 0;
        monkey.velocityY = 0;
    
        obstacleGroup.setVelocityXEach(0);
        foodGroup.setVelocityXEach(0);
    
        obstacleGroup.setLifetimeEach(-1);
        foodGroup.setLifetimeEach(-1);
  }
  
  drawSprites();
  
}
function spawnFood(){
  if(frameCount % 80 === 0){
    var banana = createSprite(410, Math.round(random(120,200)), 20, 50);
    banana.velocityX = -5;
    banana.addImage(bananaImage);
    banana.scale = 0.1   ;
    banana.lifetime = 150;
    
    foodGroup.add(banana);
  }
}
function spawnObstacles(){
  if(frameCount % 300 === 0){
    var obstacle = createSprite(410,360, 20, 50);
    obstacle.velocityX = -5;
    obstacle.addImage(obstaceImage);
    obstacle.scale = 0.2;
    obstacle.lifetime = 150;
    obstacle.setCollider("circle",0,0,200);
    //obstacle.debug = true;
    
    obstacleGroup.add(obstacle);
  }
}





