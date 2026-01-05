const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports.config = {
  name: "admininfo",
  role: 0,
  version: "3.0.0",
  hasPrefix: false,
  aliases: ["botadmin", "ownerinfo", "creatorinfo"],
  description: "Detailed bot administration information with multiple proofs",
  usage: "admininfo",
  credits: "𓆩✮͢𝘈𝘴𝘪𝘮✮͢𓆪",
  cooldown: 5
};

module.exports.run = async function({ api, event }) {
  try {
    // Configuration - UPDATE THESE WITH YOUR ACTUAL DETAILS
    const adminData = {
      primaryOwner: {
        id: "100000000000000", // YOUR FACEBOOK ID
        name: "Asim Ali", // YOUR NAME
        profile: "https://www.facebook.com/yourprofile", // YOUR PROFILE LINK
        gender: "Male",
        status: "Active",
        role: "Lead Developer & Owner",
        expertise: ["Bot Development", "JavaScript", "Node.js", "AI Systems"],
        contact: {
          facebook: "https://fb.com/yourprofile",
          github: "https://github.com/yourusername",
          instagram: "@yourinstagram",
          email: "contact@yourdomain.com"
        },
        bio: "Passionate developer creating amazing bots for the community."
      },
      managementTeam: [
        {
          id: "100000000000001",
          name: "Co-Owner Name",
          role: "Co-Owner & Manager",
          specialization: "User Support & Management"
        },
        {
          id: "100000000000002", 
          name: "Admin Name",
          role: "Senior Admin",
          specialization: "Technical Support"
        }
      ],
      botStatistics: {
        name: "Chuza Bot",
        version: "2.0.0",
        servers: "50+",
        users: "1000+",
        uptime: "99.8%",
        created: "January 2024",
        lastUpdate: "December 2024"
      }
    };

    // Create detailed message
    let message = `👑 𝗕𝗢𝗧 𝗔𝗗𝗠𝗜𝗡𝗜𝗦𝗧𝗥𝗔𝗧𝗜𝗢𝗡 𝗗𝗘𝗧𝗔𝗜𝗟𝗦 👑\n\n`;

    // Primary Owner Section
    message += `🌟 𝗣𝗥𝗜𝗠𝗔𝗥𝗬 𝗢𝗪𝗡𝗘𝗥:\n`;
    message += `┌─ 📛 𝗡𝗮𝗺𝗲: ${adminData.primaryOwner.name}\n`;
    message += `├─ 🆔 𝗜𝗗: ${adminData.primaryOwner.id}\n`;
    message += `├─ ⚡ 𝗥𝗼𝗹𝗲: ${adminData.primaryOwner.role}\n`;
    message += `├─ 🚻 𝗚𝗲𝗻𝗱𝗲𝗿: ${adminData.primaryOwner.gender}\n`;
    message += `├─ 📊 𝗦𝘁𝗮𝘁𝘂𝘀: ${adminData.primaryOwner.status}\n`;
    message += `├─ 🛠️ 𝗘𝘅𝗽𝗲𝗿𝘁𝗶𝘀𝗲: ${adminData.primaryOwner.expertise.join(', ')}\n`;
    message += `├─ 📝 𝗕𝗶𝗼: ${adminData.primaryOwner.bio}\n`;
    message += `└─ 📞 𝗖𝗼𝗻𝘁𝗮𝗰𝘁:\n`;
    message += `   ├─ 👤 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸: ${adminData.primaryOwner.contact.facebook}\n`;
    message += `   ├─ 💻 𝗚𝗶𝘁𝗛𝘂𝗯: ${adminData.primaryOwner.contact.github}\n`;
    message += `   ├─ 📷 𝗜𝗻𝘀𝘁𝗮𝗴𝗿𝗮𝗺: ${adminData.primaryOwner.contact.instagram}\n`;
    message += `   └─ 📧 𝗘𝗺𝗮𝗶𝗹: ${adminData.primaryOwner.contact.email}\n\n`;

    // Management Team Section
    message += `👥 𝗠𝗔𝗡𝗔𝗚𝗘𝗠𝗘𝗡𝗧 𝗧𝗘𝗔𝗠:\n`;
    adminData.managementTeam.forEach((member, index) => {
      message += `├─ ${index + 1}. ${member.name}\n`;
      message += `│  ├─ 🆔: ${member.id}\n`;
      message += `│  ├─ ⚡: ${member.role}\n`;
      message += `│  └─ 🎯: ${member.specialization}\n`;
    });
    message += `\n`;

    // Bot Statistics
    message += `🤖 𝗕𝗢𝗧 𝗦𝗧𝗔𝗧𝗜𝗦𝗧𝗜𝗖𝗦:\n`;
    message += `├─ 📛 𝗡𝗮𝗺𝗲: ${adminData.botStatistics.name}\n`;
    message += `├─ 🏷️ 𝗩𝗲𝗿𝘀𝗶𝗼𝗻: ${adminData.botStatistics.version}\n`;
    message += `├─ 🖥️ 𝗦𝗲𝗿𝘃𝗲𝗿𝘀: ${adminData.botStatistics.servers}\n`;
    message += `├─ 👥 𝗨𝘀𝗲𝗿𝘀: ${adminData.botStatistics.users}\n`;
    message += `├─ ⏱️ 𝗨𝗽𝘁𝗶𝗺𝗲: ${adminData.botStatistics.uptime}\n`;
    message += `├─ 📅 𝗖𝗿𝗲𝗮𝘁𝗲𝗱: ${adminData.botStatistics.created}\n`;
    message += `└─ 🔄 𝗟𝗮𝘀𝘁 𝗨𝗽𝗱𝗮𝘁𝗲: ${adminData.botStatistics.lastUpdate}\n\n`;

    message += `📸 𝗩𝗘𝗥𝗜𝗙𝗜𝗖𝗔𝗧𝗜𝗢𝗡:\n`;
    message += `• Owner profile picture attached as primary ID proof\n`;
    message += `• All IDs are verified and authentic\n`;
    message += `• Contact only verified admins for support\n\n`;

    message += `⚠️ 𝗜𝗠𝗣𝗢𝗥𝗧𝗔𝗡𝗧 𝗡𝗢𝗧𝗘:\n`;
    message += `• Never share your password with anyone\n`;
    message += `• Only contact verified admins from this list\n`;
    message += `• Report suspicious accounts immediately\n\n`;

    message += `💫 𝗠𝗔𝗗𝗘 𝗪𝗜𝗧𝗛 𝗟𝗢𝗩𝗘 𝗕𝗬 ${adminData.primaryOwner.name.toUpperCase()} 💫`;

    // Get profile pictures for verification
    let attachments = [];
    
    try {
      // Get primary owner profile picture
      const userInfo = await api.getUserInfo(adminData.primaryOwner.id);
      const ownerProfile = userInfo[adminData.primaryOwner.id];
      
      if (ownerProfile && ownerProfile.thumbSrc) {
        const imageResponse = await axios({
          method: 'GET',
          url: ownerProfile.thumbSrc,
          responseType: 'stream'
        });
        attachments.push(imageResponse.data);
      }
    } catch (imageError) {
      console.log('Profile image error:', imageError.message);
    }

    // Send message with attachments
    if (attachments.length > 0) {
      await api.sendMessage({
        body: message,
        attachment: attachments
      }, event.threadID);
    } else {
      await api.sendMessage(message, event.threadID);
    }

  } catch (error) {
    console.error('AdminInfo command error:', error);
    api.sendMessage(
      "❌ Unable to fetch admin details at the moment. Please try again later.",
      event.threadID
    );
  }
};