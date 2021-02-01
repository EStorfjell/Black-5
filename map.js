class Map {
    constructor(game, level) {
        Object.assign(this, {game, level});
        this.image = ASSET_MANAGER.getAsset(level.imgPath);
    };

    init() {
        let that = this;
        this.level.walls.forEach(function (item) {
            let wall = new Wall(that.game, item.x, item.y, item.width, item.height);
            that.game.addEntity(wall);
        });
    };

    update() {

    };

    draw(ctx) {
        ctx.drawImage(this.image, 0, 0, 640, 480);
    };
}