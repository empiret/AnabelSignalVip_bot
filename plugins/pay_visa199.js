module.exports = (bot) => {
  bot.action("pay_visa199", async (ctx) => {
    try {
      await ctx.answerCbQuery(
        "Credit/Debit Card payment is under maintenance. Please pay with crypto.",
        { show_alert: true }
      );
    } catch (err) {
      console.error("Callback Query Error:", err.message);
    }
  });
};
