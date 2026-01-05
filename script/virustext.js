module.exports.config = {
  name: "zalgo",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "CHAND",
  description: "Converts your text to Zalgo",
  commandCategory: "Change font",
  usages: "zalgo <text>",
  cooldowns: 5,
  depndencies: {
    "to-zalgo":""
    }
};

module.exports.run = ({ api, event, args }) => {
  const Zalgo = require("to-zalgo");
  return api.sendMessage(Zalgo(args.join(" ")), event.threadID, event.messageID);
}