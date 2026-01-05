const axios = require("axios");

module.exports.config = {
  name: "count",
  version: "1.0.2", // Updated version
  role: 0,
  credits: "CHAND",
  description: "Count all members in the group chat",
  commandCategory: "Group Chat",
  usages: "count",
  cooldowns: 0,
  hasPrefix: true
};

module.exports.run = async function({ api, event, args }) {
  try {
    // Get the current group chat information
    const groupInfo = await api.getThreadInfo(event.threadID);

    if (!groupInfo || !groupInfo.participantIDs) {
      return api.sendMessage('Invalid group chat or unable to retrieve member information. Please try again later.', event.threadID);
    }

    // Count the number of members in the group chat
    const memberCount = groupInfo.participantIDs.length;

    // Get the names of all members in the group chat
    const memberNames = [];

    // Using Promise.all to fetch user info concurrently
    const userInfoPromises = groupInfo.participantIDs.map(participantID => 
      api.getUserInfo(participantID)
        .then(userInfo => {
          if (userInfo[participantID]) {
            memberNames.push(userInfo[participantID].name);
          }
        })
        .catch(error => {
          console.error(`Error fetching user info for ID ${participantID}:`, error);
        })
    );

    // Wait for all user info promises to resolve
    await Promise.all(userInfoPromises);

    // Prepare the message
    let message = `Member Count: ${memberCount}\n`;
    message += memberNames.join("\n");

    // Optionally, include the group's name and picture
    if (groupInfo.threadName) {
      message = `Group Name: ${groupInfo.threadName}\n\n${message}`;
    }

    // Check if group picture is available and send it
    if (groupInfo.cover && groupInfo.cover.source) {
      await api.sendMessage({
        attachment: groupInfo.cover.source,
        type: "image"
      }, event.threadID);
    }

    // Send the member names and other info
    await api.sendMessage(message, event.threadID);
  } catch (error) {
    console.error("Error counting group chat members:", error);
    await api.sendMessage('An error occurred while counting the group chat members. Please try again later.', event.threadID);
  }
};
