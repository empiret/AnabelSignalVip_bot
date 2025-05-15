const config = require("./config");
const { Telegraf } = require('telegraf');
const fs = require('fs');
const path = require('path');
const BOT_TOKEN = config.BOT_TOKEN;
if (!BOT_TOKEN) {
  console.error("❌ BOT_TOKEN is missing!");
  process.exit(1);
}

const bot = new Telegraf(BOT_TOKEN);
console.log("Installing plugins...");

// Load all plugins
const pluginsPath = path.join(__dirname, 'plugins');
fs.readdirSync(pluginsPath).forEach(file => {
  const plugin = require(`./plugins/${file}`);
  if (typeof plugin === 'function') {
    plugin(bot);
  }
});

bot.launch();
console.log('Bot is running...');
