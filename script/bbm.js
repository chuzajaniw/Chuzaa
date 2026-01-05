const fs = require('fs-extra');
const request = require('request');

module.exports.config = {
  name: "bbm",
  version: "1.0.0",
  role: 0,
  hasPrefix: true,
  usage: '[text1 | text2]',
  description: 'Generate an image with text using memegen API',
  credits: 'CHAND',
  cooldown: 5
};

module.exports.run = async ({ api, event, args }) => {
  try {
    const { threadID, messageID } = event;
    let text = args.join(" ");

    if (!text.includes(' | ')) {
      return api.sendMessage('Please enter the correct format [text1 | text2]!', threadID, messageID);
    }

    const [text1, text2] = text.split(' | ').map(s => s.trim());

    if (!text1 || !text2) {
      return api.sendMessage('Please enter the correct format [text1 | text2]!', threadID, messageID);
    }

    const imageUrl = `http://fi3.bot-hosting.net:21943/api/maker/drake?text=${encodeURIComponent(text1)}&text2=${encodeURIComponent(text2)}`;

    const callback = () => {
      api.sendMessage({
        body: '',
        attachment: fs.createReadStream(__dirname + "/cache/poh.png")
      }, threadID, () => fs.unlinkSync(__dirname + "/cache/poh.png"), messageID);
    };

    request(imageUrl).pipe(fs.createWriteStream(__dirname + '/cache/poh.png')).on('close', callback);
  } catch (e) {
    api.sendMessage(`Error: ${e.message}`, event.threadID, event.messageID);
  }
};
