const axios = require('axios'); // Correct import for axios

module.exports.config = {
  name: "decode",
  version: "1.0.0",
  role: 0,
  hasPrefix: true,
  credits: "CHAND",
  description: "Decode binary text to readable text",
  usage: "decode [code text ]",
  cooldown: 10,
};

module.exports.run = async ({ api, event, args }) => {
  try {
    // Join arguments to form the binary text input
    let binaryText = args.join(" ");

    // Make API request to decode binary text
    const response = await axios.get(`https://api.popcat.xyz/decode?binary=${encodeURIComponent(binaryText)}`);

    // Extract decoded text from response
    let decodedText = response.data.text;

    // Send decoded text as a message
    return api.sendMessage(`${decodedText}`, event.threadID, event.messageID);
  } catch (error) {
    // Handle errors and send an error message
    return api.sendMessage(`Error decoding text: ${error.message}`, event.threadID, event.messageID);
  }
};
