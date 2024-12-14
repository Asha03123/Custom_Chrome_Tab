import "./index.scss";
import { ShortcutConstant } from "./constant";
import { memo, useState } from "react";

const ShorcutItem = ({ item }) => {
  const imageUrl = item.title.toLowerCase() + "-icon.ico";
  const [imageSrc, setImageSrc] = useState(imageUrl);

  const handleError = (e) => {
    const defaultUrl = "default-icon.png";
    setImageSrc(defaultUrl);
  };

  return (
    <a href={item.url}>
      <div className="shortcut-item">
        <div className="shortcut-icon">
          <img src={imageSrc} onError={handleError} />
        </div>
        <p className="shortcut-title">{item.title}</p>
      </div>
    </a>
  );
};

const Shortcuts = () => {
  const { shortcuts } = ShortcutConstant;
  return (
    <div className="shortcut-wrapper">
      {shortcuts.map((item) => (
        <ShorcutItem item={item} key={item.id} />
      ))}
    </div>
  );
};

export default memo(Shortcuts);
