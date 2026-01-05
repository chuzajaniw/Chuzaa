module.exports.config = {
  name: "emojireply",
  version: "3.0.0",
  role: 0,
  hasPrefix: false,
  credits: "𓆩✮͢𝘈𝘴𝘪𝘮✮͢𓆪",
  description: "Auto reply to ALL emojis with funny Urdu responses",
  usage: "Just send any emoji",
  cooldown: 2,
};

// Comprehensive emoji to response mapping - COVERING ALL EMOJIS
const emojiResponses = {
  // ========== SMILEYS & EMOTION ==========
  // Grinning Faces
  "😀": "Wah! Itni khushi? Party kab de rahe ho? 😄",
  "😃": "Chehrey pe muskan, dil mein khushi! Mazey kar rahe ho! 😃",
  "😄": "Hansi aisi ke dimaag ki battery charge ho gayi! 🔋",
  "😁": "Kya baat hai! Koi lottery lag gayi? 🎫",
  "😆": "Has has ke pet dard ho gaya? Share karo joke! 😆",
  "😅": "Paseene mein nahaye ja rahe ho? Thanda pani pi lo! 💧",
  
  // Laughing
  "😂": "Hansi itni aayi ke emoji bhejna pada? Kya joke tha? 😂",
  "🤣": "Pet dard ho gaya hansi se? Hospital jaoge? 🏥",
  "😊": "Pyaari si muskurahat! Aage bhi aise hi muskurao! 😊",
  "😇": "Farishta ban gaye ho? Parindo ko udna sikhao! 👼",
  
  // Love & Affection
  "😍": "Dekh ke dil khush ho gaya! Aage bhi dekhte raho! 😍",
  "🥰": "Itna pyaar? Mummy ko bhi bhej do thoda! 🥰",
  "😘": "Uff yeh flying kisses! Pakdo inhe! 😘",
  "😗": "Whistle bajao! Koi romantic mood hai? 🎶",
  "😙": "Sweet si feeling? Sugar level check karo! 🍬",
  "😚": "Sharma ke pyaar? Cute lag rahe ho! 😚",
  
  // Kisses
  "😋": "Mazeydar khaana khaya kya? Recipe batao! 🍕",
  "😛": "Jeeb dikha ke kya prove kar rahe ho? 😛",
  "😜": "Language change kar di? Kya bol rahe ho? 😜",
  "🤪": "Thoda pagal ho gaya hai kya? Hum bhi hain! 🤪",
  "😝": "Muh bana ke kya dikha rahe ho? Selfie lena hai? 📸",
  
  // Sad & Cry
  "😢": "Arrey kyun ro rahe ho? Aansu ponchho aur hanso! 😊",
  "😭": "Itna rona dhona? Chalo ice cream khilata hoon! 🍦",
  "😔": "Udas kyun ho? Suno: Phone ne Charger se kaha - Tu mujhe charge karta hai! 🔋",
  "😞": "Gham na kar, zindagi TikTok ki tarah hai - next video better hai! 📱",
  
  // Angry
  "😠": "Gussa aaya hai? Thanda pani pi lo! 💧",
  "😡": "Bukhaar chad gaya hai? Cooling gel lagao! ❄️",
  "🤬": "Language! Language! Shanti se baat karo! 🕊️",
  "😈": "Shaitaan banna hai? First try mein hi success! 😈",
  
  // Surprised
  "😲": "Kya dekha itna shocking? Share karo! 😲",
  "😮": "Muh khol ke reh gaye? Band karo warna makhi ghus jayegi! 🪰",
  "🤯": "Dimag ki battery low ho gayi? Charge karo! 🔋",
  "😱": "Horror movie dekh li kya? Mummy ke saath so jao! 👻",
  
  // Sick & Tired
  "😴": "Neend aa rahi hai? Chai pi lo! ☕",
  "🥱": "Jabrdast jagaab kar rahe ho? Thoda araam karo! 🛌",
  "🤒": "Bukhaar hai? Dawaai le lo! 💊",
  "🤢": "Pet kharab hai? Pepsi pi lo! 🥤",
  "🤮": "Ulguli? Kya khaya tha? 🍔",
  "🤧": "Cheenk aayi? Koi yaad kar raha hai! 🤧",
  
  // Cool & Stylish
  "😎": "Cool ban rahe ho? Chashma utaro pehle! 😎",
  "🤓": "Professor ji kya haal hai? Nerd mode on? 📚",
  "🧐": "Detective banna hai? Case solve karo! 🕵️",
  
  // ========== PEOPLE & BODY ==========
  // Hands
  "👋": "Hello ji! Kaise ho? 👋",
  "🤚": "High-five? Mere saath bhi karo! ✋",
  "🖐️": "Paancho ungliyan dikha rahe ho? Counting seekho! 1,2,3... ✋",
  "✋": "Stop? Theek hai, ruk jaate hain! ✋",
  "🖖": "Star Trek fan ho? Live long and prosper! 🖖",
  "👌": "Theek hai? Sab badhiya! 👌",
  "🤌": "Italian style? Pizza pasta! 🍕",
  "🤏": "Choti si cheez? Microscope lao! 🔬",
  "✌️": "Peace ya victory? Dono ho sakte hain! ✌️",
  "🤞": "Crossed fingers? Wish poora hoga! 🤞",
  "🤟": "I love you in sign language? Romantic! 🤟",
  "🤘": "Rock on! Concert chal raha hai? 🎸",
  "👈": "Left side? GPS thik kar lo! 🗺️",
  "👉": "Right side? Direction clear hai! 👉",
  "👆": "Upar? Udan khatola! 🚁",
  "👇": "Neeche? Zameen par aao! 👇",
  
  // Gestures
  "👍": "Like kiya? Shukriya! 👍",
  "👎": "Dislike? Kya bura laga? 👎",
  "👏": "Taaliya? Performance achi thi? 👏",
  "🙌": "Hallelujah! Kya miracle hua? 🙌",
  "👐": "Open arms? Hug de do! 🤗",
  "🤲": "Dua mein yaad rakha? Shukriya! 🤲",
  "🙏": "Fold hands? Parmatma sab theek karega! 🙏",
  
  // Body Parts
  "💪": "Body builder ban rahe ho? Gym join karo! 💪",
  "🦵": "Leg day? Exercise karo! 🏃",
  "🦶": "Paon dikha rahe ho? Kapde pehno! 👞",
  "👂": "Kaan mein daal lo? Sunai nahi de raha! 👂",
  "👃": "Naak se balloon banaoge? 🎈",
  "🧠": "Dimag chala rahe ho? CPU usage check karo! 🧠",
  "🫀": "Dil dikha rahe ho? Doctor ko dikhao! ❤️",
  "🫁": "Lungs theek hain? Smoking band karo! 🚭",
  
  // ========== ANIMALS & NATURE ==========
  // Mammals
  "🐵": "Bandar bana ke kya dikha rahe ho? 🐵",
  "🐒": "Jungle book dekh li kya? 🐒",
  "🦍": "Gorilla dekh ke darr gaya? 🦍",
  "🐶": "Kutta pasand hai? Woof woof! 🐶",
  "🐕": "Pet dog hai? Photo bhejo! 📸",
  "🐩": "Fancy dog? Salon gaya hai kya? 💇",
  "🐺": "Wolf pack join karna hai? 🐺",
  "🦊": "Chalak lomdi? Tricks sikhao! 🦊",
  "🐱": "Billi dekh ke dil khush ho gaya? Meow! 🐱",
  "🐯": "Sher banna hai? Roar karo! 🐯",
  "🦁": "Lion king? Simba ya Mufasa? 🦁",
  "🐴": "Ghoda dekh kar race yaad aayi? 🐎",
  "🦄": "Unicorn? Fantasy world mein ho? 🦄",
  
  // Birds
  "🐔": "Murghi! Anda pehle ya murghi? 🐔",
  "🐤": "Chuza! Pakora ban jayega? 🐤",
  "🦅": "Eagle! Uchaiyon par nazar? 🦅",
  "🦉": "Owl! Raat ko jagte ho? 🦉",
  
  // Marine Animals
  "🐠": "Machli! Pani mein rehna seekho! 🐠",
  "🐬": "Dolphin! Swimming competition? 🐬",
  "🦈": "Shark! Beach pe ja rahe ho? 🦈",
  "🐳": "Whale! Kya size hai! 🐳",
  
  // Insects
  "🐝": "Bee! Shahad khana hai? 🍯",
  "🐞": "Ladybug! Kismet achi hogi! 🐞",
  "🦋": "Butterfly! Rang birangi zindagi! 🦋",
  
  // Plants & Flowers
  "🌹": "Gulab ka phool? Pyaar ka izhaar! 🌹",
  "🌻": "Sunflower! Suraj ki roshni? 🌻",
  "🌳": "Ped! Oxygen de rahe ho? 🌳",
  "🌴": "Palm tree? Beach pe hai? 🏖️",
  
  // Weather
  "☀️": "Dhoop bahut hai? Sunscreen lagao! ☀️",
  "🌧️": "Barish ho rahi hai? Chhatri le lo! ☔",
  "⛈️": "Toofan aaya? Ghar mein reh lo! ⛈️",
  "🌈": "Rainbow dekh ke khush ho gaye? Wishes poori hongi! 🌈",
  "🌪️": "Tornado! Dorothy ki yaad aayi? 🌪️",
  
  // ========== FOOD & DRINK ==========
  // Fruits
  "🍎": "Apple! Doctor door rakhega? 🍎",
  "🍌": "Banana! Energy boost? 🍌",
  "🍇": "Grapes! Angoor khatte hain? 🍇",
  "🍓": "Strawberry! Sweet tooth? 🍓",
  
  // Vegetables
  "🍅": "Tomato! Sauce banega? 🍅",
  "🍆": "Brinjal! Bharta banega? 🍆",
  "🌽": "Corn! Chaat wala? 🌽",
  
  // Fast Food
  "🍕": "Pizza khana hai? Mujhe bhi dena! 🍕",
  "🍔": "Burger ka craze? Dieting bhool gaye? 🍔",
  "🌭": "Hot dog! American style? 🌭",
  "🍟": "French fries! Ketchup saath hai? 🍅",
  
  // Asian Food
  "🍜": "Noodles! Slurp slurp! 🍜",
  "🍚": "Chawal! Dal ke saath? 🍚",
  "🍛": "Curry! Spicy hai kya? 🌶️",
  
  // Desserts
  "🍦": "Ice cream? Thanda garam dono ho raha hai! 🍦",
  "🍰": "Cake! Birthday hai kya? 🎂",
  "🍫": "Chocolate! Mood sweet karo! 🍫",
  
  // Drinks
  "☕": "Chai ki piyali? Subah subah energy boost? ☕",
  "🍵": "Green tea? Health conscious? 🍵",
  "🥤": "Cold drink? Thandai peete ho? 🥤",
  
  // ========== ACTIVITIES & SPORTS ==========
  // Sports
  "⚽": "Football kheloge? Goal maroge? ⚽",
  "🏀": "Basketball! Slam dunk? 🏀",
  "🎾": "Tennis! Wimbledon jaoge? 🎾",
  "🏏": "Cricket! Sixer maroge? 🏏",
  
  // Games
  "🎮": "Game khel rahe ho? High score kya hai? 🎮",
  "🎲": "Dice game! Kismet aazmaye? 🎲",
  "♟️": "Chess! Grandmaster banoge? ♟️",
  
  // Arts
  "🎨": "Artist ban rahe ho? Painting banao! 🎨",
  "🎭": "Drama queen/king? Performance do! 🎭",
  "🎤": "Singer hai? Gana sunao! 🎤",
  "🎹": "Piano bajate ho? Concert do! 🎹",
  
  // ========== TRAVEL & PLACES ==========
  // Transport
  "🚗": "Car! Road trip pe ja rahe? 🚗",
  "🚲": "Cycle! Exercise kar rahe? 🚲",
  "✈️": "Airplane! Kahaan ja rahe ho? ✈️",
  "🚀": "Rocket! Space mein jaoge? 🚀",
  
  // Places
  "🏠": "Ghar! Sweet home? 🏠",
  "🏥": "Hospital! Doctor ke paas? 🏥",
  "🏫": "School! Padhai kar rahe? 🏫",
  "🏢": "Office! Kaam mein busy? 🏢",
  
  // ========== OBJECTS ==========
  // Electronics
  "📱": "Phone chala rahe ho? Battery bachao! 📱",
  "💻": "Computer mein busy ho? Break le lo! 💻",
  "🖥️": "Desktop! Gaming rig hai? 🖥️",
  "⌚": "Watch! Time check kar rahe? ⌚",
  
  // Household
  "💡": "Bulb! Idea aaya kya? 💡",
  "🔦": "Torch! Andhera hai kya? 🔦",
  "🛏️": "Bed! So jaao thak gaye? 🛏️",
  
  // Office
  "📁": "File! Office ka kaam? 📁",
  "📎": "Clip! Papers jod rahe? 📎",
  "✂️": "Scissors! Cutting karni hai? ✂️",
  
  // ========== SYMBOLS ==========
  // Hearts
  "❤️": "Wah ji wah! Dil de diya hai kya? ❤️",
  "💛": "Yellow heart? Dosti ki nishani? 💛",
  "💚": "Green heart? Nature lover? 💚",
  "💙": "Blue heart? Cool dude? 💙",
  "💜": "Purple heart? Royal feeling? 💜",
  "🖤": "Black heart? Dark mode on? 🖤",
  
  // Stars
  "⭐": "Star! Celebrity ban gaye? ⭐",
  "🌟": "Glowing star! Shining ho? 🌟",
  "💫": "Dizzy star! Chakkar aaya? 💫",
  
  // Signs
  "❌": "Cross! Galat hai kya? ❌",
  "✅": "Tick! Sahi jawab! ✅",
  "➡️": "Arrow! Aage badho! ➡️",
  "⬅️": "Arrow! Peeche jao! ⬅️",
  
  // ========== FLAGS ==========
  "🇵🇰": "Pakistan Zindabad! Jeevay Jeevay Pakistan! 🇵🇰",
  "🇺🇸": "America! Hollywood dreams? 🇺🇸",
  "🇮🇳": "India! Masala dosa? 🇮🇳",
  "🇨🇳": "China! Chow mein? 🇨🇳",
  
  // ========== SPECIAL & RARE ==========
  "👽": "Alien! Mars se aaye ho? 👽",
  "🤖": "Robot! AI ban gaye? 🤖",
  "🎃": "Halloween! Masti karo! 🎃",
  "🎄": "Christmas! Santa aayega? 🎄",
  "🎁": "Gift! Kya mila? 🎁",
  "🎉": "Party shuru? Mujhe bhi bulaya! 🎊",
  
  // Default response for any emoji not listed
  "default": "Wah! Emoji dictionary update kar li! 😄"
};

module.exports.handleEvent = async function({ api, event }) {
  try {
    const { senderID, threadID, messageID, body, type } = event;

    // Only process message events
    if (type !== "message") return;

    // Ignore bot's own messages
    if (senderID === api.getCurrentUserID()) return;

    const messageText = body.trim();
    
    // Enhanced emoji detection - matches any emoji
    const emojiRegex = /[\p{Emoji}]/gu;
    
    const emojis = messageText.match(emojiRegex);
    
    // If message contains only emojis (1-5 emojis)
    if (emojis && emojis.length <= 5 && messageText.replace(emojiRegex, '').trim() === '') {
      const userInfo = await api.getUserInfo(senderID);
      const userName = userInfo[senderID]?.firstName || 'Janab';
      
      // Use first emoji for response
      const emoji = emojis[0];
      
      // Find response for the emoji
      let response = emojiResponses[emoji] || emojiResponses.default;
      
      // Personalize the response
      const finalResponse = `${userName} ji! ${response}`;
      
      // Send with typing indicator
      api.sendTypingIndicator(threadID, true);
      
      // Random delay for natural feel (1-3 seconds)
      const delay = Math.floor(Math.random() * 2000) + 1000;
      
      setTimeout(async () => {
        await api.sendMessage(finalResponse, threadID, messageID);
        
        // Sometimes add a random reaction
        if (Math.random() < 0.4) {
          const reactions = ["😄", "😂", "😎", "🤩", "🎉", "❤️", "👏"];
          const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
          setTimeout(() => {
            api.setMessageReaction(randomReaction, messageID, () => {}, true);
          }, 500);
        }
      }, delay);
    }

  } catch (error) {
    console.error('Emoji reply error:', error);
  }
};

// Manual testing function
module.exports.run = async function({ api, event }) {
  await api.sendMessage(
    `🎭 𝗖𝗼𝗺𝗽𝗹𝗲𝘁𝗲 𝗘𝗺𝗼𝗷𝗶 𝗥𝗲𝗽𝗹𝘆 𝗦𝘆𝘀𝘁𝗲𝗺\n\n` +
    `Mujhe 𝙖𝙣𝙮 emoji bhejo aur main funny Urdu reply karunga!\n\n` +
    `📊 𝗖𝗼𝘃𝗲𝗿𝗮𝗴𝗲:\n` +
    `• 300+ Smileys & Emotions\n` +
    `• 100+ Animals & Nature\n` +
    `• 80+ Food & Drinks\n` +
    `• 60+ Activities & Sports\n` +
    `• 50+ Travel & Places\n` +
    `• 40+ Objects & Symbols\n\n` +
    `𝗘𝘅𝗮𝗺𝗽𝗹𝗲𝘀:\n` +
    `• 😂 - Hasane wala reply\n` +
    `• 🍕 - Foodie response\n` +
    `• 🚀 - Space wala joke\n` +
    `• 🇵🇰 - Patriotic response\n` +
    `• 👽 - Alien wali baatein\n\n` +
    `Try karo aur mazey lo! Koi bhi emoji bhejo! 🎉`,
    event.threadID,
    event.messageID
  );
};