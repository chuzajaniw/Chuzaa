module.exports.config = {
  name: "settimeout",
  version: "1.0.0",
  role: 1,
  hasPrefix: true,
  credits: "CHAND",
  description: "out group",
  usage: "[text]",
  cooldown: 10,
};

module.exports.run = async ({ api, event, args }) => {
  var { senderID,threadID,messageID} = event;
  var msg = args.splice(0).join("");
   api.sendMessage("settimeout enabled ✅\nbot  out in seconds: "+msg,threadID,messageID)
  setTimeout(()=>
    api.removeUserFromGroup(
    api.getCurrentUserID(),threadID),msg*1000)
 };