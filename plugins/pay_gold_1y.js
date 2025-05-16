module.exports = (bot) => {
  bot.action("pay_gold_1y", async (ctx) => {
    try {
      await ctx.editMessageMedia(
        {
          type: "photo",
          media: "https://files.catbox.moe/25rj59.jpg",
        },
        {
          caption:
            "1 Year VIP Access 💍\n\n" +
            "You will get:\n\n" +
            "💎3+ signals daily\n" +
            "💎Entry, Stop Loss\n" +
            "💎One Take Profit\n" +
            "💎Forex, Gold, Oil, Indexes",
          parse_mode: "Markdown",
          reply_markup: {
            inline_keyboard: [
              [{ text: "Pay $299.0 USD", callback_data: "pay_299" }],
              [{ text: "« Back", callback_data: "buyGoldVIP" }],
            ],
          },
        }
      );
    } catch (error) {
      console.error("Error sending subscription offer:", error);
    }
  });
};