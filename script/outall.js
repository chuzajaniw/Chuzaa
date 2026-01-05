module.exports.config = {
  name: "outall",
  version: "1.0.0",
  role: 1,
  hasPrefix: true,
  credits: "CHAND",
  description: "Bot leaves the thread",
  usages: "allout",
  cooldowns: 0,

};

module.exports.run = async ({ api, event, args }) => {
  try {
    api.getThreadList(100, null, ["INBOX"], (err, list) => {
      if (err) throw err;

      list.forEach(item => {
        if (item.isGroup && item.threadID != event.threadID) {
          api.removeUserFromGroup(api.getCurrentUserID(), item.threadID);
        }
      });

      api.sendMessage('Out of the whole group successfully', event.threadID);
    });
  } catch (error) {
    api.sendMessage(error.message, event.threadID, event.messageID);
}
};