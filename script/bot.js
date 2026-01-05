module.exports.config = {
  name: "bot",
  version: "2.1.0",
  role: 0,
  hasPrefix: false,
  credits: "CHAND & 𓆩✮͢𝘈𝘴𝘪𝘮✮͢𓆪",
  description: "Send random fun messages with user personalization",
  usage: "just type bot, jan, jani, janu, etc.",
  cooldown: 5,
};

// Array of predefined messages
const messages = [
  "●●●━━━━━◥💜◤━━━━━●●●\n❖•━━━━━━━━━━━━━━━━•❖\n\nKisi ko khone ka gham kia hota ha ye kal raat pata chala mujhe, Jab mung phalli ka aik sabit dana chilkon mein gir gia \n\n𝐈'𝐦 ➠☆||  ⋆⃝❥͜͡Rani ❥||ㅎ\n❖•━━━━━━━━━━━━━━━━•❖\n●●●━━━━━◥💜◤━━━━━●●●",
  
  "❖•━━━━━━━━━━━━━━━━•❖\nBanda hota tw us ko choti choti 2 pOniyAn krti🙂👩🦯👩🦯 \n\n𝐈'𝐦 ➠☆||  ⋆⃝❥͜͡Rani ❥||ㅎ\n❖•━━━━━━━━━━━━━━━━•❖\n●●●━━━━━◥💜◤━━━━━●●●",
  
  "❖•━━━━━━━━━━━━━━━━•❖\nAik tu mujhe yaar ki judai maar gai, Aur dosra khubsorat hamsai maar gai.😐 \n\n𝐈'𝐦 ➠☆||  ⋆⃝❥͜͡Rani ❥||ㅎ\n❖•━━━━━━━━━━━━━━━━•❖\n●●●━━━━━◥💜◤━━━━━●●●",
  
  "❖•━━━━━━━━━━━━━━━━•❖\nNigahin aaj bhi us shakas ko takti hain faraz Jis ne kaha tha matric ker lo aage parhai bari aasan hai😬 \n\n𝐈'𝐦 ➠☆||  ⋆⃝❥͜͡Rani ❥||ㅎ\n❖•━━━━━━━━━━━━━━━━•❖\n●●●━━━━━◥💜◤━━━━━●●●",
  
  "❖•━━━━━━━━━━━━━━━━•❖\nMiss YoU NaW moi biryani ki plate \n\n𝐈'𝐦 ➠☆||  ⋆⃝❥͜͡Rani ❥||ㅎ\n❖•━━━━━━━━━━━━━━━━•❖\n●●●━━━━━◥💜◤━━━━━●●●",
  
  "❖•━━━━━━━━━━━━━━━━•❖\nSoch rahi hon inbox rent pe de dun khali jo para rehta hai 😒 \n\n𝐈'𝐦 ➠☆||  ⋆⃝❥͜͡Rani ❥||ㅎ\n❖•━━━━━━━━━━━━━━━━•❖\n●●●━━━━━◥💜◤━━━━━●●●",
  
  "❖•━━━━━━━━━━━━━━━━•❖\nاک بار جو بچھڑے تو آئیں گے نہ لوٹ کر یہ مٹی کے انسان نومبر نہیں ہوتے🍂 \n\n𝐈'𝐦 ➠☆||  ⋆⃝❥͜͡Rani ❥||ㅎ\n❖•━━━━━━━━━━━━━━━━•❖\n●●●━━━━━◥💜◤━━━━━●●●",
  
  "❖•━━━━━━━━━━━━━━━━•❖\nالہ دین کا چراغ اور میک اپ شدہ عورت دونوں کو رگڑو تو اندر سے جن ہی نکلتا ہے\n\n𝐈'𝐦 ➠☆||  ⋆⃝❥͜͡Rani ❥||ㅎ\n❖•━━━━━━━━━━━━━━━━•❖\n●●●━━━━━◥💜◤━━━━━●●●",
  
  "❖•━━━━━━━━━━━━━━━━•❖\nPait ke ander sab kuch chala jata hai, Bas pait hi ander nahi jata🙄 \n\n𝐈'𝐦 ➠☆||  ⋆⃝❥͜͡Rani ❥||ㅎ\n❖•━━━━━━━━━━━━━━━━•❖\n●●●━━━━━◥💜◤━━━━━●●●",
  
  "❖•━━━━━━━━━━━━━━━━•❖\n🥺Jan nahi kehna to men naraz ho jana he \n\n𝐈'𝐦 ➠☆||  ⋆⃝❥͜͡Rani ❥||ㅎ\n❖•━━━━━━━━━━━━━━━━•❖\n●●●━━━━━◥💜◤━━━━━●●●",
  
  "❖•━━━━━━━━━━━━━━━━•❖\nAik saal se pasand ki shadi ke liye jo wazifa parh rahi thi aaj kisi nay bataya ke woh Saudi arab ka qaumi taranah hai 😒 \n\n𝐈'𝐦 ➠☆||  ⋆⃝❥͜͡Rani ❥||ㅎ\n❖•━━━━━━━━━━━━━━━━•❖\n●●●━━━━━◥💜◤━━━━━●●●",
  
  "❖•━━━━━━━━━━━━━━━━•❖\nMain ap ki ami ko btaou ₲ł ap Facebook use kerty ho aur ulty kam kalty ho \n\n𝐈'𝐦 ➠☆||  ⋆⃝❥͜͡Rani ❥||ㅎ\n❖•━━━━━━━━━━━━━━━━•❖\n●●●━━━━━◥💜◤━━━━━●●●",
  
  "❖•━━━━━━━━━━━━━━━━•❖\nBlock Your '' gf '' And Purpose me 🙂💔 \n\n𝐈'𝐦 ➠☆||  ⋆⃝❥͜͡Rani ❥||ㅎ\n❖•━━━━━━━━━━━━━━━━•❖\n●●●━━━━━◥💜◤━━━━━●●●",
  
  "❖•━━━━━━━━━━━━━━━━•❖\nK0i Perp0Se Hi Krd0 Perm0te T0 hm PhlY hi HaiN 🙂 \n\n𝐈'𝐦 ➠☆||  ⋆⃝❥͜͡Rani ❥||ㅎ\n❖•━━━━━━━━━━━━━━━━•❖\n●●●━━━━━◥💜◤━━━━━●●●",
  
  "❖•━━━━━━━━━━━━━━━━•❖\nMein pyar likhati rahen woh pyaaz padhata raha aik nuqtay mein meri mohabbat ka saalan kardiya \n\n𝐈'𝐦 ➠☆||  ⋆⃝❥͜͡Rani ❥||ㅎ\n❖•━━━━━━━━━━━━━━━━•❖\n●●●━━━━━◥💜◤━━━━━●●●",
  
  "❖•━━━━━━━━━━━━━━━━•❖\nTime nikal or Foat hoja 🙂💔 \n\n𝐈'𝐦 ➠☆||  ⋆⃝❥͜͡Rani ❥||ㅎ\n❖•━━━━━━━━━━━━━━━━•❖\n●●●━━━━━◥💜◤━━━━━●●●",
  
  "❖•━━━━━━━━━━━━━━━━•❖\nBs kry tharki kitni Rani Rani kro gy🙂💔 \n\n𝐈'𝐦 ➠☆||  ⋆⃝❥͜͡Rani ❥||ㅎ\n❖•━━━━━━━━━━━━━━━━•❖\n●●●━━━━━◥💜◤━━━━━●●●",
  
  "❖•━━━━━━━━━━━━━━━━•❖\nHaae yeh Pakistani larkiyan Chehray Americi pao africi🥰❣️ \n\n𝐈'𝐦 ➠☆||  ⋆⃝❥͜͡Rani ❥||ㅎ\n❖•━━━━━━━━━━━━━━━━•❖\n●●●━━━━━◥💜◤━━━━━●●●",
  
  "❖•━━━━━━━━━━━━━━━━•❖\nBolo Bolo mery Pizza k Box🙂💔 \n\n𝐈'𝐦 ➠☆||  ⋆⃝❥͜͡Rani ❥||ㅎ\n❖•━━━━━━━━━━━━━━━━•❖\n●●●━━━━━◥💜◤━━━━━●●●",
  
  "❖•━━━━━━━━━━━━━━━━•❖\nI Love you😋\n\n𝐈'𝐦 ➠☆||  ⋆⃝❥͜͡Rani ❥||ㅎ\n❖•━━━━━━━━━━━━━━━━•❖\n●●●━━━━━◥💜◤━━━━━●●●",
  
  "❖•━━━━━━━━━━━━━━━━•❖\nI Hate you🙂💔\n\n𝐈'𝐦 ➠☆||  ⋆⃝❥͜͡Rani ❥||ㅎ\n❖•━━━━━━━━━━━━━━━━•❖\n●●●━━━━━◥💜◤━━━━━●●●",
  
  "❖•━━━━━━━━━━━━━━━━•❖\nI ''F'' you aray pagal mene kaha I Fun you kina ganda sochty ho😁💔 \n\n𝐈'𝐦 ➠☆||  ⋆⃝❥͜͡Rani ❥||ㅎ\n❖•━━━━━━━━━━━━━━━━•❖\n●●●━━━━━◥💜◤━━━━━●●●",
  
  "❖•━━━━━━━━━━━━━━━━•❖\naik kissi do na feeling hoti hoti👄💋\n\n𝐈'𝐦 ➠☆||  ⋆⃝❥͜͡Rani ❥||ㅎ\n❖•━━━━━━━━━━━━━━━━•❖\n●●●━━━━━◥💜◤━━━━━●●●",
  
  "❖•━━━━━━━━━━━━━━━━•❖\nkbhi naaak se balloon bnaya hai😁😁\n\n𝐈'𝐦 ➠☆||  ⋆⃝❥͜͡Rani ❥||ㅎ\n❖•━━━━━━━━━━━━━━━━•❖\n●●●━━━━━◥💜◤━━━━━●●●",
  
  "❖•━━━━━━━━━━━━━━━━•❖\nNikal Pakory Pehli Fursat me nikal😁\n\n𝐈'𝐦 ➠☆||  ⋆⃝❥͜͡Rani ❥||ㅎ\n❖•━━━━━━━━━━━━━━━━•❖\n●●●━━━━━◥💜◤━━━━━●●●",
  
  "❖•━━━━━━━━━━━━━━━━•❖\nTang nai kro I am udas🙂💔\n\n𝐈'𝐦 ➠☆||  ⋆⃝❥͜͡Rani ❥||ㅎ\n❖•━━━━━━━━━━━━━━━━•❖\n●●●━━━━━◥💜◤━━━━━●●●",
  
  "❖•━━━━━━━━━━━━━━━━•❖\nPehly Murghi I thi ya Anda Btao Btao⁉️💔\n\n𝐈'𝐦 ➠☆||  ⋆⃝❥͜͡Rani ❥||ㅎ\n❖•━━━━━━━━━━━━━━━━•❖\n●●●━━━━━◥💜◤━━━━━●●●",
  
  "❖•━━━━━━━━━━━━━━━━•❖\nlaanat bhi kya cheez hai address nah bhi likho mustahiq afraad tak pahonch jati hai\n\n𝐈'𝐦 ➠☆||  ⋆⃝❥͜͡Rani ❥||ㅎ\n❖•━━━━━━━━━━━━━━━━•❖\n●●●━━━━━◥💜◤━━━━━●●●",
  
  "❖•━━━━━━━━━━━━━━━━•❖\nKisi ko sachey dil se chaaho to poori kaayenaat is ki shadi kisi aur se krwane mein lag jati hai\n\n𝐈'𝐦 ➠☆||  ⋆⃝❥͜͡Rani ❥||ㅎ\n❖•━━━━━━━━━━━━━━━━•❖\n●●●━━━━━◥💜◤━━━━━●●●",
  
  "❖•━━━━━━━━━━━━━━━━•❖\nAao dard banttay hain Tum darwazay mein ungli do Phir mil kar cheekhain maartay hain\n\n𝐈'𝐦 ➠☆||  ⋆⃝❥͜͡Rani ❥||ㅎ\n❖•━━━━━━━━━━━━━━━━•❖\n●●●━━━━━◥💜◤━━━━━●●●",
  
  "❖•━━━━━━━━━━━━━━━━•❖\nSuna hai aap ki muskurahat par har koi mrta hai Zara sa time nikaal kar ao chooha marvana hai\n\n𝐈'𝐦 ➠☆||  ⋆⃝❥͜͡Rani ❥||ㅎ\n❖•━━━━━━━━━━━━━━━━•❖\n●●●━━━━━◥💜◤━━━━━●●●",
  
  "❖•━━━━━━━━━━━━━━━━•❖\nTum bhi kunware hum bhi kunware Fitte mun tumahray fitte mun hamaray\n\n𝐈'𝐦 ➠☆||  ⋆⃝❥͜͡Rani ❥||ㅎ\n❖•━━━━━━━━━━━━━━━━•❖\n●●●━━━━━◥💜◤━━━━━●●●",
  
  "❖•━━━━━━━━━━━━━━━━•❖\nGumshudaa cheez par ammi kaisay madad karti hain!! Agar mein aayi aur mujhe mil gayi phir daykhna….\n\n𝐈'𝐦 ➠☆||  ⋆⃝❥͜͡Rani ❥||ㅎ\n❖•━━━━━━━━━━━━━━━━•❖\n●●●━━━━━◥💜◤━━━━━●●●",
  
  "❖•━━━━━━━━━━━━━━━━•❖\nIs ney kaha badal gaye ho tum Mein ney bhi kaha software update hwa hai\n\n𝐈'𝐦 ➠☆||  ⋆⃝❥͜͡Rani ❥||ㅎ\n❖•━━━━━━━━━━━━━━━━•❖\n●●●━━━━━◥💜◤━━━━━●●●",
  
  "❖•━━━━━━━━━━━━━━━━•❖\nHaath pay rakh ke haath woh pyar se boli Yasoo, panjoo, haar, kabootarr, doli\n\n𝐈'𝐦 ➠☆||  ⋆⃝❥͜͡Rani ❥||ㅎ\n❖•━━━━━━━━━━━━━━━━•❖\n●●●━━━━━◥💜◤━━━━━●●●",
  
  "❖•━━━━━━━━━━━━━━━━•❖\nAmmi ne aaj digital saza di hai Charger hi utha kar le gi\n\n𝐈'𝐦 ➠☆||  ⋆⃝❥͜͡Rani ❥||ㅎ\n❖•━━━━━━━━━━━━━━━━•❖\n●●●━━━━━◥💜◤━━━━━●●●"
];

// Trigger words that will activate the bot
const triggerWords = [
  "bot", "Bot", "jan", "Jani", "jani", "Jan", "Janu", "janu"
];

module.exports.handleEvent = async function({ api, event }) {
  try {
    // ✅ FIX: Add safety checks before using event.body
    if (!event || typeof event !== 'object') return;
    if (!event.body || typeof event.body !== 'string') return;
    if (event.type !== "message") return;
    if (event.senderID === api.getCurrentUserID()) return;

    const { senderID, threadID, messageID, body } = event;

    // ✅ FIX: Now it's safe to use toLowerCase()
    const messageText = body.toLowerCase().trim();
    
    const isTriggered = triggerWords.some(word => 
      messageText === word.toLowerCase() || 
      messageText.includes(word.toLowerCase())
    );

    if (!isTriggered) {
      return;
    }

    // Get user info
    const userInfo = await api.getUserInfo(senderID);
    const senderName = userInfo[senderID]?.name || 'User';
    const firstName = senderName.split(' ')[0]; // Get first name only

    // Select a random message
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    // Format the message with user's first name
    const formattedMessage = `🧡★━━━━━✩━━━━━★💥\n𝐍𝐚𝐦𝐞 🐣: ${firstName}\n≪━─━─━─◈─━─━─━≫\n𝐎𝐖𝐍𝐄𝐑: 𝐂𝐇𝐔𝐙𝐀\n${randomMessage}`;

    // Send the message
    await api.sendMessage(formattedMessage, threadID, messageID);

  } catch (error) {
    console.error('Bot command error:', error);
    // Don't send error message to avoid spam
  }
};

// Also keep the run function for manual triggering
module.exports.run = async function({ api, event }) {
  try {
    // ✅ FIX: Add safety checks here too
    if (!event) return;

    const { senderID, threadID, messageID } = event;

    // Get user info
    const userInfo = await api.getUserInfo(senderID);
    const senderName = userInfo[senderID]?.name || 'User';
    const firstName = senderName.split(' ')[0];

    // Select a random message
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    // Format the message
    const formattedMessage = `🧡★━━━━━✩━━━━━★💥\n𝐍𝐚𝐦𝐞 🐣: ${firstName}\n≪━─━─━─◈─━─━─━≫\n𝐎𝐖𝐍𝐄𝐑: 𝐂𝐇𝐔𝐙𝐀\n${randomMessage}`;

    // Send the message
    await api.sendMessage(formattedMessage, threadID, messageID);

  } catch (error) {
    console.error('Bot command error:', error);
    // Don't send error message to avoid spam
  }
};