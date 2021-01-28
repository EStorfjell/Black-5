class EntityManager {
    constructor(gameEngine) {
        this.gameEngine = gameEngine;

        this.hero = new Hero(gameEngine, 50, 50);

        this.loadLevelOne();
    }

    loadLevelOne() {
        let zombie = new Zombie(this.gameEngine, this.hero, 300, 400);
        this.gameEngine.addEntity(zombie);
        let witch = new Witch(this.gameEngine, this.hero, 300, 400);
        this.gameEngine.addEntity(witch);

        this.gameEngine.addEntity(this.hero);
    }
}