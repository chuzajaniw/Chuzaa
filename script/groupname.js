module.exports.config = {
  name: "groupname",
  version: "1.0.0",
  role: 0,
  hasPrefix: true,
  credits: "CHAND",
  description: "Change the group's name",
  usage: "[text]",
  cooldown: 0,
};

module.exports.run = async function({ api, event, args }) {
  try {
    const name = args.join(" ");
    if (!name) {
      return api.sendMessage("❌ You have not entered the group name you want to change", event.threadID, event.messageID);
    } else {
      return api.setTitle(name, event.threadID, () => 
        api.sendMessage(`❤ The bot changed the group name to: ${name}`, event.threadID, event.messageID)
      );
    }
  } catch (error) {
    api.sendMessage(`Error in the groupname command: ${error.message}`, event.threadID, event.messageID);
  }
};
