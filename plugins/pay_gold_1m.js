module.exports = (bot) => {
  bot.action("pay_gold_1m", async (ctx) => {
    try {
      await ctx.editMessageMedia(
        {
          type: "photo",
          media: "https://files.catbox.moe/tg23p6.png",
        },
        {
          caption:
            "GOLD SIGNALS VIP Subscription Options\n\n" +
            "Please select a subscription package:",
          parse_mode: "Markdown",
          reply_markup: {
            inline_keyboard: [
              [{ text: "Pay $99 (Regular Price)", callback_data: "pay_99" }],
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