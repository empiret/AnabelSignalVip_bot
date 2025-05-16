const ADMIN_ID = 6307156448; // Replace with your Telegram ID
const userKYC = require("./userKYC");

module.exports = (bot) => {
  bot.action("confirm_kyc", async (ctx) => {
    const userId = ctx.from.id;
    const state = userKYC[userId];

    if (!state?.details) {
      return ctx.answerCbQuery("No KYC details found.");
    }

    await ctx.telegram.sendMessage(
      ADMIN_ID,
      `*KYC Submission from:* [${ctx.from.first_name}](tg://user?id=${ctx.from.id})\n\n${state.details}`,
      { parse_mode: "Markdown" }
    );

    await ctx.reply("Your KYC has been submitted successfully.", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Go to Website", url: "https://goggle.com" }],
          [{ text: "« Back", callback_data: "account_schemes" }],
        ],
      },
    });

    delete userKYC[userId];
  });
};