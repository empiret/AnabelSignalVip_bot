const { Telegraf } = require('telegraf');
const fs = require('fs');
const path = require('path');

const bot = new Telegraf('7835282217:AAH19DC8yxQ4dtIJh9qFNQPMKgixNL2KR90'); 

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
