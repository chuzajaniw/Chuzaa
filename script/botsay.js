module.exports.config = {
  name: "botsay",
  version: "1.0.0",
  role: 0,
  hasPrefix: true,
  usage: 'botsay [ text]',
  description: 'Make the bot repeat a message',
  credits: 'CHAND',
  cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
  try {
    const say = args.join(" ");

    if (!say) {
      return api.sendMessage("Please enter a message 😑", event.threadID, event.messageID);
    }

    return api.sendMessage(`${say}`, event.threadID, event.messageID);
  } catch (error) {
    return api.sendMessage(`Error: ${error.message}`, event.threadID, event.messageID);
  }
};
