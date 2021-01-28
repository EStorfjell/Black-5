/**
 * A more advanced animator class that can handle frames of variable dimensions.
 */
class AdvancedAnimator {

    /**
     * Constructor for an AdvancedAnimator.
     * @param {String} spritesheet The path of the sprite sheet
     * @param {Number[]} xStarts An array with the top left x-coordinates of the frames
     * @param {Number[]} yStarts An array with the top left y-coordinates of the frames
     * @param {Number[]} widths An array of the widths of the frames
     * @param {Number[]} heights An array of the heights of the frames
     * @param {Number} frameDuration The duration of each frame in seconds
     * @param {Boolean} reverse True if the frames are ordered right to left
     * @param {Boolean} loop True if the frames should be displayed in a loop
     */
    constructor(spritesheet, xStarts, yStarts, widths, heights, frameDuration, reverse, loop) {
        Object.assign(this, {
            spritesheet,
            xStarts,
            yStarts,
            heights,
            widths,
            frameDuration,
            reverse,
            loop
        });

        this.elapsedTime = 0;
        this.totalTime = this.xStarts.length * this.frameDuration;

    };

    drawFrame(tick, ctx, x, y, scale) {
        this.elapsedTime += tick;

        if (this.isDone()) {
            if (this.loop) {
                this.elapsedTime -= this.totalTime;
            } else {
                return;
            }
        }

        let frame = this.currentFrame();
        if (this.reverse) frame = this.xStarts.length - frame - 1;

        ctx.drawImage(this.spritesheet,
            this.xStarts[frame], this.yStarts[frame], //source from sheet
            this.widths[frame], this.heights[frame],
            x, y,
            this.widths[frame] * scale,
            this.heights[frame] * scale);

        // if (PARAMS.DEBUG) {
        //     ctx.strokeStyle = 'Green';
        //     ctx.strokeRect(x, y, this.width * scale, this.height * scale);
        // }
    };

    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration);
    };

    isDone() {
        return (this.elapsedTime >= this.totalTime);
    };
}