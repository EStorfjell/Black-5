class HealthPack {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        // sprite sheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/healthPack.png");
        this.width = 210;
        this.height = 200;
        this.elapsedTime = 0;
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);

        this.animations = [];
        this.loadAnimations();
      
        this.updateBB();

    };

    update() {
        // Collision check and handling
        var that = this;
        this.game.entities.forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                if (entity instanceof Hero) {
                    // The arrow will damage the player
                    entity.takeDamage(-50, 0, 0, 0);
                    that.removeFromWorld = true;

                } else if (entity instanceof Wall) {
                    that.removeFromWorld = true;
                }
            }
        });
        this.clockTick = this.game.timer.tick();
        this.updateBB();
    };

    draw(ctx) {
        this.animations.drawFrame(this.game.clockTick, ctx, this.x, this.y, 0.15);
    };

    loadAnimations() {
        this.animations = new Animator(this.spritesheet, 60, 23, this.width, this.height, 2, 0.15, 60, false, true);
    }

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x,this.y, this.width, this.height);
    };
}