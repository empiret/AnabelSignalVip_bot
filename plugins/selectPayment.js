module.exports = (bot) => {
  bot.action(/pay_(gold|forex)_.+/, (ctx) => {
    ctx.reply("Choose payment method\n\nYou can pay with VISA/MasterCard or Crypto.", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Pay with VISA/MasterCard", callback_data: "visa_pay" }],
          [{ text: "Pay with Cryptocurrency", callback_data: "crypto_pay" }],
        ],
      },
    });
  });
};
