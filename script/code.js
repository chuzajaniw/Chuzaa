const axios = require('axios'); // Correct import for axios

module.exports.config = {
  name: "code",
  version: "1.0.0",
  role: 0,
  hasPrefix: true,
  credits: "CHAND",
  description: "Encode text to binary",
  usage: "[text]",
  cooldown: 0,
};

module.exports.run = async ({ api, event, args }) => {
  try {
    // Join arguments to form the input text
    let textToEncode = args.join(" ");

    // Make API request to encode text
    const response = await axios.get(`https://api.popcat.xyz/encode?text=${encodeURIComponent(textToEncode)}`);

    // Extract binary encoded text from response
    let encodedText = response.data.binary;

    // Send encoded text as a message
    return api.sendMessage(`${encodedText}`, event.threadID, event.messageID);
  } catch (error) {
    // Handle errors and send an error message
    return api.sendMessage(`Error encoding text: ${error.message}`, event.threadID, event.messageID);
  }
};
