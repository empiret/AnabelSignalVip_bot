module.exports = (bot) => {
  bot.start((ctx) => {
    ctx.replyWithPhoto(
      { url: "https://files.catbox.moe/tg23p6.png" },
      {
        caption:
          "*Guys,*\n" +
          "*Welcome to AnabelSignals Payment Bot*\n\n" +
          "This bot will help you to purchase VIP signals subscription easily!\n\n" +
          "*Check the available payment options:*\n" +
          "🌸 Credit / debit card\n" +
          "🌸 Apple pay / Samsung pay\n" +
          "🌸 Crypto currencies\n\n" +
          "*To buy a VIP subscription:*\n" +
          "🤔 Choose a subscription plan below\n" +
          "🛍 Get a personal payment link\n" +
          "💳 Pay with preferred method\n" +
          "🎉 Get your invitation link\n\n" +
          "*❓Need Help*\n" +
          "📲 [@laxtechbot](https://t.me/laxtechbot)",
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: [
            [{ text: "FOREX SIGNALS VIP", callback_data: "buy_forex" }],
            [{ text: "GOLD SIGNALS VIP", callback_data: "buy_gold" }],
            [{ text: "ACCOUNT MANAGEMENT SCHEME", callback_data: "buy_crypto" }]
          ]
        }
      }
    );
  });
};