const axios = require("axios");
const { Telegraf } = require("telegraf");
const fs = require("fs");
const path = require("path");

const bot = new Telegraf("8026096500:AAEBGmTHKIQnVX4vyIcmFGootx1DCSZD_Rg");
console.log("Installing plugins...");
// Auto-load all command files
fs.readdirSync(path.join(__dirname, "plugins")).forEach((file) => {
  const plugin = require(`./plugins/${file}`);
  if (typeof plugin === "function") plugin(bot);
});
console.log("plugins installed...");


bot.launch();
console.log("Bot is running...");
