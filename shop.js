class Shop {
    constructor(game) {
        Object.assign(this, { game });

        this.x = game.surfaceWidth * (1 / 8);
        this.y = game.surfaceHeight * (1 / 8);
        this.width = game.surfaceWidth * (6 / 8);
        this.height = game.surfaceHeight * (6 / 8);

        this.backgroundColor = "White";
        this.textColor = "Black";

        this.isOpen = false;
    }

    update() {

    }

    draw(ctx) {
        if (this.isOpen) {
            ctx.fillStyle = this.backgroundColor;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    toggle() {
        this.isOpen = !this.isOpen;
        this.game.shopIsOpen = !this.game.shopIsOpen;
    }
}