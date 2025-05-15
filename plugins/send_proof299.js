const config = require("../config");

const awaitingProofUsers299 = new Set();

module.exports = (bot) => {
  bot.action("send_proof299", async (ctx) => {
    try {
      await ctx.answerCbQuery();
      await ctx.telegram.sendMessage(
        ctx.chat.id,
        "Please send your **proof of payment**, including:\n\n- Email\n- Username\n- Full Name\n\nYou can upload a screenshot or type it out.",
        { parse_mode: "Markdown" }
      );

      awaitingProofUsers299.add(ctx.from.id);  // Flag user awaiting proof
    } catch (err) {
      console.error("Error prompting for proof:", err);
    }
  });

  bot.on("message", async (ctx) => {
    if (!awaitingProofUsers299.has(ctx.from.id)) return;  // Only handle if flagged

    const userId = ctx.from.id;
    const username = ctx.from.username || "N/A";
    const messageContent = ctx.message.text || "Sent a file";

    const adminMessage = `
*New Payment Proof Received - $299 Tier*

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

      await ctx.telegram.sendMessage(config.ADMIN_ID, "Take action on this payment:", {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "✅ Approve", callback_data: `approve299_${userId}` },
              { text: "❌ Reject", callback_data: `reject299_${userId}` },
            ],
          ],
        },
      });

      await ctx.telegram.sendMessage(
        ctx.chat.id,
        "Thank you. Your payment is being processed. You'll receive access shortly."
      );

      awaitingProofUsers299.delete(userId);  // Remove flag after proof received
    } catch (err) {
      console.error("Error forwarding proof:", err);
    }
  });
};