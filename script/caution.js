module.exports.config = {
  name: "caution",
  version: "1.0.0",
  role: 0,
  hasPrefix: true,
  credits: "CHAND",
  description: "Apply a blur effect to avatars",
  usage: "[text1 | text2 | text3]",
  cooldown: 10,
};

module.exports.run = async ({ api, event, args }) => {
  const fs = require("fs-extra"); // Use 'require' for importing modules
  const request = require("request"); // Use 'require' for importing modules

  const { threadID, messageID, senderID } = event;
  let juswa = args.join(" ").replace(/,/g, ' ').trim(); // Adjust text formatting

  if (!juswa) {
    return api.sendMessage("Add text lmao", threadID, messageID);
  }

  try {
    const callback = () => api.sendMessage(
      { body: ``, attachment: fs.createReadStream(__dirname + "/cache/biden.png") },
      threadID,
      () => fs.unlinkSync(__dirname + "/cache/biden.png"),
      messageID
    );

    return request(encodeURI(`http://fi3.bot-hosting.net:21943/api/maker/caution?text=${juswa}`))
      .pipe(fs.createWriteStream(__dirname + '/cache/biden.png'))
      .on('close', () => callback());

  } catch (error) {
    return api.sendMessage(`Error in the blur command: ${error.message}`, threadID, messageID);
  }
};
