module.exports.config = {
  name: "groupemoji",
  version: "1.0.0",
  role: 0,
  hasPrefix: true,
  usage: '[emoji]',
  description: 'Change the emoji of the group thread',
  credits: 'CHAND',
  cooldown: 5
};

module.exports.run = async function({ api, event, args }) {
  try {
    const emoji = args.join(" ");

    if (!emoji) {
      return api.sendMessage("You have not entered an emoji 💩💩", event.threadID, event.messageID);
    }

    api.changeThreadEmoji(emoji, event.threadID, () => {
      api.sendMessage(`🔨 The bot successfully changed the emoji to: ${emoji}`, event.threadID, event.messageID);
    });

  } catch (error) {
    api.sendMessage(`Error in the groupemoji command: ${error.message}`, event.threadID, event.messageID);
  }
};
