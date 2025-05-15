module.exports = (bot) => {
  bot.action("visa_pay", (ctx) => {
    ctx.reply("Here's your payment link (VISA):\nhttps://example.com/visa-payment", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "I’ve Paid", callback_data: "check_payment_visa" }],
          [{ text: "Contact Admin", url: "https://t.me/laxtechbot" }],
        ],
      },
    });
  });

  bot.action("crypto_pay", (ctx) => {
    ctx.reply("Here's your payment link (Crypto):\nhttps://example.com/crypto-payment", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "I’ve Paid", callback_data: "check_payment_crypto" }],
          [{ text: "Contact Admin", url: "https://t.me/laxtechbot" }],
        ],
      },
    });
  });

  bot.action(/check_payment_(visa|crypto)/, (ctx) => {
    const success = Math.random() > 0.3; // Simulated payment check
    if (success) {
      ctx.reply("Payment successful! Tap below to join the VIP group:", {
        reply_markup: {
          inline_keyboard: [
            [{ text: "Join VIP", url: "https://t.me/your_vip_channel" }],
          ],
        },
      });
    } else {
      ctx.reply("Payment not found. Please complete the payment or contact support.", {
        reply_markup: {
          inline_keyboard: [
            [{ text: "Retry Payment", callback_data: "visa_pay" }],
            [{ text: "Contact Admin", url: "https://t.me/laxtechbot" }],
          ],
        },
      });
    }
  });
};
