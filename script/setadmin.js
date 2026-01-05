const fs = require('fs');

module.exports.config = {
    name: "setadmin",
    version: "1.0.0",
    role: 3, // Owner only
    hasPrefix: true,
    aliases: ["addowner"],
    description: "Set bot admin (owner only)",
    usage: "{p}setadmin [userID]",
    credits: "Developer",
    cooldown: 0
};

module.exports.run = async function({ api, event, args }) {
    const { threadID, messageID, senderID } = event;
    
    const configPath = './data/config.json';
    
    // Check if config exists
    if (!fs.existsSync(configPath)) {
        return api.sendMessage("❌ Config file not found! Please start the bot first.", threadID, messageID);
    }
    
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    const currentAdmins = config[0]?.masterKey?.admin || [];
    
    // Only allow if no admins set yet or sender is in admin list
    if (currentAdmins.length > 0 && !currentAdmins.includes(senderID)) {
        return api.sendMessage("❌ You are not authorized to use this command!", threadID, messageID);
    }
    
    if (args.length === 0) {
        // Show current admins
        if (currentAdmins.length === 0) {
            return api.sendMessage("🤖 No admins set yet. Use: setadmin [yourUserID]", threadID, messageID);
        }
        
        let adminList = "👑 **Current Admins:**\n";
        for (const adminID of currentAdmins) {
            try {
                const userInfo = await api.getUserInfo(adminID);
                const userName = userInfo[adminID]?.name || 'Unknown';
                adminList += `• ${userName} (${adminID})\n`;
            } catch (error) {
                adminList += `• ${adminID}\n`;
            }
        }
        
        return api.sendMessage(adminList, threadID, messageID);
    }
    
    const newAdminID = args[0];
    
    // Validate user ID
    if (!/^\d+$/.test(newAdminID)) {
        return api.sendMessage("❌ Invalid user ID format!", threadID, messageID);
    }
    
    // Check if already admin
    if (currentAdmins.includes(newAdminID)) {
        return api.sendMessage("❌ User is already an admin!", threadID, messageID);
    }
    
    // Add to admin list
    currentAdmins.push(newAdminID);
    config[0].masterKey.admin = currentAdmins;
    
    // Save config
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    
    // Get user info for confirmation
    try {
        const userInfo = await api.getUserInfo(newAdminID);
        const userName = userInfo[newAdminID]?.name || 'Unknown User';
        api.sendMessage(`✅ Successfully added ${userName} (${newAdminID}) as bot admin!`, threadID, messageID);
    } catch (error) {
        api.sendMessage(`✅ Successfully added user ${newAdminID} as bot admin!`, threadID, messageID);
    }
};