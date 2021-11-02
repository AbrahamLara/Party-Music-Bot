# Party Music Bot
A discord bot created for use in a personal discord server. This bot is inspired by the discord example music bot: 
https://github.com/discordjs/voice/tree/main/examples/music-bot

Table of contents:
- [Requirements](#requirements)
- [Setup](#setup)
- [VS Code Setup](#vs-code-setup)
- [Developing](#developing)

## Requirements
- TypeScript
- NVM v1.1.8
- Node.JS v16
- FFMPEG
- Python >= 2

## Setup

It's recommended to use nvm to install node version 16.x.x. On macOS/Ubuntu install nvm using brew. 

Installing nvm on Windows:

- Install nvm for windows from - https://github.com/coreybutler/nvm-windows
- Check if nvm is installed by going to your command line and typing `nvm --v`
- If it's installed, next: `nvm install 16.11.0`
- Make sure you're on administrative privileges: `nvm use 16.11.0` (you can also type in "nvm use latest")
- Check if npm and node are installed by typing `node -v` and `npm -v`

To finish setup complete the following:

- Install TypeScript globally: `npm install typescript -g`
- Install packages: `npm install`
- Check if npm and node are installed by typing `node -v` and `npm -v`

## VS Code Setup

 Extensions required: 
 - Name: Prettier - Code formatter
   VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode

 - Name: ESLint
   VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint

Go to File > Preferences > Settings > Workspace tab > then click the file icon on the top right as per image below:

![Image for VS Code](https://i.imgur.com/d8EKszE.png)

Once you click that it should create and open your vs code settings for this specific workspace, make sure this piece of code below is included and saved:

```JSON
    {
      "files.eol": "\n",

      "editor.codeActionsOnSave": {
          "source.fixAll.eslint": true
      },
        "eslint.validate": ["javascript", "typescript"],
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "[javascript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
      },
      "[typescript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
      }
    }
```
Note: "Windows" enforces the usage of Windows line endings: \r\n for CRLF. In your VS Code bottom right change CRLF to LF.

## Developing

- Create a `config.json` file in the root directory of this project using the [config.sample.json](config.sample.json).
- Run application: `npm run dev`