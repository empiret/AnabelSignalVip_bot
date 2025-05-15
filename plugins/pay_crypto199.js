const axios = require("axios");

const NOWPAYMENTS_API_KEY = "PMRMKH5-S2RM792-GV83TY8-NQBZY0B"; // Put your real key here
const NOWPAYMENTS_API_URL = "https://api.nowpayments.io/v1/invoice";

module.exports = (bot) => {
  bot.action("pay_crypto", async (ctx) => {
    try {
      await ctx.answerCbQuery();

      // Create payment invoice
      const paymentData = {
        price_amount: 199.0,
        price_currency: "usd",
        pay_currency: "btc", // or "eth" or others depending on your crypto choice
        order_id: `telegram_${ctx.from.id}_${Date.now()}`, // unique order ID
        order_description: "VIP Subscription - Forex Signals 1 Month",
        ipn_callback_url: "https://your-server.com/nowpayments-callback" // optional webhook to track payment
      };

      const response = await axios.post(NOWPAYMENTS_API_URL, paymentData, {
        headers: {
          "x-api-key": NOWPAYMENTS_API_KEY,
          "Content-Type": "application/json",
        },
      });

      const paymentLink = response.data.invoice_url;

      // Send payment link to user
      await ctx.telegram.sendMessage(
        ctx.chat.id,
        "Click the button below to pay with Cryptocurrency:",
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: "Pay with Crypto", url: paymentLink }],
              [{ text: "« Back", callback_data: "pay_199" }],
            ],
          },
        }
      );

      // You still need to implement IPN (webhook) or polling on your backend to confirm payment
      // Then send user invite link or failure message accordingly

    } catch (error) {
      console.error("Error creating crypto payment:", error);
      await ctx.telegram.sendMessage(ctx.chat.id, "Sorry, failed to create payment. Try again later.");
    }
  });
};