module.exports = (bot) => {
  bot.action("pay_crypto", async (ctx) => {
    try {
      await ctx.answerCbQuery();

      const paymentLink = "https://nowpayments.io/payment/?iid=4808077781";

      await ctx.telegram.sendMessage(
        ctx.chat.id,
        "Click the button below to pay with Cryptocurrency:",
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: "Pay with Crypto", web_app: { url: paymentLink } }],
              [{ text: "« Back", callback_data: "pay_99" }],
              [{ text: "Send Proof", callback_data: "send_proof99" }],
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