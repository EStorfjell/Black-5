class Shop {
    constructor(game, hero) {
        Object.assign(this, { game, hero });

        /*this.x = game.surfaceWidth * (1 / 8);
        this.y = game.surfaceHeight * (1 / 8);
        this.width = game.surfaceWidth * (6 / 8);
        this.height = game.surfaceHeight * (6 / 8);*/

        this.x = 0;
        this.y = 0;
        this.width = game.surfaceWidth;
        this.height = game.surfaceHeight;


        this.backgroundColor = "White";
        this.textColor = "Black";

        this.isOpen = false;
    }

    update() {

    }

    draw(ctx) {
        if (this.isOpen) {
            this.game.ctx.clearRect(0, 0, this.game.surfaceWidth, this.game.surfaceHeight);

            // Background
            ctx.fillStyle = this.backgroundColor;
            ctx.fillRect(this.x, this.y, this.width, this.height);

            // Title
            ctx.fillStyle = this.textColor;
            ctx.font = "30px 'Felipa'";
            ctx.textAlign = "center";
            ctx.fillText("Shop", this.x + this.width / 2, this.y + 30);

            // Sword
            let swordSpritesheet = ASSET_MANAGER.getAsset("./sprites/sword.png");
            let swordWidth = 44;
            let swordHeight = 44;
            let swordX = this.x;
            let swordY = this.y + this.height * (1 / 3);
            ctx.drawImage(swordSpritesheet, 148, 71, swordWidth, swordHeight, 
                swordX, swordY, swordWidth, swordHeight);
            ctx.font = "20px 'Felipa'";
            if (!this.hero.hasSword) {
                ctx.textAlign = "left";
                ctx.fillText("Buy", swordX + swordWidth, swordY + swordHeight);
            }

            // Crossbow
            let crossbowSpritesheet = ASSET_MANAGER.getAsset("./sprites/crossbow.png");
            ctx.drawImage(crossbowSpritesheet, 11, 56, 49, 26, this.x, this.y + this.height * (2 / 3), 49, 26);

            // Pistol
            let pistolSpritesheet = ASSET_MANAGER.getAsset("./sprites/pistol.png");
            ctx.drawImage(pistolSpritesheet, 7, 61, 36, 22, this.x + this.width / 2, this.y + this.height * (1 / 3), 36, 22);

            // Shotgun
            let shotgunSpritesheet = ASSET_MANAGER.getAsset("./sprites/shotgun.png");
            ctx.drawImage(shotgunSpritesheet, 9, 56, 43, 16, this.x + this.width / 2, this.y + this.height * (2 / 3), 43, 16);
        }
    }

    toggle() {
        this.isOpen = !this.isOpen;
        this.game.shopIsOpen = !this.game.shopIsOpen;
    }
}