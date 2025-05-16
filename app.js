const axios = require("axios");
const { Telegraf } = require("telegraf");
const fs = require("fs");
const path = require("path");

const bot = new Telegraf("7964318828:AAGyYkiEWtK5aDkaps-7X8qn3-CKJlA7ycU");
console.log("Installing plugins...");
// Auto-load all command files
fs.readdirSync(path.join(__dirname, "plugins")).forEach((file) => {
  const plugin = require(`./plugins/${file}`);
  if (typeof plugin === "function") plugin(bot);
});
console.log("plugins installed..");

bot.launch();
console.log("Bot is running...");
