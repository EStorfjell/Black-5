class EntityManager {
    constructor(gameEngine) {
        this.gameEngine = gameEngine;

        this.hero = new Hero(gameEngine, 50, 50);

        this.loadLevelOne();
    };

    loadLevelOne() {
        let map = new Map(gameEngine, LevelOne);
        this.gameEngine.addEntity(map);
        map.init(gameEngine);

        let zombie = new Zombie(this.gameEngine, this.hero, 400, 100);
        this.gameEngine.addEntity(zombie);
        let skeleton = new Skeleton(this.gameEngine, this.hero, 100, 200);
        this.gameEngine.addEntity(skeleton);
        let witch = new Witch(this.gameEngine, this.hero, 400, 400);
        this.gameEngine.addEntity(witch);

        this.gameEngine.addEntity(this.hero);
    };
}

class Map {
    constructor(game, level) {
        Object.assign(this, {game, level});
        this.image = ASSET_MANAGER.getAsset(level.imgPath);
    };

    init(game) {
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

class Wall {
    constructor(game, x, y, width, height) {
        Object.assign(this, {game, x, y, width, height});
        this.updateBB();
    };

    update() {
        this.updateBB();
    };

    draw(ctx) {

    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
    };
}