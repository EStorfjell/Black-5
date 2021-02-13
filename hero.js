class Hero {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});

        // sprite sheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/hero.png");
        this.width = 25; // character width
        this.height = 46; // character height

        // character states
        this.action = 0; // 0 = idle, 1 = walking
        this.facing = 0; // 0 = east, 1 = north, 2 = west, 3 = south
        this.health = 100;

        this.primaryWeapon = new Shotgun(game, true, this.x, this.y);
        this.primaryWeapon.setPrimaryWeapon();
        this.secondaryWeapon = new Crossbow(game, true, this.x, this.y);
        this.secondaryWeapon.setPrimaryWeapon();
        this.sword = new Sword(game, this.x, this.y);
        this.sword.setPrimaryWeapon();
        this.meleeEquipped = false;

        this.game.addEntity(this.primaryWeapon);
        this.game.addEntity(this.secondaryWeapon);
        this.game.addEntity(this.sword);

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

        this.x += delX;
        this.y += delY;

        if (this.game.switchToSecondary) {
            this.meleeEquipped = false;
            let temp = this.secondaryWeapon;
            this.secondaryWeapon = this.primaryWeapon;
            this.primaryWeapon = temp;
            this.game.switchToSecondary = false;
        }
        if (this.game.switchToMelee) {
            this.meleeEquipped = true;
            this.game.switchToMelee = false;
        }

        this.primaryWeapon.updateX(this.x);
        this.primaryWeapon.updateY(this.y);
        this.primaryWeapon.updateFacing(this.facing);
        this.secondaryWeapon.updateX(this.x);
        this.secondaryWeapon.updateY(this.y);
        this.secondaryWeapon.updateFacing(this.facing);
        this.sword.updateX(this.x);
        this.sword.updateY(this.y);
        this.sword.updateFacing(this.facing);

        if (this.game.click != null) {
            let currentWeapon;
            if (this.meleeEquipped) {
                currentWeapon = this.sword;
            } else {
                currentWeapon = this.primaryWeapon;
            }
            currentWeapon.attack(this.game.click.x + this.game.camera.x, this.game.click.y + this.game.camera.y);
            this.game.click = null;
        }

        // World borders
        if (this.x <= 0) this.x = 0;
        if (this.y <= 0) this.y = 0;
        if (this.x >= this.game.camera.map.width - this.width) this.x = this.game.camera.map.width - this.width;
        if (this.y >= this.game.camera.map.height - this.height) this.y = this.game.camera.map.height - this.height;

        this.updateBB();

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
        let currentWeaponDrawX;
        let currentWeaponDrawY;
        let currentWeaponAnimation;
        if (this.meleeEquipped) {
            currentWeaponDrawX = this.sword.getX() - this.game.camera.x;
            currentWeaponDrawY = this.sword.getY() - this.game.camera.y;
            currentWeaponAnimation = this.sword.getAnimation();
        } else {
            currentWeaponDrawX = this.primaryWeapon.getX() - this.game.camera.x;
            currentWeaponDrawY = this.primaryWeapon.getY() - this.game.camera.y;
            currentWeaponAnimation = this.primaryWeapon.getAnimation();
        }

        let heroDrawX = this.x - this.game.camera.x;
        let heroDrawY = this.y - this.game.camera.y;
        if (this.facing == 1) {
            currentWeaponAnimation.drawFrame(this.game.clockTick, ctx, currentWeaponDrawX, currentWeaponDrawY, 1);
            this.animations[this.action][this.facing].drawFrame(this.game.clockTick, ctx, heroDrawX, heroDrawY, 1);
        } else {
            this.animations[this.action][this.facing].drawFrame(this.game.clockTick, ctx, heroDrawX, heroDrawY, 1);
            currentWeaponAnimation.drawFrame(this.game.clockTick, ctx, currentWeaponDrawX, currentWeaponDrawY, 1);
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
        if (knockback !== 0) {
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