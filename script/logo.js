const axios = require("axios");
const request = require("request");
const fs = require("fs-extra");

module.exports.config = {
  name: "logo",
  version: "1.0.0",
  role: 0,
  hasPrefix: true,
  description: "Get logo",
  usage: "logo <number> name",
  credits: "CHAND",
  cooldown: 0
};

module.exports.run = async function ({ api, event, args, Users }) {
  let { messageID, senderID, threadID } = event;

  if (args.length === 1 && args[0] === "list") {
    const logoTypes = [
      "★★★★★★★★★★\n★★★★★★★★★★"
    ];
    return api.sendMessage(`\n\n${logoTypes.join(", ")}`, threadID, messageID);
  }

  if (args.length < 2) {
    return api.sendMessage("●❯────────────❮●   \n●❯────────────❮●", threadID, messageID);
  }

  let type = args[0].toLowerCase();
  let name = args[1];
  let name2 = args.slice(2).join(" ");
  let pathImg = __dirname + `/cache/${type}_${name}.png`;
  let apiUrl, message;

  switch (type) {
      case "1":
          apiUrl = `http://fi3.bot-hosting.net:21943/api/ephoto/1?text=${name}`;
          message = "❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜\n𝐋𝐎𝐆𝐎 𝐇𝐄𝐑𝐄 🪽\n❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜";
          break;
      case "2":
          apiUrl = `http://fi3.bot-hosting.net:21943/api/ephoto/2?text=${name}`;
          message = "❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜\n𝐋𝐎𝐆𝐎 𝐇𝐄𝐑𝐄 2 🪽\n❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜";
          break;
      case "3":
          apiUrl = `http://fi3.bot-hosting.net:21943/api/ephoto/3?text=${name}`;
          message = "❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜\n𝐋𝐎𝐆𝐎 𝐇𝐄𝐑𝐄 3 🪽\n❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜";
          break;
      case "4":
          apiUrl = `http://fi3.bot-hosting.net:21943/api/ephoto/4?text=${name}`;
          message = "❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜\n𝐋𝐎𝐆𝐎 𝐇𝐄𝐑𝐄 4 🪽\n❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜";
          break;
      case "5":
          apiUrl = `http://fi3.bot-hosting.net:21943/api/ephoto/5?text=${name}`;
          message = "❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜\n𝐋𝐎𝐆𝐎 𝐇𝐄𝐑𝐄 5 🪽\n❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜";
          break;
      case "6":
          apiUrl = `http://fi3.bot-hosting.net:21943/api/ephoto/6?text=${name}`;
          message = "❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜\n𝐋𝐎𝐆𝐎 𝐇𝐄𝐑𝐄 6 🪽\n❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜";
          break;
      case "7":
          apiUrl = `http://fi3.bot-hosting.net:21943/api/ephoto/7?text=${name}`;
          message = "❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜\n𝐋𝐎𝐆𝐎 𝐇𝐄𝐑𝐄 7 🪽\n❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜";
          break;
      case "8":
          apiUrl = `http://fi3.bot-hosting.net:21943/api/ephoto/8?text=${name}`;
          message = "❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜\n𝐋𝐎𝐆𝐎 𝐇𝐄𝐑𝐄 8 🪽\n❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜";
          break;
      case "9":
          apiUrl = `http://fi3.bot-hosting.net:21943/api/ephoto/9?text=${name}`;
          message = "❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜\n𝐋𝐎𝐆𝐎 𝐇𝐄𝐑𝐄 9 🪽\n❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜";
          break;
      case "10":
          apiUrl = `http://fi3.bot-hosting.net:21943/api/ephoto/10?text=${name}`;
          message = "❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜\n𝐋𝐎𝐆𝐎 𝐇𝐄𝐑𝐄 10 🪽\n❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜";
          break;
      case "11":
          apiUrl = `http://fi3.bot-hosting.net:21943/api/ephoto/11?text=${name}`;
          message = "❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜\n𝐋𝐎𝐆𝐎 𝐇𝐄𝐑𝐄 11 🪽\n❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜";
          break;
      case "12":
          apiUrl = `http://fi3.bot-hosting.net:21943/api/ephoto/12?text=${name}`;
          message = "❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜\n𝐋𝐎𝐆𝐎 𝐇𝐄𝐑𝐄 12 🪽\n❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜";
          break;
      case "13":
          apiUrl = `http://fi3.bot-hosting.net:21943/api/ephoto/13?text=${name}`;
          message = "❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜\n𝐋𝐎𝐆𝐎 𝐇𝐄𝐑𝐄 13 🪽\n❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜";
          break;
      case "14":
          apiUrl = `http://fi3.bot-hosting.net:21943/api/ephoto/14?text=${name}`;
          message = "❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜\n𝐋𝐎𝐆𝐎 𝐇𝐄𝐑𝐄 14 🪽\n❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜";
          break;
      case "15":
          apiUrl = `http://fi3.bot-hosting.net:21943/api/ephoto/15?text=${name}`;
          message = "❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜\n𝐋𝐎𝐆𝐎 𝐇𝐄𝐑𝐄 15 🪽\n❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜";
          break;
      case "16":
          apiUrl = `http://fi3.bot-hosting.net:21943/api/ephoto/16?text=${name}`;
          message = "❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜\n𝐋𝐎𝐆𝐎 𝐇𝐄𝐑𝐄 16 🪽\n❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜";
          break;
      case "17":
          apiUrl = `http://fi3.bot-hosting.net:21943/api/ephoto/17?text=${name}`;
          message = "❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜\n𝐋𝐎𝐆𝐎 𝐇𝐄𝐑𝐄 17 🪽\n❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜";
          break;
      case "18":
          apiUrl = `http://fi3.bot-hosting.net:21943/api/ephoto/18?text=${name}`;
          message = "❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜\n𝐋𝐎𝐆𝐎 𝐇𝐄𝐑𝐄 18 🪽\n❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜";
          break;
      case "19":
          apiUrl = `http://fi3.bot-hosting.net:21943/api/ephoto/19?text=${name}`;
          message = "❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜\n𝐋𝐎𝐆𝐎 𝐇𝐄𝐑𝐄 19 🪽\n❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜";
          break;
      case "20":
      apiUrl = `http://fi3.bot-hosting.net:21943/api/ephoto/20?text=${name}`;
      message = "❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜\n𝐋𝐎𝐆𝐎 𝐇𝐄𝐑𝐄 19 🪽\n❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜";
      break;
      case "21":
      apiUrl = `http://fi3.bot-hosting.net:21943/api/ephoto/21?text=${name}`;
      message = "❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜\n𝐋𝐎𝐆𝐎 𝐇𝐄𝐑𝐄 19 🪽\n❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜";
      break;
      case "22":
          apiUrl = `http://fi3.bot-hosting.net:21943/api/ephoto/22?text=${name}`;
          message = "❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜\n𝐋𝐎𝐆𝐎 𝐇𝐄𝐑𝐄 22 🪽\n❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜";
          break;
      case "23":
          apiUrl = `http://fi3.bot-hosting.net:21943/api/ephoto/23?text=${name}`;
          message = "❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜\n𝐋𝐎𝐆𝐎 𝐇𝐄𝐑𝐄 23 🪽\n❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜";
          break;
      case "24":
          apiUrl = `http://fi3.bot-hosting.net:21943/api/ephoto/24?text=${name}`;
          message = "❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜\n𝐋𝐎𝐆𝐎 𝐇𝐄𝐑𝐄 24 🪽\n❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜";
          break;
      case "25":
          apiUrl = `http://fi3.bot-hosting.net:21943/api/ephoto/25?text=${name}`;
          message = "❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜\n𝐋𝐎𝐆𝐎 𝐇𝐄𝐑𝐄 25 🪽\n❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜";
          break;
      case "26":
          apiUrl = `http://fi3.bot-hosting.net:21943/api/ephoto/26?text=${name}`;
          message = "❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜\n𝐋𝐎𝐆𝐎 𝐇𝐄𝐑𝐄 26 🪽\n❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜";
          break;
      case "27":
          apiUrl = `http://fi3.bot-hosting.net:21943/api/ephoto/27?text=${name}`;
          message = "❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜\n𝐋𝐎𝐆𝐎 𝐇𝐄𝐑𝐄 27 🪽\n❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜";
          break;
      case "28":
          apiUrl = `http://fi3.bot-hosting.net:21943/api/ephoto/28?text=${name}`;
          message = "❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜\n𝐋𝐎𝐆𝐎 𝐇𝐄𝐑𝐄 28 🪽\n❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜";
          break;
      case "29":
          apiUrl = `http://fi3.bot-hosting.net:21943/api/ephoto/29?text=${name}`;
          message = "❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜\n𝐋𝐎𝐆𝐎 𝐇𝐄𝐑𝐄 29 🪽\n❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜";
          break;
      case "30":
          apiUrl = `http://fi3.bot-hosting.net:21943/api/ephoto/30?text=${name}`;
          message = "❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜\n𝐋𝐎𝐆𝐎 𝐇𝐄𝐑𝐄 30 🪽\n❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜";
          break;
      case "31":
          apiUrl = `http://fi3.bot-hosting.net:21943/api/ephoto/31?text=${name}`;
          message = "❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜\n𝐋𝐎𝐆𝐎 𝐇𝐄𝐑𝐄 31 🪽\n❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜";
          break;
      case "32":
          apiUrl = `http://fi3.bot-hosting.net:21943/api/ephoto/32?text=${name}`;
          message = "❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜\n𝐋𝐎𝐆𝐎 𝐇𝐄𝐑𝐄 32 🪽\n❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜";
          break;
      case "33":
          apiUrl = `http://fi3.bot-hosting.net:21943/api/ephoto/33?text=${name}`;
          message = "❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜\n𝐋𝐎𝐆𝐎 𝐇𝐄𝐑𝐄 33 🪽\n❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜";
          break;
      case "34":
          apiUrl = `http://fi3.bot-hosting.net:21943/api/ephoto/34?text=${name}`;
          message = "❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜\n𝐋𝐎𝐆𝐎 𝐇𝐄𝐑𝐄 34 🪽\n❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜";
          break;
      case "35":
          apiUrl = `http://fi3.bot-hosting.net:21943/api/ephoto/35?text=${name}`;
          message = "❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜\n𝐋𝐎𝐆𝐎 𝐇𝐄𝐑𝐄 35 🪽\n❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜";
          break;
      case "36":
          apiUrl = `http://fi3.bot-hosting.net:21943/api/ephoto/36?text=${name}`;
          message = "❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜\n𝐋𝐎𝐆𝐎 𝐇𝐄𝐑𝐄 36 🪽\n❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜";
          break;
      case "37":
          apiUrl = `http://fi3.bot-hosting.net:21943/api/ephoto/37?text=${name}`;
          message = "❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜\n𝐋𝐎𝐆𝐎 𝐇𝐄𝐑𝐄 37 🪽\n❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜";
          break;
      case "38":
          apiUrl = `http://fi3.bot-hosting.net:21943/api/ephoto/38?text=${name}`;
          message = "❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜\n𝐋𝐎𝐆𝐎 𝐇𝐄𝐑𝐄 38 🪽\n❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜";
          break;
      case "39":
          apiUrl = `http://fi3.bot-hosting.net:21943/api/ephoto/39?text=${name}`;
          message = "❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜\n𝐋𝐎𝐆𝐎 𝐇𝐄𝐑𝐄 39 🪽\n❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜";
          break;
      case "40":
          apiUrl = `http://fi3.bot-hosting.net:21943/api/ephoto/40?text=${name}`;
          message = "❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜\n𝐋𝐎𝐆𝐎 𝐇𝐄𝐑𝐄 40 🪽\n❛ ━━━━･❪ 🕊 ❫ ･━━━━ ❜";
          break;
    default:
      return api.sendMessage(`●❯────────────❮●   𝗪𝗿𝗼𝗻𝗴 𝗨𝘀𝗲𝗱 ➺   \n●❯────────────❮●`, threadID, messageID);
  }

  api.sendMessage("࿇ ══━━━✥◈✥━━━══ ࿇\n➙ 𝐆𝐞𝐧𝐞𝐫𝐚𝐭𝐢𝐧𝐠 𝐀 𝐋𝐨𝐠𝐨 : ❝𝐏𝐥𝐞𝐚𝐬𝐞 𝐖𝐚𝐢𝐭 ❞,\n࿇ ══━━━✥◈✥━━━══ ࿇", threadID, messageID);

  try {
    let response = await axios.get(apiUrl, { responseType: "arraybuffer" });
    let logo = response.data;
    fs.writeFileSync(pathImg, Buffer.from(logo, "utf-8"));

    return api.sendMessage(
      {
        body: message,
        attachment: fs.createReadStream(pathImg),
      },
      threadID,
      () => fs.unlinkSync(pathImg),
      messageID
    );
  } catch (error) {
    return api.sendMessage(`⚠️ Error occurred: ${error.message}`, threadID, messageID);
  }
};
