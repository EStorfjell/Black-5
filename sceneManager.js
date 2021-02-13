class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;

        this.hero = new Hero(game, 50, 50);
        this.map = null;

        // this.loadLevelOne();
        this.loadLevelFive();
    };

    loadLevelOne() {
        this.map = new Map(this.game, LEVELS.LEVEL_ONE);
        this.game.addEntity(this.map);
        this.map.init();

        let zombie = new Zombie(this.game, this.hero, 400, 100);
        this.game.addEntity(zombie);
        let skeleton = new Skeleton(this.game, this.hero, 100, 200);
        this.game.addEntity(skeleton);
        let witch = new Witch(this.game, this.hero, 400, 400);
        this.game.addEntity(witch);

        this.hero.x = LEVELS.LEVEL_ONE.startX;
        this.hero.y = LEVELS.LEVEL_ONE.startY;
        this.game.addEntity(this.hero);
    };

    loadLevelFive() {
        this.map = new Map(this.game, LEVELS.LEVEL_ONE);
        this.game.addEntity(this.map);
        this.map.init();

        let boss = new Dragon(this.game, 400, 400);
        this.game.addEntity(boss);

        this.hero.x = LEVELS.LEVEL_ONE.startX;
        this.hero.y = LEVELS.LEVEL_ONE.startY;
        this.game.addEntity(this.hero);
    };

    update() {
        PARAMS.DEBUG = document.getElementById("debug").checked;

        let heroMidX = this.hero.x + (this.hero.width / 2);
        let heroMidY = this.hero.y + (this.hero.height / 2);
        let halfWidth = PARAMS.CANVAS_WIDTH / 2;
        let halfHeight = PARAMS.CANVAS_HEIGHT / 2;

        if (heroMidX - this.x < halfWidth) {
            this.x = Math.max(0, heroMidX - halfWidth);
        } else if (heroMidX - this.x > halfWidth) {
            this.x = Math.min(this.map.width - PARAMS.CANVAS_WIDTH, heroMidX - halfWidth);
        }

        if (heroMidY - this.y < halfHeight) {
            this.y = Math.max(0, heroMidY - halfHeight);
        } else if (heroMidY - this.y > halfHeight) {
            this.y = Math.min(this.map.height - PARAMS.CANVAS_HEIGHT, heroMidY - halfHeight);
        }
    };

    draw(ctx) {

    };
}