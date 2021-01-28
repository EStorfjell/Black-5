class SkeletonArrow {
    constructor(game, targetX, targetY, hero, x, y) {
        Object.assign(this, { game, targetX, targetY, hero, x, y });

        // sprite sheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/skeleton_arrow.png");

        // arrow states
        this.facing = 0 // 0 = east, 1 = north, 2 = west, 3 = south
        this.attackDamage = 10;

        this.flySpeed = 200; // pixels per second

        this.updateBB();

        this.animations = [];
        this.loadAnimations();

        this.delX = this.getNextXValue(this.flySpeed * this.game.clockTick);
        this.delY = this.getNextYValue(this.flySpeed * this.game.clockTick);

        if (this.delX > 0) {
            // The target is to the right of the arrow
            this.facing = 0;
            this.width = 34;
            this.height = 9;
        } else {
            // The target is to the left of the arrow
            this.facing = 2;
            this.width = 34;
            this.height = 9;
        }
        if (Math.atan(Math.abs(this.y - this.targetY) / Math.abs(this.x - this.targetX)) > Math.PI / 4) {
            // The target is above or below the arrow at over 45 degrees
            if (this.targetY < this.y) {
                // The target is above the arrow
                this.facing = 1;
                this.width = 9;
                this.height = 34;
            } else {
                // The target is below the arrow
                this.facing = 3;
                this.width = 9;
                this.height = 34;
            }
        }
    };

    /**
     * Gets the next x-value to fly toward the target's last position.
     * @param {Number} flyOrth The total distance this arrow will fly this tick
     */
    getNextXValue(flyOrth) {
        // The distance between the target's last position and this arrow in the x-direction
        let deltaX = Math.abs(this.x - this.targetX);
        // The distance between the target and this arrow in the y-direction
        let deltaY = Math.abs(this.y - this.targetY);
        // The angle of a right triangle in which the arrow is on one
        // end, and the target is on the other
        let angle = Math.atan(deltaY / deltaX);
        // The distance in the x-direction the arrow will fly this tick
        let flyX = flyOrth * Math.cos(angle);
        // This value is negative if the target is to the left of the arrow
        if (this.targetX < this.x) flyX = -flyX;
        return flyX;
    }

    /**
     * Gets the next y-value to fly toward the target's last position.
     * @param {Number} flyOrth The total distance this arrow will fly this tick
     */
    getNextYValue(flyOrth) {
        // The distance between the target's last position and this arrow in the x-direction
        let deltaX = Math.abs(this.x - this.targetX);
        // The distance between the target and this arrow in the y-direction
        let deltaY = Math.abs(this.y - this.targetY);
        // The angle of a right triangle in which the arrow is on one
        // end, and the target is on the other
        let angle = Math.atan(deltaY / deltaX);
        // The distance in the y-direction the arrow will fly this tick
        let flyY = flyOrth * Math.sin(angle);
        // This value is negative if the target is to the left of the arrow
        if (this.targetY < this.y) flyY = -flyY;
        return flyY;
    }

    update() {
        this.x += this.delX;
        this.y += this.delY;

        this.updateBB();

        // Collision check and handling
        var that = this;
        this.game.entities.forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                if (entity instanceof Hero) {
                    that.action = 0;
                    // The arrow will damage the player
                    that.hero.takeDamage(that.attackDamage, 25, that.hero.getX() - that.x, that.hero.getY() - that.y);
                    that.removeFromWorld = true;
                }
            }
        });
    };

    draw(ctx) {
        this.animations[0][this.facing].drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
    };

    loadAnimations() {
        for (let i = 0; i < 1; i++) { // one action
            this.animations.push([]);
            for (i = 0; i < 4; i++) { // four directions
                this.animations.push([]);
            }
        }

        // flying
        // west
        this.animations[0][2] = new AdvancedAnimator(this.spritesheet, [18], [44], [34], [9], 0.15, false, true);
        // south
        this.animations[0][3] = new AdvancedAnimator(this.spritesheet, [70], [30], [9], [34], 0.15, false, true);
        // east
        this.animations[0][0] = new AdvancedAnimator(this.spritesheet, [93], [42], [34], [9], 0.15, false, true);
        // north
        this.animations[0][1] = new AdvancedAnimator(this.spritesheet, [150], [27], [9], [34], 0.15, false, true);
    }

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
    }
}