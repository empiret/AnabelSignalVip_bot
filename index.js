const { Telegraf } = require("telegraf");
const fs = require("fs");
const path = require("path");

const bot = new Telegraf("7771249915:AAHIOcUzHBQEpvrL1nzgMSa81CoXntmySGg");

// Auto-load plugins
fs.readdirSync("./plugins").forEach((file) => {
  const plugin = require(`./plugins/${file}`);
  if (typeof plugin === "function") plugin(bot);
});

bot.launch();
console.log("Bot started...");
