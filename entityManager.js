class EntityManager {
    constructor(gameEngine) {
        this.gameEngine = gameEngine;

        this.hero = new Hero(gameEngine, 50, 50);

        this.loadLevelOne();
    };

    loadLevelOne() {
        let map = new Map(gameEngine, "./maps/Map1.png");
        this.gameEngine.addEntity(map);
        let zombie = new Zombie(this.gameEngine, this.hero, 300, 400);
        this.gameEngine.addEntity(zombie);

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