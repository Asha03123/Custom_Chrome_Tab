import { Constants } from "./constants";
import { v4 as uuidv4 } from "uuid";

export const bubbleObject = {
  boxShadowGenerator: function () {
    const colorArr = Constants.COLOR_ARR;
    const colorIndex = Math.round(Math.random() * (colorArr.length - 1));
    const colorObj = colorArr[colorIndex];

    const shadow_string = `inset 0 0 25px rgb(128, 128, 128),
            inset 20px 20px 30px 5px ${colorObj.color},
            inset 2px 2px 30px 5px ${colorObj.color},
            inset -1px -1px 25px 10px ${colorObj.complementary},
            inset -10px 10px 25px 5px rgb(255, 0, 0, 0.4),
            inset 10px 10px 10px rgb(255, 0, 0, 0.7)`;
    return [shadow_string, colorObj.span1, colorObj.span2];
  },

  createBubbles: function (innerWidth, innerHeight) {
    const bubbleConfigTemp = [];
    for (let i = 0; i < Constants.BUBBLE_COUNT; i++) {
      const sizeScale = Math.round(Math.random() * 10) / 10 || 0.1;
      const sizeStyle = Constants.DEFAULT_SIZE * sizeScale;
      const width = innerWidth - sizeStyle - Constants.OFFSET;
      const height = innerHeight - sizeStyle - Constants.OFFSET;
      const x = Math.random() * width;
      const y = Math.random() * height;
      const pos = { x: x, y: y };

      const rotateDeg = Math.round(Math.random() * 360);
      const shadowDetail = this.boxShadowGenerator();

      bubbleConfigTemp.push({
        sizeScale: sizeScale,
        pos: pos,
        id: uuidv4(),
        rotateDeg: rotateDeg,
        shadowDetail: shadowDetail,
        width: width,
        height: height,
      });
    }

    return bubbleConfigTemp;
  },
};
