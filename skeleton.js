class Skeleton {
    constructor(game, hero, x, y) {
        Object.assign(this, {game, hero, x, y});

        // sprite sheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/skeleton_crossbow.png");
        this.width = 25; // character width
        this.height = 46; // character height

        // character states
        this.action = 0; // 0 = idle, 1 = walking
        this.facing = 0; // 0 = east, 1 = north, 2 = west, 3 = south
        this.health = 100;
        this.attackDamage = 10;
        this.firingRate = 1; // shots per second
        this.elapsedTime = 0; // The time since the skeleton last shot
        this.dead = false;

        this.walkSpeed = 75; // pixels per second
        this.velocity = {x: 0, y: 0};

        this.updateBB();

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

        let distance = Math.sqrt((this.x - heroX) * (this.x - heroX) + (this.y - heroY) * (this.y - heroY));

        this.action = 1;
        // The total distance this skeleton will walk this tick
        let walkOrth = this.walkSpeed * this.game.clockTick;
        let delX = this.getNextXValue(walkOrth);
        let delY = this.getNextYValue(walkOrth);
        // The player is to the right of the skeleton
        if (delX > 0) {
            this.facing = 0;
        }// The player is to the left of the skeleton
        else {
            this.facing = 2;
        }
        // The player is above or below the skeleton at over 45 degrees
        if (Math.atan(Math.abs(this.y - this.hero.getY()) / Math.abs(this.x - this.hero.getX())) > Math.PI / 4) {
            // The player is above the skeleton
            if (this.hero.getY() < this.y) {
                this.facing = 1;
            }// The player is below the skeleton
            else {
                this.facing = 3;
            }
        }

        this.x += delX;
        this.y += delY;

        // World borders
        if (this.x <= 0) this.x = 0;
        if (this.y <= 0) this.y = 0;
        if (this.x >= this.game.camera.map.width - this.width) this.x = this.game.camera.map.width - this.width;
        if (this.y >= this.game.camera.map.height - this.height) this.y = this.game.camera.map.height - this.height;

        this.updateBB();

        this.elapsedTime += this.game.clockTick;
        if (distance <= 300 && this.elapsedTime >= this.firingRate) {
            if (this.facing == 0) {
                // The skeleton is facing east
                let arrow = new Arrow(this.game, this.hero.getX(), this.hero.getY(), false, this.attackDamage, this.x + 22, this.y + 23);
                this.game.addEntity(arrow);
            } else if (this.facing === 1) {
                // The skeleton is facing north
                let arrow = new Arrow(this.game, this.hero.getX(), this.hero.getY(), false, this.attackDamage, this.x + 10, this.y);
                this.game.addEntity(arrow);
            } else if (this.facing === 2) {
                // The skeleton is facing west
                let arrow = new Arrow(this.game, this.hero.getX(), this.hero.getY(), false, this.attackDamage, this.x, this.y + 23);
                this.game.addEntity(arrow);
            } else if (this.facing === 3) {
                // The skeleton is facing south
                let arrow = new Arrow(this.game, this.hero.getX(), this.hero.getY(), false, this.attackDamage, this.x + 8, this.y + 39);
                this.game.addEntity(arrow);
            }
            this.elapsedTime = 0;
        }

        // Collision check and handling
        let that = this;
        this.game.entities.forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                if (entity instanceof Wall) {
                    if (delX > 0 && that.lastBB.right <= entity.BB.left) { // collision from left
                        delX = 0;
                        that.x = entity.BB.left - that.width;
                    }
                    if (delX < 0 && that.lastBB.left >= entity.BB.right) { // collision from right
                        delX = 0;
                        that.x = entity.BB.right;
                    }
                    if (delY > 0 && that.lastBB.bottom <= entity.BB.top) { // collision from top
                        delY = 0;
                        that.y = entity.BB.top - that.height;
                    }
                    if (delY < 0 && that.lastBB.top >= entity.BB.bottom) { // collision from bottom
                        delY = 0;
                        that.y = entity.BB.bottom;
                    }
                }
            }
        });

        this.updateBB();
    };

    draw(ctx) {
        let drawX = this.x - this.game.camera.x;
        let drawY = this.y - this.game.camera.y;
        this.animations[this.action][this.facing].drawFrame(this.game.clockTick, ctx, drawX, drawY, 1);
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
        this.animations[0][0] = new AdvancedAnimator(this.spritesheet, [73], [204], [56], [44], 0.15, false, true);
        // north
        this.animations[0][1] = new AdvancedAnimator(this.spritesheet, [99], [316], [21], [45], 0.15, false, true);
        // west
        this.animations[0][2] = new AdvancedAnimator(this.spritesheet, [37], [140], [56], [44], 0.15, false, true);
        // south
        this.animations[0][3] = new AdvancedAnimator(this.spritesheet, [98], [28], [26], [73], 0.15, false, true);

        // walking
        // east
        this.animations[1][0] = new AdvancedAnimator(this.spritesheet, [73, 141, 209, 277],
            [204, 205, 204, 205], [56, 55, 56, 57], [44, 44, 44, 44], 0.15, false, true);
        // north
        this.animations[1][1] = new AdvancedAnimator(this.spritesheet, [99, 147, 195, 243], [316, 317, 316, 317],
            [21, 21, 21, 21], [45, 45, 45, 45], 0.15, false, true);
        // west
        this.animations[1][2] = new AdvancedAnimator(this.spritesheet, [37, 105, 173, 241], [140, 141, 140, 141],
            [56, 56, 56, 56], [44, 44, 44, 44], 0.15, false, true);
        // south
        this.animations[1][3] = new AdvancedAnimator(this.spritesheet, [98, 146, 194, 242], [28, 29, 28, 29],
            [26, 26, 26, 26], [73, 73, 73, 73], 0.15, false, true);

    }

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    /**
     * Causes the skeleton to take damage with the option of adding knockback.
     * An easy way to calculate the vector components is
     * xVectorComp = (skeletonLocationX - damageDealerLocationX) and
     * yVectorComp = (skeletonLocationY - damageDealerLocationY).
     * @param {Number} damage The damage dealt to the skeleton
     * @param {Number} knockback Knockback distance measured in pixels
     * @param {Number} xVectorComp The x-component of a vector specifying the knockback direction
     * @param {Number} yVectorComp The y-component of a vector specifying the knockback direction
     */
    takeDamage(damage, knockback = 0, xVectorComp = 0, yVectorComp = 0) {
        this.health -= damage;
        if (this.health <= 0) {
            this.removeFromWorld = true;
        }
        if (knockback != 0) {
            // TODO: Allow a knockback to be applied over a period of time rather than all at once
            // The angle of the knockback measured relative to the x-axis
            let angle = Math.atan(Math.abs(yVectorComp) / Math.abs(xVectorComp));
            // The new x-coordinate of the skeleton
            let deltaX = knockback * Math.cos(angle);
            // The new y-coordinate of the skeleton
            let deltaY = knockback * Math.sin(angle);
            if (xVectorComp < 0) deltaX = -deltaX;
            if (yVectorComp < 0) deltaY = -deltaY;
            this.x += deltaX;
            this.y += deltaY;
        }
    }
}