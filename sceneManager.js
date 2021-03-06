class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;

        this.hudVisible = false;
        this.elapsedTime = 0;
        this.transparency = 0; //Game Over black screen
        this.transparency2 = 0; //Game Over Text

        this.hero = new Hero(game, 50, 50);
        this.heroStartX = LEVELS.LEVEL_ONE.startX;
        this.heroStartY = LEVELS.LEVEL_ONE.startY;

        this.shop = new Shop(game, this.hero, this);

        this.map = null;
		
        this.wave = 1; // current wave
        this.round = 1; // current round
        this.shopping = 0;

        let mainMenu = new StartMenu(this.game);
        this.game.addEntity(mainMenu);

        this.loadRound(this.wave, this.round);

        this.intermissionLength = 60; // seconds
        this.intermissionElapsedTime = 0;
        this.isInIntermission = false;
    };

    loadRound(wave, round) {
        console.log("wave: " + wave + ", round: " + round);
        this.hudVisible = true;

        this.map = new Map(this.game, LEVELS.LEVEL_ONE);
        this.game.addEntity(this.map);
        this.map.init();

        let healthPack = new HealthPack(this.game, 600, 700);
        this.game.addEntity(healthPack);

        let healthPack2 = new HealthPack(this.game, 20, 530);
        this.game.addEntity(healthPack2);

        let armorPack = new Armor(this.game, 570, 370);
        this.game.addEntity(armorPack);

        let armorPack2 = new Armor(this.game, 970, 530);
        this.game.addEntity(armorPack2);

        // let potion = new Potion(this.game);
        // this.game.addEntity(potion);

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
                this.shopping = 1;
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

        if (!this.hero.meleeEquipped) {
            ctx.fillStyle = "White";
            ctx.textAlign = "left";
            ctx.textBaseline = "top";
            ctx.fillText("Ammo: ", margin, 45);
            ctx.fillStyle = "Gray";
            ctx.fillText(this.hero.primaryWeapon.ammo, 80, 45);
        }
		
		 if (this.hero.health == 0) {
            this.elapsedTime += this.game.clockTick;
            this.gameOver(ctx);
        }
    };

    gameOver(ctx) {
        if (this.elapsedTime > 0) {
            ctx.fillStyle = "Black";
            if (this.transparency < 1) {
                this.transparency += 0.01;
            }
            ctx.globalAlpha = this.transparency;
            ctx.fillRect(0, 0, this.game.surfaceWidth, this.game.surfaceHeight);
        }

        ctx.globalAlpha = 1;

        if (this.elapsedTime > 1) {
            ctx.font = '90px "Noto Serif"';
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "Red";
            if (this.transparency2 < 1) {
                this.transparency2 += 0.01;
            }
            ctx.globalAlpha = this.transparency2;
            ctx.fillText("Game Over", this.game.surfaceWidth / 2, this.game.surfaceHeight / 2);
        }

        ctx.globalAlpha = 1;

        let buttonX = this.game.surfaceWidth / 2 - 200;
        let buttonX2 = this.game.surfaceWidth / 2 + 20;
        let buttonY = this.game.surfaceHeight / 2 + 40;

        if (this.elapsedTime > 2.5) {
            this.newButton(ctx, "Main Menu", buttonX, buttonY, 200, 50, null);

            this.newButton(ctx, "Restart", buttonX2, buttonY, 200, 50, function () {
                //restart

            });
        }
    }

    newButton(ctx, text, x, y, width, height, func) {
        let buttonOffset = 4;
        let textLen = text.length;


        ctx.fillStyle = "White"; // Main Menu button
        ctx.fillRect(x, y, width, height);
        ctx.fillStyle = "Gray";
        ctx.fillRect(x + buttonOffset, y + buttonOffset, width - 2 * buttonOffset, height - 2 * buttonOffset);

        ctx.font = '30px "Noto Serif"';
        ctx.fillStyle = "Black";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(text, x + width / 2, y + height / 2);
        ctx.font = '30px "Press Start 2P"';

        if (this.game.click != null) {
            if (this.game.click.x >= x && this.game.click.x <= x + width && this.game.click.y >= y && this.game.click.y <= y + height) {
                func;
            }
        }
    }

}