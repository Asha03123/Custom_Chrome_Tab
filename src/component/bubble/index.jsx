import { useCallback, useEffect, useState, memo } from "react";
import "./index.scss";
import { bubbleObject } from "./bubbleObject";
import { Utility } from "../../utility";
import { Constants } from "./constants";

const BubbleComponent = (props) => {
  const { shadowDetail, sizeScale, pos, id, rotateDeg } = props;
  const [position, setPosition] = useState({ ...pos, count: 0 });
  // const [radius, setRadius] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [burstActivated, setBurstActivated] = useState(false);

  const bubbleAnimation = useCallback((width, height) => {
    const randTime = Math.random() * 1000 + 2000;
    let timeOutId;
    let intervalId = setInterval(() => {
      if (position.count > 2) {
        props.removeBubble(id);
      }
      const x = Math.random() * width;
      const y = Math.random() * height;
      setOpacity(0);
      if (!timeOutId) {
        timeOutId = setTimeout(() => {
          setPosition((prev) => ({ x: x, y: y, count: prev.count + 1 }));
          setOpacity(1);
          clearTimeout(timeOutId);
          timeOutId = null;
        }, 1000);
      }
    }, randTime);
    return [timeOutId, intervalId];
    // return [null, null];
  }, []);

  const burstBubble = () => {
    setBurstActivated(true);
  };

  const removeAnimation = () => {
    if (!opacity) return;
    setBurstActivated(false);
    props.removeBubble(id);
  };

  useEffect(() => {
    const [timeOutId, intervalId] = bubbleAnimation(props.width, props.height);
    return () => {
      if (timeOutId) clearTimeout(timeOutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [props.width, props.height, bubbleAnimation]);

  return (
    <div
      id={`bubble${id}`}
      onMouseMove={burstBubble}
      onAnimationEnd={removeAnimation}
      className={
        burstActivated
          ? "bubble-component bubble-component_burst"
          : "bubble-component"
      }
      style={{
        top: position?.y,
        left: position?.x,
        opacity: opacity,
        width: Constants.DEFAULT_SIZE,
        transition: "opacity 2s",
        transform: `scale(${sizeScale}) rotate(${rotateDeg}deg)`,
        boxShadow: shadowDetail[0],
      }}
    >
      <span style={{ borderColor: shadowDetail[1] }}></span>
      <span style={{ borderColor: shadowDetail[2] }}></span>
      <span></span>
      <div className="white-circle"></div>
      <div className="white-circle"></div>
      <div className="white-circle"></div>
    </div>
  );
};

const MemoizedBubbleComponent = memo(BubbleComponent);

const BubblePage = () => {
  const [bubbleConfig, setBubbleConfig] = useState([]);
  const [windowConfig, setWindwowConfig] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const createBubbles = useCallback(() => {
    console.log("createBubbles");
    const config = bubbleObject.createBubbles(
      windowConfig.width,
      windowConfig.height
    );
    setBubbleConfig((prev) => [...prev, ...config]);
    // [windowConfig.width, windowConfig.height]
  }, []);

  const removeBubble = (id) => {
    const config = [...bubbleConfig];
    const ind = config.findIndex((item) => item.id === id);
    config.splice(ind, 1);
    setBubbleConfig(config);
  };

  // const editBubblePosition = (ind, pos) => {
  //   const config = [...bubbleConfig];
  //   const configObj = { ...config[ind] };
  //   configObj[pos] = pos;
  //   setBubbleConfig(config);
  // };

  useEffect(() => {
    const handleResize = Utility.debounce(() => {
      setWindwowConfig({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, 100);
    window.addEventListener("resize", handleResize);
    return () => {};
  }, []);

  useEffect(() => {
    createBubbles();
    const bubbleCreationInterval = setInterval(createBubbles, 6000);
    return () => {
      clearInterval(bubbleCreationInterval);
      setBubbleConfig([]);
    };
  }, [createBubbles]);

  return (
    <div className="bubble-page">
      <img className="google-logo" src="google-white-logo.png" alt="Google" />
      {/* <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "200px",
          backgroundColor: "teal",
        }}
      ></div>

      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "400px",
          height: "100px",
          backgroundColor: "yellow",
          opacity: "0.4",
        }}
      ></div> */}
      {bubbleConfig.map((config) => {
        return (
          <MemoizedBubbleComponent
            {...config}
            removeBubble={removeBubble}
            key={`bubble${config?.id}`}
          />
        );
      })}
    </div>
  );
};

export default BubblePage;
