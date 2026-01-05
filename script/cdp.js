module.exports.config = {
  name: "cdp",
  version: "1.0.0",
  role: 0,
  hasPrefix: true,
  credits: "CHAND",
  description: "Get couple profile pictures",
  usage: "cdp",
  cooldown: 0,
};

module.exports.run = async function({ api, event, args }) {
  const axios = require("axios");
  const fs = require("fs-extra");

  try {
    // Fetch couple profile pictures
    const res = await axios.get(`https://api.erdwpe.com/api/randomgambar/couplepp`);
    const { male: img1, female: img2 } = res.data.result;

    // Download and save the images
    let imgs1 = (await axios.get(img1, { responseType: 'arraybuffer' })).data;
    let imgs2 = (await axios.get(img2, { responseType: 'arraybuffer' })).data;

    fs.writeFileSync(__dirname + "/cache/img1.png", imgs1);
    fs.writeFileSync(__dirname + "/cache/img2.png", imgs2);

    // Prepare images for sending
    let allImages = [
      fs.createReadStream(__dirname + "/cache/img1.png"),
      fs.createReadStream(__dirname + "/cache/img2.png")
    ];

    // Message body
    let msg = "Here is your couple DP";

    // Send message with images
    return api.sendMessage({
      body: msg,
      attachment: allImages
    }, event.threadID, event.messageID);

  } catch (error) {
    // Handle errors and send an error message
    return api.sendMessage(`Error in the cdp command: ${error.message}`, event.threadID, event.messageID);
  }
};
