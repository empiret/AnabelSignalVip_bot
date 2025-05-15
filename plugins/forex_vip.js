module.exports = (bot) => {
  bot.action('forex_vip', async (ctx) => {
    try {
      await ctx.answerCbQuery(); // answer immediately, no params
      
      await ctx.replyWithPhoto(
        { url: 'https://files.catbox.moe/sx1d6k.jpg' },
        {
          caption: `*FOREX SIGNALS VIP* Subscription Options:\n\nPlease select a subscription package:`,
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [{ text: '1 Month Package - $99.0', callback_data: 'forex_1month' }],
              [{ text: '6 Month Package - $199.0', callback_data: 'forex_6month' }],
              [{ text: '1 Year Plan - $299.0', callback_data: 'forex_1year' }],
              [{ text: '« Back to Categories', callback_data: 'back_to_start' }]
            ]
          }
        }
      );
    } catch (error) {
      console.error('Error handling forex_vip action:', error);
    }
  });
};