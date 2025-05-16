module.exports = (bot) => {
  bot.command("proceed_account", async (ctx) => {
    await ctx.replyWithPhoto(
      { url: "https://files.catbox.moe/tg23p6.png" },
      {
        caption:
          "Dear user kindly drop YOUR KYC DETAILS:\n\n" +
          "*NAME*\n*RESIDENTIAL ADDRESS*\n*GENDER*\n*DATE OF BIRTH (AGE)*",
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: [
            [{ text: "« Back", callback_data: "account_schemes" }],
            [{ text: "Send KYC", url: "https://t.me/AnabelSignalContact1" }],
          ],
        },
      }
    );
  });
};
