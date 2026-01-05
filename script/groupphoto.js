const fs = require("fs");
const axios = require("axios");

module.exports.config = {
  name: "groupphoto",
  version: "1.0.0",
  role: 0,
  hasPrefix: true,
  usage: 'reply photo',
  description: 'group photo uploaded',
  credits: 'CHAND',
  cooldown: 5
};

module.exports.run = async function({ api, event }) {
  try {
    if (event.type !== "message_reply") {
      return api.sendMessage("❌ You have to reply to a photo", event.threadID, event.messageID);
    }

    if (!event.messageReply.attachments || event.messageReply.attachments.length === 0) {
      return api.sendMessage("❌ You have to reply to a photo", event.threadID, event.messageID);
    }

    if (event.messageReply.attachments.length > 1) {
      return api.sendMessage("Please reply with only 1 photo!", event.threadID, event.messageID);
    }

    const imageUrl = event.messageReply.attachments[0].url;
    const imagePath = __dirname + '/cache/loz.png';

    // Fetch image data
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    fs.writeFileSync(imagePath, Buffer.from(response.data));

    // Change group image and clean up
    return api.changeGroupImage(fs.createReadStream(imagePath), event.threadID, () => fs.unlinkSync(imagePath), event.messageID);

  } catch (error) {
    api.sendMessage(`Error: ${error.message}`, event.threadID, event.messageID);
  }
};
