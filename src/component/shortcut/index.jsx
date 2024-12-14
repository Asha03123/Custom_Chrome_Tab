import "./index.scss";
import { ShortcutConstant } from "./constant";
import { memo, useState } from "react";

const ShorcutItem = ({ item }) => {
  const imageUrl = `${item.url}${ShortcutConstant.faviconUrl}`;
  const [imageSrc, setImageSrc] = useState(imageUrl);

  const handleError = (e) => {
    console.log("hello.....");
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
