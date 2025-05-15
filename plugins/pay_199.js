module.exports = (bot) => {
  bot.action("pay_199", async (ctx) => {
    try {
      await ctx.answerCbQuery(); // To remove loading spinner

      await ctx.telegram.sendMessage(
        ctx.chat.id,
        "Choose payment method\n\n" +
        "You can pay with VISA/MasterCard or with Cryptocurrency.",
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: "Pay with VISA/MasterCard", callback_data: "pay_visa" }],
              [{ text: "Pay with Cryptocurrency", callback_data: "pay_crypto199" }]
            ],
          },
          parse_mode: "Markdown"
        }
      );
    } catch (error) {
      console.error("Error in pay_99 callback:", error);
    }
  });
};