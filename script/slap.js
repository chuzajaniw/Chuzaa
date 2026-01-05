const fs = require('fs');
const request = require('request');

module.exports.config = {
  name: "slap",
  version: "1.0.0",
  hasPermission: 0,
  credits: "CHAND",
  description: "Send a slap gif with a custom message.",
  commandCategory: "Fun",
  usages: "<mention>",
  cooldowns: 5,
};

module.exports.run = async({ api, event }) => {
  const link = "https://i.postimg.cc/1tByLBHM/anime-slap.gif";
  const mentions = event.mentions;

  // Check if any user is mentioned
  if (Object.keys(mentions).length === 0) {
    return api.sendMessage("Mention 1 person that you want to slap", event.threadID);
  }

  // Extract the first mention
  const firstMentionID = Object.keys(mentions)[0];
  const firstMention = mentions[firstMentionID];
  const tag = firstMention.replace("@", "");

  // Prepare the callback function to send the message
  const callback = () => {
    api.sendMessage({
      body: `Slapped ${tag}!\n\n*sorry, I thought there was a mosquito on your face*`,
      mentions: [{ tag: tag, id: firstMentionID }],
      attachment: fs.createReadStream(__dirname + "/cache/slap.gif")
    }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/slap.gif"));
  };

  // Download the gif and send the message
  request(encodeURI(link)).pipe(fs.createWriteStream(__dirname + "/cache/slap.gif")).on("close", () => callback());
};
