const fs = require('fs');
const path = require('path');

module.exports.config = {
    name: "admin",
    version: "1.0.0",
    role: 1, // Bot admin only
    hasPrefix: true,
    aliases: ["botadmin", "master"],
    description: "Bot administration commands",
    usage: "{p}admin [command] [args]",
    credits: "Developer",
    cooldown: 0
};

module.exports.run = async function({ api, event, args, prefix }) {
    const { threadID, messageID, senderID } = event;
    
    // Check if user is bot admin
    const configPath = './data/config.json';
    if (!fs.existsSync(configPath)) {
        return api.sendMessage("❌ Config file not found!", threadID, messageID);
    }
    
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    const adminList = config[0]?.masterKey?.admin || [];
    
    if (!adminList.includes(senderID)) {
        return api.sendMessage("❌ You are not authorized to use admin commands!", threadID, messageID);
    }

    if (args.length === 0) {
        const helpMessage = `
🤖 **BOT ADMIN COMMANDS** 🤖

📊 **User Management:**
${prefix}admin users              - Show all logged-in users
${prefix}admin logout [userID]    - Logout specific user
${prefix}admin logout all         - Logout all users

⚙️ **Bot Control:**
${prefix}admin restart            - Restart the bot
${prefix}admin shutdown           - Shutdown the bot
${prefix}admin status             - Bot status & statistics

🔧 **System Commands:**
${prefix}admin cleanup           - Clean cache files
${prefix}admin reload [cmd]      - Reload specific command
${prefix}admin broadcast [msg]   - Broadcast message to all threads

👥 **Admin Management:**
${prefix}admin add [userID]      - Add new admin
${prefix}admin remove [userID]   - Remove admin
${prefix}admin list              - Show admin list

📝 **Usage Examples:**
${prefix}admin users
${prefix}admin restart
${prefix}admin broadcast Hello everyone!
        `;
        return api.sendMessage(helpMessage, threadID, messageID);
    }

    const command = args[0].toLowerCase();
    const restArgs = args.slice(1);

    try {
        switch (command) {
            case 'users':
                await showUsers(api, event);
                break;
                
            case 'logout':
                await logoutUser(api, event, restArgs);
                break;
                
            case 'restart':
                await restartBot(api, event);
                break;
                
            case 'shutdown':
                await shutdownBot(api, event);
                break;
                
            case 'status':
                await botStatus(api, event);
                break;
                
            case 'cleanup':
                await cleanupCache(api, event);
                break;
                
            case 'reload':
                await reloadCommand(api, event, restArgs);
                break;
                
            case 'broadcast':
                await broadcastMessage(api, event, restArgs);
                break;
                
            case 'add':
                await addAdmin(api, event, restArgs, configPath);
                break;
                
            case 'remove':
                await removeAdmin(api, event, restArgs, configPath);
                break;
                
            case 'list':
                await listAdmins(api, event, adminList);
                break;
                
            default:
                api.sendMessage(`❌ Unknown admin command: ${command}`, threadID, messageID);
        }
    } catch (error) {
        console.error('Admin command error:', error);
        api.sendMessage(`❌ Error executing command: ${error.message}`, threadID, messageID);
    }
};

// Show all logged-in users
async function showUsers(api, event) {
    const { threadID, messageID } = event;
    
    // This would need to access your Utils.account Map from main file
    // For now, let's read from history.json
    const historyPath = './data/history.json';
    if (!fs.existsSync(historyPath)) {
        return api.sendMessage("❌ No user data found!", threadID, messageID);
    }
    
    const users = JSON.parse(fs.readFileSync(historyPath, 'utf8'));
    
    if (users.length === 0) {
        return api.sendMessage("🤖 No users currently logged in.", threadID, messageID);
    }
    
    let userList = "👥 **LOGGED-IN USERS** 👥\n\n";
    
    for (const user of users) {
        try {
            const userInfo = await api.getUserInfo(user.userid);
            const userName = userInfo[user.userid]?.name || 'Unknown User';
            userList += `🆔 ${user.userid}\n📛 ${userName}\n⏱️ Online: ${user.time}s\n📝 Prefix: ${user.prefix}\n━━━━━━━━━━━━━━━━━━\n`;
        } catch (error) {
            userList += `🆔 ${user.userid}\n📛 [Unable to fetch name]\n⏱️ Online: ${user.time}s\n━━━━━━━━━━━━━━━━━━\n`;
        }
    }
    
    userList += `\n📊 Total Users: ${users.length}`;
    api.sendMessage(userList, threadID, messageID);
}

// Logout users
async function logoutUser(api, event, args) {
    const { threadID, messageID } = event;
    
    if (args.length === 0) {
        return api.sendMessage("❌ Usage: admin logout [userID] or admin logout all", threadID, messageID);
    }
    
    const target = args[0].toLowerCase();
    const historyPath = './data/history.json';
    const sessionDir = './data/session/';
    
    if (target === 'all') {
        // Logout all users
        if (fs.existsSync(historyPath)) {
            fs.writeFileSync(historyPath, '[]');
        }
        
        // Clear session files
        if (fs.existsSync(sessionDir)) {
            const files = fs.readdirSync(sessionDir);
            for (const file of files) {
                if (file.endsWith('.json')) {
                    fs.unlinkSync(path.join(sessionDir, file));
                }
            }
        }
        
        api.sendMessage("✅ All users have been logged out! Bot will restart soon...", threadID, messageID);
        setTimeout(() => process.exit(1), 3000);
        
    } else {
        // Logout specific user
        const userID = args[0];
        
        if (!fs.existsSync(historyPath)) {
            return api.sendMessage("❌ No user data found!", threadID, messageID);
        }
        
        const users = JSON.parse(fs.readFileSync(historyPath, 'utf8'));
        const userIndex = users.findIndex(user => user.userid === userID);
        
        if (userIndex === -1) {
            return api.sendMessage(`❌ User ${userID} not found!`, threadID, messageID);
        }
        
        // Remove from history
        users.splice(userIndex, 1);
        fs.writeFileSync(historyPath, JSON.stringify(users, null, 2));
        
        // Remove session file
        const sessionFile = path.join(sessionDir, `${userID}.json`);
        if (fs.existsSync(sessionFile)) {
            fs.unlinkSync(sessionFile);
        }
        
        api.sendMessage(`✅ User ${userID} has been logged out!`, threadID, messageID);
    }
}

// Restart bot
async function restartBot(api, event) {
    const { threadID, messageID } = event;
    
    api.sendMessage("🔄 Bot is restarting...", threadID, messageID);
    setTimeout(() => process.exit(1), 2000);
}

// Shutdown bot
async function shutdownBot(api, event) {
    const { threadID, messageID } = event;
    
    api.sendMessage("🛑 Bot is shutting down...", threadID, messageID);
    setTimeout(() => process.exit(0), 2000);
}

// Bot status
async function botStatus(api, event) {
    const { threadID, messageID } = event;
    
    const historyPath = './data/history.json';
    let totalUsers = 0;
    
    if (fs.existsSync(historyPath)) {
        const users = JSON.parse(fs.readFileSync(historyPath, 'utf8'));
        totalUsers = users.length;
    }
    
    // Get memory usage
    const used = process.memoryUsage();
    const memoryUsage = Math.round(used.rss / 1024 / 1024);
    
    const statusMessage = `
📊 **BOT STATUS** 📊

🤖 **System Info:**
• Uptime: ${Math.round(process.uptime())} seconds
• Memory: ${memoryUsage} MB
• Platform: ${process.platform}
• Node.js: ${process.version}

👥 **User Statistics:**
• Logged-in Users: ${totalUsers}
• Active Threads: [To be implemented]

⚙️ **Bot Information:**
• Version: 2.4.0
• Admin Commands: Available
• Auto-reply: Enabled

💾 **Last Restart:** ${new Date().toLocaleString()}
    `;
    
    api.sendMessage(statusMessage, threadID, messageID);
}

// Cleanup cache
async function cleanupCache(api, event) {
    const { threadID, messageID } = event;
    
    const cacheDir = './script/cache';
    let cleanedFiles = 0;
    
    if (fs.existsSync(cacheDir)) {
        const files = fs.readdirSync(cacheDir);
        for (const file of files) {
            fs.unlinkSync(path.join(cacheDir, file));
            cleanedFiles++;
        }
    }
    
    api.sendMessage(`🧹 Cleaned ${cleanedFiles} cache files!`, threadID, messageID);
}

// Reload command
async function reloadCommand(api, event, args) {
    const { threadID, messageID } = event;
    
    if (args.length === 0) {
        return api.sendMessage("❌ Usage: admin reload [commandName]", threadID, messageID);
    }
    
    const cmdName = args[0].toLowerCase();
    api.sendMessage(`🔄 Reloading command: ${cmdName}...`, threadID, messageID);
    
    // This would need integration with your main bot structure
    // For now, just send a message
    api.sendMessage(`✅ Command '${cmdName}' reloaded! (Simulated)`, threadID, messageID);
}

// Broadcast message
async function broadcastMessage(api, event, args) {
    const { threadID, messageID } = event;
    
    if (args.length === 0) {
        return api.sendMessage("❌ Usage: admin broadcast [message]", threadID, messageID);
    }
    
    const message = args.join(' ');
    
    try {
        const allThreads = await api.getThreadList(100, null, ['INBOX']);
        let successCount = 0;
        let failCount = 0;
        
        api.sendMessage(`📢 Starting broadcast to ${allThreads.length} threads...`, threadID, messageID);
        
        for (const thread of allThreads) {
            if (thread.isGroup && thread.threadID !== threadID) {
                try {
                    await api.sendMessage(
                        `📢 **ADMIN BROADCAST**\n\n${message}\n\n- Bot Administration`,
                        thread.threadID
                    );
                    successCount++;
                    // Delay to avoid rate limiting
                    await new Promise(resolve => setTimeout(resolve, 500));
                } catch (error) {
                    failCount++;
                }
            }
        }
        
        const resultMessage = `
📊 **BROADCAST COMPLETE**

✅ Success: ${successCount} threads
❌ Failed: ${failCount} threads
📋 Total: ${allThreads.length} threads
        `;
        
        api.sendMessage(resultMessage, threadID, messageID);
    } catch (error) {
        api.sendMessage(`❌ Broadcast failed: ${error.message}`, threadID, messageID);
    }
}

// Add admin
async function addAdmin(api, event, args, configPath) {
    const { threadID, messageID } = event;
    
    if (args.length === 0) {
        return api.sendMessage("❌ Usage: admin add [userID]", threadID, messageID);
    }
    
    const newAdminID = args[0];
    
    try {
        const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        const adminList = config[0].masterKey.admin;
        
        if (adminList.includes(newAdminID)) {
            return api.sendMessage(`❌ User ${newAdminID} is already an admin!`, threadID, messageID);
        }
        
        adminList.push(newAdminID);
        config[0].masterKey.admin = adminList;
        
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
        
        // Get user name for confirmation
        try {
            const userInfo = await api.getUserInfo(newAdminID);
            const userName = userInfo[newAdminID]?.name || 'Unknown User';
            api.sendMessage(`✅ Added ${userName} (${newAdminID}) as bot admin!`, threadID, messageID);
        } catch (error) {
            api.sendMessage(`✅ Added user ${newAdminID} as bot admin!`, threadID, messageID);
        }
    } catch (error) {
        api.sendMessage(`❌ Failed to add admin: ${error.message}`, threadID, messageID);
    }
}

// Remove admin
async function removeAdmin(api, event, args, configPath) {
    const { threadID, messageID } = event;
    
    if (args.length === 0) {
        return api.sendMessage("❌ Usage: admin remove [userID]", threadID, messageID);
    }
    
    const adminID = args[0];
    
    try {
        const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        const adminList = config[0].masterKey.admin;
        
        const index = adminList.indexOf(adminID);
        if (index === -1) {
            return api.sendMessage(`❌ User ${adminID} is not an admin!`, threadID, messageID);
        }
        
        adminList.splice(index, 1);
        config[0].masterKey.admin = adminList;
        
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
        
        api.sendMessage(`✅ Removed user ${adminID} from admin list!`, threadID, messageID);
    } catch (error) {
        api.sendMessage(`❌ Failed to remove admin: ${error.message}`, threadID, messageID);
    }
}

// List admins
async function listAdmins(api, event, adminList) {
    const { threadID, messageID } = event;
    
    if (adminList.length === 0) {
        return api.sendMessage("❌ No admins configured!", threadID, messageID);
    }
    
    let adminMessage = "👑 **BOT ADMINS** 👑\n\n";
    
    for (const adminID of adminList) {
        try {
            const userInfo = await api.getUserInfo(adminID);
            const userName = userInfo[adminID]?.name || 'Unknown User';
            adminMessage += `👤 ${userName}\n🆔 ${adminID}\n━━━━━━━━━━━━━━━━━━\n`;
        } catch (error) {
            adminMessage += `👤 [Unable to fetch name]\n🆔 ${adminID}\n━━━━━━━━━━━━━━━━━━\n`;
        }
    }
    
    adminMessage += `\n📊 Total Admins: ${adminList.length}`;
    api.sendMessage(adminMessage, threadID, messageID);
}