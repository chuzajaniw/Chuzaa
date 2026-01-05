const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

// Module configuration
module.exports.config = {
  name: "ss",
  version: "1.0.0",
  role: 0,
  hasPrefix: true,
  credits: "CHAND",
  description: "screenshot for web",
  usages: "ss reply pic",
  cooldowns: 0,
};

// Function to take a screenshot of a website
module.exports.run = async ({ event, api, args }) => {
  const { createReadStream, unlinkSync } = require('fs-extra');
  const { join } = require('path');

  try {
    // Ensure args[0] is a valid URL
    const url = args[0];
    if (!url) {
      return api.sendMessage("Please provide a valid URL.", event.threadID, event.messageID);
    }

    // Path to save the screenshot
    const screenshotPath = join(__dirname, `cache`, `${event.threadID}-${event.senderID}s.png`);

    // Ensure the cache directory exists
    await fs.ensureDir(path.dirname(screenshotPath));

    // Construct API URL for taking the screenshot
    const apiUrl = `http://fi3.bot-hosting.net:21943/api/maker/ssweb?url=${encodeURIComponent(url)}`;

    // Make the API request
    const response = await axios({
      url: apiUrl,
      method: 'GET',
      responseType: 'stream',
      timeout: 10000, // 10 seconds timeout
    });

    // Check if the response status is OK
    if (response.status !== 200) {
      throw new Error(`Received status code ${response.status}`);
    }

    // Create a write stream to save the image
    const writeStream = fs.createWriteStream(screenshotPath);
    response.data.pipe(writeStream);

    // Return a promise that resolves when the file write is complete
    await new Promise((resolve, reject) => {
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
    });

    // Send the screenshot as an attachment
    api.sendMessage({ attachment: createReadStream(screenshotPath) }, event.threadID, () => unlinkSync(screenshotPath), event.messageID);
  } catch (error) {
    console.error('Error while processing the URL:', error);
    return api.sendMessage("This URL could not be processed. Please check the URL format and try again.", event.threadID, event.messageID);
  }
};
