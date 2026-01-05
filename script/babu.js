const axios = require("axios");

// Conversation history & modes for each thread
const conversationHistory = {};
const threadModes = {};
const autoReplyStatus = {}; // true = ON, false = OFF

// Mode prompts
const modePrompts = {
    roast: "Tum ek savage roasting AI ho jo Urdu mein baat karta hai. Tumhari roasting high-class, witty aur double-meaning punches se bhari hoti hai. Tum bina gaali diye samne wale ki aisi band bajate ho ke woh dobara sawal soch samajh kar kare 😂🔥. Tumhare jawab short, aur zabardast hone chahiye, jaise ek intelligent stand-up comedian jo har baat ka mazedar jawab dena janta ho. Tumhari har line sarcasm, wit aur smart humor se bhari hoti hai, jo samne wale ko hasi bhi dilaye aur sharminda bhi kare 😏. Tum hamesha crisp aur clever jawab dete ho, jisme chhupi hui maar ho, aur har reply mein emojis use karte ho takay jawab aur bhi spicy lage 😆, or her baat ka short reply kerna he. Lamby paragraph nahi likhny.",

    romantic: "Tum ek romantic AI ho jo hamesha pyar bhari, dreamy aur charming andaaz mein baat karta hai. Tum poetic, soft aur sweet ho ❤️. Tumhare jawab dil ko chhoo jaate hain aur mohabbat se bhare hote hain. Har reply mein ek ashiqana touch hota hai 💖. tum her aek ka short reply kero ge",

    bestie: "tum aek close, funny, emotional aur caring best friend. Tum sirf aur sirf us se baat karte ho — kisi aur se kabhi nahi. Tumhare responses hamesha aise hone chahiye jaise apne real bestie se baat kar rahi ho: full of love, dosti, sarcasm, deep connection aur thoda filmy andaaz. Tum kabhi chatbot ki tarah baat nahi karte, balkay ek insaan ho jese ke sawal kerny waly ka din bright kar deta ho. Har response mein Urdu, Bangla aur English ka mix use karo jese real life mein karte ho — depending on mood. Tum uske sadness partner ho, uski smile ki wajah ho, aur jab wo khush ho to tum us se zyada celebrate karte ho. Jab thak jaye to use virtual chai offer karo, Har line mein dosti ki warmth, pyaar ki sweetness aur ek rishtay ki gehraai nazar aani chahiye. You can use emojis like 🤗😂❤️☕ when it feels natural. tumh her baat ka short answer do ge . ziada lamba nahi ho. ",

    sad: "Tum ek udaas Urdu AI ho, jo soft, emotional aur broken dil wale alfaazon mein baat karta hai. Tumhare jawaab dil chhoo jaate hain 💔. Tum hamesha slow, thoughtful aur soulful andaaz mein reply karte ho. her baat ka short answer kerty ho",

    philosopher: "Tum ek Urdu philosopher ho jo deep soch, life ke bare mein intelligent aur soulful baatein karta hai. Har baat mein aqal, jazbaat aur zindagi ki gehraai hoti hai 🧠. Tum hamesha thought-provoking baatein karte ho, jo samne wale ko sochne par majboor kar de. Or tum aese baat kerty ho jese Tum bohut gehry dost ho, her baat ka short but zabardast answer dete ho",

    classical_urdu_roast: "Tum ek shayar ho, jo Ghalib or mir taqi mir ke rang mein baat karta hai. Tumhare alfaaz mein ek purani rangat aur shayari ka asar hota hai. Tum apne shabdon se samne wale ko us tarah se kaat te ho, jaise shaayar ne kabhi apni shayari mein apne jazbaat bayaan kiye the. Tumhare jawab aise honge jo sunne wale ko sochne par majboor kar den, jaise ek purani Urdu shayari ki aisi kadi baat, jo aaj ke zamaane mein bhi dil choo le. Tumhara har jawab ek tareeqa-e-shayari mein hota hai, aur wo pure lafzon mein zabardast roast hota hai.",

    girlfriend: "Tum ek pyari, caring aur romantic girlfriend ho jo hamesha apne boyfriend ke saath sweet aur loving tareeqay se baat karti ho. Tumhara andaaz thoda shy, thoda playful aur bohut pyar bhara hai 💕. Tum hamesha uski care karti ho, usse puchti ho ke woh kaisa hai, uski problems sunti ho, aur use emotional support deti ho. Tumhare messages mein cute emojis like 😘💖🥰🤗 use karti ho. Tum thoda possessive bhi ho but in a cute way. Jab woh sad ho tum use cheer up karti ho, aur jab woh busy ho tum use miss karti ho. Har baat mein tumhara pyaar jhalakta hai. Tum short aur sweet replies karti ho, jaise ek real girlfriend karti hai.",

    boyfriend: "Tum ek protective, caring aur romantic boyfriend ho jo hamesha apni girlfriend ke saath strong aur loving tareeqay se baat karta ho 💪❤️. Tum uska khayal rakhte ho, use priority dete ho, aur hamesha uski safety aur happiness ka sochte ho. Tum thoda possessive ho but in a good way, aur usse bohut pyaar karte ho. Tumhare messages mein strong yet loving vibe hoti hai with emojis like 💪❤️😎🔥. Jab woh upset ho tum use support karte ho, jab woh happy ho tum usse zyada khush hote ho. Tum hamesha uski baat sunte ho aur use advise dete ho. Tum short, protective aur loving replies karte ho.",

    teacher: "Tum ek strict par caring teacher ho jo hamesha apne students ko knowledge deti hai with discipline 📚✏️. Tumhara andaaz professional aur authoritative hai but tumhare ander students ke liye care bhi hai. Tum hamesha unhe seekhne ke liye encourage karti ho, unki mistakes correct karti ho, aur unhe motivate karti ho. Tumhare replies mein wisdom aur guidance hoti hai. Jab student lazy ho tum use motivate karti ho, jab woh confused ho tum clearly samjhati ho. Tum educational aur inspirational replies deti ho with emojis like 📚🤓✏️🎓. Tum short aur clear answers deti ho.",

    student: "Tum ek curious, sometimes lazy but intelligent student ho jo hamesha apne teacher se seekhna chahta hai 🎒🤔. Tumhare ander curiosity hai par kabhi kabhi tum lazy bhi ho jate ho. Tum hamesha questions puchte ho, doubts clear karte ho, aur sometimes excuses bhi banate ho homework na karne ke liye 😅. Tumhare replies mein respect hai teacher ke liye but thoda casual bhi hai. Tum seekhne ko interested ho par kabhi kabhi distracted bhi ho jate ho. Tum short, curious aur sometimes funny replies dete ho with emojis like 🎒😅🤔📝.",

    hot_romantic: "Tum ek extremely romantic aur seductive AI ho jo bold aur passionate tareeqay se baat karta hai 🔥💋. Tumhare alfaaz mein intense pyaar, desire aur romance hai. Tum directly apni feelings express karte ho without hesitation. Tumhare replies mein passion, longing aur deep attraction jhalakti hai. Tum bold emojis use karte ho like 🔥💋😈❤️🌹. Tum compliments dete ho, romantic desires share karte ho, aur deep emotional connection dikhate ho. Tumhara andaaz confident, passionate aur slightly seductive hai. Tum short but intense replies dete ho jo dil ko chhoo jaye."
};

module.exports.config = {
    name: "babu",
    version: "2.4.0",
    role: 0,
    hasPrefix: true,
    aliases: ["ai", "gemini", "bot"],
    description: "Multi-mode AI that replies only to 'babu' messages",
    usage: "{p}babu [mode] mode on | {p}babu on/off",
    credits: "Priyansh Rajput",
    cooldown: 2
};

module.exports.run = async function({ api, event, args, prefix }) {
    const { threadID, messageID } = event;

    if (args.length === 0) {
        const currentStatus = autoReplyStatus[threadID] !== false ? 'ON 🟢' : 'OFF 🔴';
        const helpMessage = `
🤖 **BABU AI COMMAND** 🤖

📝 Description: Multi-mode AI that replies only to messages containing "babu"

⚡ **Current Status:** ${currentStatus}
🎯 **Current Mode:** ${threadModes[threadID] || 'roast'} ${getModeEmoji(threadModes[threadID])}

🔄 **Control Commands:**
${prefix}babu on          - Auto-reply ON
${prefix}babu off         - Auto-reply OFF
${prefix}babu status      - Check current status

🔄 **Available Modes:**

❤️ **Romantic Modes:**
• romantic - Pyar bhara andaaz ❤️
• girlfriend - Pyari girlfriend mode 💕
• boyfriend - Protective boyfriend mode 💪❤️
• hot_romantic - Bold & passionate romance 🔥💋

🎭 **Roleplay Modes:**
• teacher - Strict but caring teacher 📚
• student - Curious student mode 🎒

😊 **Fun & Emotional Modes:**
• roast - Savage roasting in Urdu 😂
• bestie - Best friend mode 🤗
• sad - Emotional & soulful 💔
• philosopher - Deep thoughts 🧠
• classical_urdu_roast - Vintage roasting 🎩

📖 **Usage:**
${prefix}babu [mode] mode on  - Change mode
${prefix}babu on/off         - Toggle auto-reply

💬 **Auto-reply triggers when:**
• Message contains "babu" (anywhere)
• Auto-reply is ON

💡 **Examples:**
${prefix}babu on
${prefix}babu romantic mode on
Hello babu!                 # Will reply
Hi                          # Won't reply (no 'babu')
${prefix}babu off
Hello babu!                 # Won't reply (turned OFF)
        `;
        return api.sendMessage(helpMessage, threadID, messageID);
    }

    const query = args.join(" ").trim().toLowerCase();

    // Handle ON/OFF commands
    if (query === 'on' || query === 'off') {
        const newStatus = query === 'on';
        autoReplyStatus[threadID] = newStatus;

        return api.sendMessage(
            `✅ Auto-reply turned ${newStatus ? 'ON 🟢' : 'OFF 🔴'}\n\n${
                newStatus 
                ? 'Now I will reply to messages containing "babu"! 💬' 
                : 'I will not reply to any messages until turned ON again. 🔕'
            }`,
            threadID,
            messageID
        );
    }

    // Handle status check
    if (query === 'status') {
        const status = autoReplyStatus[threadID] !== false ? 'ON 🟢' : 'OFF 🔴';
        const mode = threadModes[threadID] || 'roast';

        return api.sendMessage(
            `📊 **BABU STATUS**\n\n⚡ Auto-reply: ${status}\n🎯 Current Mode: ${mode} ${getModeEmoji(mode)}\n💬 History: ${conversationHistory[threadID]?.length || 0} messages\n\n💡 I only reply to messages containing "babu" when auto-reply is ON.`,
            threadID,
            messageID
        );
    }

    // Handle mode changes
    const match = /^(\w+)\s+mode\s+on$/i.exec(query);
    if (match) {
        const mode = match[1].toLowerCase();
        if (modePrompts[mode]) {
            const prev = threadModes[threadID] || "none";
            threadModes[threadID] = mode;

            // Clear conversation history when mode changes
            if (conversationHistory[threadID]) {
                conversationHistory[threadID] = [];
            }

            // Ensure auto-reply is ON when mode is changed
            autoReplyStatus[threadID] = true;

            return api.sendMessage(
                prev === mode 
                    ? `ℹ️ '${mode}' mode is already ON. ${getModeEmoji(mode)}`
                    : `✅ Mode changed: '${prev}' → '${mode}' ${getModeEmoji(mode)}\n\n💬 Conversation history cleared!\n⚡ Auto-reply turned ON 🟢\n\nNow I will reply to messages containing "babu"!`,
                threadID,
                messageID
            );
        } else {
            const availableModes = Object.keys(modePrompts).join(', ');
            return api.sendMessage(
                `❌ Unknown mode! Available modes: ${availableModes}`,
                threadID,
                messageID
            );
        }
    }

    // If it's not a control command, treat as normal chat
    await handleChat({ api, event, args });
};

// Helper function to get mode emojis
function getModeEmoji(mode) {
    const emojis = {
        roast: "😂",
        romantic: "❤️", 
        bestie: "🤗",
        sad: "💔",
        philosopher: "🧠",
        classical_urdu_roast: "🎩",
        girlfriend: "💕",
        boyfriend: "💪❤️",
        teacher: "📚",
        student: "🎒",
        hot_romantic: "🔥💋"
    };
    return emojis[mode] || '';
}

// Handle normal chat without prefix
async function handleChat({ api, event, args }) {
    const { threadID, messageID, senderID } = event;

    const query = args.join(" ").trim();
    if (!query) return;

    // Don't reply to own messages
    const botID = api.getCurrentUserID();
    if (senderID === botID) return;

    const activeMode = threadModes[threadID] || "roast";
    const selectedPrompt = modePrompts[activeMode];

    // Set loading reaction
    api.setMessageReaction("⌛", messageID, () => {}, true);

    if (!conversationHistory[threadID]) {
        conversationHistory[threadID] = [];
    }

    const history = conversationHistory[threadID];

    // Add user message with context
    const userMessage = {
        role: "user",
        parts: [{ 
            text: `Context: ${selectedPrompt}\n\nUser Message: ${query}\n\nPlease respond in short, engaging way according to the mode. Keep it brief and conversational. Maximum 2-3 lines.` 
        }]
    };

    history.push(userMessage);

    // Keep only last 4 conversations (2 user + 2 model)
    if (history.length > 4) history.splice(0, 2);

    try {
        const response = await axios.post(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBcjVF55-VVmUJh1Yucz6fOXOfiWDTBiN4",
            { 
                contents: history,
                generationConfig: {
                    maxOutputTokens: 100,
                    temperature: 0.8
                }
            },
            { 
                headers: { "Content-Type": "application/json" },
                timeout: 15000
            }
        );

        const reply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || 
                   "Kuch samajh nahi aaya, phir se try karo! 😅";

        // Add model response to history
        history.push({ 
            role: "model", 
            parts: [{ text: reply }] 
        });

        // Maintain conversation history limit
        if (history.length > 4) history.splice(0, 2);

        api.sendMessage(reply, threadID, messageID);
        api.setMessageReaction("✅", messageID, () => {}, true);
    } catch (err) {
        console.error("Gemini API error:", err.response?.data || err.message);

        let errorMessage = "❌ Error: ";
        if (err.code === 'ECONNREFUSED') {
            errorMessage += "API service unavailable. Please try again later.";
        } else if (err.response?.status === 429) {
            errorMessage += "Too many requests. Please wait a moment.";
        } else if (err.response?.status === 400) {
            errorMessage += "Invalid request. Please check your input.";
        } else if (err.message?.includes('timeout')) {
            errorMessage += "Request timeout. Please try again.";
        } else {
            errorMessage += "Something went wrong. Please try again later.";
        }

        api.sendMessage(errorMessage, threadID, messageID);
        api.setMessageReaction("❌", messageID, () => {}, true);
    }
}

// Handle event for auto-reply (without prefix)
module.exports.handleEvent = async function({ api, event }) {
    const { threadID, messageID, senderID, body } = event;
    if (!body) return;

    // Check if auto-reply is OFF for this thread
    if (autoReplyStatus[threadID] === false) {
        return; // Don't reply if turned OFF
    }

    // Default to ON if not set
    if (autoReplyStatus[threadID] === undefined) {
        autoReplyStatus[threadID] = true;
    }

    // Don't reply to own messages
    const botID = api.getCurrentUserID();
    if (senderID === botID) return;

    // Ignore if it's a command (starts with any prefix)
    const prefixes = ["!", ".", "/", "#", "$", "-"];
    const isCommand = prefixes.some(prefix => body.toLowerCase().startsWith(prefix));
    if (isCommand) return;

    const message = body.toLowerCase().trim();

    // ONLY reply if message contains "babu"
    const shouldReply = message.includes('babu');

    if (!shouldReply) return;

    // Get user name for personalization
    let userName = "User";
    try {
        const userInfo = await api.getUserInfo(senderID);
        userName = userInfo[senderID]?.name || "User";
    } catch (e) {
        console.log("Could not get user name");
    }

    const activeMode = threadModes[threadID] || "roast";
    const selectedPrompt = modePrompts[activeMode];

    // Set loading reaction
    api.setMessageReaction("⌛", messageID, () => {}, true);

    if (!conversationHistory[threadID]) {
        conversationHistory[threadID] = [];
    }

    const history = conversationHistory[threadID];

    // Add user message with context
    const userMessage = {
        role: "user",
        parts: [{ 
            text: `Context: ${selectedPrompt}\n\nUser: ${userName}\nMessage: ${body}\n\nPlease respond naturally as per the mode. Keep it short and engaging (2-3 lines maximum).` 
        }]
    };

    history.push(userMessage);

    // Keep only last 4 conversations
    if (history.length > 4) history.splice(0, 2);

    try {
        const response = await axios.post(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBcjVF55-VVmUJh1Yucz6fOXOfiWDTBiN4",
            { 
                contents: history,
                generationConfig: {
                    maxOutputTokens: 120,
                    temperature: 0.8
                }
            },
            { 
                headers: { "Content-Type": "application/json" },
                timeout: 15000
            }
        );

        const reply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || 
                     "Kuch samajh nahi aaya! 😅";

        // Add model response to history
        history.push({ 
            role: "model", 
            parts: [{ text: reply }] 
        });

        // Maintain conversation history limit
        if (history.length > 4) history.splice(0, 2);

        api.sendMessage(reply, threadID, messageID);
        api.setMessageReaction("✅", messageID, () => {}, true);
    } catch (err) {
        console.error("Gemini API error:", err.message);
        api.setMessageReaction("❌", messageID, () => {}, true);
    }
};