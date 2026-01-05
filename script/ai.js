const axios = require('axios');

module.exports.config = {
  name: 'ai',
  version: '1.0.0',
  role: 0,
  hasPrefix: true,
  aliases: ['gpt'],
  description: "ai asked anything",
  usage: "ai <text> ",
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
        api.sendMessage('🔍 Searching for an answer to your question...', event.threadID);

        // Delay
        await new Promise(resolve => setTimeout(resolve, 2000)); // Adjust the delay time as needed

        const gpt4_api = `https://gpt4withcustommodel.onrender.com/gpt?query=${encodeURIComponent(prompt)}&model=gpt-4-32k-0314`;

        const response = await axios.get(gpt4_api);

        if (response.data && response.data.response) {
            const generatedText = response.data.response;

            // Ai Answer Here
            api.sendMessage(`🤖 Ai Answer\n━━━━━━━━━━━━━━━━\n\n𝗔𝗻𝘀𝘄𝗲𝗿: ${generatedText}\n\n━━━━━━━━━━━━━━━━`, event.threadID, messageID);
        } else {
            console.error('API response did not contain expected data:', response.data);
            api.sendMessage(`❌ An error occurred while generating the text response. Please try again later. Response data: ${JSON.stringify(response.data)}`, event.threadID, messageID);
        }
    } catch (error) {
        console.error('Error:', error);
        api.sendMessage(`❌ An error occurred while generating the text response. Please try again later. Error details: ${error.message}`, event.threadID, event.messageID);
    }
};