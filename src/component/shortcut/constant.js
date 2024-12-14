import { v4 as uuidv4 } from "uuid";

export const ShortcutConstant = {
  faviconUrl: "favicon.ico",

  shortcuts: [
    {
      id: uuidv4(),
      url: "https://open.spotify.com/",
      title: "Spotify",
    },
    {
      id: uuidv4(),
      url: "https://www.youtube.com/",
      title: "Youtube",
    },
    {
      id: uuidv4(),
      url: "https://web.whatsapp.com/",
      title: "Whatsapp",
    },
    {
      id: uuidv4(),
      url: "https://mail.google.com/",
      title: "Gmail",
    },
  ],
};
