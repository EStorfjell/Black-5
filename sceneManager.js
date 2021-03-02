class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;

        this.hudVisible = false;
        this.elapsedTime = 0;
        this.shopTime = 0;
        this.transparency = 0; //Game Over black screen
        this.transparency2 = 0; //Game Over Text
        this.transparency3 = 0; //Shop screen

        this.hero = new Hero(game, 50, 50);
        this.map = null;
        this.totalWaves = 5;
        this.totalRounds = 4;
        this.wave = 5; // current wave
        this.round = 1; // current round
        this.shopping = 0;

        let mainMenu = new StartMenu(this.game);
        this.game.addEntity(mainMenu);

        this.loadRound(this.wave, this.round);
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

        /*let zombie = new Zombie(this.game, this.hero, 400, 100);
         this.game.addEntity(zombie);
         let skeleton = new Skeleton(this.game, this.hero, 100, 200);
         this.game.addEntity(skeleton);
         let witch = new Witch(this.game, this.hero, 400, 400);
         this.game.addEntity(witch);*/

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
            //this.shopping = 1;
            if (this.shopping == 1) {

            } else if (this.round == LEVELS.LEVEL_ONE.waves[this.wave - 1].length && this.wave < LEVELS.LEVEL_ONE.waves.length) {
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
                this.shopping = 1;
            }
        }

    };

    clearEntityArray() {
        this.game.entities = [];
    }

    draw(ctx) {
        ctx.textAlign = "start";
        ctx.textBaseline = "alphabetic";
        let pxSize = 30;
        ctx.font = '30px "Press Start 2P"';
        ctx.fillStyle = "Red";
        ctx.fillText("Health: ", 10, pxSize);
        ctx.fillStyle = "White";
        ctx.fillText(this.hero.health, 105, pxSize);

        ctx.fillStyle = "Orange";
        ctx.fillText("Armor: ", 10, pxSize * 2);
        ctx.fillStyle = "White";
        ctx.fillText(this.hero.armor, 105, pxSize * 2);

        ctx.fillStyle = "Gray";
        ctx.fillText("Ammo: ", 10, pxSize * 3);
        ctx.fillStyle = "White";
        ctx.fillText(this.hero.ammo, 105, pxSize * 3);


        if (this.game.click != null) {
            if (!this.hero.meleeEquipped) {
                ctx.fillStyle = "Gray";
                ctx.fillText("Ammo: ", 10, pxSize * 3);
                ctx.fillStyle = "White";
                ctx.fillText(this.hero.primaryWeapon.ammo, 105, pxSize * 3);
            }
            this.game.click = null;
        }

        ctx.fillStyle = "Cyan";
        ctx.fillText("Exp: ", this.game.surfaceWidth / 2 - 50, this.game.surfaceHeight - 45);
        ctx.fillStyle = "White";
        ctx.fillText(this.hero.exp.getExp(), this.game.surfaceWidth / 2 + 12, this.game.surfaceHeight - 45);

        ctx.fillStyle = "Violet";
        ctx.fillText("Wave " + this.wave, this.game.surfaceWidth - 115, 60);
        ctx.fillStyle = "Yellow";
        ctx.fillText("Round " + this.round, this.game.surfaceWidth - 128, 30);

        ctx.fillStyle = "Black";
        ctx.fillText("Remaining Enemies: ", this.game.surfaceWidth / 2 - 160, this.game.surfaceHeight - 10);
        ctx.fillStyle = "White";
        ctx.fillText("" + this.game.getEnemyCount(), this.game.surfaceWidth / 2 + 95, this.game.surfaceHeight - 10);

        if (this.hero.health == 0) {
            this.elapsedTime += this.game.clockTick;
            this.gameOver(ctx);
        }

        if (this.shopping == 1) {
            this.openShop(ctx);
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
            ctx.font = '90px "Press Start 2P"';
            ctx.fillStyle = "Red";
            if (this.transparency2 < 1) {
                this.transparency2 += 0.01;
            }
            ctx.globalAlpha = this.transparency2;
            ctx.fillText("Game Over", this.game.surfaceWidth / 2 - 200, this.game.surfaceHeight / 2);
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

    openShop(ctx) {
        this.shopTime += this.game.clockTick;
        ctx.fillStyle = "Purple";
        if (this.shopping == 1 && this.transparency3 < 1) {
            this.transparency3 += 0.01;
        } else if (this.shopping = 0 && this.transparency > 0) {
            this.transparency3 -= 0.01;
        }
        ctx.globalAlpha = this.transparency3;
        ctx.fillRect(0, 0, this.game.surfaceWidth, this.game.surfaceHeight); // color screen purple
        ctx.globalAlpha = 1;

        if (this.shopTime > 1.5) {
            this.newButton(ctx, "Continue", this.game.surfaceWidth - 200, this.game.surfaceHeight - 50, 200, 50);
        }
    }

    newButton(ctx, text, x, y, width, height, func) {
        let buttonOffset = 4;
        let textLen = text.length;


        ctx.fillStyle = "White"; // Main Menu button
        ctx.fillRect(x, y, width, height);
        ctx.fillStyle = "Gray";
        ctx.fillRect(x + buttonOffset, y + buttonOffset, width - 2 * buttonOffset, height - 2 * buttonOffset);

        ctx.font = '30px "Copperplate"';
        ctx.fillStyle = "Black";
        ctx.fillText(text, x + width / 4 - (textLen * 3), y + height / 1.5);
        ctx.font = '30px "Press Start 2P"';

        if (this.game.click != null) {
            if (this.game.click.x >= x && this.game.click.x <= x + width && this.game.click.y >= y && this.game.click.y <= y + height) {
                func;
            }
        }
    }

}