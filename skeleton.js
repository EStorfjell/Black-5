class Skeleton {
    constructor(game, hero, x, y) {
        Object.assign(this, {game, hero, x, y});

        // sprite sheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/skeleton.png");
        this.width = 25; // character width
        this.height = 46; // character height

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
        // The distance between the hero and this skeleton in the x-direction
        let deltaX = Math.abs(this.x - heroX);
        // The distance between the hero and this skeleton in the y-direction
        let deltaY = Math.abs(this.y - heroY);
        // The angle of a right triangle in which the skeleton is on one
        // end, and the hero is on the other
        let angle = Math.atan(deltaY / deltaX);
        // The distance in the x-direction the skeleton will walk this tick
        let walkX = walkOrth * Math.cos(angle);
        // This value is negative if the hero is to the left of the skeleton
        if (heroX < this.x) walkX = -walkX;
        return walkX;
    }

    // Gets the next y-value to move toward the player
    getNextYValue(walkOrth) {
        // The hero's current x-coordinate
        let heroX = this.hero.getX();
        // The hero's current y-coordinate
        let heroY = this.hero.getY();
        // The distance between the hero and this skeleton in the x-direction
        let deltaX = Math.abs(this.x - heroX);
        // The distance between the hero and this skeleton in the y-direction
        let deltaY = Math.abs(this.y - heroY);
        // The angle of a right triangle in which the skeleton is on one
        // end, and the hero is on the other
        let angle = Math.atan(deltaY / deltaX);
        // The distance in the y-direction the skeleton will walk this tick
        let walkY = walkOrth * Math.sin(angle);
        // This value is negative if the hero is above (from the player's perspective)
        // the skeleton
        if (heroY < this.y) walkY = -walkY;
        return walkY;
    }

    update() {
                // The hero's current x-coordinate
                let heroX = this.hero.getX();
                // The hero's current y-coordinate
                let heroY = this.hero.getY();
        
                // The cartesian distance between the hero and the skeleton
                let distance = Math.sqrt((Math.abs(this.x - heroX)) ^ 2 + (Math.abs(this.y - heroY)) ^ 2);
        
                if (distance <= 5) {
                    this.action = 0;
                    // Attack the player
                }

        this.action = 1;
        // The total distance this skeleton will walk this tick
        let walkOrth = this.walkSpeed * this.game.clockTick;
        let delX = this.getNextXValue(walkOrth);
        let delY = this.getNextYValue(walkOrth);
        // The player is to the right of the skeleton
        if (delX > 0) this.facing = 0;
        // The player is to the left of the skeleton
        else this.facing = 2;
        // The player is above or below the skeleton at over 45 degrees
        if (Math.atan(Math.abs(this.y - this.hero.getY()) / Math.abs(this.x - this.hero.getX())) > Math.PI / 4) {
            // The player is above the skeleton
            if (this.hero.getY() < this.y) this.facing = 1;
            // The player is below the skeleton
            else this.facing = 3;
        }

        // TODO: Implement collision
        this.x += delX;
        this.y += delY;
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
        this.animations[0][0] = new Animator(this.spritesheet, 13, 146, this.width, this.height, 1, 0.15, 23, false, true);
        // north
        this.animations[0][1] = new Animator(this.spritesheet, 11, 210, this.width, this.height, 1, 0.15, 23, false, true);
        // west
        this.animations[0][2] = new Animator(this.spritesheet, 10, 82, this.width, this.height, 1, 0.15, 23, false, true);
        // south
        this.animations[0][3] = new Animator(this.spritesheet, 11, 18, this.width, this.height, 1, 0.15, 23, false, true);

        // walking
        // east
        this.animations[1][0] = new Animator(this.spritesheet, 13, 146, this.width, this.height, 4, 0.15, 23, false, true);
        // north
        this.animations[1][1] = new Animator(this.spritesheet, 11, 210, this.width, this.height, 4, 0.15, 23, false, true);
        // west
        this.animations[1][2] = new Animator(this.spritesheet, 10, 82, this.width, this.height, 4, 0.15, 23, false, true);
        // south
        this.animations[1][3] = new Animator(this.spritesheet, 11, 18, this.width, this.height, 4, 0.15, 23, false, true);

    }
}