module.exports.config = {
  name: "setallname",
  version: "1.0.0",
  role: 1,
  hasPrefix: true,
  credits: "CHAND",
  description: "Change nicknames of all participants in the thread to a custom name.",
  usage: "[text]",
  cooldown: 10,
};

module.exports.run = async function({ api, event, args }) {
  try {
    // Fetch thread information
    const threadInfo = await api.getThreadInfo(event.threadID);
    const participantIDs = threadInfo.participantIDs;

    // Combine arguments into a single name string
    const name = args.join(" ");

    if (!name) {
      return api.sendMessage("Please provide a name to set as the nickname.", event.threadID);
    }

    // Function to introduce delay
    function delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    };

    // Notify users that nicknames are being changed
    await api.sendMessage("Changing nicknames, please wait...", event.threadID);

    // Loop through participant IDs and change nicknames
    for (let participantID of participantIDs) {
      try {
        await delay(1000); // Wait for 3 seconds between changes
        await api.changeNickname(name, event.threadID, participantID);
      } catch (error) {
        console.error(`Error changing nickname for participant ${participantID}:`, error);
      }
    }

    // Notify users when all nicknames are changed
    await api.sendMessage("All nicknames have been updated successfully.", event.threadID);
  } catch (error) {
    console.error('Error executing command:', error);
    await api.sendMessage("An error occurred while processing your request.", event.threadID);
  }
};
