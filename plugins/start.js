module.exports = (bot) => {
  const sendStartMessage = (ctx) => {
    return ctx.editMessageMedia(
      {
        type: "photo",
        media: "https://files.catbox.moe/25rj59.jpg",
        caption:
          "*Welcome to AnabelSignals Payment Bot*\n\n" +
          "This bot will help you purchase VIP signals subscription easily!\n\n" +
          "*Payment Options:*\n" +
          "🌸 Credit/Debit Card\n" +
          "🌸 Apple Pay/Samsung Pay\n" +
          "🌸 Crypto Currencies\n\n" +
          "*To Buy VIP:*\n" +
          "1. Choose a plan\n" +
          "2. Get your payment link\n" +
          "3. Pay\n" +
          "4. Receive invitation link\n\n" +
          "*Need Help?* Contact:      @AnabelSignalContact1",
        parse_mode: "Markdown",
      },
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: "FOREX SIGNALS VIP", callback_data: "buyForexVIP" }],
            [{ text: "GOLD SIGNALS VIP", callback_data: "buyGoldVIP" }],
            [{ text: "ACCOUNT MANAGEMENT SCHEME", callback_data: "account_schemes" }],
          ],
        },
      }
    );
  };

  bot.start((ctx) => {
    ctx.replyWithPhoto(
      { url: "https://files.catbox.moe/25rj59.jpg" },
      {
        caption:
          "*Welcome to AnabelSignals Payment Bot*\n\n" +
          "This bot will help you purchase VIP signals subscription easily!\n\n" +
          "*Payment Options:*\n" +
          "🌸 Credit/Debit Card\n" +
          "🌸 Apple Pay/Samsung Pay\n" +
          "🌸 Crypto Currencies\n\n" +
          "*To Buy VIP:*\n" +
          "1. Choose a plan\n" +
          "2. Get your payment link\n" +
          "3. Pay\n" +
          "4. Receive invitation link\n\n" +
          "*Need Help?* Contact: @AnabelSignalContact1",
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: [
            [{ text: "FOREX SIGNALS VIP", callback_data: "buyForexVIP" }],
            [{ text: "GOLD SIGNALS VIP", callback_data: "buyGoldVIP" }],
            [{ text: "ACCOUNT MANAGEMENT SCHEME", callback_data: "account_schemes" }],
          ],
        },
      }
    );
  });

  bot.action("start", (ctx) => {
    sendStartMessage(ctx);
  });
};
