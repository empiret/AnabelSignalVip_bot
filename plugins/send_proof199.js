const config = require("../config");

module.exports = (bot) => {
  // Step 1: Prompt user for proof
  bot.action("send_proof199", async (ctx) => {
    try {
      await ctx.answerCbQuery();
      await ctx.telegram.sendMessage(
        ctx.chat.id,
        "Please send your **proof of payment**, including:\n\n- Email\n- Username\n- Full Name\n\nYou can upload a screenshot or type it out.",
        { parse_mode: "Markdown" }
      );

      // Set session flag to await proof
      ctx.session = ctx.session || {};
      ctx.session.awaiting_proof_199 = true;
    } catch (err) {
      console.error("Error prompting for proof:", err);
    }
  });

  // Step 2: Handle incoming proof
  bot.on("message", async (ctx) => {
    if (!ctx.session || !ctx.session.awaiting_proof_99) return;

    const userId = ctx.from.id;
    const username = ctx.from.username || "N/A";
    const messageContent = ctx.message.text || "Sent a file";

    const adminMessage = `
*New Payment Proof Received - $199 Tier*

*Telegram ID:* \`${userId}\`
*Username:* @${username}
*Message:* 
${messageContent}
    `.trim();

    try {
      if (ctx.message.photo || ctx.message.document) {
        await ctx.telegram.copyMessage(config.ADMIN_ID, ctx.chat.id, ctx.message.message_id, {
          caption: adminMessage,
          parse_mode: "Markdown"
        });
      } else {
        await ctx.telegram.sendMessage(config.ADMIN_ID, adminMessage, {
          parse_mode: "Markdown"
        });
      }

      // Send inline keyboard to admin with plan-specific callback
      await ctx.telegram.sendMessage(config.ADMIN_ID, "Take action on this payment:", {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "✅ Approve", callback_data: `approve199_${userId}` },
              { text: "❌ Reject", callback_data: `reject199_${userId}` },
            ],
          ],
        },
      });

      await ctx.telegram.sendMessage(
        ctx.chat.id,
        "Thank you. Your payment is being processed. You'll receive access shortly."
      );
    } catch (err) {
      console.error("Error forwarding proof:", err);
    }

    ctx.session.awaiting_proof_99 = false;
  });
};