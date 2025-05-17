const ADMIN_ID = 123456789; // replace with your actual admin Telegram ID

const database = {
  users: new Set(), // to track users who interacted with the bot
};

module.exports = (bot) => {
  // Middleware to store user IDs on any message (for broadcasting)
  bot.on("message", (ctx, next) => {
    database.users.add(ctx.from.id);
    next();
  });

  bot.command("admin", async (ctx) => {
    if (ctx.from.id !== ADMIN_ID) return;
    await ctx.reply("Welcome Admin! Choose an option:", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Broadcast Message", callback_data: "admin_broadcast" }],
          [{ text: "Other Command", callback_data: "admin_other" }],
        ],
      },
    });
  });

  bot.action("admin_broadcast", async (ctx) => {
    if (ctx.from.id !== ADMIN_ID) return;
    await ctx.answerCbQuery();
    await ctx.reply("Send the message you want to broadcast to all users:");

    bot.once("message", async (msgCtx) => {
      const message = msgCtx.message.text || "Empty message";
      const usersArray = Array.from(database.users);

      for (const userId of usersArray) {
        try {
          await bot.telegram.sendMessage(userId, message);
        } catch (err) {
          console.error(`Failed to send to ${userId}: ${err.message}`);
        }
      }
      await msgCtx.reply(`✅ Broadcast sent to ${usersArray.length} users.`);
    });
  });

  bot.action("admin_other", async (ctx) => {
    if (ctx.from.id !== ADMIN_ID) return;
    await ctx.answerCbQuery();
    await ctx.reply("This is your other admin command working!");
  });
};
