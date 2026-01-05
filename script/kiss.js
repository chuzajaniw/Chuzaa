const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

module.exports.config = {
  name: "kiss",
  version: "1.0.0",
  role: 0,
  hasPrefix: true,
  credits: "CHAND",
  description: "kiss img",
  usage: "kiss mentioned",
  cooldown: 10,
};

module.exports.run = async({ api, event, Threads, global }) => {
  const links = [
    "https://i.imgur.com/sF5d0M8.gif", "https://i.imgur.com/P5dtRzS.gif",
    "https://i.imgur.com/fhdFvIK.gif", "https://i.imgur.com/omqj36f.gif",
    "https://i.imgur.com/brC8WQR.gif", "https://i.imgur.com/auZObCS.gif",
    "https://i.imgur.com/BngVj10.gif", "https://i.imgur.com/5KVoVyC.gif",
    "https://i.imgur.com/fhdFvIK.gif"
  ];

  const mentionIds = Object.keys(event.mentions);
  if (mentionIds.length === 0) {
    return api.sendMessage("Please tag someone 💉", event.threadID);
  }

  const mentionId = mentionIds[0];
  const mentionName = event.mentions[mentionId].replace("@", "");

  const selectedGif = links[Math.floor(Math.random() * links.length)];
  const gifPath = path.join(__dirname, "cache", "spair.gif");

  try {
    // Download the GIF
    const response = await axios({
      method: 'get',
      url: selectedGif,
      responseType: 'stream'
    });
    response.data.pipe(fs.createWriteStream(gifPath)).on('finish', () => {
      // Send the GIF message
      api.sendMessage({
        body: `✦❥⋆⃝ ${mentionName} ✦\n♡𝐌𝐮𝐮𝐮𝐮𝐚𝐚𝐚𝐡𝐡 𝐁𝐚𝐛𝐞 😘🤩😘`,
        mentions: [{ tag: mentionName, id: mentionId }],
        attachment: fs.createReadStream(gifPath)
      }, event.threadID, () => {
        // Clean up the file after sending
        fs.unlinkSync(gifPath);
      });
    });
  } catch (error) {
    console.error('Error handling GIF request:', error);
    api.sendMessage("An error occurred while processing the request.", event.threadID);
  }
};
