const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "welcome",
    role: 2, // Thread admins only
    version: "1.0.0",
    hasPrefix: true,
    aliases: ["setwelcome"],
    description: "Configure welcome messages for new members",
    usage: "welcome [on/off/set <message>]",
    credits: "YourName",
    cooldown: 5
  },

  run: async function({ api, event, args }) {
    const configPath = './data/welcomeConfig.json';
    let config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    
    if (args.length === 0) {
      const status = config.welcomeEnabled ? "ON ✅" : "OFF ❌";
      return api.sendMessage(
        `🤖 Welcome System Configuration:\n\n` +
        `Status: ${status}\n` +
        `Current Message: ${config.welcomeMessage}\n\n` +
        `Usage:\n` +
        `• welcome on - Enable welcome messages\n` +
        `• welcome off - Disable welcome messages\n` +
        `• welcome set <message> - Set custom welcome message\n` +
        `• welcome preview - Preview current welcome message`,
        event.threadID
      );
    }

    const action = args[0].toLowerCase();

    switch (action) {
      case 'on':
        config.welcomeEnabled = true;
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
        api.sendMessage("✅ Welcome messages enabled!", event.threadID);
        break;

      case 'off':
        config.welcomeEnabled = false;
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
        api.sendMessage("❌ Welcome messages disabled!", event.threadID);
        break;

      case 'set':
        const newMessage = args.slice(1).join(' ');
        if (!newMessage) {
          return api.sendMessage("Please provide a welcome message. Use placeholders: {userName}, {groupName}, {memberCount}", event.threadID);
        }
        config.welcomeMessage = newMessage;
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
        api.sendMessage("✅ Welcome message updated!", event.threadID);
        break;

      case 'preview':
        const preview = await generateWelcomeMessage(api, event, config.welcomeMessage);
        api.sendMessage(preview, event.threadID);
        break;

      default:
        api.sendMessage("❌ Invalid option. Use 'welcome' to see available options.", event.threadID);
    }
  }
};