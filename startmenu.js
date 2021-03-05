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

        ctx.font = "72px serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "black";
        ctx.fillText("Click to Start", this.game.surfaceWidth / 2, this.game.surfaceHeight / 2);
    };
}