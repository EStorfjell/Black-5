const LEVELS = {
    OLD_LEVEL_ONE: {
        imgPath: "./maps/Map1.png",
        walls: [
            {x: 128, y: 32, width: 32, height: 32}, {x: 160, y: 96, width: 96, height: 32},
            {x: 64, y: 288, width: 32, height: 96}, {x: 352, y: 64, width: 32, height: 96},
            {x: 416, y: 32, width: 64, height: 32}, {x: 512, y: 32, width: 64, height: 32},
            {x: 544, y: 64, width: 32, height: 32}, {x: 448, y: 128, width: 96, height: 32},
            {x: 384, y: 288, width: 64, height: 32}, {x: 384, y: 320, width: 32, height: 32},
            {x: 544, y: 288, width: 64, height: 32}, {x: 384, y: 416, width: 32, height: 64}
        ],
        startX: 272,
        startY: 192
    },

    LEVEL_ONE: {
        imgPath: "./maps/BigMap1.png",
        walls: [
            {x: 416, y: 288, width: 64, height: 32}, {x: 416, y: 320, width: 32, height: 32},
            {x: 544, y: 288, width: 64, height: 32}, {x: 672, y: 288, width: 64, height: 32},
            {x: 416, y: 384, width: 32, height: 64}, {x: 512, y: 448, width: 32, height: 32},
            {x: 704, y: 384, width: 21, height: 64}, {x: 672, y: 448, width: 64, height: 32},
            {x: 288, y: 640, width: 128, height: 32}, {x: 352, y: 832, width: 64, height: 32},
            {x: 384, y: 864, width: 32, height: 64}, {x: 512, y: 640, width: 32, height: 224},
            {x: 672, y: 640, width: 32, height: 160}, {x: 576, y: 896, width: 64, height: 32}
        ],
        startX: 672,
        startY: 512
    }
};