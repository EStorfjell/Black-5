class Wall {
    constructor(game, x, y, width, height) {
        Object.assign(this, {game, x, y, width, height});
        this.updateBB();
    };

    update() {
        this.updateBB();
    };

    draw(ctx) {

    };

    updateBB() {
        this.lastBB = this.BB;
        let drawX = this.x - this.game.camera.x;
        let drawY = this.y - this.game.camera.y;
        this.BB = new BoundingBox(drawX, drawY, this.width, this.height);
    };
}