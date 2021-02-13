class Dragon {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});

        // sprite sheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/dragon.png");
        this.spriteWidth = 189; // character width
        this.spriteHeight = 131; // character height

        this.heading = 0; // radians counterclockwise from East

        // character states
        this.action = 0; // 0 = flying
        this.facing = 0; // 0 = east, 1 = north, 2 = west, 3 = south
        this.flyAnimSpeed = 0.5; // seconds per frame

        this.walkSpeed = 75; // pixels per second

        this.updateBB();

        this.animations = [];
        this.loadAnimations();
    };

    update() {
        // TODO: Behavior

        // Choose sprite direction
        if (this.heading <= Math.PI / 4 || this.heading >= 7 * Math.PI / 4) {
            this.facing = 0;
        } else if (this.heading < 3 * Math.PI / 4) {
            this.facing = 1;
        } else if (this.heading <= 5 * Math.PI / 4) {
            this.facing = 2;
        } else {
            this.facing = 3;
        }

        // World borders
        if (this.x <= 0) this.x = 0;
        if (this.y <= 0) this.y = 0;
        if (this.x >= this.game.camera.map.width - this.spriteWidth) this.x = this.game.camera.map.width - this.spriteWidth;
        if (this.y >= this.game.camera.map.height - this.spriteHeight) this.y = this.game.camera.map.height - this.spriteHeight;

        this.updateBB();
    };

    draw(ctx) {
        let drawX = this.x - this.game.camera.x;
        let drawY = this.y - this.game.camera.y;
        this.animations[this.action][this.facing].drawFrame(this.game.clockTick, ctx, drawX, drawY, 1);
    };

    updateBB() {

    };

    loadAnimations() {
        for (let i = 0; i < 1; i++) { // actions
            this.animations.push([]);
            for (i = 0; i < 4; i++) { // four directions
                this.animations.push([]);
            }
        }

        // flying
        // east
        this.animations[0][0] = new Animator(this.spritesheet, 10, 151, this.spriteWidth, this.spriteHeight, 4, this.flyAnimSpeed, 10, false, true);
        // north
        this.animations[0][1] = new Animator(this.spritesheet, 10, 10, this.spriteWidth, this.spriteHeight, 4, this.flyAnimSpeed, 10, false, true);
        // west
        this.animations[0][2] = new Animator(this.spritesheet, 10, 433, this.spriteWidth, this.spriteHeight, 4, this.flyAnimSpeed, 10, false, true);
        // south
        this.animations[0][3] = new Animator(this.spritesheet, 10, 292, this.spriteWidth, this.spriteHeight, 4, this.flyAnimSpeed, 10, false, true);
    }
}