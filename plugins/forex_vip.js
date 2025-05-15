module.exports = (bot) => {
  bot.action("buy_forex", (ctx) => {
    ctx.replyWithPhoto(
      { url: "https://files.catbox.moe/tg23p6.png" },
      {
        caption: "*FOREX SIGNALS VIP* Subscription Options:\n\nPlease select a subscription package:",
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: [
            [{ text: "1 Month - $99", callback_data: "plan_forex_1m" }],
            [{ text: "6 Months - $199", callback_data: "plan_forex_6m" }],
            [{ text: "1 Year - $299", callback_data: "plan_forex_1y" }],
            [{ text: "« Back", callback_data: "start_over" }]
          ]
        }
      }
    );
  });
};