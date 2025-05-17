const ADMIN_ID = 6307156448;

const database = {
  users: new Set(),
  broadcastMode: false, // track if admin is about to send broadcast
};

module.exports = (bot) => {
  // Track all users who send a message (for broadcast)
  bot.on("message", async (ctx, next) => {
    if (ctx.from && ctx.chat) {
      database.users.add(ctx.from.id);
    }

    // Check if admin is in broadcast mode
    if (ctx.from.id === ADMIN_ID && database.broadcastMode) {
      database.broadcastMode = false;
      const message = ctx.message.text || "Empty message";
      const usersArray = Array.from(database.users);

      let sent = 0;
      for (const userId of usersArray) {
        try {
          await bot.telegram.sendMessage(userId, message);
          sent++;
        } catch (err) {
          console.error(`Failed to send to ${userId}:`, err.message);
        }
      }

      return ctx.reply(`✅ Broadcast sent to ${sent} users.`);
    }

    return next();
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
    database.broadcastMode = true;
    await ctx.reply("Send the message you want to broadcast to all users:");
  });

  bot.action("admin_other", async (ctx) => {
    if (ctx.from.id !== ADMIN_ID) return;
    await ctx.answerCbQuery();
    await ctx.reply("This is your other admin command working!");
  });
};
