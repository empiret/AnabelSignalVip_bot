const userKYC = require("./userKYC");

module.exports = (bot) => {
  bot.on("message", async (ctx) => {
    const userId = ctx.from.id;
    const state = userKYC[userId];

    if (state?.step === "awaiting_details") {
      userKYC[userId] = {
        step: "awaiting_confirmation",
        details: ctx.message.text,
      };

      await ctx.reply(
        `*Please confirm your KYC details:*\n\n${ctx.message.text}`,
        {
          parse_mode: "Markdown",
          reply_markup: {
            inline_keyboard: [
              [{ text: "✅ Confirm", callback_data: "confirm_kyc" }],
              [{ text: "« Back", callback_data: "account_schemes" }],
            ],
          },
        }
      );
    }
  });
};