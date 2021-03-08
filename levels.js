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
            [
                {zombies: 4, skeletons: 2, witches: 1, dragons: 0},
                {zombies: 5, skeletons: 3, witches: 2, dragons: 0}
            ],
            [
                {zombies: 4, skeletons: 4, witches: 2, dragons: 0},
                {zombies: 5, skeletons: 5, witches: 3, dragons: 0}
            ],
            [
                {zombies: 5, skeletons: 4, witches: 4, dragons: 0},
                {zombies: 6, skeletons: 5, witches: 5, dragons: 0}
            ], [
                {zombies: 6, skeletons: 6, witches: 4, dragons: 0},
                {zombies: 7, skeletons: 7, witches: 5, dragons: 0}
            ], [
                {zombies: 2, skeletons: 2, witches: 2, dragons: 1}
            ], [
                {zombies: 3, skeletons: 2, witches: 2, dragons: 0},
                {zombies: 4, skeletons: 3, witches: 3, dragons: 0}
            ], [
                {zombies: 3, skeletons: 2, witches: 2, dragons: 0},
                {zombies: 4, skeletons: 3, witches: 4, dragons: 0}
            ], [
                {zombies: 4, skeletons: 3, witches: 3, dragons: 0},
                {zombies: 4, skeletons: 3, witches: 5, dragons: 0}
            ], [
                {zombies: 4, skeletons: 3, witches: 3, dragons: 0},
                {zombies: 5, skeletons: 4, witches: 4, dragons: 0}
            ], [
                {zombies: 5, skeletons: 3, witches: 2, dragons: 1}
            ]
        ]
    },

    LEVEL_THREE: {
        imgPath: "./maps/BigMap3.png",
        walls: [
            {x: 153, y: 36, width: 24, height: 48}, {x: 177, y: 36, width: 536, height: 24},
            {x: 713, y: 36, width: 24, height: 36}, {x: 321, y: 60, width: 24, height: 160},
            {x: 153, y: 180, width: 24, height: 160}, {x: 153, y: 340, width: 60, height: 24},
            {x: 321, y: 316, width: 24, height: 24}, {x: 309, y: 340, width: 260, height: 24},
            {x: 713, y: 168, width: 24, height: 172}, {x: 665, y: 340, width: 72, height: 24},
            {x: 1223, y: 31, width: 256, height: 24}, {x: 1455, y: 55, width: 24, height: 96},
            {x: 1223, y: 151, width: 24, height: 156}, {x: 1223, y: 307, width: 112, height: 24},
            {x: 1455, y: 247, width: 24, height: 60}, {x: 1431, y: 307, width: 48, height: 24},
            {x: 458, y: 461, width: 24, height: 204}, {x: 578, y: 461, width: 500, height: 24},
            {x: 770, y: 581, width: 24, height: 88}, {x: 794, y: 633, width: 260, height: 24},
            {x: 1054, y: 581, width: 24, height: 76}, {x: 458, y: 761, width: 24, height: 140},
            {x: 482, y: 773, width: 120, height: 24}, {x: 698, y: 773, width: 72, height: 24},
            {x: 770, y: 765, width: 24, height: 112}, {x: 578, y: 893, width: 24, height: 104},
            {x: 770, y: 973, width: 24, height: 24}, {x: 458, y: 997, width: 336, height: 24},
            {x: 1599, y: 460, width: 288, height: 24}, {x: 1599, y: 484, width: 24, height: 48},
            {x: 1863, y: 484, width: 24, height: 456}, {x: 1599, y: 628, width: 24, height: 144},
            {x: 1623, y: 724, width: 48, height: 24}, {x: 1767, y: 724, width: 96, height: 24},
            {x: 1599, y: 868, width: 24, height: 48}, {x: 1599, y: 916, width: 168, height: 24}
        ],
        startX: 1290,
        startY: 505,
        spawnPoints: [
            {x: 100, y: 980}, {x: 50, y: 50}, {x: 1820, y: 100}, {x: 1820, y: 1000}
        ],
        waves: [
            [
                {zombies: 4, skeletons: 2, witches: 2, dragons: 0},
                {zombies: 5, skeletons: 3, witches: 3, dragons: 0}
            ],
            [
                {zombies: 4, skeletons: 4, witches: 3, dragons: 0},
                {zombies: 5, skeletons: 5, witches: 4, dragons: 0}
            ],
            [
                {zombies: 5, skeletons: 4, witches: 5, dragons: 0},
                {zombies: 5, skeletons: 5, witches: 6, dragons: 0}
            ], [
                {zombies: 5, skeletons: 6, witches: 5, dragons: 0},
                {zombies: 5, skeletons: 7, witches: 6, dragons: 0}
            ], [
                {zombies: 2, skeletons: 2, witches: 3, dragons: 1}
            ], [
                {zombies: 3, skeletons: 2, witches: 3, dragons: 0},
                {zombies: 4, skeletons: 3, witches: 4, dragons: 0}
            ], [
                {zombies: 3, skeletons: 2, witches: 3, dragons: 0},
                {zombies: 4, skeletons: 3, witches: 5, dragons: 0}
            ], [
                {zombies: 4, skeletons: 3, witches: 4, dragons: 0},
                {zombies: 4, skeletons: 3, witches: 6, dragons: 0}
            ], [
                {zombies: 4, skeletons: 3, witches: 4, dragons: 0},
                {zombies: 5, skeletons: 4, witches: 5, dragons: 0}
            ], [
                {zombies: 5, skeletons: 3, witches: 3, dragons: 1}
            ]
        ]
    }
};