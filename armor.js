class Armor {
    constructor(game, x, y) {
        Object.assign(this, { game, targetX, targetY, isOnHeroTeam, attackDamage, x, y });

        this.x = x;
        this.y = y;
        // sprite sheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/armor.png");
        this.width = 84;
        this.height = 102;
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);

        this.animations = [];
        this.loadAnimations();

    };

    update() {
        // Collision check and handling
        var that = this;
        this.game.entities.forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                if (entity instanceof Hero) {
                    // The player gains 50 armor
                    entity.pickupArmor();
                    that.removeFromWorld = true;

                } else if (entity instanceof Wall) {
                    that.removeFromWorld = true;
                }
            }
        });
    };

    draw(ctx) {
        this.animations.drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
    };

    loadAnimations() {
        this.animations = new Animator(this.spritesheet, 258, 18, this.width, this.height, 1, 1, 0, false, true);
    }
}