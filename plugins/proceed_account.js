const config = require("../config");

const userKYC = {};

module.exports = (bot) => {
  // Step 1: Show KYC prompt
  bot.action("proceed_account", async (ctx) => {
    try {
      await ctx.replyWithPhoto(
        { url: "https://files.catbox.moe/tg23p6.png" }, // Replace with your image
        {
          caption:
            "Dear user kindly drop YOUR KYC DETAILS:\n\n" +
            "*NAME*\n*RESIDENTIAL ADDRESS*\n*GENDER*\n*DATE OF BIRTH (AGE)*",
          parse_mode: "Markdown",
          reply_markup: {
            inline_keyboard: [
              [{ text: "« Back", callback_data: "account_schemes" }],
            ],
          },
        }
      );

      userKYC[ctx.from.id] = { step: "awaiting_details" };
    } catch (err) {
      console.error("Error in proceed_account:", err);
    }
  });

  // Step 2: Handle user message input
  bot.on("message", async (ctx) => {
    const userId = ctx.from.id;
    const state = userKYC[userId];

    if (state?.step === "awaiting_details") {
      userKYC[userId] = {
        step: "awaiting_confirmation",
        details: ctx.message.text,
      };

      await ctx.reply(
        `*Please confirm your KYC details:*\n\n${ctx.message.text}`,
        {
          parse_mode: "Markdown",
          reply_markup: {
            inline_keyboard: [
              [{ text: "✅ Confirm", callback_data: "confirm_kyc" }],
              [{ text: "« Back", callback_data: "account_schemes" }],
            ],
          },
        }
      );
    }
  });

  // Step 3: Confirm and forward to admin
  bot.action("confirm_kyc", async (ctx) => {
    const userId = ctx.from.id;
    const state = userKYC[userId];

    if (!state?.details) {
      return ctx.answerCbQuery("No KYC details found.");
    }

    // Send KYC to admin
    await ctx.telegram.sendMessage(
      config.ADMIN_ID,
      `*KYC Submission from:* [${ctx.from.first_name}](tg://user?id=${ctx.from.id})\n\n${state.details}`,
      { parse_mode: "Markdown" }
    );

    // Notify user
    await ctx.reply("Your KYC has been submitted successfully.", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Go to Website", url: "https://goggle.com" }],
          [{ text: "« Back", callback_data: "account_schemes" }],
        ],
      },
    });

    delete userKYC[userId];
  });
};
