//Authors
//P1: Eric Amaya
//P2: Alex Jeter
//P3: Daniel Pantoja

let ball
let player1, player2
let score1, score2
let gameOver
let mySound


function preload(){
  mySound = loadSound('crowd.mp3');
}

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20)
  colorMode(HSB)
  noStroke()
  dotHue = 0
  dotHue2 = 85
  dotHue3 = 170
  score1 = 0
  score2 = 0
  ballSize = 30

  gameOver = false

  player1 = new Player1()
  player2 = new Player2()

  ball = new Ball()

  if (!gameOver) {
    mySound.play()
  }
}

function draw() {
  background(100, 100, 70)

  drawField()

  if (score1 == 5 || score2 == 5) {
    gameOver = true
  }
  
  if (!gameOver) {
    player1.move()
    player2.move()
    ball.move()
  }

  if (gameOver) {
    fill(0)
    textSize(25)
    text('Game Over', width/2 -60, height -100)
    if (score1 == 5) {
      fill(0)
      textSize(25)
      text('Player 1 Wins!', width/4 - 100, height / 2 - 30)
      
    } else if (score2 == 5){
      fill(0)
      textSize(25)
      text('Player 2 Wins!', width/1.3 -70, height / 2 - 30)
      
    }
  }

  ball.draw()
  
  fill(100)
  textSize(30)
  text(`${score1}`, width / 2 - 100, 30)
  text(`${score2}`, width / 2 + 100, 30)

  player1.draw()
  //player1.move()

  player2.draw()
  //player2.move()

  hitLeftPlayer = collideCircleCircle(player1.x, player1.y,
    player1.size, ball.x, ball.y, ball.size)

  if (hitLeftPlayer) {
    ball.vx *= -1.1
  }

  hitRightPlayer = collideCircleCircle(player2.x, player2.y,
    player2.size, ball.x, ball.y, ball.size)

  if (hitRightPlayer) {
    ball.vx *= -1.1
  }
}

/*-----------------------Player1-----------------------*/
class Player1 {
  constructor() {
    this.x = 150
    this.y = height / 2
    this.size = 30
  }

  draw() {
    fill(0)
    ellipse(this.x, this.y, 30)
  }

  move() {
    if (keyIsDown(87)) {
      this.y -= 5
    } else if (keyIsDown(83)) {
      this.y += 5
    } else if (keyIsDown(65)) {
      this.x -= 5
    } else if (keyIsDown(68)) {
      this.x += 5
    }
    
    let hitLeft = this.x - this.size / 2 < 0
    let hitRight = this.x + this.size / 2 > width/2
    let hitTop = this.y - this.size / 2 < 0
    let hitBottom = this.y + this.size / 2 > height
    
    if (hitTop) {
      player1.y += 5
    }
    if (hitBottom){
      player1.y -=5
    }
    if (hitLeft){
      player1.x +=5
    }
    if (hitRight) {
      player1.x -=5
    }
  }

  reset(){
    this.x = 150
    this.y = height / 2
    this.size = 30
  }
}

/*-----------------------Player2-----------------------*/
class Player2 {
  constructor() {
    this.x = width - 150
    this.y = height / 2
    this.size = 30
  }

  draw() {
    fill(255)
    ellipse(this.x, this.y, this.size)
  }

  move() {
    if (keyIsDown(UP_ARROW)) {
      this.y -= 5
    } else if (keyIsDown(DOWN_ARROW)) {
      this.y += 5
    } else if (keyIsDown(LEFT_ARROW)) {
      this.x -= 5
    } else if (keyIsDown(RIGHT_ARROW)) {
      this.x += 5
    }

    let hitLeft = this.x - this.size /2 < width/2
    let hitRight = this.x + this.size /2 > width
    let hitTop = this.y - this.size / 2 < 0
    let hitBottom = this.y + this.size / 2 > height
    
    if (hitTop) {
      player2.y +=5
    }
    if (hitBottom){
      player2.y -=5
    }
    if (hitLeft){
      player2.x +=5
    }
    if (hitRight) {
      player2.x -=5
    }
    
  }

  reset() {
    this.x = width - 150
    this.y = height / 2
    this.size = 30
  }
}

/*-----------------------Field-----------------------*/
function drawField() {
  noFill()

  stroke(dotHue, dotHue2, dotHue3)
  dotHue += 1
  dotHue = dotHue % 360

  circle(width / 2, height / 2, 200)
  line(width / 2, 0, width / 2, height)
  // Left goal box
  line(0, height / 2 + 100, 100, height / 2 + 100)
  line(0, height / 2 - 100, 100, height / 2 - 100)
  line(100, height / 2 - 100, 100, height / 2 + 100)
  rect(0,height / 2 - 100, 1, 200)
  // right goal box
  line(width, height / 2 + 100, width - 100, height / 2 + 100)
  line(width, height / 2 - 100, width - 100, height / 2 - 100)
  line(width - 100, height / 2 - 100, width - 100, height / 2 + 100)
  rect(width - 1, height /2 -100, 1, 200)
  noStroke()
}

/*-----------------------Ball-----------------------*/
class Ball {
  constructor() {
    this.x = width / 2
    this.y = height / 2
    this.vx = 2
    this.vy = 2
    this.a = random(2)
    this.size = 30
  }

  move() {
    this.x += this.vx
    this.y += this.vy
    
    // let hitLeft = (100, height / 2 - 100, 100, height / 2 + 100)
    // let hitRight = (width, height / 2 - 100, width, height / 2 + 100)

    let hitLeftGoal = collideRectCircle(
      //rect
      0, height / 2 - 100, 1, 200,
      //ball
      this.x, this.y, this.size
    )

    if (hitLeftGoal) {
        this.reset()
        score2 += 1
        player1.reset()
        player2.reset()
    }

    let hitRightGoal = collideRectCircle(
      // rect
      width - 1, height /2 -100, 1, 200,
      //circle
      this.x, this.y, this.size
    )
    
    if (hitRightGoal) {
        this.reset()
        score1 += 1
        player1.reset()
        player2.reset()
    }

    let hitLeft = this.x - this.size / 2 < 0
    let hitRight = this.x + this.size / 2 > width
    let hitTop = this.y - this.size / 2 < 0
    let hitBottom = this.y + this.size / 2 > height

    if (hitTop || hitBottom) {
      this.vy *= -1
    }
    if(hitLeft|| hitRight) {
      this.vx *= -1
    }
  }

  reset() {
    this.x = width / 2
    this.y = height / 2
    this.vx *= random(-1, 1)
    this.vy *= random(-1, 1)
  }

  draw() {
    // fill('white')
    fill(dotHue, dotHue2, dotHue3)
    dotHue += 1
    dotHue = dotHue % 360
    ellipse(this.x, this.y, ballSize)
  }
}