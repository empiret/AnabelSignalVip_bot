module.exports = (bot) => {
  bot.action("account_schemes", async (ctx) => {
    try {
      const message = `*Here are the full terms for our Account Management Service:*\n\n` +
        `*Minimum Investment Requirement:*\n` +
        `To get started, the minimum capital required is *$1,000*. This allows us to apply proper risk management while maximizing growth potential.\n\n` +
        `*Return on Investment (ROI):*\n` +
        `We operate on a *5-trading-day* cycle. At the end of each cycle, profits are calculated and distributed.\n\n` +
        `*70%* of the profit goes to *you* (the investor)\n` +
        `*30%* goes to *us* (the fund managers)\n` +
        `This ensures our interests are aligned—we only earn when you do.\n\n` +
        `*KYC (Know Your Customer) Requirements:*\n` +
        `To comply with regulatory standards and maintain transparency, we’ll need the following details before activating your portfolio:\n\n` +
        `• Full Name\n` +
        `• Residential Address\n` +
        `• Gender\n` +
        `• Date of Birth (Age)\n\n` +
        `Once we receive your KYC info and the initial deposit is made, we’ll set everything up and begin trading immediately in the next cycle.`;

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
