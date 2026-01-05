module.exports.config = {
    name: "teach",
    version: "1.0.2",
    hasPermission: 0,
    credits: "CHAND",
    description: "Teach the bot new responses.",
    commandCategory: "General",
    usages: "question => answer",
    cooldowns: 5
};

const axios = require('axios');

module.exports.run = async ({ api, event, args }) => {
    const { messageID, threadID } = event;
    const work = args.join(" ");
    const separatorIndex = work.indexOf(" => ");

    // Check if the separator is present
    if (separatorIndex === -1) {
        api.sendMessage("𝗡𝗼 𝗕𝗮𝗕𝗲 𝗔𝘀𝗲 𝗧𝗲𝗮𝗰𝗵 𝗞𝗿𝗼 𝗘𝘅𝗺𝗽𝗹𝗲: teach 𝗝𝗮𝗻 => 𝗝𝗲𝗲 𝗠𝗲𝗿𝗶 𝗝𝗮𝗮𝗻", threadID, messageID);
        return;
    }

    // Extract the question and answer
    const ask = work.slice(0, separatorIndex).trim();
    const ans = work.slice(separatorIndex + 4).trim();

    // Check if both question and answer are provided
    if (!ask) {
        api.sendMessage("Missing question. Please provide a question.", threadID, messageID);
        return;
    }
    if (!ans) {
        api.sendMessage("Missing answer. Please provide an answer.", threadID, messageID);
        return;
    }

    try {
        // Construct the API URL with encoded parameters
        const apiUrl = `http://fi7.bot-hosting.net:20085/teach?ask=${encodeURIComponent(ask)}&ans=${encodeURIComponent(ans)}`;

        // Send the request to the API
        const response = await axios.get(apiUrl);
        const reply = response.data.reply;

        // Handle different API responses
        if (reply === "Key and value have all cmnr, add the cc") {
            api.sendMessage("The question and answer already exist.", threadID, messageID);
        } else if (reply === "There's something wrong with cc, I don't know") {
            api.sendMessage("An unknown error occurred. Please try again later.", threadID, messageID);
        } else {
            api.sendMessage(`╔═══ ❖ • ೋ°ೋ • ❖ ═══╗\n\n  𝐘𝐨𝐮𝐫 𝐚𝐬𝐤: ➠ ${ask}\n\n  𝐒𝐢𝐦 𝐫𝐞𝐬𝐩𝐨𝐧𝐝: ➠ ${ans}\n\n╚═══ ❖ • ೋ°ೋ • ❖ ═══╝`, threadID, messageID);
        }
    } catch (error) {
        // Log error details for debugging
        console.error("Error occurred while communicating with the API:", error.message || error);

        // Inform the user about the error
        api.sendMessage("An error occurred while processing your request. Please try again later.", threadID, messageID);
    }
};
