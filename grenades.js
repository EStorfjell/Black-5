class Grenades {
    constructor(game, hero) {
        Object.assign(this, { game, hero });

        this.range = 200;

        this.grenadeCost = 50;

        this.numberOfGrenades = 3;
        this.maxNumberOfGrenades = 3;

        this.isEquipped = false;
    }

    update() {
        if (this.game.toggleGrenade) {
            this.isEquipped = !this.isEquipped;
            this.game.toggleGrenade = false;
        }
        if (this.isEquipped && this.game.click != null) {
            let grenade = new Grenade(this.game, this.game.click.x, this.game.click.y, this.hero);
            this.game.addEntity(grenade);
            this.numberOfGrenades--;
            this.isEquipped = false;
            this.game.click = null;
        }
    }

    draw(ctx) {
        if (this.isEquipped) {
            let heroX = this.hero.getX();
            let heroY = this.hero.getY();

            let drawX = heroX - this.game.camera.x;
            let drawY = heroY - this.game.camera.y;
            ctx.strokeStyle = "black";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(drawX, drawY, this.range, 0, 2 * Math.PI);
            ctx.stroke();
        }
    }

    toggleEquip() {
        if (!this.isEquipped && this.numberOfGrenades > 0) {
            this.isEquipped = true;
        } else if (this.isEquipped) {
            this.isEquipped = false;
        }
    }

    getNumberOfGrenades() {
        return this.numberOfGrenades;
    }

    getMaxNumberOfGrenades() {
        return this.maxNumberOfGrenades;
    }

    isEquipped() {
        return this.isEquipped;
    }
}