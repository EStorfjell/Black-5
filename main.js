let gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./sprites/hero.png")

ASSET_MANAGER.downloadAll(function () {
    let canvas = document.getElementById('gameWorld');
    let ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    let hero = new Hero(gameEngine);

    gameEngine.init(ctx);

    // TODO: We should use some sort of entity manager in the future
    gameEngine.addEntity(hero);

    gameEngine.start();
});