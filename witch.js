class Witch {
    constructor(game, hero, x, y) {
        Object.assign(this, {game, hero, x, y});

        // sprite sheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/witch.png");
        this.width = 29; // character width
        this.height = 64; // character height

        // character states
        this.action = 0; // 0 = idle, 1 = walking
        this.facing = 0; // 0 = east, 1 = north, 2 = west, 3 = south
        
        this.attack = 0;
        this.attackDamage = 15;
        this.attackDistance = 200;
        this.elapsedTime = 0;
        this.firingRate = 1;

        this.health = 100;
        this.dead = false;

        this.walkSpeed = 75; // pixels per second
        this.velocity = {x: 0, y: 0};
        this.accelerationToPlayer = 1000000;
        this.accelerationFromWall = 70000;

        this.updateBB();

        this.animations = [];
        this.loadAnimations();
    };

    testSpeed() {
        var speed = Math.sqrt(this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y);
        if (speed > this.walkSpeed) {
            var ratio = this.walkSpeed / speed;
            this.velocity.x *= ratio;
            this.velocity.y *= ratio;
        }
    };

    update() {
        this.action = 1;

        // hero coordinates
        let heroX = this.hero.getX();
        let heroY = this.hero.getY();
        // distance equation for 2 points
        let heroDistance = Math.sqrt(Math.pow(Math.abs(heroX - this.x), 2) + Math.pow(Math.abs(heroY - this.y), 2));

        let delX = this.velocity.x * this.game.clockTick;
        let delY = this.velocity.y * this.game.clockTick;

        // [xDisplaced, yDisplaced, hV]
        let cardinal = [this.x - heroX, this.y - heroY, Math.abs(delX / delY)]; // hV > 1: EAST/WEST; hV < 1:
                                                                                // NORTH/SOUTH
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

        this.elapsedTime += this.game.clockTick;
        if (heroDistance <= this.attackDistance) { // if hero is less than attackDistance away, stop and attack
			this.action = 0;
            if (this.elapsedTime >= this.firingRate) {
                let fireBall = new WitchFireball(this.game, this.hero.getX(), this.hero.getY(), false, this.attackDamage, this.x - 10, this.y + 30);
                this.game.addEntity(fireBall);
                this.elapsedTime = 0;
            }
        } else { // walk towards player
            this.action = 1;
            this.x += delX;
            this.y += delY;

            let deltaX = (heroX - this.x) / heroDistance;
            let deltaY = (heroY - this.y) / heroDistance;
            this.velocity.x += deltaX * this.accelerationToPlayer / (heroDistance * heroDistance);
            this.velocity.y += deltaY * this.accelerationToPlayer / (heroDistance * heroDistance);
        }

        // World borders
        if (this.x <= 0) this.x = 0;
        if (this.y <= 0) this.y = 0;
        if (this.x >= this.game.camera.map.width - this.width) this.x = this.game.camera.map.width - this.width;
        if (this.y >= this.game.camera.map.height - this.height) this.y = this.game.camera.map.height - this.height;

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
            if (entity instanceof Wall) {
                let wallDistance = Math.sqrt((that.x - entity.centerX) * (that.x - entity.centerX) + 
                (that.y - entity.centerY) * (that.y - entity.centerY));
                let deltaX = (entity.centerX - that.x) / wallDistance;
                let deltaY = (entity.centerY - that.y) / wallDistance;
                that.velocity.x -= deltaX * that.accelerationFromWall / (wallDistance * wallDistance);
                that.velocity.y -= deltaY * that.accelerationFromWall / (wallDistance * wallDistance);
            }
        });
		
        this.testSpeed();

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
    };

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
     * Causes the witch to take damage with the option of adding knockback.
     * An easy way to calculate the vector components is
     * xVectorComp = (witchLocationX - damageDealerLocationX) and
     * yVectorComp = (witchLocationY - damageDealerLocationY).
     * @param {Number} damage The damage dealt to the witch
     * @param {Number} knockback Knockback distance measured in pixels
     * @param {Number} xVectorComp The x-component of a vector specifying the knockback direction
     * @param {Number} yVectorComp The y-component of a vector specifying the knockback direction
     */
    takeDamage(damage, knockback = 0, xVectorComp = 0, yVectorComp = 0) {
        this.health -= damage;
        if (this.health <= 0) {
            this.removeFromWorld = true;
            this.hero.exp.witchKill();
        }
        if (knockback != 0) {
            // TODO: Allow a knockback to be applied over a period of time rather than all at once
            // The angle of the knockback measured relative to the x-axis
            let angle = Math.atan(Math.abs(yVectorComp) / Math.abs(xVectorComp));
            // The new x-coordinate of the witch
            let deltaX = knockback * Math.cos(angle);
            // The new y-coordinate of the witch
            let deltaY = knockback * Math.sin(angle);
            if (xVectorComp < 0) deltaX = -deltaX;
            if (yVectorComp < 0) deltaY = -deltaY;
            this.x += deltaX;
            this.y += deltaY;
        }
    }
}