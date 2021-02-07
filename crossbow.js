class Crossbow {
    constructor(game, isOwnedByHero, x, y) {
        Object.assign(this, { game, isOwnedByHero, x, y });

        // sprite sheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/crossbow.png");

        // weapon states
        this.state = 0 // 0 = not equipped, 1 = secondary weapon, 2 = primary weapon without arrow, 3 = primary weapon with arrow
        this.facing = 0 // 0 = east, 1 = north, 2 = west, 3 = south

        this.attackDamage = 15;
        this.attackDamageIncrease = 5; // attack damage increase per upgrade
        this.attackDamageUpgradeLevel = 0;

        this.ammo = 8; // number of arrows
        this.attacking = false; // true if this crossbow is firing
        this.targetX = 0;
        this.targetY = 0;

        this.firingRate = 1; // shots per second
        this.firingRateIncrease = 1; // firing rate increase per upgrade
        this.firingRateUpgradeLevel = 0;

        this.elapsedTime = 0; // elapsed time since last attack

        this.widthWithoutArrow = 37;
        this.heightWithoutArrow = 26;
        this.widthWithArrow = 49;
        this.heightWithArrow = 26;

        this.updateBB();

        this.animations = [];
        this.loadAnimations();
    };

    update() {
        this.elapsedTime += this.game.clockTick;
        if (this.attacking && this.elapsedTime >= this.firingRate && this.ammo > 0) {
            let isOnHeroTeam = this.isOwnedByHero;
            let arrow = new Arrow(this.game, this.targetX, this.targetY, isOnHeroTeam, this.attackDamage, this.x, this.y);
            this.game.addEntity(arrow);
            this.state = 2;
            this.ammo--;
            this.attacking = false;
            this.elapsedTime = 0;
        }

        if (this.state == 2 && this.elapsedTime >= this.firingRate && this.ammo > 0) {
            this.state = 3;
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
        for (let i = 0; i < 3; i++) { // three visible states
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

        // primary weapon without arrow
        // east
        this.animations[2][0] = new Animator(this.spritesheet, 113, 55, this.widthWithoutArrow, this.heightWithoutArrow, 1, 0.15, 0, false, true);
        // north
        this.animations[2][1] = new Animator(this.spritesheet, 121, 163, this.heightWithoutArrow, this.widthWithoutArrow, 1, 0.15, 0, false, true);
        // west
        this.animations[2][2] = new Animator(this.spritesheet, 119, 9, this.widthWithoutArrow, this.heightWithoutArrow, 1, 0.15, 0, false, true);
        // south
        this.animations[2][3] = new Animator(this.spritesheet, 121, 99, this.heightWithoutArrow, this.widthWithoutArrow, 1, 0.15, 0, false, true);

        // primary weapon with arrow
        // east
        this.animations[3][0] = new Animator(this.spritesheet, 11, 56, this.widthWithArrow, this.heightWithArrow, 1, 0.15, 0, false, true);
        // north
        this.animations[3][1] = new Animator(this.spritesheet, 21, 157, this.heightWithArrow, this.widthWithArrow, 1, 0.15, 0, false, true);
        // west
        this.animations[3][2] = new Animator(this.spritesheet, 10, 9, this.widthWithArrow, this.heightWithArrow, 1, 0.15, 0, false, true);
        // south
        this.animations[3][3] = new Animator(this.spritesheet, 20, 96, this.heightWithArrow, this.widthWithArrow, 1, 0.15, 0, false, true);
    }

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
    }

    updateX(ownerX) {
        // this.x = ownerX + ownerOffset + crossbowOffset
        let playerOffset;
        let crossbowOffset;
        if (this.facing == 0) { // east
            playerOffset = 13;
            crossbowOffset = 0;
        } else if (this.facing == 1) { // north
            playerOffset = 13;
            crossbowOffset = -11;
        } else if (this.facing == 2) { // west
            playerOffset = 13;
            if (this.state == 2) crossbowOffset = -36; // without an arrow
            else crossbowOffset = -48; // with an arrow
        } else { // south
            playerOffset = 12;
            crossbowOffset = -11;
        }
        this.x = ownerX + playerOffset + crossbowOffset;
    }

    updateY(ownerY) {
        // this.y = ownerY + ownerOffset + crossbowOffset
        let playerOffset;
        let crossbowOffset;
        if (this.facing == 0) { // east
            playerOffset = 28;
            crossbowOffset = -11;
        } else if (this.facing == 1) { // north
            playerOffset = 26;
            if (this.state == 2) crossbowOffset = -36; // without an arrow
            else crossbowOffset = -48 // with an arrow
        } else if (this.facing == 2) { // west
            playerOffset = 28;
            crossbowOffset = -11;
        } else { // south
            playerOffset = 24;
            crossbowOffset = 0;
        }
        this.y = ownerY + playerOffset + crossbowOffset;
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
        this.attackDamage += this.attackDamageIncrease;
        this.attackDamageUpgradeLevel++;
    }

    getAttackDamageUpgradeLevel() {
        return this.attackDamageUpgradeLevel;
    }

    upgradeFiringRate() {
        this.firingRate += this.firingRateIncrease;
        this.firingRateUpgradeLevel++;
    }

    getFiringRateUpgradeLevel() {
        return this.firingRateUpgradeLevel;
    }

    getAmmo() {
        return this.ammo;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

}