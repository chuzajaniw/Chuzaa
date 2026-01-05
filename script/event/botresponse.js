module.exports.config = {
  name: "botResponse",
  version: "2.0.0",
  credits: "CHAND & 𓆩✮͢𝘈𝘴𝘪𝘮✮͢𓆪",
  hasPrefix: false,
  eventType: ["message"]
};

// Same messages array as above
const messages = [
  // ... (same messages array from above)
];

const triggerWords = [
  "bot", "Bot", "jan", "Jani", "jani", "Jan", "Janu", "janu"
];

module.exports.handleEvent = async function({ api, event }) {
  try {
    const { senderID, threadID, messageID, body, type } = event;

    // Only process message events
    if (type !== "message") return;

    // Ignore bot's own messages
    if (senderID === api.getCurrentUserID()) return;

    const messageText = body.toLowerCase().trim();
    
    // Check for exact matches or contains trigger words
    const isTriggered = triggerWords.some(word => 
      messageText === word.toLowerCase()
    );

    if (!isTriggered) return;

    // Get user info
    const userInfo = await api.getUserInfo(senderID);
    const senderName = userInfo[senderID]?.name || 'User';
    const firstName = senderName.split(' ')[0];

    // Select random message
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    // Format message
    const formattedMessage = `🧡★━━━━━✩━━━━━★💥\n𝐍𝐚𝐦𝐞 🐣: ${firstName}\n≪━─━─━─◈─━─━─━≫\n𝐎𝐖𝐍𝐄𝐑: 𝐂𝐇𝐔𝐙𝐀\n${randomMessage}`;

    // Send with typing indicator
    api.sendTypingIndicator(threadID, true);
    await api.sendMessage(formattedMessage, threadID, messageID);

  } catch (error) {
    console.error('Bot response error:', error);
  }
};