class EntityManager {
    constructor(gameEngine) {
        this.gameEngine = gameEngine;

        this.hero = new Hero(gameEngine, 50, 50);

        this.loadLevelOne();
    };

    loadLevelOne() {
        let map = new Map(gameEngine, "./maps/Map1.png");
        this.gameEngine.addEntity(map);
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
    constructor(game, imgPath) {
        this.game = game;
        this.image = ASSET_MANAGER.getAsset(imgPath);
    };

    update() {

    };

    draw(ctx) {
        ctx.drawImage(this.image, 0, 0, 640, 480);
    };
}