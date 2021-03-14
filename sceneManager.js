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

        this.shop = new Shop(game, this.hero);

        this.map = null;

        this.maxLevel = 3;
        this.level = 1; // current level
        this.wave = 1; // current wave
        this.round = 1; // current round

        this.intermissionLength = 30; // seconds
        this.intermissionElapsedTime = 0;
        this.isInIntermission = false;

        this.jukebox = ["./music/wretched-destroyer.mp3", "./music/unholy-knight.mp3", "./music/grim-idol.mp3"];
        this.jukeboxPlaying = false;
        this.interPlaying = false;
        this.currentSong = 0;

        let menu = new StartMenu(this.game, this.level);
        this.game.addEntity(menu);

        this.loadRound(this.level, this.wave, this.round);
    };

    loadRound(levelNumber, wave, round) {
        this.hudVisible = true;

        let level;
        if (levelNumber === 1) {
            level = LEVELS.LEVEL_ONE;
        } else if (levelNumber === 2) {
            level = LEVELS.LEVEL_TWO;
        } else {
            level = LEVELS.LEVEL_THREE;
        }

        this.map = new Map(this.game, level);
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

        // Gets the properties of this wave and round
        let spawnPoints = level.spawnPoints;
        let zombieCount = level.waves[wave - 1][round - 1].zombies;
        let skeletonCount = level.waves[wave - 1][round - 1].skeletons;
        let witchCount = level.waves[wave - 1][round - 1].witches;
        let dragonCount = level.waves[wave - 1][round - 1].dragons;

        let count = zombieCount + skeletonCount + witchCount + dragonCount;
        this.game.setEnemyCount(count);

        while (count > 0) {
            // Chooses a random spawn point
            let spawnPoint = randomInt(spawnPoints.length);
            // Chooses a random enemy to spawn
            let enemyNumber = randomInt(4);
            if (enemyNumber === 0 && zombieCount > 0) {
                let enemy = new Zombie(this.game, this.hero, wave, round,
                    level.spawnPoints[spawnPoint].x, level.spawnPoints[spawnPoint].y);
                zombieCount--;
                count--;
                this.game.addEntity(enemy);
            } else if (enemyNumber === 1 && skeletonCount > 0) {
                let enemy = new Skeleton(this.game, this.hero, wave, round,
                    level.spawnPoints[spawnPoint].x, level.spawnPoints[spawnPoint].y);
                skeletonCount--;
                count--;
                this.game.addEntity(enemy);
            } else if (enemyNumber === 2 && witchCount > 0) {
                let enemy = new Witch(this.game, this.hero, wave, round,
                    level.spawnPoints[spawnPoint].x, level.spawnPoints[spawnPoint].y);
                witchCount--;
                count--;
                this.game.addEntity(enemy);
            } else if (enemyNumber === 3 && dragonCount > 0) {
                let enemy = new Dragon(this.game, this.hero,
                    level.spawnPoints[spawnPoint].x, level.spawnPoints[spawnPoint].y);
                dragonCount--;
                count--;
                this.game.addEntity(enemy);
            }
        }

        if (wave === 1 && round === 1) {
            this.hero.x = level.startX;
            this.hero.y = level.startY;
        } else {
            this.hero.x = this.heroStartX;
            this.hero.y = this.heroStartY;
        }
        this.game.addEntity(this.hero);
        this.hero.initializeWeapons();
    };

    updateAudio() {
        let mute = document.getElementById("mute").checked;
        let volume = document.getElementById("volume").value;

        ASSET_MANAGER.muteAudio(mute);
        ASSET_MANAGER.adjustVolume(volume);

        if (this.game.gameStart && !this.jukeboxPlaying && !this.isInIntermission) {
            ASSET_MANAGER.pauseBackgroundMusic();
            this.jukeboxPlaying = true;
            this.interPlaying = false;
            let that = this;
            let song = ASSET_MANAGER.playAsset(this.jukebox[this.currentSong]);
            song.addEventListener("ended", function () {
                that.jukeboxPlaying = false;
                that.currentSong = (that.currentSong + 1) % that.jukebox.length;
            });
            song.addEventListener("paused", function () {
                that.jukeboxPlaying = false;
                that.currentSong = (that.currentSong + 1) % that.jukebox.length;
            });
            that.currentSong = (that.currentSong + 1) % that.jukebox.length;
        }

        if (this.game.gameStart && this.isInIntermission && !this.interPlaying) {
            ASSET_MANAGER.pauseBackgroundMusic();
            this.jukeboxPlaying = false;
            this.interPlaying = true;
            let that = this;
            let song = ASSET_MANAGER.playAsset("./music/ChillVibes.mp3");
            song.addEventListener("ended", function () {
                that.interPlaying = false;
            });
            song.addEventListener("paused", function () {
                that.interPlaying = false;
            });
        }
    };

    update() {
        PARAMS.DEBUG = document.getElementById("debug").checked;

        this.updateAudio();

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

        if (this.game.getEnemyCount() === 0) {
            let level;
            if (this.level === 1) {
                level = LEVELS.LEVEL_ONE;
            } else if (this.level === 2) {
                level = LEVELS.LEVEL_TWO;
            } else {
                level = LEVELS.LEVEL_THREE;
            }

            if (this.round === level.waves[this.wave - 1].length && this.wave < level.waves.length) {
                this.startIntermission();
            } else if (this.round < level.waves[this.wave - 1].length && this.wave < level.waves.length) {
                this.heroStartX = this.hero.getX();
                this.heroStartY = this.hero.getY();
                // New round
                this.round++;
                this.clearEntityArray();
                this.loadRound(this.level, this.wave, this.round);
            } else {
                if (this.level < this.maxLevel) {
                    // New level
                    this.level++;
                    this.wave = 1;
                    this.round = 1;
                    this.clearEntityArray();
                    this.hero = new Hero(this.game, 50, 50);
                    this.shop.sword = this.hero.sword;
                    this.shop.crossbow = this.hero.crossbow;
                    this.shop.pistol = this.hero.pistol;
                    this.shop.shotgun = this.hero.shotgun;
                    this.shop.grenades = this.hero.grenades;

                    let menu = new StartMenu(this.game, this.level);
                    this.game.addEntity(menu);
                    this.loadRound(this.level, this.wave, this.round);
                } else {
                    // TODO: Game complete screen
                }
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
                this.loadRound(this.level, this.wave, this.round);
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
        ctx.fillStyle = "Red";
        ctx.textBaseline = "top";
        ctx.fillText("Health: ", margin, margin);
        ctx.fillStyle = "White";
        ctx.fillText(this.hero.health, 80, margin);

        ctx.fillStyle = "Orange";
        ctx.fillText("Armor: ", margin, 25);
        ctx.fillStyle = "White";
        ctx.fillText(this.hero.armor, 80, 25);

        if (this.hero.grenades.isEquipped()) {
            ctx.fillStyle = "Gray";
            ctx.textAlign = "left";
            ctx.textBaseline = "top";
            ctx.fillText("Grenades: ", margin, 45);
            ctx.fillStyle = "White";
            ctx.fillText(this.hero.grenades.getAmmo(), 110, 45);
        } else if (!this.hero.meleeEquipped) {
            ctx.fillStyle = "Gray";
            ctx.textAlign = "left";
            ctx.textBaseline = "top";
            ctx.fillText("Ammo: ", margin, 45);
            ctx.fillStyle = "White";
            ctx.fillText(this.hero.primaryWeapon.ammo, 80, 45);
        }

        ctx.textBaseline = "bottom";
        ctx.textAlign = "left";
        ctx.fillStyle = "Cyan";
        ctx.fillText("Exp: ", margin, this.game.surfaceHeight - margin - 25);
        ctx.fillStyle = "White";
        ctx.fillText(this.hero.exp.getExp(), margin + 50, this.game.surfaceHeight - margin - 25);

        ctx.fillStyle = "Black";
        ctx.fillText("Remaining Enemies: ", margin, this.game.surfaceHeight - margin);
        ctx.fillStyle = "White";
        ctx.fillText("" + this.game.getEnemyCount(), margin + 200, this.game.surfaceHeight - margin);

        ctx.textAlign = "right";
        ctx.textBaseline = "top";
        if (this.isInIntermission) {
            ctx.fillStyle = "White";
            ctx.fillText("Shop is Available", this.game.surfaceWidth - margin, margin);
            ctx.fillText("Time Remaining: " + Math.ceil(this.intermissionLength -
                this.intermissionElapsedTime), this.game.surfaceWidth - margin, 25);
        } else {
            ctx.fillStyle = "White";
            ctx.fillText("Wave: " + this.wave, this.game.surfaceWidth - margin, margin);
            ctx.fillStyle = "White";
            ctx.fillText("Round: " + this.round, this.game.surfaceWidth - margin, 25);
        }

        if (this.hero.health === 0) {
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