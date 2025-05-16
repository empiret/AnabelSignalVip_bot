module.exports = (bot) => {
  bot.action("send_proof199", async (ctx) => {
    try {
      await ctx.answerCbQuery();
      await ctx.editMessageText(
        `To complete your payment verification for the **$199 plan**, please contact the admin directly.\n\nSend the following details:\n- **Amount Paid:** $199\n- **Full Name**\n- **Email**\n- **Screenshot of Payment**\n\nClick the button below to message the admin.`,
        {
          parse_mode: "Markdown",
          reply_markup: {
            inline_keyboard: [
              [{ text: "Contact Admin", url: "https://t.me/only_one_empire" }],
              [{ text: "« Back", callback_data: "pay_crypto199" }],
            ],
          },
        }
      );
    } catch (err) {
      console.error("Error in send_proof199:", err);
    }
  });
};
