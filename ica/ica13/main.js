// setup canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random color

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

const im = 50
const ci = 1

class Ball {
  constructor(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
    this.immunity = 0
    self.imm = false
  }


  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    if (this.immunity > 0) {
        this.immunity = this.immunity - 1
    }
    if (this.x + this.size >= width) {
      this.velX = -this.velX;
      this.immunity = im
    }

    if (this.x - this.size <= 0) {
      this.velX = -this.velX;
      this.immunity = im
    }

    if (this.y + this.size >= height) {
      this.velY = -this.velY;
      this.immunity = im
    }

    if (this.y - this.size <= 0) {
      this.velY = -this.velY;
      this.immunity = im
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect(coll) {
    for (const ball of balls) {
      if (this !== ball) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
          coll.push([this, ball])
        }
      }
    }
  }

}




const balls = [];

while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size,
  );

  balls.push(ball);
}



function loop() {
    let coll = []
  ctx.fillStyle = "rgb(0 0 0 / 25%)";
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    ball.draw();
    ball.update();
    ball.collisionDetect(coll);
    col(coll)

  }

  requestAnimationFrame(loop);
}



function calcCol(se, op) {
    let px = se.size * se.velX + op.size * op.velX
    let py = se.size * se.velY + op.size * op.velY

    let kx = (1/2)* se.size * (se.velX ** 2) + (1/2) * op.size * (op.velX ** 2)
    let ky = (1/2)* se.size * (se.velY ** 2) + (1/2) * op.size * (op.velY ** 2)

    let ux = Math.sqrt( (2*kx - (se.size * (se.velX ** 2))) / (op.size) )
    let uy = Math.sqrt( (2*ky - (se.size * (se.velY ** 2))) / (op.size) )
    
    let vx = (px = op.size * ux) / se.size
    let vy = (py = op.size * uy) / se.size
    //const v1 = ((se.size - op.size) / (se.size + op.size)) * op.velX
    //const v2 = ((2 * op.size) / (se. ize + op.size)) * op.velY
    if (se.immunity == 0) {
        se.velX = vx
        se.velY = vy
        se.immunity = ci
    } 

    
}

function col(coll) {
    for (let i of coll) {
        calcCol(i[0], i[1])

    }

}



loop();
