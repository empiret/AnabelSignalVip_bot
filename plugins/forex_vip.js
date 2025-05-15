module.exports = (bot) => {
bot.action('forex_vip', async (ctx) => {
  // Answer the callback query to remove the "loading" state on the button
  await ctx.answerCbQuery();

  await ctx.replyWithPhoto(
    { url: "https://files.catbox.moe/tg23p6.png" },
    {
      caption:
        "*FOREX SIGNALS VIP* Subscription Options:\n\n" +
        "Please select a subscription package:",
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [{ text: "1 Month Package - $99.0", callback_data: "/subscribe_1m" }],
          [{ text: "6 Month Package - $199.0", callback_data: "/subscribe_6m" }],
          [{ text: "1 Year Plan - $299.0", callback_data: "/subscribe_1y" }],
          [{ text: "« Back to Categories", callback_data: "/mainMenu" }]
        ]
      }
    }
  );
});