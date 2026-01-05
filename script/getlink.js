module.exports.config = {
  name: "getlink",
  version: "1.0.0",
  role: 0,
  hasPrefix: true,
  credits: "CHAND",
  description: "Extract and send the URL of an image or video from a replied message.",
  usages: "getlink <reply with image or video>",
  cooldowns: 0,
};

module.exports.run = async function ({ api, event, getText }) {
  const { messageReply } = event;

  // Check if the event is a reply and contains an attachment
  if (event.type !== "message_reply" || !messageReply.attachments || messageReply.attachments.length !== 1) {
      const errorMessage = getText ? getText("invalidFormat") : "please reply with audio , image or video";
      return api.sendMessage(errorMessage, event.threadID, event.messageID);
  }

  // Extract the URL of the attachment and send it as a message
  const attachmentUrl = messageReply.attachments[0].url;
  return api.sendMessage(attachmentUrl, event.threadID, event.messageID);
};
