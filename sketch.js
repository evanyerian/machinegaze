//let capture
// let tracker
let playing = false;
let thevideo;
let button;
let balls = []

function setup() {

     createCanvas(800,600).parent('p5')

    thevideo = createVideo(["vid.mp4"])
    thevideo.size(800,600)
    thevideo.hide()

    tracker = new clm.tracker()
    tracker.init()
    tracker.start(thevideo.elt)

}


function draw() {

  background(0)
  // image(thevideo,10,10)
  showFlippedVideo()

  let features = tracker.getCurrentPosition()

  if (features.length == 0) {
    return
  }

  // for (let feature of features) {
  //   stroke(255)
  //   fill(255)
  //   circle(feature.x, feature.y,2)
  //   text(feature.label, feature.x, feature.y)
  // }

  let mouth_top = features[47]
  let mouth_bottom = features[53]
  let distance = dist(mouth_top.x, mouth_top.y, mouth_bottom.x, mouth_bottom.y)

  let nose_tip = features[62]
  let nose_left = features[39]
  let nose_right = features[35]

  let left_nose_distance = dist(nose_tip.x, nose_tip.y, nose_left.x, nose_left.y)
  let right_nose_distance = dist(nose_tip.x, nose_tip.y, nose_right.x, nose_right.y)
  let nose_pointing = left_nose_distance - right_nose_distance

  let lefteyetop = features[68]
  let lefteyebottom = features[31]
  let distance2 = dist(lefteyetop.x, lefteyetop.y, lefteyebottom.x, lefteyebottom.y)

  let righteyetop = features[26]
  let righteyebottom = features[24]
  let distance3 = dist(righteyetop.x, righteyetop.y, righteyebottom.x, righteyebottom.y)


if (distance > 25) {

    let mouth_center = { x: mouth_top.x,
                         y: (mouth_top.y + mouth_bottom.y) / 2
                     }

    let random_ball = { x: random(mouth_center.x - 20, mouth_center.x + 20),
                        y: random(mouth_center.y - 5, mouth_center.y + 5),
                        vx: random(nose_pointing / 4, nose_pointing / 4),
                        vy: random(0, 2),
                        c: [random(255), random(255), random(255), random(200, 255)]
                    }
    balls.push(random_ball)

}

if (distance > 15) {

  let eyesleftcenter = {x: lefteyetop.x,
                        y: (lefteyetop.y + lefteyebottom.y) / 2
                    }

  let eyesrightcenter = {x: righteyetop.x,
                         y: (righteyetop.y + righteyebottom.y) / 2
                        }

  let random_ball = { x: random(eyesleftcenter.x - 20, eyesleftcenter.x + 20),
                      y: random(eyesleftcenter.y - 5, eyesleftcenter.y + 5),
                      vx: random(nose_pointing / 4, nose_pointing / 4),
                      vy: random(0, 2),
                      c: [random(255), random(255), random(255), random(200, 255)]
                                        }

  balls.push(random_ball)
}

if (distance > 15) {

  let eyesleftcenter = {x: lefteyetop.x,
                        y: (lefteyetop.y + lefteyebottom.y) / 2
                    }

  let eyesrightcenter = {x: righteyetop.x,
                         y: (righteyetop.y + righteyebottom.y) / 2
                        }
            let random_ball2 = { x: random(eyesrightcenter.x - 20, eyesrightcenter.x + 20),
                                              y: random(eyesrightcenter.y - 5, eyesrightcenter.y + 5),
                                              vx: random(nose_pointing / 4, nose_pointing / 4),
                                              vy: random(0, 2),
                                              c: [random(255), random(255), random(255), random(200, 255)]
                          }

                          balls.push(random_ball2)
}

for (let ball of balls) {

    noFill()
    stroke(ball.c)
    circle(ball.x, ball.y, 5)
    strokeWeight(1)
    circle(ball.x - 5, ball.y +5, 3)
    circle(ball.x + (random(20)), ball.y, 2)
    circle(ball.x, ball.y + (random(20)), 10)
    circle(ball.x, ball.y, 10)
    circle(ball.x, ball.y, 15)
    circle(ball.x, ball.y, 20)
    ball.x += ball.vx
    ball.y += ball.vy

    ball.vy += .5

    if (ball.x < 0 || ball.x > width || ball.y < 0 || ball.y > height) {
        balls.splice(balls.indexOf(ball), 1)
    }

}

}


function mousePressed() {
  thevideo.loop()
}

function showFlippedVideo() {
  push()
  translate(thevideo.width, 0)
  scale(-1,1)
  image(thevideo,0,0,thevideo.width,thevideo.height)
  pop()
}
