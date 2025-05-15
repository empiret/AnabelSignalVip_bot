bot.action('back_to_start', async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.replyWithPhoto(
    { url: 'https://files.catbox.moe/tg23p6.png' },
    {
      caption:
        `Guys,\nWelcome to AnabelSignals Payment Bot\n\nThis bot will help you purchase VIP signals subscription easily!\n\n*Payment Options:*\n🌸 Credit/Debit Card\n🌸 Apple Pay/Samsung Pay\n🌸 Crypto Currencies\n\n*To Buy VIP:*\n1. Choose a plan\n2. Get your payment link\n3. Pay\n4. Receive invitation link\n\n*Need Help?* Contact: @laxtechbot`,
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [{ text: 'FOREX SIGNALS VIP', callback_data: 'forex_vip' }],
          [{ text: 'GOLD SIGNALS VIP', callback_data: 'gold_vip' }],
          [{ text: 'ACCOUNT MANAGEMENT SCHEME', callback_data: 'account_scheme' }]
        ]
      }
    }
  );
});