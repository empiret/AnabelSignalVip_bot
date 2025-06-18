module.exports = (bot) => {
  bot.action("account_schemes", async (ctx) => {
    try {
      const message =`This is an account management service where each investor’s capital is added to our official trading portfolio and actively traded. Your capital is combined with funds from numerous other investors, giving us the ability to make larger market entries. This collective trading strategy significantly increases our profitability.\n\n` +
  `The accumulated margin profits generated while your account is active are substantial—so much so that even after you receive your profits, we still remain in profit. It’s a win-win for both parties.\n\n` +
  `*Minimum Investment Requirement:*\n` +
  `To get started, the minimum capital required is *$1,000*. This amount allows us to apply proper risk management while maximizing growth potential.\n\n` +
  `*Return on Investment (ROI):*\n` +
  `We operate on a *5-trading-day* cycle. At the end of each cycle, profits are calculated and distributed as follows:\n\n` +
  `• *70%* of the profit goes to *you* (the investor)\n` +
  `• *30%* goes to *us* (the fund managers)\n\n` +
  `This ensures our interests are aligned—we only earn when you do.\n\n` +
  `*KYC (Know Your Customer) Requirements:*\n` +
  `To comply with regulatory standards and maintain transparency, we’ll require the following details before activating your portfolio:\n\n` +
  `• Full Name\n` +
  `• Residential Address\n` +
  `• Gender\n` +
  `• Date of Birth (Age)\n\n` +
  `Once we receive your KYC information and the initial deposit is made, we’ll set everything up and begin trading immediately in the next cycle.`;
      await ctx.telegram.sendMessage(ctx.chat.id, message, {
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: [
            [{ text: "✅ Proceed", callback_data: "proceed_account" }],
            [{ text: "« Back", callback_data: "start" }]
          ]
        }
      });
    } catch (error) {
      console.error("Error sending account terms:", error);
    }
  });
};
