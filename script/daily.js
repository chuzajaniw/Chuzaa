module.exports.config = {
  name: "daily",
  version: "3.0.0",
  role: 0,
  hasPrefix: false,
  credits: "𓆩✮͢𝘈𝘴𝘪𝘮✮͢𓆪",
  description: "Reply to all common daily conversation words",
  usage: "Just say hi, hello, how are you, etc.",
  cooldown: 2,
};

// Comprehensive daily conversation responses
const dailyResponses = {
  // Greetings
  "hi": {
    responses: [
      "Hello there! 😊👋",
      "Hi buddy! How are you? 🤗",
      "Hey! Good to see you! 😄",
      "Hi there! What's up? 🌟",
      "Hello friend! 👋✨"
    ],
    emoji: "👋"
  },

  "hello": {
    responses: [
      "Hello! How can I help you? 😊",
      "Hi there! Nice to meet you! 🤗",
      "Hello friend! How's your day? 😄",
      "Hey! Great to see you! 🌟",
      "Hi! Hope you're doing well! ✨"
    ],
    emoji: "👋"
  },

  "hey": {
    responses: [
      "Hey! What's going on? 😊",
      "Hey there! How you doing? 🤗",
      "Hey buddy! Long time! 😄",
      "Hey! Good to hear from you! 🌟",
      "Hey! What's new? ✨"
    ],
    emoji: "👋"
  },

  // How are you variations
  "how are you": {
    responses: [
      "I'm doing great Alhamdulillah! How about you? 😊",
      "Alhamdulillah I'm fine! How are you doing? 🤗",
      "I'm good by the grace of Allah! And you? 😄",
      "Alhamdulillah everything's good! You tell? 🌟",
      "I'm perfect! How about yourself? ✨"
    ],
    emoji: "😊"
  },

  "kese ho": {
    responses: [
      "Main theek hun Alhamdulillah! Tum sunao? 😊",
      "Alhamdulillah theek hun! Tum kesay ho? 🤗",
      "Main achi hun! Tum batao? 😄",
      "Theek hun by the grace of Allah! Tum kesay ho? 🌟",
      "Alhamdulillah achi hun! Ap bataen? ✨"
    ],
    emoji: "🤗"
  },

  "kesi ho": {
    responses: [
      "Main theek hun Alhamdulillah! Tum sunao? 😊",
      "Alhamdulillah achi hun! Tum kesi ho? 🤗",
      "Main achi hun! Tum batao? 😄",
      "Theek hun by the grace of Allah! Tum kesi ho? 🌟",
      "Alhamdulillah main theek hun! Ap bataen? ✨"
    ],
    emoji: "🤗"
  },

  // Yes/No responses
  "han": {
    responses: [
      "Acha! 😊",
      "Theek hai! 👍",
      "Hanji! ✨",
      "Okay! 👌",
      "Han bhai! 😄"
    ],
    emoji: "👍"
  },

  "g": {
    responses: [
      "Acha! 😊",
      "Theek hai! 👍",
      "Hanji! ✨",
      "Okay bhai! 👌",
      "G! 😄"
    ],
    emoji: "👍"
  },

  "yes": {
    responses: [
      "Great! 😊",
      "Okay! 👍",
      "Alright! ✨",
      "Perfect! 👌",
      "Yes! 😄"
    ],
    emoji: "👍"
  },

  "no": {
    responses: [
      "Okay no problem! 😊",
      "Theek hai! 👍",
      "No issue! ✨",
      "Koi baat nahi! 👌",
      "Alright! 😄"
    ],
    emoji: "👌"
  },

  "nahi": {
    responses: [
      "Koi baat nahi! 😊",
      "Theek hai! 👍",
      "Koi masla nahi! ✨",
      "No problem! 👌",
      "Chalta hai! 😄"
    ],
    emoji: "👌"
  },

  // Good/Bad responses
  "acha": {
    responses: [
      "Acha acha! 😊",
      "Hanji! ✨",
      "Theek hai! 👍",
      "Okay! 👌",
      "Acha bhai! 😄"
    ],
    emoji: "😊"
  },

  "good": {
    responses: [
      "Great! 😊",
      "Awesome! ✨",
      "Nice! 👍",
      "Perfect! 👌",
      "Good to hear! 😄"
    ],
    emoji: "😊"
  },

  "bad": {
    responses: [
      "Oh sorry to hear that! 😔",
      "Don't worry! Everything will be fine! 🤗",
      "Allah behtar karega! 🙏",
      "Koi baat nahi! Sab theek ho jayega! ✨",
      "Cheer up buddy! 😊"
    ],
    emoji: "🤗"
  },

  "bura": {
    responses: [
      "Allah behtar karega! 😔",
      "Koi baat nahi! Sab theek ho jayega! 🤗",
      "Don't worry! 🙏",
      "Cheer up! ✨",
      "Sab theek ho jayega! 😊"
    ],
    emoji: "🤗"
  },

  // Love expressions
  "love you": {
    responses: [
      "Aww thank you! Love you too! 😊💕",
      "That's so sweet! Love you more! 🤗❤️",
      "Thank you! You're amazing! 😄💫",
      "Aww! Love you too buddy! 🌟💕",
      "That means a lot! Love you! ✨❤️"
    ],
    emoji: "❤️"
  },

  "pyar": {
    responses: [
      "Aww shukriya! Main bhi pyar karta hun! 😊💕",
      "Bohat shukriya! Tum bhi bohat achy ho! 🤗❤️",
      "Aww! Main bhi tumse pyar karta hun! 😄💫",
      "Shukriya jan! Tum bhi bohat achy ho! 🌟💕",
      "Aww! That's so sweet! ✨❤️"
    ],
    emoji: "❤️"
  },

  "miss you": {
    responses: [
      "I miss you too! 😊💕",
      "Aww! I miss you more! 🤗❤️",
      "Miss you too buddy! 😄💫",
      "Can't wait to see you! 🌟💕",
      "I miss you so much! ✨❤️"
    ],
    emoji: "💕"
  },

  "yaad ata hai": {
    responses: [
      "Aww! Mujhe bhi yaad ata hai! 😊💕",
      "Shukriya! Mujhe bhi bohat yaad ata hai! 🤗❤️",
      "Aww jan! Mujhe bhi yaad ata hai! 😄💫",
      "Bohat shukriya! Main bhi yaad karta hun! 🌟💕",
      "Aww! That's so sweet! ✨❤️"
    ],
    emoji: "💕"
  },

  // Thanks responses
  "thank you": {
    responses: [
      "You're welcome! 😊",
      "My pleasure! 🤗",
      "Anytime! 😄",
      "No problem! 🌟",
      "You're most welcome! ✨"
    ],
    emoji: "🤲"
  },

  "shukriya": {
    responses: [
      "Koi baat nahi! 😊",
      "My pleasure! 🤗",
      "Anytime! 😄",
      "Koi masla nahi! 🌟",
      "You're welcome! ✨"
    ],
    emoji: "🤲"
  },

  "thanks": {
    responses: [
      "Welcome! 😊",
      "No problem! 🤗",
      "Anytime! 😄",
      "My pleasure! 🌟",
      "You're welcome! ✨"
    ],
    emoji: "🤲"
  },

  // What's up variations
  "whats up": {
    responses: [
      "Nothing much! Just chatting with you! 😊",
      "All good! What about you? 🤗",
      "Just here! How about you? 😄",
      "Nothing special! You tell? 🌟",
      "Just relaxing! What's up with you? ✨"
    ],
    emoji: "😊"
  },

  "kya hal hai": {
    responses: [
      "Sab theek hai! Tum sunao? 😊",
      "Kuch khas nahi! Tum batao? 🤗",
      "Bas yunhi! Tumhara kya hal hai? 😄",
      "Sab acha chal raha hai! Tum batao? 🌟",
      "Kuch nahi! Tum batao kya chal raha hai? ✨"
    ],
    emoji: "😊"
  },

  "kya kar rahe ho": {
    responses: [
      "Bas yunhi! Tum se baat kar raha hun! 😊",
      "Kuch khas nahi! Tum batao? 🤗",
      "Just chatting with you! 😄",
      "Yunhi time pass! Tum kya kar rahe ho? 🌟",
      "Bus yunhi! Tum batao kya kar rahe ho? ✨"
    ],
    emoji: "😊"
  },

  // OK variations
  "ok": {
    responses: [
      "Okay! 😊",
      "Theek hai! 👍",
      "Alright! ✨",
      "OK! 👌",
      "Hanji! 😄"
    ],
    emoji: "👌"
  },

  "okay": {
    responses: [
      "Okay! 😊",
      "Theek hai! 👍",
      "Alright! ✨",
      "Perfect! 👌",
      "Hanji! 😄"
    ],
    emoji: "👌"
  },

  "theek hai": {
    responses: [
      "Theek hai! 😊",
      "Hanji! 👍",
      "Okay! ✨",
      "Acha! 👌",
      "Alright! 😄"
    ],
    emoji: "👌"
  },

  // Bye variations
  "bye": {
    responses: [
      "Bye bye! Take care! 😊👋",
      "Goodbye! Allah Hafiz! 🤗",
      "Bye! See you soon! 😄",
      "Take care! Khuda Hafiz! 🌟",
      "Bye! Miss you! ✨"
    ],
    emoji: "👋"
  },

  "allah hafiz": {
    responses: [
      "Allah Hafiz! Khuda aap ko hifazat mein rakhe! 😊👋",
      "Allah Hafiz! Khuda aap ka bhala kare! 🤗",
      "Allah Hafiz! Take care! 😄",
      "Allah Hafiz! Aap bhi khayal rakhna! 🌟",
      "Allah Hafiz! Bohat yaad aoge! ✨"
    ],
    emoji: "👋"
  },

  "good night": {
    responses: [
      "Good night! Sweet dreams! 😊🌙",
      "Shab Bakhair! Meethi neend! 🤗",
      "Good night! Sleep well! 😄",
      "Shab Bakhair! Allah aap ko hifazat mein rakhe! 🌟",
      "Good night! Khuda Hafiz! ✨"
    ],
    emoji: "🌙"
  },

  // Funny responses
  "haha": {
    responses: [
      "Haha! 😂",
      "LOL! 🤣",
      "Haha funny! 😄",
      "Haha good one! 🌟",
      "Haha! 😆"
    ],
    emoji: "😂"
  },

  "lol": {
    responses: [
      "LOL! 😂",
      "Haha! 🤣",
      "LOL funny! 😄",
      "Haha good one! 🌟",
      "LOL! 😆"
    ],
    emoji: "😂"
  },

  "lmao": {
    responses: [
      "LMAO! 😂",
      "Haha! 🤣",
      "LMAO so funny! 😄",
      "Haha! 🌟",
      "LMAO! 😆"
    ],
    emoji: "😂"
  },

  // Common Urdu words
  "acha hai": {
    responses: [
      "Hanji acha hai! 😊",
      "Theek hai! 👍",
      "Acha! ✨",
      "Hanji! 👌",
      "Okay! 😄"
    ],
    emoji: "😊"
  },

  "theek hai": {
    responses: [
      "Hanji theek hai! 😊",
      "Acha! 👍",
      "Okay! ✨",
      "Theek! 👌",
      "Alright! 😄"
    ],
    emoji: "👌"
  },

  "chalo": {
    responses: [
      "Hanji chalo! 😊",
      "Theek hai! 👍",
      "Okay chalo! ✨",
      "Acha! 👌",
      "Chalo! 😄"
    ],
    emoji: "👌"
  },

  "sahi hai": {
    responses: [
      "Hanji sahi hai! 😊",
      "Bilkul sahi! 👍",
      "Sahi! ✨",
      "Theek hai! 👌",
      "Okay! 😄"
    ],
    emoji: "👍"
  }
};

module.exports.handleEvent = async function({ api, event }) {
  try {
    // ✅ SAFETY CHECKS
    if (!event || typeof event !== 'object') return;
    if (!event.body || typeof event.body !== 'string') return;
    if (event.type !== "message") return;
    if (event.senderID === api.getCurrentUserID()) return;

    const { senderID, threadID, messageID, body } = event;
    const messageText = body.toLowerCase().trim();

    // Don't respond to very long messages
    if (messageText.length > 50) return;

    // Find matching daily word
    let matchedWord = null;
    
    for (const [word, data] of Object.entries(dailyResponses)) {
      // Exact match or word boundary match
      if (messageText === word.toLowerCase() || 
          messageText === word ||
          new RegExp(`\\b${word}\\b`).test(messageText)) {
        matchedWord = { word, data };
        break;
      }
    }

    if (!matchedWord) return;

    // Get user info for personalization
    let userName = "Friend";
    try {
      const userInfo = await api.getUserInfo(senderID);
      if (userInfo && userInfo[senderID] && userInfo[senderID].firstName) {
        userName = userInfo[senderID].firstName;
      }
    } catch (error) {
      console.log('Could not get user info:', error.message);
    }

    const { data } = matchedWord;
    const responses = data.responses;
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    // Personalize the response (add name for some responses)
    let finalResponse = randomResponse;
    if (Math.random() < 0.6) { // 60% chance to add name
      finalResponse = `${userName}! ${randomResponse}`;
    }

    // Send with typing indicator
    api.sendTypingIndicator(threadID, true);
    
    // Random delay for natural feel
    const delay = Math.floor(Math.random() * 2000) + 1000;
    
    setTimeout(async () => {
      await api.sendMessage(finalResponse, threadID, messageID);
      
      // Add reaction (40% chance)
      if (Math.random() < 0.4) {
        setTimeout(() => {
          api.setMessageReaction(data.emoji, messageID, () => {}, true);
        }, 500);
      }
    }, delay);

  } catch (error) {
    console.error('Daily command error:', error.message);
  }
};

// Manual testing function
module.exports.run = async function({ api, event }) {
  const dailyInfo = `
💬 𝐃𝐀𝐈𝐋𝐘 𝐂𝐎𝐍𝐕𝐄𝐑𝐒𝐀𝐓𝐈𝐎𝐍 𝐁𝐎𝐓 🤖

🌟 This command replies to all common daily words!

📝 𝐒𝐮𝐩𝐩𝐨𝐫𝐭𝐞𝐝 𝐖𝐨𝐫𝐝𝐬:

👋 𝐆𝐫𝐞𝐞𝐭𝐢𝐧𝐠𝐬:
• hi, hello, hey

🤔 𝐇𝐨𝐰 𝐚𝐫𝐞 𝐲𝐨𝐮:
• how are you, kese ho, kesi ho

👍 𝐘𝐞𝐬/𝐍𝐨:
• han, g, yes, no, nahi

😊 𝐆𝐨𝐨𝐝/𝐁𝐚𝐝:
• acha, good, bad, bura

❤️ 𝐋𝐨𝐯𝐞/𝐌𝐢𝐬𝐬:
• love you, pyar, miss you, yaad ata hai

🙏 𝐓𝐡𝐚𝐧𝐤𝐬:
• thank you, shukriya, thanks

💬 𝐖𝐡𝐚𝐭'𝐬 𝐮𝐩:
• whats up, kya hal hai, kya kar rahe ho

👌 𝐎𝐊:
• ok, okay, theek hai

👋 𝐁𝐲𝐞:
• bye, allah hafiz, good night

😂 𝐅𝐮𝐧𝐧𝐲:
• haha, lol, lmao

💫 𝐔𝐫𝐝𝐮 𝐂𝐨𝐦𝐦𝐨𝐧:
• acha hai, theek hai, chalo, sahi hai

💬 𝐓𝐫𝐲 𝐬𝐚𝐲𝐢𝐧𝐠 𝐚𝐧𝐲 𝐨𝐟 𝐭𝐡𝐞𝐬𝐞 𝐰𝐨𝐫𝐝𝐬! ✨`;
  
  await api.sendMessage(dailyInfo, event.threadID, event.messageID);
};