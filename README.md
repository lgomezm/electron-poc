# Electron POC

This is a POC to create a basic installer. It basically copies bundled files to a path, selected by the user.

## Project setup:

After cloning the repo, cd to the project's root directory and run `npm install`.

It should install all dependencies and you should be ready to run it.

## Project structure:

- `main.js` creates the window and wires up the application.
- `preload.js` is the preload script that exposes functions to the main process.
- `renderer.js` handles the rendering process and uses functions exposed by the preload script.
- `index.html` is the actual front-end of the app.

## How to run

`npm start`
