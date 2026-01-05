module.exports.config = {
  name: "time",
  version: "1.0.0",
  role: 0,
  hasPrefix: true,
  credits: "CHAND",
  description: "Display current time in multiple timezones",
  usage: "",
  cooldown: 10,
};

module.exports.run = async function({ api, event }) {
  try {
    // Define timezones
    const timezones = ["Asia/Karachi", "America/New_York", "asia/kolkata", "Asia/Dhaka"];

    // Import moment-timezone
    const moment = require("moment-timezone");

    // Create messages for each timezone
    let messages = timezones.map(tz => {
      const currentTime = moment.tz(tz).format("DD/MM/YYYY [at] HH:mm:ss");
      return `🕰️𝐓𝐢𝐦𝐞𝐳𝐨𝐧𝐞: ${tz}\n📅 𝐃𝐚𝐭𝐞 𝐚𝐧𝐝 𝐓𝐢𝐦𝐞: ${currentTime}`;
    });

    // Join messages with new lines
    const message = `✅ 𝐓𝐈𝐌𝐄 𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐓𝐈𝐎𝐍 🧡\n\n${messages.join('\n\n')}`;

    // Send the message
    api.sendMessage(message, event.threadID, event.messageID);

  } catch (error) {
    // Send error message if something goes wrong
    api.sendMessage(`⚠️ Error: ${error.message}`, event.threadID, event.messageID);
  }
};
