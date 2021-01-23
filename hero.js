class Hero {
    constructor(game) {
        Object.assign(this, {game});
        this.x = 0;
        this.y = 0;

        // sprite sheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/hero.png");
        this.width = 25; // character width
        this.height = 46; // character height

        // character states
        this.action = 0 // 0 = idle, 1 = walking
        this.facing = 0 // 0 = east, 1 = north, 2 = west, 3 = south

        this.walkSpeed = 100; // pixels per second

        this.animations = [];
        this.loadAnimations();
    };

    update() {
        let walkOrth = this.walkSpeed * this.game.clockTick;
        let walkDiag = walkOrth * Math.sin(Math.PI / 4);
        let delX = 0;
        let delY = 0;
        if (this.game.right && !this.game.left) {
            this.action = 1;
            this.facing = 0;
            if (this.game.up && !this.game.down) {
                // move northeast
                delX += walkDiag;
                delY -= walkDiag;
            } else if (this.game.down) {
                // move southeast
                delX += walkDiag;
                delY += walkDiag;
            } else {
                // move east
                delX += walkOrth;
            }
        } else if (this.game.left) {
            this.action = 1;
            this.facing = 2;
            if (this.game.up && !this.game.down) {
                // move northwest
                delX -= walkDiag;
                delY -= walkDiag;
            } else if (this.game.down) {
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
        } else if (this.game.down) {
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