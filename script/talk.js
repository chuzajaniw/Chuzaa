const axios = require('axios');

module.exports.config = {
  name: 'talk',
  version: '1.0.0',
  role: 0,
  hasPrefix: true,
  description: "talk asked anything",
  usage: "talk <text> ",
  credits: 'CHAND',
};

module.exports.run = async function ({ api, event, args }) {
    try {
        const { messageID, messageReply } = event;
        let prompt = args.join(' ');

        if (messageReply) {
            const repliedMessage = messageReply.body;
            prompt = `${repliedMessage} ${prompt}`;
        }

        if (!prompt) {
            return api.sendMessage('Please provide a prompt to generate a text response.\nExample: ai What is the meaning of life?', event.threadID, messageID);
        }

        // Delay
        await new Promise(resolve => setTimeout(resolve, 2000)); // Adjust the delay time as needed

        const gpt4_api = `https://api.popcat.xyz/chatbot?msg=${encodeURIComponent(prompt)}`;

        const response = await axios.get(gpt4_api);

        if (response.data && response.data.response) {
            const generatedText = response.data.response;

            // Ai Answer Here
            api.sendMessage(`🤖 Talk Answer\n━━━━━━━━━━━━━━━━\n\n𝗔𝗻𝘀𝘄𝗲𝗿: ${generatedText}\n\n━━━━━━━━━━━━━━━━`, event.threadID, messageID);
        } else {
            console.error('API response did not contain expected data:', response.data);
            api.sendMessage(`❌ An error occurred while generating the text response. Please try again later. Response data: ${JSON.stringify(response.data)}`, event.threadID, messageID);
        }
    } catch (error) {
        console.error('Error:', error);
        api.sendMessage(`❌ An error occurred while generating the text response. Please try again later. Error details: ${error.message}`, event.threadID, event.messageID);
    }
};