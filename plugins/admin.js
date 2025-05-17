const ADMIN_ID = 6307156448;

const database = {
  users: new Set(),
  waitingForBroadcast: false,
};

module.exports = (bot) => {
  // Track all users who send any message
  bot.on("message", (ctx, next) => {
    if (ctx.from && ctx.from.id) {
      database.users.add(ctx.from.id);
    }
    next();
  });

  // Admin command menu
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

  // Handle admin broadcast trigger
  bot.action("admin_broadcast", async (ctx) => {
    if (ctx.from.id !== ADMIN_ID) return;
    await ctx.answerCbQuery();
    database.waitingForBroadcast = true;
    await ctx.reply("Send the message you want to broadcast to all users.");
  });

  // Handle other admin command
  bot.action("admin_other", async (ctx) => {
    if (ctx.from.id !== ADMIN_ID) return;
    await ctx.answerCbQuery();
    await ctx.reply("This is your other admin command working!");
  });

  // Listen for messages from admin to broadcast
  bot.on("message", async (ctx) => {
    if (ctx.from.id !== ADMIN_ID) return;
    if (!database.waitingForBroadcast) return;

    database.waitingForBroadcast = false; // reset flag

    const message = ctx.message.text || "Empty message";
    const usersArray = Array.from(database.users);

    let successCount = 0;
    for (const userId of usersArray) {
      try {
        await bot.telegram.sendMessage(userId, message);
        successCount++;
      } catch (err) {
        console.error(`Failed to send message to ${userId}: ${err.message}`);
      }
    }

    await ctx.reply(`✅ Broadcast sent to ${successCount} users.`);
  });
};
