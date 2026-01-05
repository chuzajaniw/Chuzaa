const fs = require('fs-extra');
const pathFile = __dirname + '/data/autoseen.txt';

module.exports.config = {
    name: "autoseen",
    version: "1.0.0",
    role: 1,
    credits: "CHAND",
    description: "Turn on/off automatically seen when new messages are available",
    aliases: ["seen"],
    cooldown: 0,
    hasPrefix: true,
    usage: "autoseen on/off",
};

// Handles events and marks all messages as read if autoseen is enabled
module.exports.handleEvent = async function({ api, event }) {
    // Ensure the file exists, default to 'true' if not
    if (!fs.existsSync(pathFile)) {
        fs.writeFileSync(pathFile, 'true');
    }

    // Read the current state from the file
    const isEnable = fs.readFileSync(pathFile, 'utf-8');

    // If autoseen is enabled, mark all messages as read
    if (isEnable === 'true') {
        api.markAsReadAll(() => {});
    }
};

// Runs the command to toggle autoseen on or off
module.exports.run = async function({ api, event, args }) {
    try {
        if (args[0] === 'on') {
            fs.writeFileSync(pathFile, 'true');
            api.sendMessage('━━▣━━◤◢━━▣━━━\n\n𝐒𝐮𝐜𝐜𝐞𝐬𝐬𝐟𝐮𝐥𝐥𝐲 𝐎𝐧 𝐚𝐮𝐭𝐨𝐬𝐞𝐞𝐧\n\n━━▣━━◤◢━━▣━━━', event.threadID, event.messageID);
        } else if (args[0] === 'off') {
            fs.writeFileSync(pathFile, 'false');
            api.sendMessage('━━▣━━◤◢━━▣━━━\n\n𝐒𝐮𝐜𝐜𝐞𝐬𝐬𝐟𝐮𝐥𝐥𝐲 𝐎𝐟𝐟 𝐚𝐮𝐭𝐨𝐬𝐞𝐞𝐧\n\n━━▣━━◤◢━━▣━━━', event.threadID, event.messageID);
        } else {
            api.sendMessage('Incorrect syntax. Use "autoseen on" or "autoseen off".', event.threadID, event.messageID);
        }
    } catch (e) {
        console.error('Error in autoseen command:', e);
        api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
    }
};
