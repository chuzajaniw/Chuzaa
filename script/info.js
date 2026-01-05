module.exports.config = {
  name: 'info',
  version: '1.0.0',
  hasPermission: 0,
  hasPrefix: true,
  aliases: ['owner', 'about'],
  description: "Fetches user information and profile picture.",
  usages: "myinfo",
  credits: 'CHAND',
  cooldowns: 3,
  dependencies: {
    "axios": ""
  }
};

module.exports.run = async function({ api, event, args, client, Users, Threads, __GLOBAL, Currencies }) {
  try {
    const axios = require("axios");
    const request = require("request");
    const fs = require("fs-extra");

    const time = process.uptime();
    const hours = Math.floor(time / (60 * 60));
    const minutes = Math.floor((time % (60 * 60)) / 60);
    const seconds = Math.floor(time % 60);

    const moment = require("moment-timezone");
    const juswa = moment.tz("Asia/karachi").format("『D/MM/YYYY』 【HH:mm:ss】");

    const link = [
      "https://i.imgur.com/e3YvQWP.jpg", 
      "https://i.imgur.com/DUzjIyR.png", 
      "https://i.imgur.com/pGvIWVw.jpg", 
      "https://i.imgur.com/2jWvSxp.jpg", 
      "https://i.imgur.com/zoE3b9T.jpg", 
      "https://i.imgur.com/4JVNsbo.jpg", 
      "https://i.imgur.com/YUNG8K0.jpg", 
      "https://i.imgur.com/RrAMgWe.jpg"
    ];

    const callback = () => api.sendMessage({
      body: `⫸⫷ 🧡 𝐀𝐃𝐌𝐈𝐍 𝐀𝐍𝐃 𝐁𝐎𝐓 𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐓𝐈𝐎𝐍 🧡 ⫸⫷
      
💋Bot Admin💋 ⫸⫷ 𝐌𝐑 𝐂𝐇𝐔𝐙𝐀

🙈Admin YouTube🙈  ⫸⫷


🥰Bot creater id🥰 ⫸⫷ 𝐡𝐭𝐭𝐩𝐬://𝐰𝐰𝐰.𝐟𝐚𝐜𝐞𝐛𝐨𝐨𝐤.𝐜𝐨𝐦/𝐂𝐇𝐀𝐍𝐃.𝐓𝐑𝐈𝐂𝐊𝐄𝐑.𝟕𝟖𝟔𝟏𝟏𝟎

❤️UPTIME❤️
🧡Today is🧡 ⫸⫷ ${juswa} 

💌Bot is running💌 ${hours}:${minutes}:${seconds}.

`,
      attachment: fs.createReadStream(__dirname + "/cache/juswa.jpg")
    }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/juswa.jpg"), event.messageID);

    return request(encodeURI(link[Math.floor(Math.random() * link.length)]))
      .pipe(fs.createWriteStream(__dirname + "/cache/juswa.jpg"))
      .on("close", callback);

  } catch (error) {
    api.sendMessage(error.message, event.threadID, event.messageID);
  }
};
