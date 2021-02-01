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
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
    };
}