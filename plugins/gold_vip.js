module.exports = (bot) => {
  bot.action('gold_vip', async (ctx) => {
    await ctx.answerCbQuery();

    await ctx.replyWithPhoto(
      { url: 'https://files.catbox.moe/sx1d6k.jpg' }, // you can use a separate image for Gold if desired
      {
        caption:
          '*GOLD SIGNALS VIP* Subscription Options:\n\nPlease select a subscription package:',
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [{ text: '1 Month Package - $89.0', callback_data: 'gold_1month' }],
            [{ text: '6 Month Package - $179.0', callback_data: 'gold_6month' }],
            [{ text: '1 Year Plan - $269.0', callback_data: 'gold_1year' }],
            [{ text: '« Back to Categories', callback_data: 'back_to_start' }]
          ]
        }
      }
    );
  });
};