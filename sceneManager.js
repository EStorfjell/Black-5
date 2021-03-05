class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;

        this.hero = new Hero(game, 50, 50);
        this.heroStartX = LEVELS.LEVEL_ONE.startX;
        this.heroStartY = LEVELS.LEVEL_ONE.startY;

        this.shop = new Shop(game, this.hero, this);

        this.map = null;
        this.wave = 1; // current wave
        this.round = 1; // current round

        this.loadRound(this.wave, this.round);

        this.intermissionLength = 60; // seconds
        this.intermissionElapsedTime = 0;
        this.isInIntermission = false;
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

        this.hero.x = this.heroStartX;
        this.hero.y = this.heroStartY;
        this.game.addEntity(this.hero);
        this.hero.initializeWeapons();
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
                this.startIntermission();
            } else if (this.round < LEVELS.LEVEL_ONE.waves[this.wave - 1].length && this.wave < LEVELS.LEVEL_ONE.waves.length) {
                this.heroStartX = this.hero.getX();
                this.heroStartY = this.hero.getY();
                // New round
                this.round++;
                this.clearEntityArray();
                this.loadRound(this.wave, this.round);
            } else {
                // TODO: Add a level ending
                console.log("Level complete");
            }
        }

        if (this.isInIntermission) {
            this.intermissionElapsedTime += this.game.clockTick;
            if (this.intermissionElapsedTime >= this.intermissionLength) {
                this.isInIntermission = false;
                this.intermissionElapsedTime = 0;
                if (this.game.shopIsOpen) {
                    this.shop.toggle();
                }
                this.heroStartX = this.hero.getX();
                this.heroStartY = this.hero.getY();
                // New wave
                this.wave++;
                this.round = 1;
                this.clearEntityArray();
                this.loadRound(this.wave, this.round);
            }
        }

        if (this.game.toggleShop) {
            if (this.isInIntermission) {
                this.shop.toggle();
            }
            this.game.toggleShop = false;
        }
    };

    startIntermission() {
        this.isInIntermission = true;
    }

    clearEntityArray() {
        this.game.entities = [];
    }

    draw(ctx) {
        let margin = 5;
        ctx.font = '20px "Noto Sans", sans-serif';
        ctx.textAlign = "left";
        ctx.fillStyle = "White";
        ctx.textBaseline = "top";
        ctx.fillText("Health: ", margin, margin);
        ctx.fillStyle = "Red";
        ctx.fillText(this.hero.health, 80, margin);

        ctx.fillStyle = "White";
        ctx.fillText("Armor: ", margin, 25);
        ctx.fillStyle = "Purple";
        ctx.fillText(this.hero.armor, 80, 25);
        
        ctx.textBaseline = "bottom";
        ctx.textAlign = "left";
        ctx.fillStyle = "White";
        ctx.fillText("Exp: ", margin, this.game.surfaceHeight - margin - 25);
        ctx.fillStyle = "Cyan";
        ctx.fillText(this.hero.exp.getExp(), margin + 50, this.game.surfaceHeight - margin - 25);

        ctx.fillStyle = "White";
        ctx.fillText("Remaining Enemies: ", margin, this.game.surfaceHeight - margin);
        ctx.fillStyle = "Black";
        ctx.fillText("" + this.game.getEnemyCount(), margin + 200, this.game.surfaceHeight - margin);

        ctx.fillStyle = "White";
        ctx.textAlign = "right";
        ctx.textBaseline = "top";
        if (this.isInIntermission) {
            ctx.fillText("Time Remaining: " + Math.round(this.intermissionLength - 
                this.intermissionElapsedTime), this.game.surfaceWidth - margin, margin);
        } else {
            ctx.fillText("Wave: " + this.wave, this.game.surfaceWidth - margin, margin);
            ctx.fillText("Round: " + this.round, this.game.surfaceWidth - margin, 25);
        }

        if (this.game.click != null) {
            if (!this.hero.meleeEquipped) {
                ctx.fillStyle = "White";
                ctx.textAlign = "left";
                ctx.textBaseline = "top";
                ctx.fillText("Ammo: ", margin, 45);
                ctx.fillStyle = "Gray";
                ctx.fillText(this.hero.primaryWeapon.ammo, 80, 45);
            }
            this.game.click = null;
        }
    };

}