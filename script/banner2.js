const axios = require("axios");
const fs = require("fs-extra");
const qs = require("querystring");

module.exports.config = {
  name: "banner2",
  version: "1.0.0",
  role: 0,
  hasPrefix: true,
  description: "BANNER TEXT LOGO",
  usage: "BANNER TEXT",
  credits: "CHAND",
  cooldown: 0
};


module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;
  let text = args.join(" ");
  let params = { text };
  params = qs.stringify(params);

  api.sendMessage("Image initialization, please wait...", threadID, messageID);

  const pathsave = __dirname + "/cache/avtlolv2952.png";

  try {
    const response = await axios.get(`http://fi3.bot-hosting.net:21943/api/ephoto/lol2?text=${text}`, {
      responseType: "arraybuffer"
    });

    const imageBuffer = response.data;
    fs.writeFileSync(pathsave, Buffer.from(imageBuffer));

    api.sendMessage(
      {
        body: `[R05] - Module:  || Name: ....  || - Text: ${text}`,
        attachment: fs.createReadStream(pathsave)
      },
      threadID,
      () => fs.unlinkSync(pathsave),
      messageID
    );

  } catch (error) {
    let errMsg = error.response ? JSON.parse(error.response.data.toString()) : error;
    return api.sendMessage(`Error! An error occurred. Please try again later. ${errMsg.error || ""} ${errMsg.message || ""}`, threadID, messageID);
  }
};
