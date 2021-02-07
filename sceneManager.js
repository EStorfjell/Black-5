class SceneManager {
    constructor(game) {
        this.game = game;

        this.hero = new Hero(game, 50, 50);

        this.loadLevelOne();
    };

    loadLevelOne() {
        let map = new Map(this.game, LEVELS.LEVEL_ONE);
        this.game.addEntity(map);
        map.init();

        let zombie = new Zombie(this.game, this.hero, 400, 100);
        this.game.addEntity(zombie);
        let skeleton = new Skeleton(this.game, this.hero, 100, 200);
        this.game.addEntity(skeleton);
        let witch = new Witch(this.game, this.hero, 400, 400);
        this.game.addEntity(witch);

        this.game.addEntity(this.hero);
    };
}