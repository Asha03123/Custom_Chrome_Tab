# Custom Chrome Background Page for new Tabs

## About

This repository contains a basic React project that generates and repositions bubbles. It also includes instructions for setting up the page as a Chrome extension to serve as the background page for a new tab.

![Sample Video](https://github.com/Asha03123/Custom_Chrome_Tab/blob/main/video/sample-video.gif)

## How to load as extension:

1. Go to [chrome extenstion page](chrome://extensions/) and change to developer mode
2. Click on load unpacked extension and choose the [dist](https://github.com/Asha03123/Custom_Chrome_Tab/tree/main/dist) folder
3. Open New Tab with the extension on

## Details:

1. This project is created using Vite + React after which the html files are build using `npm run build` and these build files are generated in the dist folder.
2. The file `manifest.json` is added to the dist folder which is necessary to load the extension. This file's configuration allows overriding the default Chrome new Tab page.

## How to run:

1. To run the react project:
   1. `cd custom-page`
   2. `npm run dev`
2. To run the html:
   1. run the [index.html](https://github.com/Asha03123/Custom_Chrome_Tab/blob/main/dist/index.html) in a live server.
