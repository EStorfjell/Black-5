let gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./maps/Map1.png");
ASSET_MANAGER.queueDownload("./sprites/hero.png")
ASSET_MANAGER.queueDownload("./sprites/zombie.png")
ASSET_MANAGER.queueDownload("./sprites/skeleton_crossbow.png")
ASSET_MANAGER.queueDownload("./sprites/skeleton_arrow.png")
ASSET_MANAGER.queueDownload("./sprites/witch.png")

ASSET_MANAGER.downloadAll(function () {
    let canvas = document.getElementById('gameWorld');
    let ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    gameEngine.init(ctx);

    new EntityManager(gameEngine);

    gameEngine.start();
});