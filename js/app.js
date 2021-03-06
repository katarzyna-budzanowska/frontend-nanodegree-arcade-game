// Movement steps
const x_jump = 101;
const y_jump = 83;

// Enemies our player must avoid
class Enemy {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    constructor (x = 0, y = 0, speed = 0) {
      // The image/sprite for our enemies, this uses
      // a helper we've provided to easily load images
      // Check which direction the enemy moves.
      this.sprite = speed > 0 ? 'images/enemy-bug.png' : 'images/enemy-lbug.png';
      this.x = x;
      this.y = y;
      this.speed = speed;
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update (dt) {
        this.x += dt * this.speed;
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
    };

    // Draw the enemy on the screen, required method for game
    render () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

    // Helper to creat a random enemy, only speed needed
    static generateEnemy(speed){
      // Enemy rows locations that make sense visually
      const rows = [60, 143, 226];
      // select random start position
      const startX = Math.random() < 0.5 ? -101 : 505;
      // select random row, from rows array.
      const startY = rows[Math.floor(Math.random()*3)];
      return new Enemy( startX, startY, startX == -101 ? speed : -speed );
    }

    // Check if enemy is out of the screen
    isOut () {
      if( this.x < -102 ) {
        return true;
      }
      if( this.x > 506 ) {
        return true;
      }
      return false;
    }

    // Calculate row from pixel position
    getRow () {
      return ( this.y - 60 ) / 83;
    }

    // bump into other enemy
    bump () {
      this.speed = -this.speed;
      this.x += 10 * Math.sign(this.speed);
      this.sprite = this.speed > 0 ? 'images/enemy-bug.png' : 'images/enemy-lbug.png';
    }

}

// Player class
class Player {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    constructor (x = 202, y = 404) {
      this.sprite = 'images/char-cat-girl.png';
      this.x = x;
      this.y = y;
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update (dt) {
        // Player is only affected by keyboard input.
    };

    // When player hits enemy.
    die () {
      this.resetPosition();
    }

    // Put player to the start position
    resetPosition () {
      this.x = 202;
      this.y = 404;
    }

    // Calculate row from pixel position
    getRow () {
      return ( this.y - 72 ) / 83;
    }

    // Draw the enemy on the screen, required method for game
    render () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

    // Player movement
    // Limit min and max positions.
    handleInput (key) {
      switch (key) {
        case 'left':
          this.x = this.x == 0 ? 0 : this.x - x_jump;
          break;
        case 'right':
          this.x = this.x == 404 ? 404 : this.x + x_jump;
          break;
        case 'up':
          this.y = this.y == -11 ? -11 : this.y - y_jump;
          break;
        case 'down':
          this.y = this.y == 404 ? 404 : this.y + y_jump;
          break;
        default:

      }
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
allEnemies.push( Enemy.generateEnemy( 100 ) );
allEnemies.push( Enemy.generateEnemy( 100 ) );
allEnemies.push( Enemy.generateEnemy( 100 ) );

const player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
