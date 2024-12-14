import { useCallback, useEffect, useState, memo, useRef } from "react";
import "./index.scss";
import { bubbleObject } from "./bubbleObject";
import { Utility } from "../../utility";
import { Constants } from "./constants";
import Shortcuts from "../shortcut";

const BubbleComponent = (props) => {
  const { shadowDetail, sizeScale, pos, id, rotateDeg } = props;
  const [position, setPosition] = useState({ ...pos });
  const [opacity, setOpacity] = useState(0);
  const countRef = useRef(0);
  const [burstActivated, setBurstActivated] = useState(false);

  const bubbleAnimation = useCallback((width, height) => {
    const randTime = Math.random() * 2000 + 2000;
    let timeOutId;
    let intervalId = setInterval(() => {
      const x = Math.random() * width;
      const y = Math.random() * height;
      setOpacity(0);
      if (!timeOutId) {
        timeOutId = setTimeout(() => {
          countRef.current += 1;
          if (countRef.current > 2) {
            props.removeBubble(id);
          } else {
            setOpacity(1);
          }
          if (countRef.current > 0) {
            setPosition({ x: x, y: y });
          }
          clearTimeout(timeOutId);
          timeOutId = null;
        }, 1000);
      }
    }, randTime);
    return [timeOutId, intervalId];
  }, []);

  const burstBubble = () => {
    if (!opacity) return;
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
  const windowConfig = useRef({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const createBubbles = useCallback(() => {
    const config = bubbleObject.createBubbles(
      windowConfig.current.width,
      windowConfig.current.height
    );
    setBubbleConfig((prev) => [...prev, ...config]);
  }, []);

  const removeBubble = (id) => {
    setBubbleConfig((prev) => {
      const config = [...prev];
      const ind = config.findIndex((item) => item.id === id);
      config.splice(ind, 1);
      return config;
    });
  };

  useEffect(() => {
    const handleResize = Utility.debounce(() => {
      windowConfig.current = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    }, 100);
    window.addEventListener("resize", handleResize);
    return () => {};
  }, []);

  useEffect(() => {
    createBubbles();
    const bubbleCreationInterval = setInterval(createBubbles, 2000);
    return () => {
      clearInterval(bubbleCreationInterval);
      setBubbleConfig([]);
    };
  }, [createBubbles]);

  return (
    <div className="bubble-page">
      <img className="google-logo" src="google-white-logo.png" alt="Google" />

      <Shortcuts />

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
