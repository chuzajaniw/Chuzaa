const fs = require('fs');
const path = require('path');

module.exports.config = {
  name: "owner",
  role: 0,
  version: "2.0.0",
  hasPrefix: false, // No prefix needed
  aliases: ["admin", "creator", "dev", "developer", "master"],
  description: "Show bot owner/admin details with ID proof",
  usage: "owner",
  credits: "𓆩✮͢𝘈𝘴𝘪𝘮✮͢𓆪",
  cooldown: 5
};

module.exports.run = async function({ api, event }) {
  try {
    // Bot owner configuration - Update these with your details
    const ownerConfig = {
      mainOwner: {
        id: "100000000000000", // Replace with your Facebook ID
        name: "Asim Ali", // Replace with your name
        profile: "https://www.facebook.com/yourprofile", // Replace with your profile link
        gender: "Male",
        role: "Bot Developer & Owner",
        skills: ["JavaScript", "Node.js", "Bot Development", "AI Integration"],
        contact: {
          facebook: "https://www.facebook.com/yourprofile",
          github: "https://github.com/yourusername",
          email: "youremail@domain.com"
        }
      },
      coOwners: [
        {
          id: "100000000000001", // Replace with co-owner ID
          name: "Co-Owner Name",
          role: "Co-Owner"
        }
      ],
      admins: [
        {
          id: "100000000000002", // Replace with admin ID
          name: "Admin Name", 
          role: "Bot Admin"
        }
      ],
      botInfo: {
        name: "Chuza Bot",
        version: "2.0.0",
        created: "2024",
        framework: "Node.js",
        language: "JavaScript"
      }
    };

    // Get user info for screenshot proof
    const userInfo = await api.getUserInfo(ownerConfig.mainOwner.id);
    const ownerData = userInfo[ownerConfig.mainOwner.id];
    
    let message = `🤖 𝗕𝗢𝗧 𝗢𝗪𝗡𝗘𝗥 𝗗𝗘𝗧𝗔𝗜𝗟𝗦 🤖\n\n`;
    
    // Main Owner Section
    message += `👑 𝗠𝗔𝗜𝗡 𝗢𝗪𝗡𝗘𝗥:\n`;
    message += `├─ 📛 𝗡𝗮𝗺𝗲: ${ownerConfig.mainOwner.name}\n`;
    message += `├─ 🆔 𝗜𝗗: ${ownerConfig.mainOwner.id}\n`;
    message += `├─ ⚡ 𝗥𝗼𝗹𝗲: ${ownerConfig.mainOwner.role}\n`;
    message += `├─ 🚻 𝗚𝗲𝗻𝗱𝗲𝗿: ${ownerConfig.mainOwner.gender}\n`;
    message += `├─ 💻 𝗦𝗸𝗶𝗹𝗹𝘀: ${ownerConfig.mainOwner.skills.join(', ')}\n`;
    message += `└─ 📞 𝗖𝗼𝗻𝘁𝗮𝗰𝘁:\n`;
    message += `   ├─ 📘 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸: ${ownerConfig.mainOwner.contact.facebook}\n`;
    message += `   ├─ 💻 𝗚𝗶𝘁𝗛𝘂𝗯: ${ownerConfig.mainOwner.contact.github}\n`;
    message += `   └─ 📧 𝗘𝗺𝗮𝗶𝗹: ${ownerConfig.mainOwner.contact.email}\n\n`;

    // Co-Owners Section
    if (ownerConfig.coOwners.length > 0) {
      message += `👥 𝗖𝗢-𝗢𝗪𝗡𝗘𝗥𝗦:\n`;
      ownerConfig.coOwners.forEach((coOwner, index) => {
        message += `├─ ${index + 1}. ${coOwner.name}\n`;
        message += `│  ├─ 🆔: ${coOwner.id}\n`;
        message += `│  └─ ⚡: ${coOwner.role}\n`;
      });
      message += `\n`;
    }

    // Admins Section
    if (ownerConfig.admins.length > 0) {
      message += `🛡️ 𝗔𝗗𝗠𝗜𝗡𝗦:\n`;
      ownerConfig.admins.forEach((admin, index) => {
        message += `├─ ${index + 1}. ${admin.name}\n`;
        message += `│  ├─ 🆔: ${admin.id}\n`;
        message += `│  └─ ⚡: ${admin.role}\n`;
      });
      message += `\n`;
    }

    // Bot Info Section
    message += `🤖 𝗕𝗢𝗧 𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗧𝗜𝗢𝗡:\n`;
    message += `├─ 📛 𝗡𝗮𝗺𝗲: ${ownerConfig.botInfo.name}\n`;
    message += `├─ 🏷️ 𝗩𝗲𝗿𝘀𝗶𝗼𝗻: ${ownerConfig.botInfo.version}\n`;
    message += `├─ 📅 𝗖𝗿𝗲𝗮𝘁𝗲𝗱: ${ownerConfig.botInfo.created}\n`;
    message += `├─ ⚙️ 𝗙𝗿𝗮𝗺𝗲𝘄𝗼𝗿𝗸: ${ownerConfig.botInfo.framework}\n`;
    message += `└─ 💬 𝗟𝗮𝗻𝗴𝘂𝗮𝗴𝗲: ${ownerConfig.botInfo.language}\n\n`;

    message += `📸 𝗜𝗗 𝗩𝗘𝗥𝗜𝗙𝗜𝗖𝗔𝗧𝗜𝗢𝗡:\n`;
    message += `Owner profile picture attached as ID proof\n\n`;
    message += `✨ 𝗠𝗔𝗗𝗘 𝗪𝗜𝗧𝗛 𝗟𝗢𝗩𝗘 𝗕𝗬 ${ownerConfig.mainOwner.name.toUpperCase()} ✨`;

    // Get owner's profile picture for ID proof
    let attachment = [];
    try {
      if (ownerData && ownerData.thumbSrc) {
        const imageResponse = await require('axios').get(ownerData.thumbSrc, {
          responseType: 'stream'
        });
        attachment.push(imageResponse.data);
      }
    } catch (imageError) {
      console.log('Could not fetch profile picture:', imageError.message);
    }

    // Send the message with or without attachment
    if (attachment.length > 0) {
      await api.sendMessage({
        body: message,
        attachment: attachment
      }, event.threadID);
    } else {
      await api.sendMessage(message, event.threadID);
    }

  } catch (error) {
    console.error('Owner command error:', error);
    api.sendMessage(
      "❌ Error fetching owner details. Please try again later.",
      event.threadID
    );
  }
};