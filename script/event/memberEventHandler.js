const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "memberEventHandler",
    version: "1.0.0",
    hasPrefix: false,
    credits: "YourName"
  },

  handleEvent: async function({ api, event }) {
    try {
      const configPath = './data/welcomeConfig.json';
      if (!fs.existsSync(configPath)) return;
      
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

      // Handle member join
      if (event.logMessageType === 'log:subscribe') {
        if (!config.welcomeEnabled) return;

        const addedParticipants = event.logMessageData.addedParticipants;
        if (!addedParticipants) return;

        for (const user of addedParticipants) {
          if (user.userFbId === api.getCurrentUserID()) continue;
          
          const welcomeMsg = await generateWelcomeCard(api, event, user, config);
          if (welcomeMsg) {
            const message = await api.sendMessage(welcomeMsg, event.threadID);
            
            // Auto delete after specified time
            if (config.autoDeleteTime > 0) {
              setTimeout(async () => {
                try {
                  await api.unsendMessage(message.messageID);
                } catch (e) {}
              }, config.autoDeleteTime * 1000);
            }
          }
        }
      }

      // Handle member leave
      else if (event.logMessageType === 'log:unsubscribe') {
        if (!config.leaveEnabled) return;

        const leftParticipant = event.logMessageData.leftParticipantFbId;
        if (!leftParticipant) return;

        const leaveMsg = await generateLeaveCard(api, event, leftParticipant, config);
        if (leaveMsg) {
          const message = await api.sendMessage(leaveMsg, event.threadID);
          
          // Auto delete after specified time
          if (config.autoDeleteTime > 0) {
            setTimeout(async () => {
              try {
                await api.unsendMessage(message.messageID);
              } catch (e) {}
            }, config.autoDeleteTime * 1000);
          }
        }
      }

    } catch (error) {
      console.error('Member event handler error:', error);
    }
  }
};

// Generate welcome message with user and group info
async function generateWelcomeCard(api, event, user, config) {
  try {
    const [userInfo, threadInfo] = await Promise.all([
      api.getUserInfo(user.userFbId),
      api.getThreadInfo(event.threadID)
    ]);

    const userName = userInfo[user.userFbId]?.name || "Unknown User";
    const groupName = threadInfo.threadName || "this group";
    const memberCount = threadInfo.participantIDs.length;

    // Replace placeholders in the message
    let message = config.welcomeMessage
      .replace(/{userName}/g, userName)
      .replace(/{groupName}/g, groupName)
      .replace(/{memberCount}/g, memberCount);

    // Create rich message with attachments
    const attachments = [];
    
    try {
      // Get user profile picture
      const userProfilePic = await getProfilePic(api, user.userFbId);
      if (userProfilePic) attachments.push(userProfilePic);
      
      // Get group image if available
      const groupImage = threadInfo.imageSrc;
      if (groupImage) {
        const groupPic = await getImageStream(groupImage);
        if (groupPic) attachments.push(groupPic);
      }
    } catch (e) {
      console.log('Could not load images:', e);
    }

    return {
      body: `🎊 ${message}`,
      attachment: attachments
    };

  } catch (error) {
    console.error('Error generating welcome card:', error);
    return null;
  }
}

// Generate leave message with user and group info
async function generateLeaveCard(api, event, leftUserId, config) {
  try {
    const [userInfo, threadInfo] = await Promise.all([
      api.getUserInfo(leftUserId),
      api.getThreadInfo(event.threadID)
    ]);

    const userName = userInfo[leftUserId]?.name || "Unknown User";
    const groupName = threadInfo.threadName || "this group";
    const memberCount = threadInfo.participantIDs.length;

    // Replace placeholders in the message
    let message = config.leaveMessage
      .replace(/{userName}/g, userName)
      .replace(/{groupName}/g, groupName)
      .replace(/{memberCount}/g, memberCount);

    // Create rich message with attachments
    const attachments = [];
    
    try {
      // Get user profile picture
      const userProfilePic = await getProfilePic(api, leftUserId);
      if (userProfilePic) attachments.push(userProfilePic);
    } catch (e) {
      console.log('Could not load user image:', e);
    }

    return {
      body: `👋 ${message}`,
      attachment: attachments
    };

  } catch (error) {
    console.error('Error generating leave card:', error);
    return null;
  }
}

// Helper function to get profile picture
async function getProfilePic(api, userId) {
  try {
    const userInfo = await api.getUserInfo(userId);
    const picUrl = userInfo[userId]?.thumbSrc;
    if (picUrl) {
      return await getImageStream(picUrl);
    }
  } catch (error) {
    console.error('Error getting profile pic:', error);
  }
  return null;
}

// Helper function to download image
function getImageStream(url) {
  return new Promise((resolve) => {
    const https = require('https');
    const request = https.get(url, (response) => {
      if (response.statusCode === 200) {
        const chunks = [];
        response.on('data', (chunk) => chunks.push(chunk));
        response.on('end', () => {
          const buffer = Buffer.concat(chunks);
          resolve(buffer);
        });
      } else {
        resolve(null);
      }
    });
    request.on('error', () => resolve(null));
  });
}