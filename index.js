const { Telegraf } = require('telegraf');
const fs = require('fs');
const path = require('path');

const bot = new Telegraf('7855368643:AAGy4Lbk6_t7F8J1x9Eus0-OCz2l9-kgBSo'); 

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
