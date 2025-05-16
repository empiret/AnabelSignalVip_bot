module.exports = (bot) => {
  bot.action("buyGoldVIP", (ctx) => {
    ctx.editMessageMedia({
      type: "photo",
      media: "https://files.catbox.moe/25rj59.jpg",
      caption: "*GOLD SIGNALS VIP*\n\nChoose a subscription:",
      parse_mode: "Markdown",
    }, {
      reply_markup: {
        inline_keyboard: [
          [{ text: "1 Month - $99", callback_data: "pay_gold_1m" }],
          [{ text: "6 Months - $199", callback_data: "pay_gold_6m" }],
          [{ text: "1 Year - $299", callback_data: "pay_gold_1y" }],
          [{ text: "« Back", callback_data: "start" }],
        ],
      }
    });
  });
};