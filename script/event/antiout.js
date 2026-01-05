module.exports.config = {
  name: "antiout",
  version: "1.0.0"
};

module.exports.handleEvent = async ({ event, api }) => {
  const currentUserId = api.getCurrentUserID();
  const leftUserId = event.logMessageData?.leftParticipantFbId;

  if (leftUserId === currentUserId) return; // Ignore if the bot leaves

  if (leftUserId) {
    try {
      const info = await api.getUserInfo(leftUserId);
      const { name } = info[leftUserId];

      await api.addUserToGroup(leftUserId, event.threadID);
      api.sendMessage(`Welcome back bhag k nai jane ka ghaseet k wapis lauga, ${name}!`, event.threadID);
    } catch (error) {
      console.error('Error adding user back to group:', error);
      api.sendMessage(`Failed to add ${name} back to the group.`, event.threadID);
    }
  }
};
