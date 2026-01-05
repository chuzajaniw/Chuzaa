const axios = require('axios');

module.exports.config = {
  name: "sendmsj",
  version: "1.0.0",
  role: 0,
  hasPrefix: true,
  credits: "CHAND",
  description: "sendmsj to any id",
  usages: "sendmsj uid",
  cooldowns: 0,
};

module.exports.run = async ({ api, event, args }) => {
  // Function to send a message to the thread
  async function sendMessage(message) {
    api.sendMessage(message, event.threadID, event.messageID);
  }

  // Parse the arguments
  const [urlOrUID, message] = args.join(" ").split("|").map(item => item.trim());

  // Check for missing arguments
  if (!urlOrUID) return sendMessage("Missing Facebook URL or UID");
  if (!message) return sendMessage("Missing message");

  try {
    // Determine the recipient UID
    let recipientUID;
    if (urlOrUID.startsWith("https://facebook.com")) {
      const res = await api.getUID(urlOrUID);
      recipientUID = res;
    } else {
      recipientUID = urlOrUID;
    }

    // Send the message
    await api.sendMessage(
      `💛────💜────🖤───🤍\n\n ${message}\n\n💛────💜────🖤───🤍`,
      recipientUID
    );

    // Confirm success
    sendMessage("Confession has been sent successfully!");
  } catch (err) {
    // Handle any errors that occur
    console.error(err);
    sendMessage("I'm sorry, but your confession failed to send. Please try contacting the person directly (⁠◍⁠•⁠ᴗ⁠•⁠◍⁠).");
  }
};
