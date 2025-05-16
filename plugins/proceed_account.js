const userKYC = require("./userKYC");

module.exports = (bot) => {
  bot.action("proceed_account", async (ctx) => {
    try {
      await ctx.replyWithPhoto(
        { url: "https://files.catbox.moe/tg23p6.png" },
        {
          caption:
            "Dear user kindly drop YOUR KYC DETAILS:\n\n" +
            "*NAME*\n*RESIDENTIAL ADDRESS*\n*GENDER*\n*DATE OF BIRTH (AGE)*",
          parse_mode: "Markdown",
          reply_markup: {
            inline_keyboard: [[{ text: "« Back", callback_data: "account_schemes" }]],
          },
        }
      );

      userKYC[ctx.from.id] = { step: "awaiting_details" };
    } catch (err) {
      console.error("Error in proceed_account:", err);
    }
  });
};