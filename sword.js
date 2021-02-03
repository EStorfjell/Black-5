class Sword {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});

        // sprite sheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/sword.png");

        // weapon states
        this.state = 0 // 0 = not equipped, 1 = secondary weapon, 2 = primary weapon, 3 = attacking
        this.facing = 0 // 0 = east, 1 = north, 2 = west, 3 = south
        this.attackDamage = 15;

        this.updateBB();

        this.animations = [];
        this.loadAnimations();
    };

    update() {
        this.updateBB();
    };

    draw(ctx) {
        this.animations[this.action][this.facing].drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
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
        this.animations[1][0] = new Animator(this.spritesheet, 7, 71, 44, 44, 1, 0.15, 0, false, true);
        // north
        this.animations[1][1] = new Animator(this.spritesheet, 4, 16, 44, 44, 1, 0.15, 0, false, true);
        // west
        this.animations[1][2] = new Animator(this.spritesheet, 4, 16, 44, 44, 1, 0.15, 0, false, true);
        // south
        this.animations[1][3] = new Animator(this.spritesheet, 5, 192, 44, 44, 1, 0.15, 0, false, true);

        // primary weapon
        // east
        this.animations[2][0] = new Animator(this.spritesheet, 148, 71, 44, 44, 1, 0.15, 0, false, true);
        // north
        this.animations[2][1] = new Animator(this.spritesheet, 154, 11, 44, 44, 1, 0.15, 0, false, true);
        // west
        this.animations[2][2] = new Animator(this.spritesheet, 154, 11, 44, 44, 1, 0.15, 0, false, true);
        // south
        this.animations[2][3] = new Animator(this.spritesheet, 150, 191, 44, 44, 1, 0.15, 0, false, true);

        // attacking
        // east
        this.animations[3][0] = new Animator(this.spritesheet, 60, 67, 44, 50, 1, 0.15, 0, false, true);
        // north
        this.animations[3][1] = new Animator(this.spritesheet, 58, 5, 44, 50, 1, 0.15, 0, false, true);
        // west
        this.animations[3][2] = new Animator(this.spritesheet, 58, 5, 44, 50, 1, 0.15, 0, false, true);
        // south
        this.animations[3][3] = new Animator(this.spritesheet, 59, 194, 50, 44, 1, 0.15, 0, false, true);
    }

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
    }

    updateX(playerX) {
        if (this.facing == 0) { // east
            this.x = playerX + 9;
        } else if (this.facing == 1) { // north
            this.x = playerX + 20 - 44;
        } else if (this.facing == 2) { // west
            this.x = playerX + 13 - 44;
        } else { // south
            this.x = playerX + 4;
        }
    }

    updateY(playerY) {
        if (this.facing == 0) { // east
            this.y = playerY + 33 - 44;
        } else if (this.facing == 1) { // north
            this.y = playerY + 32 - 44;
        } else if (this.facing == 2) { // west
            this.y = playerY + 33 - 44;
        } else { // south
            this.y = playerY + 32;
        }
    }

    updateState(newState) {
        this.state = newState;
    }

    updateFacing(newFacing) {
        this.facing = newFacing;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

}