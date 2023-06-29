var ninja;
var ninjaAnimation,deadAnimation;
var path , pathImg;
var bombImg,restartImg,coinImg,gameOverImg,fireImg;
var backgroundImg;
var invisibleGround
var checkPoint,die,jump;

var fireGroup;
var bombGroup;
var coinGroup;

var gameState;
var PLAY=1;
var WAIT=0;
var END=2;
var score=10;

function preload()
{
    ninjaAnimation= loadAnimation("Run0.png","Run1.png","Run2.png","Run3.png","Run4.png","Run5.png");
    deadAnimation=loadAnimation("Dead.png")

    pathImg = loadImage("path.jpg")
    bombImg = loadImage("bomb.png")
    restartImg = loadImage("restart.png")
    coinImg = loadImage("coin.png")
    gameOverImg = loadImage("gameOver.png")
    backgroundImg = loadImage("ninja b.jpg")
    checkPoint = loadSound("checkPoint.mp3")
    die = loadSound("die.mp3")
    jump = loadSound("jump.mp3")
    fireImg=loadImage("fire.png")

}


function setup()
{
    createCanvas(1000,1000)
    ninja=createSprite(100,255,5,5)
    ninja.addAnimation("running",ninjaAnimation);
    ninja.addAnimation("dead",deadAnimation);
    ninja.scale=0.3
    
    ninja.setCollider("rectangle",0,0,100,500)
    console.log(ninja.height)

    path=createSprite(300,330,600,100);
    
    path.addImage("path",pathImg);
    path.scale=0.15
    gameState=WAIT;
  
    gameOver=createSprite(300,100)
    gameOver.addImage("gameOver",gameOverImg)
    gameOver.scale=0.5

    restart=createSprite(300,150)
    restart.addImage("restart",restartImg)
    restart.scale=0.5



   invisibleGround=createSprite(300,330,600,50)
   invisibleGround.visible=false;

   fireGroup=createGroup();
   coinGroup=createGroup();
   bombGroup=createGroup();

}





function draw() 
{
    
    if(gameState===WAIT)
    {

        background(backgroundImg)
        var x=10
        fill("yellow")
        textSize(20)
        text("1: If You Will Touch The Coin You Will Get A Point ",100,155)

        fill("yellow")
        text("2: If You Will Touch The Bomb You Will Loose A Point",100,190)

        fill("yellow")
        text("3: If You Will Touch The Fire Ninja Will DIE ",100,225)

        fill("white")
        text("PRESS SPACE TO START",180,350)

        fill("white")
        textSize(25)
        text("TIPS:",225,40)

        if(keyDown("space"))
        {
            gameState=PLAY

        }
    }
    else
    {
        background("skyBlue")
        stroke(2)
        fill("black")
        text("SCORE = " +score ,300,20)

    
     if(gameState===PLAY)
    {
        if (ninja.isTouching(coinGroup))
        {
            coinGroup.destroyEach();
            score=score+1;
        }
        if(ninja.isTouching(bombGroup))
        {
            bombGroup.destroyEach();
            score=score-1
        }

        

        if(path.x<0)
        {
            path.x=width/2
        }
        path.velocityX=-5
        
        gameOver.visible=false
        restart.visible=false

        if(keyDown("space")&& ninja.y>=230)
        {
            ninja.velocityY=-20
        }
        ninja.velocityY+=1
        console.log(ninja.y)
        spwanCoin();
        spwanBomb();
        spwanFire();

        if(ninja.isTouching(fireGroup))
        {
            gameState=END;
        }
    }
    
    else if(gameState===END)
    {   
        ninja.velocityY=0
        path.velocityX=0
        bombGroup.setVelocityXEach(0);
        coinGroup.setVelocityXEach(0);
        fireGroup.setVelocityXEach(0);

        bombGroup.setLifetimeEach(-10);
        coinGroup.setLifetimeEach(-10);
        fireGroup.setLifetimeEach(-10);

        ninja.changeAnimation("dead",deadAnimation);

        gameOver.visible=true;
        restart.visible=true;
        if(mousePressedOver(restart))
        {
            reset();
        }


    }

    ninja.collide(invisibleGround)
    



    drawSprites();
}
}
function spwanFire()
{
    if(frameCount%150===0)
    {
        fire=createSprite(530,280,10,10);
        fire.addImage("fire",fireImg);
        fire.scale=0.15
        fire.velocityX=-4
        fire.lifetime=width/-(fire.velocityX)
        fireGroup.add(fire);
    }
}



function spwanBomb()
{
    if(frameCount%300===0)
    {
        bomb=createSprite(520,125,10,10);
        bomb.y = Math.round(random(50,200))
        bomb.addImage("bomb",bombImg);
        bomb.scale=0.15
        bomb.velocityX=-3
        bomb.lifetime=width/-(bomb.velocityX)
        bombGroup.add(bomb);
    }
}

function spwanCoin()
{


    if(frameCount%200===0)
    {
        coin=createSprite(550,125,10,10);
        coin.y =Math.round(random(50,200))
        coin.addImage("coin",coinImg);
        coin.scale=0.2
        coin.velocityX=-4
        coin.lifetime=width/-(coin.velocityX)
        coinGroup.add(coin);
    }

}

function reset()
{
    gameState=PLAY;
    ninja.changeAnimation("running",ninjaAnimation)
    fireGroup.destroyEach();
    coinGroup.destroyEach();
    bombGroup.destroyEach();
    score=10
    
}
