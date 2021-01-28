class Witch {
    constructor(game, hero, x, y) {
        Object.assign(this, {game, hero, x, y});

        // sprite sheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/witch.png");
        this.width = 29; // character width
        this.height = 64; // character height

        // character states
        this.action = 0 // 0 = idle, 1 = walking
        this.facing = 0 // 0 = east, 1 = north, 2 = west, 3 = south
        this.dead = false;

        this.walkSpeed = 75; // pixels per second
        this.velocity = { x: 0, y: 0 };

        this.animations = [];
        this.loadAnimations();
    };

    // Gets the next x-value to move toward the player
    getNextXValue(walkOrth) {
        // The hero's current x-coordinate
        let heroX = this.hero.getX();
        // The hero's current y-coordinate
        let heroY = this.hero.getY();
        // The distance between the hero and this witch in the x-direction
        let deltaX = Math.abs(this.x - heroX);
        // The distance between the hero and this witch in the y-direction
        let deltaY = Math.abs(this.y - heroY);
        // The angle of a right triangle in which the witch is on one
        // end, and the hero is on the other
        let angle = Math.atan(deltaY / deltaX);
        // The distance in the x-direction the witch will walk this tick
        let walkX = walkOrth * Math.cos(angle);
        // This value is negative if the hero is to the left of the witch
        if (heroX < this.x) walkX = -walkX;
        return walkX;
    }

    // Gets the next y-value to move toward the player
    getNextYValue(walkOrth) {
        // The hero's current x-coordinate
        let heroX = this.hero.getX();
        // The hero's current y-coordinate
        let heroY = this.hero.getY();
        // The distance between the hero and this witch in the x-direction
        let deltaX = Math.abs(this.x - heroX);
        // The distance between the hero and this witch in the y-direction
        let deltaY = Math.abs(this.y - heroY);
        // The angle of a right triangle in which the witch is on one
        // end, and the hero is on the other
        let angle = Math.atan(deltaY / deltaX);
        // The distance in the y-direction the witch will walk this tick
        let walkY = walkOrth * Math.sin(angle);
        // This value is negative if the hero is above (from the player's perspective)
        // the witch
        if (heroY < this.y) walkY = -walkY;

        
        return walkY;
    }

    turnDirection() {

    }

    update() {
        this.action = 1;
        this.attackDistance = 100;
        // The total distance this witch will walk this tick
        let walkOrth = this.walkSpeed * this.game.clockTick;

        //hero coordinates
        let heroX = this.hero.getX();
        let heroY = this.hero.getY();
        // distance equation for 2 points
        let distance = Math.sqrt(Math.pow(Math.abs(heroX - this.x), 2) + Math.pow(Math.abs(heroY - this.y), 2));

        let delX = this.getNextXValue(walkOrth);
        let delY = this.getNextYValue(walkOrth);

        // [xDisplaced, yDisplaced, hV]
        let cardinal = [this.x - heroX, this.y - heroY, Math.abs(delX / delY)]; // hV > 1: EAST/WEST; hV < 1: NORTH/SOUTH
        // xDisplaced > 0: NORTH
        if (cardinal[0] < 0 && cardinal[2] > 1) { // EAST
            this.facing = 0;
        } else if (cardinal[1] > 0 && cardinal[2] < 1) { // NORTH
            this.facing = 1;
        } else if (cardinal[0] > 0 && cardinal[2] > 1) { // WEST
            this.facing = 2;
        } else if (cardinal[1] < 0 && cardinal[2] < 1) { // SOUTH
            this.facing = 3;
        }

        if (distance < this.attackDistance) { // If closer than 100 px, stop moving
            this.action = 0;
        } else { // walk towards player
            this.action = 1;
            // TODO: Implement collision
            this.x += delX;
            this.y += delY;
        }

        
    };

    draw(ctx) {
        this.animations[this.action][this.facing].drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
    };

    loadAnimations() {
        for (let i = 0; i < 2; i++) { // two actions
            this.animations.push([]);
            for (i = 0; i < 4; i++) { // four directions
                this.animations.push([]);
            }
        }

        // idle
        // east
        this.animations[0][0] = new Animator(this.spritesheet, 11, 140, this.width, this.height, 1, 0.15, 19, false, true);
        // north
        this.animations[0][1] = new Animator(this.spritesheet, 9, 204, this.width, this.height, 1, 0.15, 19, false, true);
        // west
        this.animations[0][2] = new Animator(this.spritesheet, 10, 77, this.width, this.height, 1, 0.15, 19, false, true);
        // south
        this.animations[0][3] = new Animator(this.spritesheet, 9, 11, this.width, this.height, 1, 0.15, 19, false, true);

        // walking
        // east
        this.animations[1][0] = new Animator(this.spritesheet, 11, 140, this.width, this.height, 4, 0.15, 19, false, true);
        // north
        this.animations[1][1] = new Animator(this.spritesheet, 9, 204, this.width, this.height, 4, 0.15, 19, false, true);
        // west
        this.animations[1][2] = new Animator(this.spritesheet, 10, 77, this.width, this.height, 4, 0.15, 19, false, true);
        // south
        this.animations[1][3] = new Animator(this.spritesheet, 9, 11, this.width, this.height, 4, 0.15, 19, false, true);

    }
}