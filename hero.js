class Hero {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        // sprite sheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/hero.png");
        this.width = 25; // character width
        this.height = 46; // character height

        // character states
        this.action = 0 // 0 = idle, 1 = walking
        this.facing = 0 // 0 = east, 1 = north, 2 = west, 3 = south
        this.health = 100;

        this.sword = new Sword(game, this.x, this.y);

        this.walkSpeed = 200; // pixels per second

        this.updateBB();

        this.animations = [];
        this.loadAnimations();
    };

    update() {
        let walkOrth = this.walkSpeed * this.game.clockTick;
        let walkDiag = walkOrth / Math.SQRT2;
        let delX = 0;
        let delY = 0;
        if (this.game.right && !this.game.left) {
            this.action = 1;
            this.facing = 0;
            if (this.game.up && !this.game.down) {
                // move northeast
                delX += walkDiag;
                delY -= walkDiag;
            } else if (this.game.down && !this.game.up) {
                // move southeast
                delX += walkDiag;
                delY += walkDiag;
            } else {
                // move east
                delX += walkOrth;
            }
        } else if (this.game.left && !this.game.right) {
            this.action = 1;
            this.facing = 2;
            if (this.game.up && !this.game.down) {
                // move northwest
                delX -= walkDiag;
                delY -= walkDiag;
            } else if (this.game.down && !this.game.up) {
                // move southwest
                delX -= walkDiag;
                delY += walkDiag;
            } else {
                // move west
                delX -= walkOrth;
            }
        } else if (this.game.up && !this.game.down) {
            this.action = 1;
            this.facing = 1;
            // move north
            delY -= walkOrth;
        } else if (this.game.down && !this.game.up) {
            this.action = 1;
            this.facing = 3;
            // move south
            delY += walkOrth;
        } else {
            this.action = 0;
        }

        // TODO: Implement collision
        this.x += delX;
        this.y += delY;

        this.sword.updateX(this.x);
        this.sword.updateY(this.y);
        this.sword.updateFacing(this.facing);
        if (this.game.click != null) {
            this.sword.updateState(3);
            this.game.click = null;
        } else {
            this.sword.updateState(2);
        }

        this.updateBB();
    };

    draw(ctx) {
        let swordX = this.sword.getX();
        let swordY = this.sword.getY();
        if (this.facing == 1) {
            this.sword.getAnimation().drawFrame(this.game.clockTick, ctx, swordX, swordY, 1);
            this.animations[this.action][this.facing].drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
        } else {
            this.animations[this.action][this.facing].drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
            this.sword.getAnimation().drawFrame(this.game.clockTick, ctx, swordX, swordY, 1);
        }
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
     * Causes the hero to take damage with the option of adding knockback.
     * An easy way to calculate the vector components is
     * xVectorComp = (heroLocationX - damageDealerLocationX) and
     * yVectorComp = (heroLocationY - damageDealerLocationY).
     * @param {Number} damage The damage dealt to the player
     * @param {Number} knockback Knockback distance measured in pixels
     * @param {Number} xVectorComp The x-component of a vector specifying the knockback direction
     * @param {Number} yVectorComp The y-component of a vector specifying the knockback direction
     */
    takeDamage(damage, knockback = 0, xVectorComp = 0, yVectorComp = 0) {
        this.health -= damage;
        if (this.health <= 0) {
            console.log("The player died.");
            this.removeFromWorld = true;
        }
        if (knockback != 0) {
            // TODO: Allow a knockback to be applied over a period of time rather than all at once
            // The angle of the knockback measured relative to the x-axis
            let angle = Math.atan(Math.abs(yVectorComp) / Math.abs(xVectorComp));
            // The new x-coordinate of the hero
            let deltaX = knockback * Math.cos(angle);
            // The new y-coordinate of the hero
            let deltaY = knockback * Math.sin(angle);
            if (xVectorComp < 0) deltaX = -deltaX;
            if (yVectorComp < 0) deltaY = -deltaY;
            this.x += deltaX;
            this.y += deltaY;
        }
    }
}