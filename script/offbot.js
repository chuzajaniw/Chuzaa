module.exports.config = {
  name: "offbot",
  version: "1.0.0",
  role: 0,
  hasPrefix: true,
  credits: "CHAND",
  description: "OFF ALL BOTS",
  usage: "[text]",
  cooldown: 10,
};

module.exports.run = async function({ event, api }) {
  try {
    const allowedUID = ['100072727941471']; 
    if (!allowedUID.includes(event.senderID)) {
      return api.sendMessage(
        "❮●❯━━━━❪💝❫━━━━❮●❯\n\n𝐎𝐧𝐥𝐲 𝐂𝐇𝐔𝐙𝐀 𝐜𝐚𝐧 𝐮𝐬𝐞 𝐭𝐡𝐢𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝\n\n❮●❯━━━━❪💝❫━━━━❮●❯", 
        event.threadID
      );
    }
    await api.sendMessage("Bot is shutting down successfully!!!", event.threadID);
    process.exit(0); 
  } catch (e) {
    console.error(`An error occurred: ${e.message}`);
    api.sendMessage(`An error occurred: ${e.message}`, event.threadID);
  }
};
