module.exports = (bot) => {
  bot.action("proceed_account", async (ctx) => {
    try {
      await ctx.answerCbQuery(); // Acknowledge the callback to avoid loading animation
      await ctx.editMessageMedia(
        {
          type: "photo",
          media: "https://files.catbox.moe/tg23p6.png",
          caption:
            "Dear user kindly drop YOUR KYC DETAILS:\n\n" +
            "*NAME*\n*RESIDENTIAL ADDRESS*\n*GENDER*\n*DATE OF BIRTH (AGE)*",
          parse_mode: "Markdown",
        },
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: "Send KYC", url: "https://t.me/AnabelSignalContact1" }],
              [{ text: "« Back", callback_data: "account_schemes" }],
            ],
          },
        }
      );
    } catch (error) {
      console.error("Error handling proceed_account callback:", error);
    }
  });
};