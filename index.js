const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => res.send("Bot is running."));
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// Your existing bot code
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
