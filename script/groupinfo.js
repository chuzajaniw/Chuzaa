const fs = require("fs");
const request = require("request");

module.exports.config = {
  name: "groupinfo",
  version: "1.0.0",
  role: 0,
  hasPrefix: true,
  credits: "CHAND",
  description: "Get information about the thread",
  usages: "info",
  cooldowns: 0,
};

module.exports.run = async function({ api, event, args }) {
  try {
    // Get information about the thread (chat group)
    const threadInfo = await api.getThreadInfo(event.threadID);
    const totalMembers = threadInfo.participantIDs.length;
    const maleMembers = [];
    const femaleMembers = [];
    const unknownGenderMembers = [];

    // Classify members based on gender
    for (const userID in threadInfo.userInfo) {
      const userInfo = threadInfo.userInfo[userID];
      const { gender, name } = userInfo;

      if (gender === "MALE") {
        maleMembers.push(name);
      } else if (gender === "FEMALE") {
        femaleMembers.push(name);
      } else {
        unknownGenderMembers.push(name);
      }
    }

    const maleCount = maleMembers.length;
    const femaleCount = femaleMembers.length;
    const adminCount = threadInfo.adminIDs.length;
    const messageCount = threadInfo.messageCount;
    const emoji = threadInfo.emoji;
    const threadName = threadInfo.threadName;
    const threadID = threadInfo.threadID;
    const approvalMode = threadInfo.approvalMode;
    const approvalStatus = approvalMode ? 'on' : 'off';

    // Create a list of administrators
    let adminList = '';
    for (const admin of threadInfo.adminIDs) {
      const userInfo = await api.getUserInfo(admin.id);
      const adminName = userInfo[admin.id]?.name || "Unknown";
      adminList += `• ${adminName}\n`;
    }

    // Callback function to send the message with the image
    const sendMessageWithImage = () => {
      api.sendMessage({
        body: `Name: ${threadName}\nBox ID: ${threadID}\nApproval Mode: ${approvalStatus}\nEmoji: ${emoji}\nInfo: Includes ${totalMembers} members\nMale Members: ${maleCount}\nFemale Members: ${femaleCount}\nAdmins: ${adminCount}\n${adminList}\nTotal Messages: ${messageCount}`,
        attachment: fs.createReadStream(__dirname + '/cache/1.png')
      }, event.threadID, () => fs.unlinkSync(__dirname + '/cache/1.png'), event.messageID);
    };

    // Download the thread image and send the message
    request(encodeURI(threadInfo.imageSrc))
      .pipe(fs.createWriteStream(__dirname + '/cache/1.png'))
      .on('close', sendMessageWithImage);

  } catch (error) {
    // Handle errors and send an error message
    api.sendMessage(`Error in the info command: ${error.message}`, event.threadID, event.messageID);
  }
};
