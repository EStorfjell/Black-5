class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;

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

        // this.hero.x = LEVELS.LEVEL_ONE.startX;
        // this.hero.y = LEVELS.LEVEL_ONE.startY;
        this.game.addEntity(this.hero);
    };
}