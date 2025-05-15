module.exports = (bot) => {
  bot.action("pay_forex_1m", async (ctx) => {
    try {
      await ctx.editMessageMedia(
        {
          type: "photo",
          media: "https://files.catbox.moe/tg23p6.png",
        },
        {
          caption:
            "I have a SPECIAL OFFER for you🎁\n\n" +
            "You will get:\n\n" +
            "💎3+ signals daily\n" +
            "💎Entry, Stop Loss\n" +
            "💎One Take Profit\n" +
            "💎Forex, Gold, Oil, Indexes",
          parse_mode: "Markdown",
          reply_markup: {
            inline_keyboard: [
              [{ text: "Pay $99 (Regular Price)", callback_data: "pay_99" }],
              [{ text: "« Back", callback_data: "payForexVIP" }],
            ],
          },
        }
      );
    } catch (error) {
      console.error("Error sending subscription offer:", error);
    }
  });
};