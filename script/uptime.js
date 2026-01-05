module.exports.config = {
  name: "uptime",
  version: "1.0.0",
  role: 0,
  hasPrefix: true,
  credits: "CHAND",
  description: "Display bot uptime",
  usage: "[text]",
  cooldown: 10,
};

module.exports.run = async function({ api, event }) {
  try {
    const time = process.uptime();
    const hours = Math.floor(time / (60 * 60));
    const minutes = Math.floor((time % (60 * 60)) / 60);
    const seconds = Math.floor(time % 60);

    const moment = require("moment-timezone");
    const currentTime = moment.tz("Asia/karachi").format("『D/MM/YYYY』 【HH:mm:ss】");

    const message = `🧡 BOT INFORMATION 🧡
💌Bot is running💌: ${hours}:${minutes}:${seconds}`;

    api.sendMessage(message, event.threadID, event.messageID);

  } catch (error) {
    api.sendMessage(error.message, event.threadID, event.messageID);
  }
};
