module.exports.config = {
  name: "fblink",
  version: "1.0.0",
  role: 0,
  hasPrefix: true,
  description: "Get url fb account",
  usage: "fblink @mention",
  credits: "CHAND",
  cooldown: 0
};

module.exports.run = async function({ api, event, args }) {
  const { messageReply, senderID, threadID, messageID, type, mentions } = event;
  let uid;

  try {
    if (type === "message_reply") {
      uid = messageReply.senderID;
    } else if (args.join().includes('@') && Object.keys(mentions).length > 0) {
      uid = Object.keys(mentions)[0];
    } else {
      uid = senderID;
    }

    // Fetch user info
    const data = await api.getUserInfo(uid);
    const { profileUrl } = data[uid];

    // Send profile URL
    return api.sendMessage(profileUrl, threadID, messageID);

  } catch (error) {
    console.error('Error occurred:', error);
    return api.sendMessage('An error occurred while processing your request.', threadID, messageID);
  }
};
