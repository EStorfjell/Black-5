class Shotgun {
    constructor(game, isOwnedByHero, x, y, hero) {
        Object.assign(this, { game, isOwnedByHero, x, y, hero });

        // sprite sheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/shotgun.png");

        // weapon states
        this.state = 0 // 0 = not equipped, 1 = secondary weapon, 
        // 2 = primary weapon not firing, 3 = primary weapon firing
        this.facing = 0 // 0 = east, 1 = north, 2 = west, 3 = south

        this.attackDamage = 15;
        this.attackDamageIncrease = 5; // attack damage increase per upgrade
        this.attackDamageUpgradeLevel = 0;
        this.attackDamageMaxUpgradeLevel = 3;
        this.attackDamageUpgradeCost = 10;
        this.maxAttackDamage = 30;

        this.ammo = 200; // number of shots
        this.ammoUnit = 15; // number of shots the player can buy at once
        this.maxAmmo = 200;
        this.ammoUnitCost = 5;

        this.weaponCost = 100;

        this.attacking = false; // true if this shotgun is firing
        this.targetX = 0;
        this.targetY = 0;

        this.reloadSpeed = 1; // minimum time between shots
        this.reloadSpeedUpgradeLevel = 0;
        this.reloadSpeedDecrease = 0.15; // percentage
        this.reloadSpeedMaxUpgradeLevel = 3;
        this.reloadSpeedUpgradeCost = 10;
        this.maxReloadSpeed = this.reloadSpeed;

        this.elapsedTime = 0; // elapsed time since last attack

        this.updateBB();

        this.animations = [];
        this.loadAnimations();
    };

    update() {
        this.elapsedTime += this.game.clockTick;
        if (this.attacking && this.elapsedTime >= this.reloadSpeed && this.ammo > 0) {
            let isOnHeroTeam = this.isOwnedByHero;

            let bulletX;
            let bulletY;
            if (this.facing == 0) { // east
                bulletX = this.x + 35;
                bulletY = this.y + 7;
            } else if (this.facing == 1) { // north
                bulletX = this.x + 7;
                bulletY = this.y;
            } else if (this.facing == 2) { // west
                bulletX = this.x;
                bulletY = this.y + 7;
            } else { // south
                bulletX = this.x + 7;
                bulletY = this.y + 35;
            }

            // 15 degrees
            let angle = 0.2617994;
            // Sets the origin to the shotgun's position
            let newTargetX = this.targetX - this.x;
            let newTargetY = this.targetY - this.y;
            // Finds the new rotated coordinates relative to the shotgun
            let rotatedTargetX1 = newTargetX * Math.cos(angle) - newTargetY * Math.sin(angle);
            let rotatedTargetY1 = newTargetX * Math.sin(angle) + newTargetY * Math.cos(angle);
            let rotatedTargetX2 = newTargetX * Math.cos(-angle) - newTargetY * Math.sin(-angle);
            let rotatedTargetY2 = newTargetX * Math.sin(-angle) + newTargetY * Math.cos(-angle);
            // Sets the origin back to the map's origin
            rotatedTargetX1 += this.x;
            rotatedTargetY1 += this.y;
            rotatedTargetX2 += this.x;
            rotatedTargetY2 += this.y;
            let bullet1 = new Bullet(this.game, rotatedTargetX1, rotatedTargetY1, isOnHeroTeam, this.attackDamage, bulletX, bulletY);
            let bullet2 = new Bullet(this.game, this.targetX, this.targetY, isOnHeroTeam, this.attackDamage, bulletX, bulletY);
            let bullet3 = new Bullet(this.game, rotatedTargetX2, rotatedTargetY2, isOnHeroTeam, this.attackDamage, bulletX, bulletY);
            this.game.addEntity(bullet1);
            this.game.addEntity(bullet2);
            this.game.addEntity(bullet3);

            this.state = 3;
            this.ammo--;
            this.attacking = false;
            this.elapsedTime = 0;
        }

        if (!this.attacking && this.state == 3) {
            this.state = 2;
        }

        this.updateBB();
    };

    draw(ctx) {
        //this.animations[this.action][this.facing].drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
    };

    getAnimation() {
        return this.animations[this.state][this.facing];
    }

    loadAnimations() {
        for (let i = 0; i < 5; i++) { // five visible states
            this.animations.push([]);
            for (i = 0; i < 4; i++) { // four directions
                this.animations.push([]);
            }
        }

        //not equipped
        this.animations[0][0] = null;
        this.animations[0][1] = null;
        this.animations[0][2] = null;
        this.animations[0][3] = null;

        // secondary weapon
        // east
        this.animations[1][0] = null;
        // north
        this.animations[1][1] = null;
        // west
        this.animations[1][2] = null;
        // south
        this.animations[1][3] = null;

        // primary weapon not firing
        // east
        this.animations[2][0] = new Animator(this.spritesheet, 9, 56, 43, 16, 1, 0.15, 0, false, true);
        // north
        this.animations[2][1] = new Animator(this.spritesheet, 22, 142, 16, 43, 1, 0.15, 0, false, true);
        // west
        this.animations[2][2] = new Animator(this.spritesheet, 8, 19, 43, 16, 1, 0.15, 0, false, true);
        // south
        this.animations[2][3] = new Animator(this.spritesheet, 22, 87, 16, 43, 1, 0.15, 0, false, true);

        // primary weapon firing
        // east
        this.animations[3][0] = new Animator(this.spritesheet, 95, 55, 55, 17, 1, 0.15, 0, false, true);
        // north
        this.animations[3][1] = new Animator(this.spritesheet, 112, 146, 17, 55, 1, 0.15, 0, false, true);
        // west
        this.animations[3][2] = new Animator(this.spritesheet, 93, 18, 55, 17, 1, 0.15, 0, false, true);
        // south
        this.animations[3][3] = new Animator(this.spritesheet, 112, 86, 17, 55, 1, 0.15, 0, false, true);
    }

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
    }

    updateX(ownerX) {
        // this.x = ownerX + ownerOffset + shotgunOffset
        let playerOffset;
        let shotgunOffset;
        if (this.facing == 0) { // east
            playerOffset = 10;
            shotgunOffset = 0;
        } else if (this.facing == 1) { // north
            playerOffset = 13;
            shotgunOffset = -11;
        } else if (this.facing == 2) { // west
            playerOffset = 13;
            if (this.state == 3) shotgunOffset = -46; // firing
            else shotgunOffset = -34; // not firing
        } else { // south
            playerOffset = 5;
            shotgunOffset = -11;
        }
        this.x = ownerX + playerOffset + shotgunOffset;
    }

    updateY(ownerY) {
        // this.y = ownerY + ownerOffset + shotgunOffset
        let playerOffset;
        let shotgunOffset;
        if (this.facing == 0) { // east
            playerOffset = 28;
            shotgunOffset = -10;
        } else if (this.facing == 1) { // north
            playerOffset = 30;
            if (this.state == 3) shotgunOffset = -46; // firing
            else shotgunOffset = -34 // not firing
        } else if (this.facing == 2) { // west
            playerOffset = 28;
            shotgunOffset = -11;
        } else { // south
            playerOffset = 31;
            shotgunOffset = -8;
        }
        this.y = ownerY + playerOffset + shotgunOffset;
    }

    attack(targetX, targetY) {
        this.attacking = true;
        this.targetX = targetX;
        this.targetY = targetY;
    }

    setNotEquipped() {
        this.state = 0;
    }

    setSecondaryWeapon() {
        this.state = 1;
    }

    setPrimaryWeapon() {
        this.state = 2;
    }

    updateFacing(newFacing) {
        this.facing = newFacing;
    }

    upgradeAttackDamage() {
        if (this.canUpgradeAttackDamage()) {
            this.attackDamage += this.attackDamageIncrease;
            this.attackDamageUpgradeLevel++;
            this.hero.exp.expCounter -= this.attackDamageUpgradeCost;
        }
    }

    getAttackDamageUpgradeLevel() {
        return this.attackDamageUpgradeLevel;
    }

    canUpgradeAttackDamage() {
        return this.attackDamageUpgradeLevel < this.attackDamageMaxUpgradeLevel && this.hero.exp.getExp() >= this.attackDamageUpgradeCost;
    }

    upgradeReloadSpeed() {
        if (this.canUpgradeReloadSpeed) {
            this.reloadSpeed *= 1 - this.reloadSpeedDecrease;
            this.reloadSpeedUpgradeLevel++;
            this.hero.exp.expCounter -= this.reloadSpeedUpgradeCost;
        }
    }

    getReloadSpeedUpgradeLevel() {
        return this.reloadSpeedUpgradeLevel;
    }

    canUpgradeReloadSpeed() {
        return this.reloadSpeedUpgradeLevel < this.reloadSpeedMaxUpgradeLevel && this.hero.exp.getExp() >= this.reloadSpeedUpgradeCost;
    }

    getAmmo() {
        return this.ammo;
    }

    addAmmo() {
        if (this.canAddAmmo()) {
            this.ammo += this.ammoUnit;
            this.hero.exp.expCounter -= this.ammoUnitCost;
        }
    }

    getAmmoUnit() {
        return this.ammoUnit;
    }

    canAddAmmo() {
        return this.ammo <= this.maxAmmo - this.ammoUnit && this.hero.exp.getExp() >= this.ammoUnitCost;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

}