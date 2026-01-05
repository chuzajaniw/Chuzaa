module.exports.config = {
  name: "ping",
  version: "1.0.0",
  role: 1,
  hasPrefix: true,
  credits: "CHAND",
  description: "Ping all members in the group chat",
  usage: "[text]",
  cooldown: 10,
};

module.exports.run = async function({ api, event, args, Threads }) {
  try {
    // Fetch the thread info
    const threadInfo = await api.getThreadInfo(event.threadID);
    const allParticipants = threadInfo.participantIDs;
    const currentUserID = api.getCurrentUserID();
    const senderID = event.senderID;

    // Remove bot and sender from the list
    const mentionList = allParticipants.filter(id => id !== currentUserID && id !== senderID);

    // Construct the message
    const body = args.length ? args.join(" ") : "Admin mentioned you";

    // Create mentions array
    const mentions = mentionList.map((id, index) => ({
      tag: body.charAt(index % body.length),
      id: id
    }));

    // Send the message
    return api.sendMessage({ body: `${body}`, mentions }, event.threadID, event.messageID);

  } catch (error) {
    api.sendMessage(`Error in the ping command: ${error.message}`, event.threadID, event.messageID);
  }
};
