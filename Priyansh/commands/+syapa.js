const fs = require("fs");
module.exports.config = {
	name: "rasgulaa",
		version: "1.0.1",
	hasPermssion: 0,
	credits: "𝙋𝙧𝙞𝙮𝙖𝙣𝙨𝙝 𝙍𝙖𝙟𝙥𝙪𝙩", 
	description: "hihihihi",
	commandCategory: "no prefix",
	usages: "barfi",
		cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("Syapa")==0 || event.body.indexOf("syapa")==0 || event.body.indexOf("♟️")==0 || event.body.indexOf("Rasgulle")==0) {
		var msg = {
				body: "𝗦𝗬𝗔𝗣𝗔 𝗢𝗪𝗡𝗘𝗥 𝗖𝗛𝗨𝗭𝗔 𝗞𝗘 𝗗𝗢𝗦𝗧 𝗛𝗔𝗜𝗡\n\n➜𝗙𝗥𝗜𝗘𝗡𝗗✪\n     *┏━━ೋ•  •ೋ━━┓*\n                𝐒𝐘𝐀𝐏𝐀\n    *┗━━ೋ•  •ೋ━━┛*\n\n✦𝐅𝐁 𝐋𝐢𝐧𝐤✦\n\nhttps://www.facebook.com/share/1BUFRGt14a/mibextid=ZbWKwL",
				attachment: 
fs.createReadStream(__dirname + `/noprefix/Shayan.jpg`)
			}
			api.sendMessage(msg, threadID, messageID);
		api.setMessageReaction("🧀", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

	}