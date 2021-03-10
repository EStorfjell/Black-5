class StartMenu {
    constructor(game) {
        Object.assign(this, {game});
    };

    update() {
        if (this.game.mouseDown) {
            this.game.gameStart = true;
            this.removeFromWorld = true;
        }
    };

    draw(ctx) {
        ctx.fillStyle = "wheat";
        ctx.fillRect(0, 0, this.game.surfaceWidth, this.game.surfaceHeight);

        ctx.font = '60px "Felipa"';
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillStyle = "black";
        ctx.fillText("Ye Olde Onslaught", this.game.surfaceWidth / 2, 15);

        ctx.font = '45px "Noto Serif"';
        ctx.textBaseline = "middle";
        ctx.fillText("Click to Start", this.game.surfaceWidth / 2, this.game.surfaceHeight / 2);

        ctx.font = '25px "Noto Serif"';
        ctx.textBaseline = "alphabetic";
        ctx.fillText("By Loren Mendoza, Kyle Oslin, and Espen Storfjell",
            this.game.surfaceWidth / 2, this.game.surfaceHeight - 15);
    };
}