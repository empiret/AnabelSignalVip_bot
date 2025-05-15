module.exports = (bot) => {
  bot.start((ctx) => {
    ctx.replyWithPhoto("https://files.catbox.moe/tg23p6.png", {
      caption:
        "*Guys,*\n" +
        "*Welcome to AnabelSignals Payment Bot*\n\n" +
        "This bot will help you to purchase VIP signals subscription easily!\n\n" +
        "*Check the available payment options:*\n" +
        "🌸 Credit / Debit Card\n" +
        "🌸 Apple Pay / Samsung Pay\n" +
        "🌸 Crypto Currencies\n\n" +
        "*To buy a VIP subscription:*\n" +
        "🤔 Choose a subscription plan below\n" +
        "🛍 Get a personal payment link\n" +
        "💳 Pay with your preferred method\n" +
        "🎉 Get your VIP access link\n\n" +
        "*❓ Need Help?*\n" +
        "📲 Contact: [@laxtechbot](https://t.me/laxtechbot)",
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [{ text: "FOREX SIGNALS VIP", callback_data: "forex" }],
          [{ text: "GOLD SIGNALS VIP", callback_data: "gold" }],
          [{ text: "ACCOUNT MANAGEMENT SCHEME", callback_data: "crypto" }]
        ]
      }
    });
  });

  const showPackages = (ctx, planType) => {
    const label = planType === "gold" ? "GOLD" : planType === "forex" ? "FOREX" : "CRYPTO";
    ctx.replyWithPhoto("https://files.catbox.moe/tg23p6.png", {
      caption: `*${label} SIGNALS VIP* Subscription Options:\n\nPlease select a subscription package:`,
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [{ text: "1 Month - $99", callback_data: `plan_${planType}_1m` }],
          [{ text: "6 Months - $199", callback_data: `plan_${planType}_6m` }],
          [{ text: "1 Year - $299", callback_data: `plan_${planType}_1y` }],
          [{ text: "« Back to Categories", callback_data: "back" }]
        ]
      }
    });
  };

  bot.action("forex", (ctx) => showPackages(ctx, "forex"));
  bot.action("gold", (ctx) => showPackages(ctx, "gold"));
  bot.action("crypto", (ctx) => showPackages(ctx, "crypto"));
  bot.action("back", (ctx) => ctx.reply("Use /start to begin again."));

  const generatePaymentLinks = (userId, plan) => {
    return {
      visa: `https://yourdomain.com/pay/visa/${userId}?plan=${plan}`,
      crypto: `https://yourdomain.com/pay/crypto/${userId}?plan=${plan}`
    };
  };

  const askPaymentMethod = (ctx, plan) => {
    const userId = ctx.from.id;
    const links = generatePaymentLinks(userId, plan);

    ctx.reply(
      "Choose payment method\n\nYou can pay with VISA/MasterCard or with Cryptocurrency.",
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: "Pay with VISA/MasterCard", url: links.visa }],
            [{ text: "Pay with Cryptocurrency", url: links.crypto }],
            [{ text: "✅ I’ve Paid", callback_data: `verify_${plan}` }]
          ]
        }
      }
    );
  };

  bot.action(/^plan_(.+)_(.+)$/, (ctx) => {
    const planType = ctx.match[1];
    const duration = ctx.match[2];
    const plan = `${planType}_${duration}`;
    askPaymentMethod(ctx, plan);
  });

  const verifyPayment = async (userId, plan) => {
    // Dummy checker. Replace with real logic later.
    return false;
  };

  bot.action(/^verify_(.+)$/, async (ctx) => {
    const plan = ctx.match[1];
    const userId = ctx.from.id;

    const success = await verifyPayment(userId, plan);

    if (success) {
      ctx.reply("✅ Payment verified successfully!", {
        reply_markup: {
          inline_keyboard: [
            [{ text: "Join VIP Group", url: "https://t.me/your_vip_group" }]
          ]
        }
      });
    } else {
      ctx.reply("❌ Payment not found. Please complete your payment.", {
        reply_markup: {
          inline_keyboard: [
            [{ text: "Try Again", callback_data: `plan_${plan}` }]
          ]
        }
      });
    }
  });
};