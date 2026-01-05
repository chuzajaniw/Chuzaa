const axios = require('axios');

module.exports.config = {
    name: "imgur",
    version: "1.0.2",
    hasPermission: 0,
    credits: "CHAND",
    description: "reply img for make link",
    usages: "imgur ",
    cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
    // Check for a reply with an attachment
    const link = event.messageReply?.attachments?.[0]?.url || args.join(" ");
    if (!link) {
        return api.sendMessage('Please reply to an image or provide a valid URL.', event.threadID, event.messageID);
    }

    try {
        const response = await axios.get(`http://fi4.bot-hosting.net:21486/imgur?link=${encodeURIComponent(link)}`);
        const result = response.data.uploaded.image;

        // Check if the image link is valid
        if (result) {
            return api.sendMessage(result, event.threadID, event.messageID);
        } else {
            return api.sendMessage('Failed to retrieve the image. Please try again.', event.threadID, event.messageID);
        }
    } catch (error) {
        console.error('Error fetching image:', error);
        return api.sendMessage('An error occurred while processing your request. Please try again later.', event.threadID, event.messageID);
    }
};
