const config = require("../config"); // adjust path if needed

module.exports = (bot) => {
  // APPROVE payment for $99 plan
  bot.action(/approve99_(\d+)/, async (ctx) => {
    const userId = ctx.match[1];

    try {
      await ctx.answerCbQuery("Approved");

      await ctx.telegram.sendMessage(
        userId,
        "✅ Your payment has been successfully approved!\n\nWelcome to the VIP group.",
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: "Join VIP Group", url: config.VIP_GROUP_LINK_99 }]
            ]
          }
        }
      );

      await ctx.editMessageText("Payment approved and user notified.");
    } catch (err) {
      console.error("Error approving payment:", err);
      await ctx.reply("Failed to notify user.");
    }
  });

  // REJECT payment for $99 plan
  bot.action(/reject99_(\d+)/, async (ctx) => {
    const userId = ctx.match[1];

    try {
      await ctx.answerCbQuery("Rejected");

      await ctx.telegram.sendMessage(
        userId,
        "❌ Sorry, your payment could not be verified.\nPlease try again or contact support if this is a mistake."
      );

      await ctx.editMessageText("Payment rejected and user notified.");
    } catch (err) {
      console.error("Error rejecting payment:", err);
      await ctx.reply("Failed to notify user.");
    }
  });
};