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
            {x: 704, y: 384, width: 32, height: 64}, {x: 672, y: 448, width: 64, height: 32},
            {x: 288, y: 640, width: 128, height: 32}, {x: 352, y: 832, width: 64, height: 32},
            {x: 384, y: 864, width: 32, height: 64}, {x: 512, y: 640, width: 32, height: 224},
            {x: 672, y: 640, width: 32, height: 160}, {x: 576, y: 896, width: 64, height: 32}
        ],
        startX: 672,
        startY: 512,
        spawnPoints: [
            {x: 0, y: 0}, {x: 0, y: 800}, {x: 800, y: 0}, {x: 800, y: 800}
        ],
        waves: [
            [
                {zombies: 3, skeletons: 2, witches: 1, dragons: 0},
                {zombies: 4, skeletons: 3, witches: 2, dragons: 0}
            ],
            [
                {zombies: 4, skeletons: 3, witches: 2, dragons: 0},
                {zombies: 5, skeletons: 4, witches: 3, dragons: 0}
            ],
            [
                {zombies: 5, skeletons: 4, witches: 3, dragons: 0},
                {zombies: 6, skeletons: 5, witches: 4, dragons: 0}
            ], [
                {zombies: 6, skeletons: 5, witches: 4, dragons: 0},
                {zombies: 7, skeletons: 6, witches: 5, dragons: 0}
            ], [
                {zombies: 2, skeletons: 2, witches: 1, dragons: 1}
            ], [
                {zombies: 2, skeletons: 2, witches: 2, dragons: 0},
                {zombies: 3, skeletons: 3, witches: 3, dragons: 0}
            ], [
                {zombies: 2, skeletons: 2, witches: 2, dragons: 0},
                {zombies: 3, skeletons: 3, witches: 4, dragons: 0}
            ], [
                {zombies: 3, skeletons: 3, witches: 3, dragons: 0},
                {zombies: 3, skeletons: 3, witches: 5, dragons: 0}
            ], [
                {zombies: 3, skeletons: 3, witches: 3, dragons: 0},
                {zombies: 4, skeletons: 4, witches: 4, dragons: 0}
            ], [
                {zombies: 3, skeletons: 3, witches: 2, dragons: 1}
            ]
        ]
    },

    LEVEL_TWO: {
        imgPath: "./maps/BigMap2.png",
        walls: [
            {x: 284, y: 194, width: 48, height: 24}, {x: 284, y: 217, width: 24, height: 89},
            {x: 492, y: 194, width: 48, height: 24}, {x: 404, y: 266, width: 24, height: 64},
            {x: 516, y: 282, width: 24, height: 48}, {x: 284, y: 370, width: 24, height: 48},
            {x: 372, y: 394, width: 168, height: 24}, {x: 681, y: 541, width: 112, height: 24},
            {x: 681, y: 565, width: 24, height: 40}, {x: 857, y: 541, width: 77, height: 24},
            {x: 681, y: 669, width: 24, height: 24}, {x: 681, y: 693, width: 237, height: 24},
            {x: 878, y: 629, width: 24, height: 64}, {x: 998, y: 541, width: 24, height: 152},
            {x: 982, y: 693, width: 40, height: 24}, {x: 98, y: 566, width: 26, height: 50},
            {x: 259, y: 570, width: 26, height: 50}, {x: 98, y: 662, width: 26, height: 50},
            {x: 258, y: 661, width: 26, height: 50}
        ],
        startX: 580,
        startY: 450,
        spawnPoints: [
            {x: 100, y: 100}, {x: 100, y: 700}, {x: 1100, y: 100}, {x: 1100, y: 700}
        ],
        waves: [
            // TODO: Waves
        ]
    }
};