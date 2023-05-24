class Circle {
    constructor(x, y, r) {
        this.r = r;
        const options = {
            restitution: 0.5,
            friction: 0,
            density: 0.2
        };
        this.body = Bodies.circle(x, y, r, options);
        World.add(world, this.body);
    }


    removeFromWorld() {
        World.remove(world, this.body);
    }

    show() {
        const pos = this.body.position;
        push();
        fill('green'); 
        translate(pos.x, pos.y);
        ellipse(0, 0, this.r * 2);
        pop();
    }

    isOffScreen() {
        const x = this.body.position.x;
        const y = this.body.position.y;
        if (y > height) {
            let bucketIndex = -1;
    
            for (let i = 0; i < boundaryPositions.length - 1; i++) {
                if (x >= boundaryPositions[i] && x < boundaryPositions[i + 1]) {
                    bucketIndex = i;
                    break;
                }
            }
    
            if (bucketIndex >= 0) {
                bucketCounts[bucketIndex]++;
                console.log("Ball fell into bucket at index:", bucketIndex);
                money = money + bounds[bucketIndex].multiplier*(document.getElementById("inp").value)

            }

            return true;
        }
        return (x < -50 || x > width + 50);
    }
}

class Peg {
    constructor(x, y, r) {
        this.r = r;
        const options = {
            isStatic: true,
            restitution: 0.3
        };
        this.body = Bodies.circle(x, y, r, options);
        World.add(world, this.body);
    }

    show() {
        const pos = this.body.position;
        push();
        translate(pos.x, pos.y);
        ellipse(0, 0, this.r * 2);
        pop();
    }
}

class Boundary {
    constructor(x, y, w, h, multiplier, color) {
      let options = {
        isStatic: true,
        friction: 0,
        restitution: 0.95
      };
      this.body = Bodies.rectangle(x, y, w, h, options);
      this.w = w;
      this.h = h;
      this.color = color;
      this.multiplier = multiplier;
      World.add(world, this.body);
    }
    
    show() {
      fill(this.color);
      noStroke();
      let pos = this.body.position;
      push();
      translate(pos.x, pos.y);
      rectMode(CENTER);
      rect(0, 0, this.w, this.h);
      pop();
    }
  }
