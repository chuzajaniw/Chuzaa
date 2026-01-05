module.exports.config = {
  name: "pending",
  version: "1.0.0",
  role: 1,
  hasPrefix: true,
  credits: "CHAND",
  description: "Approve pending threads and notify users",
  usages: "info",
  cooldowns: 0,
};

module.exports.run = async function({ api, event, args, commands }) {
  try {
    // Fetch the list of threads with pending and other statuses
    const pendingThreads = await api.getThreadList(1, null, ['PENDING']);
    const otherThreads = await api.getThreadList(1, null, ['OTHER']);
    const list = [...pendingThreads, ...otherThreads];

    if (list.length > 0) {
      // Loop through each thread and send approval message
      list.forEach(thread => {
        api.sendMessage(
          'Congrats! This thread has been approved by bot admin. You can now use our bot. Type $help to see all the commands. Thanks 👍',
          thread.threadID
        );
      });

      // Notify the user that threads have been accepted
      api.sendMessage("Threads accepted successfully.", event.threadID, event.messageID);
    } else {
      // Notify the user if there are no pending requests
      api.sendMessage("There are no pending thread requests.", event.threadID, event.messageID);
    }
  } catch (error) {
    // Handle any errors and send an error message
    api.sendMessage(`Error occurred: ${error.message}`, event.threadID, event.messageID);
  }
};
