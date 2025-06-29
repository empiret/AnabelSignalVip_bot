module.exports = (bot) => {
  bot.action("pay_forex_6m", async (ctx) => {
    try {
      await ctx.editMessageMedia(
        {
          type: "photo",
          media: "https://files.catbox.moe/25rj59.jpg",
        },
        {
          caption:
            "6 Months VIP Access 💍\n\n" +
            "You will get:\n\n" +
            "💎3+ signals daily\n" +
            "💎Entry, Stop Loss\n" +
            "💎One Take Profit\n" +
            "💎Forex, Gold, Oil, Indexes",
          parse_mode: "Markdown",
          reply_markup: {
            inline_keyboard: [
              [{ text: "Pay $199.0 USD", callback_data: "pay_199" }],
              [{ text: "« Back", callback_data: "buyForexVIP" }],
            ],
          },
        }
      );
    } catch (error) {
      console.error("Error sending subscription offer:", error);
    }
  });
};