class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;

        this.hero = new Hero(game, 50, 50);

        this.shop = new Shop(game);

        this.map = null;
        this.wave = 5; // current wave
        this.round = 1; // current round

        this.loadRound(this.wave, this.round);
    };

    loadRound(wave, round) {
        console.log("wave: " + wave + ", round: " + round);

        this.map = new Map(this.game, LEVELS.LEVEL_ONE);
        this.game.addEntity(this.map);
        let healthPack = new HealthPack(this.game, 50, 50);
        this.game.addEntity(healthPack);
        this.map.init();

        // Gets the properties of this wave and round
        let spawnPoints = LEVELS.LEVEL_ONE.spawnPoints;
        let zombieCount = LEVELS.LEVEL_ONE.waves[wave - 1][round - 1].zombies;
        let skeletonCount = LEVELS.LEVEL_ONE.waves[wave - 1][round - 1].skeletons;
        let witchCount = LEVELS.LEVEL_ONE.waves[wave - 1][round - 1].witches;
		let dragonCount = LEVELS.LEVEL_ONE.waves[wave - 1][round - 1].dragons;

        let count = zombieCount + skeletonCount + witchCount + dragonCount;
        this.game.setEnemyCount(count);

        while (count > 0) {
            // Chooses a random spawn point
            let spawnPoint = randomInt(spawnPoints.length);
            // Chooses a random enemy to spawn
            let enemyNumber = randomInt(4);
            if (enemyNumber == 0 && zombieCount > 0) {
                let enemy = new Zombie(this.game, this.hero, wave, round,
                    LEVELS.LEVEL_ONE.spawnPoints[spawnPoint].x, LEVELS.LEVEL_ONE.spawnPoints[spawnPoint].y);
                    zombieCount--;
                    count--;
                    this.game.addEntity(enemy);
            } else if (enemyNumber == 1 && skeletonCount > 0) {
                let enemy = new Skeleton(this.game, this.hero, wave, round,
                    LEVELS.LEVEL_ONE.spawnPoints[spawnPoint].x, LEVELS.LEVEL_ONE.spawnPoints[spawnPoint].y);
                    skeletonCount--;
                    count--;
                    this.game.addEntity(enemy);
            } else if (enemyNumber == 2 && witchCount > 0) {
                let enemy = new Witch(this.game, this.hero, wave, round,
                    LEVELS.LEVEL_ONE.spawnPoints[spawnPoint].x, LEVELS.LEVEL_ONE.spawnPoints[spawnPoint].y);
                witchCount--;
                count--;
                this.game.addEntity(enemy);
            } else if (enemyNumber == 3 && dragonCount > 0) {
                let enemy = new Dragon(this.game, this.hero,
                    LEVELS.LEVEL_ONE.spawnPoints[spawnPoint].x, LEVELS.LEVEL_ONE.spawnPoints[spawnPoint].y);
			    dragonCount--;
				count--;
				this.game.addEntity(enemy);
		    }
        }

        this.hero.x = LEVELS.LEVEL_ONE.startX;
        this.hero.y = LEVELS.LEVEL_ONE.startY;
        this.game.addEntity(this.hero);
        this.hero.initializeWeapons();

        this.game.addEntity(this.shop);
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

        if (this.game.getEnemyCount() == 0) {
            if (this.round == LEVELS.LEVEL_ONE.waves[this.wave - 1].length && this.wave < LEVELS.LEVEL_ONE.waves.length) {
                this.wave++;
                this.round = 1;
                this.clearEntityArray();
                this.loadRound(this.wave, this.round);
            } else if (this.round < LEVELS.LEVEL_ONE.waves[this.wave - 1].length && LEVELS.LEVEL_ONE.waves.length) {
                this.round++;
                this.clearEntityArray();
                this.loadRound(this.wave, this.round);
            } else {
                // TODO: Add a level ending
                console.log("Level complete");
            }
        }
    };

    clearEntityArray() {
        this.game.entities = [];
    }

    draw(ctx) {
        let pxSize = 30;
        ctx.font = '30px "Press Start 2P"';
        ctx.fillStyle = "White";
        ctx.fillText("Health: ", 10, pxSize);
        ctx.fillStyle = "Red";
        ctx.fillText(this.hero.health, 105, pxSize);

        ctx.fillStyle = "White";
        ctx.fillText("Armor: ", 10, pxSize * 2);
        ctx.fillStyle = "Purple";
        ctx.fillText(this.hero.armor, 105, pxSize * 2);


        if (this.game.click != null) {
            if (!this.hero.meleeEquipped) {
                ctx.fillStyle = "White";
                ctx.fillText("Ammo: ", 10, pxSize * 3);
                ctx.fillStyle = "Gray";
                ctx.fillText(this.hero.primaryWeapon.ammo, 105, pxSize * 3);
            }
            this.game.click = null;
        }

        
        ctx.fillStyle = "White";
        ctx.fillText("Exp: ", this.game.surfaceWidth / 2 - 50, this.game.surfaceHeight - 45);
        ctx.fillStyle = "Cyan";
        ctx.fillText(this.hero.exp.getExp(), this.game.surfaceWidth / 2 + 12, this.game.surfaceHeight - 45);
        ctx.fillStyle = "White";

        ctx.fillText("Wave: " + this.wave, this.game.surfaceWidth - 115, 30);
        ctx.fillText("Round: " + this.round, this.game.surfaceWidth - 128, 60);

        ctx.fillText("Remaining Enemies: ", this.game.surfaceWidth / 2 - 160, this.game.surfaceHeight - 10);
        ctx.fillStyle = "Black";
        ctx.fillText("" + this.game.getEnemyCount(), this.game.surfaceWidth / 2 + 95, this.game.surfaceHeight - 10);

        if (this.game.toggleShop) {
            this.shop.toggle();
            this.game.toggleShop = false;
        }
    };

}