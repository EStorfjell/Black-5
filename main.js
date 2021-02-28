let gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./maps/Map1.png");
ASSET_MANAGER.queueDownload("./maps/BigMap1.png");
ASSET_MANAGER.queueDownload("./sprites/hero.png");
ASSET_MANAGER.queueDownload("./sprites/zombie.png");
ASSET_MANAGER.queueDownload("./sprites/skeleton_crossbow.png");
ASSET_MANAGER.queueDownload("./sprites/arrow.png");
ASSET_MANAGER.queueDownload("./sprites/witch.png");
ASSET_MANAGER.queueDownload("./sprites/sword.png");
ASSET_MANAGER.queueDownload("./sprites/crossbow.png");
ASSET_MANAGER.queueDownload("./sprites/pistol.png");
ASSET_MANAGER.queueDownload("./sprites/bullet.png");
ASSET_MANAGER.queueDownload("./sprites/shotgun.png");
ASSET_MANAGER.queueDownload("./sprites/witchFireball.png");
ASSET_MANAGER.queueDownload("./sprites/healthPack.png");
ASSET_MANAGER.queueDownload("./sprites/armor.png");
ASSET_MANAGER.queueDownload("./sprites/potions.png");
ASSET_MANAGER.queueDownload("./sprites/dragon.png");
ASSET_MANAGER.queueDownload("./sprites/dragonfireball.png");

ASSET_MANAGER.downloadAll(function () {
    let canvas = document.getElementById('gameWorld');
    let ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    PARAMS.CANVAS_WIDTH = canvas.width;
    PARAMS.CANVAS_HEIGHT = canvas.height;

    gameEngine.init(ctx);

    new SceneManager(gameEngine);

    gameEngine.start();
});