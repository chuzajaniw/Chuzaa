module.exports.config = {
  name: 'google',
  version: '1.0.0',
  hasPermission: 0,
  hasPrefix: true,
  description: "url create ",
  usages: "google text",
  credits: 'CHAND',
  cooldowns: 3,
  dependencies: {
    "axios": ""
  }
};

module.exports.run = async function({ api, event, args }) {
    try {
        let textNeedSearch = "";
        const regex = /(https?:\/\/.*?\.(?:png|jpe?g|gif)(?:\?(?:[\w_-]+=[\w_-]+)(?:&[\w_-]+=[\w_-]+)*)?(.*))/;

        if (event.type === "message_reply") {
            textNeedSearch = event.messageReply.attachments[0].url;
        } else {
            textNeedSearch = args.join(" ");
        }

        if (regex.test(textNeedSearch)) {
            // If it's an image URL, perform a Google image search
            api.sendMessage(`https://www.google.com/searchbyimage?&image_url=${textNeedSearch}`, event.threadID, event.messageID);
        } else {
            // Otherwise, perform a regular Google search
            api.sendMessage(`https://www.google.com.vn/search?q=${encodeURIComponent(textNeedSearch)}`, event.threadID, event.messageID);
        }
    } catch (error) {
        console.error('Error occurred:', error);
        api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
    }
};
