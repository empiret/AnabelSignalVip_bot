bot.action("buyForexVIP", (ctx) => {
  ctx.editMessageCaption(
    "*FOREX SIGNALS VIP*\n\nChoose a subscription:",
    {
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [{ text: "1 Month Package - $99.0", callback_data: "subscribe_1m" }],
          [{ text: "6 Month Package - $199.0", callback_data: "subscribe_6m" }],
          [{ text: "1 Year Plan - $299.0", callback_data: "subscribe_1y" }],
          [{ text: "« Back to Categories", callback_data: "start" }],
        ],
      },
    }
  );
});