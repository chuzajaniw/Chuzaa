module.exports = {
  config: {
    name: "leave",
    role: 2, // Thread admins only
    version: "1.0.0",
    hasPrefix: true,
    aliases: ["setleave"],
    description: "Configure leave messages for members",
    usage: "leave [on/off/set <message>]",
    credits: "YourName",
    cooldown: 5
  },

  run: async function({ api, event, args }) {
    const configPath = './data/welcomeConfig.json';
    let config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    
    if (args.length === 0) {
      const status = config.leaveEnabled ? "ON ✅" : "OFF ❌";
      return api.sendMessage(
        `🤖 Leave System Configuration:\n\n` +
        `Status: ${status}\n` +
        `Current Message: ${config.leaveMessage}\n\n` +
        `Usage:\n` +
        `• leave on - Enable leave messages\n` +
        `• leave off - Disable leave messages\n` +
        `• leave set <message> - Set custom leave message\n` +
        `• leave preview - Preview current leave message`,
        event.threadID
      );
    }

    const action = args[0].toLowerCase();

    switch (action) {
      case 'on':
        config.leaveEnabled = true;
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
        api.sendMessage("✅ Leave messages enabled!", event.threadID);
        break;

      case 'off':
        config.leaveEnabled = false;
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
        api.sendMessage("❌ Leave messages disabled!", event.threadID);
        break;

      case 'set':
        const newMessage = args.slice(1).join(' ');
        if (!newMessage) {
          return api.sendMessage("Please provide a leave message. Use placeholders: {userName}, {groupName}, {memberCount}", event.threadID);
        }
        config.leaveMessage = newMessage;
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
        api.sendMessage("✅ Leave message updated!", event.threadID);
        break;

      case 'preview':
        const preview = await generateLeaveMessage(api, event, config.leaveMessage);
        api.sendMessage(preview, event.threadID);
        break;

      default:
        api.sendMessage("❌ Invalid option. Use 'leave' to see available options.", event.threadID);
    }
  }
};