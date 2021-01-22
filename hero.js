class Hero {
    constructor(game) {
        Object.assign(this, {game});
        this.x = 0;
        this.y = 0;

        // sprite sheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/hero.png");

        // character states
        this.speed = 0 // 0 = idle, 1 = walking, 2 = running
        this.facing = 0 // 0 = east, 1 = north, 2 = west, 3 = south

        this.animations = [];
        this.loadAnimations();
    };

    update() {

    };

    draw(ctx) {

    };

    loadAnimations() {

    }
}