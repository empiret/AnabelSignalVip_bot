module.exports = (bot) => {
  bot.action("pay_visa199", async (ctx) => {
    try {
      await ctx.answerCbQuery();

      const paymentLink = "https://xxxprecard.glitch.me/card199.html";

      await ctx.telegram.sendMessage(
        ctx.chat.id,
        "Click the button below to pay with Cryptocurrency:",
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: "Pay with Card ", web_app: { url: paymentLink } }],
              [{ text: "« Back", callback_data: "pay_99" }],
              [{ text: "Send Proof", callback_data: "send_proof_visa99" }],
            ],
          },
        }
      );
    } catch (error) {
      console.error("Error sending crypto payment link:", error);
      await ctx.telegram.sendMessage(
        ctx.chat.id,
        "Sorry, something went wrong. Please try again later."
      );
    }
  });
};