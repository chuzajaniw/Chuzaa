module.exports.config = {
  name: "allbox",
  version: "1.0.0",
  role: 1,
  hasPrefix: true,
  credits: "CHAND",
  description: "List all group chats",
  usage: "allbox",
  cooldown: 10,
};

module.exports.run = function({ api, event }) {
  try {
    let num = 0;
    let box = "";

    // Fetch the list of threads
    api.getThreadList(100, null, ["INBOX"], (err, list) => {
      if (err) {
        return api.sendMessage(`Error fetching threads: ${err.message}`, event.threadID, event.messageID);
      }

      // Process each thread
      list.forEach(info => {
        if (info.isGroup && info.isSubscribed) {
          box += `${num += 1}. ${info.name} - ${info.threadID}\n`;
        }
      });

      // Send the result message
      return api.sendMessage(box || "No subscribed group threads found.", event.threadID, event.messageID);
    });
  } catch (error) {
    // Handle unexpected errors
    return api.sendMessage(`Error in the allbox command: ${error.message}`, event.threadID, event.messageID);
  }
};
