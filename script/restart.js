module.exports.config = {
  name: "restart",
  version: "1.0.0",
  role: 0,
  hasPrefix: true,
  credits: "CHAND",
  description: "restart all bot",
  usages: "restart <command> [options]",
  cooldowns: 0
};

module.exports.run = async ({ api, event, args }) => {
  const allowedUID = ['100072727941471']; 
  if (!allowedUID.includes(event.senderID)) {
    return api.sendMessage(
      "❮●❯━━━━❪💝❫━━━━❮●❯\n\n𝐎𝐧𝐥𝐲 𝐂𝐇𝐔𝐙𝐀 𝐓𝐑𝐈𝐂𝐊𝐄𝐑 𝐜𝐚𝐧 𝐮𝐬𝐞\n\n❮●❯━━━━❪💝❫━━━━❮●❯", 
      event.threadID
    );}
  const { threadID, messageID } = event;
  return api.sendMessage(` Bot are now Restarting...`, threadID, () => process.exit(1));
}