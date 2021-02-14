class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;

        this.hero = new Hero(game, 50, 50);
        this.map = null;
        this.wave = 1;
        this.round = 1;

        this.loadRound(1, 1);
    };

    loadRound(wave, round) {
        this.map = new Map(this.game, LEVELS.LEVEL_ONE);
        this.game.addEntity(this.map);
        this.map.init();

        /*let zombie = new Zombie(this.game, this.hero, 400, 100);
        this.game.addEntity(zombie);
        let skeleton = new Skeleton(this.game, this.hero, 100, 200);
        this.game.addEntity(skeleton);
        let witch = new Witch(this.game, this.hero, 400, 400);
        this.game.addEntity(witch);*/

        // Gets the properties of this wave and round
        let spawnPoints = LEVELS.LEVEL_ONE.spawnPoints;
        let zombieCount = LEVELS.LEVEL_ONE.waves[wave][round].zombies;
        let skeletonCount = LEVELS.LEVEL_ONE.waves[wave][round].skeletons;
        let witchCount = LEVELS.LEVEL_ONE.waves[wave][round].witches;

        let count = zombieCount + skeletonCount + witchCount;
        while (count > 0) {
            // Chooses a random spawn point
            let spawnPoint = randomInt(spawnPoints.length);
            // Chooses a random enemy to spawn
            let enemyNumber = randomInt(3);
            if (enemyNumber == 0 && zombieCount > 0) {
                let enemy = new Zombie(this.game, this.hero, 
                    LEVELS.LEVEL_ONE.spawnPoints[spawnPoint].x, LEVELS.LEVEL_ONE.spawnPoints[spawnPoint].y);
                    zombieCount--;
                    count --;
                    this.game.addEntity(enemy);
            } else if (enemyNumber == 1 && skeletonCount > 0) {
                let enemy = new Skeleton(this.game, this.hero, 
                    LEVELS.LEVEL_ONE.spawnPoints[spawnPoint].x, LEVELS.LEVEL_ONE.spawnPoints[spawnPoint].y);
                    skeletonCount--;
                    count--;
                    this.game.addEntity(enemy);
            } else if (enemyNumber == 2 && witchCount > 0) {
                let enemy = new Witch(this.game, this.hero, 
                    LEVELS.LEVEL_ONE.spawnPoints[spawnPoint].x, LEVELS.LEVEL_ONE.spawnPoints[spawnPoint].y);
                    witchCount--;
                    count--;
                    this.game.addEntity(enemy);
            }
        }

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