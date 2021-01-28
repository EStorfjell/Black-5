class EntityManager {
    constructor(gameEngine) {
        this.gameEngine = gameEngine;

        this.hero = new Hero(gameEngine, 50, 50);

        this.loadLevelOne();
    }

    loadLevelOne() {
        let zombie = new Zombie(this.gameEngine, this.hero, 300, 400);
        this.gameEngine.addEntity(zombie);
        let skeleton = new Skeleton(this.gameEngine, this.hero, 200, 300);
        this.gameEngine.addEntity(skeleton);

        this.gameEngine.addEntity(this.hero);
    }
}