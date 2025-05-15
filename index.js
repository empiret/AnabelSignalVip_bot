const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => res.send("Bot is running."));
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// Your existing bot code
const config = require("./config");
const { Telegraf, session } = require('telegraf');
const fs = require('fs');
const path = require('path');
const BOT_TOKEN = config.BOT_TOKEN;

if (!BOT_TOKEN) {
  console.error("❌ BOT_TOKEN is missing!");
  process.exit(1);
}

const bot = new Telegraf(BOT_TOKEN);
bot.use(session());
console.log("Installing plugins...");

const pluginsPath = path.join(__dirname, 'plugins');
fs.readdirSync(pluginsPath).forEach(file => {
  try {
    const plugin = require(`./plugins/${file}`);
    if (typeof plugin === 'function') {
      plugin(bot);
      console.log(`✅ Loaded plugin: ${file}`);
    }
  } catch (err) {
    console.error(`❌ Failed to load ${file}:`, err.message);
  }
});

bot.launch();
console.log('Bot is running...');