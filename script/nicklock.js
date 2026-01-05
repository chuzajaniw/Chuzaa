const fs = require('fs');
const path = require('path');

const nickLockPath = './data/nicklock.json';

function initNickLock() {
    if (!fs.existsSync('./data')) fs.mkdirSync('./data');
    if (!fs.existsSync(nickLockPath)) {
        fs.writeFileSync(nickLockPath, JSON.stringify({}));
    }
}

function getNickLockData() {
    initNickLock();
    return JSON.parse(fs.readFileSync(nickLockPath, 'utf8'));
}

function saveNickLockData(data) {
    fs.writeFileSync(nickLockPath, JSON.stringify(data, null, 2));
}

module.exports.config = {
    name: "nicklock",
    version: "1.0.0",
    role: 2, // Thread admin only
    hasPrefix: true,
    aliases: ["locknick", "nonick"],
    description: "Lock nicknames to prevent changes",
    usage: "{p}nicklock [on/off/list] or {p}nicklock allow [userID]",
    credits: "Developer",
    cooldown: 5
};

module.exports.run = async function({ api, event, args }) {
    const { threadID, messageID, senderID } = event;

    // Check admin status
    try {
        const threadInfo = await api.getThreadInfo(threadID);
        const isAdmin = threadInfo.adminIDs.some(admin => admin.id === senderID);
        if (!isAdmin) {
            return api.sendMessage("❌ You need to be a group admin!", threadID, messageID);
        }
    } catch (error) {
        return api.sendMessage("❌ Failed to verify admin status!", threadID, messageID);
    }

    const nickLockData = getNickLockData();
    if (!nickLockData[threadID]) {
        nickLockData[threadID] = {
            enabled: false,
            allowedUsers: []
        };
    }

    if (args.length === 0) {
        const helpMessage = `
🔒 **NICKNAME LOCK** 🔒

Prevent users from changing their nicknames.

📝 **Usage:**
{p}nicklock on          - Enable nickname lock
{p}nicklock off         - Disable nickname lock
{p}nicklock list        - Show allowed users
{p}nicklock allow [ID]  - Allow specific user to change nickname
{p}nicklock deny [ID]   - Remove user from allowed list

👥 **Allowed Users:** ${nickLockData[threadID].allowedUsers.length}

💡 **Examples:**
{p}nicklock on
{p}nicklock allow 123456789
{p}nicklock list
        `;
        return api.sendMessage(helpMessage, threadID, messageID);
    }

    const action = args[0].toLowerCase();

    switch (action) {
        case 'on':
            nickLockData[threadID].enabled = true;
            saveNickLockData(nickLockData);
            api.sendMessage("✅ Nickname lock enabled! Users cannot change nicknames.", threadID, messageID);
            break;
            
        case 'off':
            nickLockData[threadID].enabled = false;
            saveNickLockData(nickLockData);
            api.sendMessage("✅ Nickname lock disabled!", threadID, messageID);
            break;
            
        case 'list':
            await showAllowedUsers(api, event, nickLockData[threadID]);
            break;
            
        case 'allow':
            await allowUser(api, event, args[1], nickLockData, threadID);
            break;
            
        case 'deny':
            await denyUser(api, event, args[1], nickLockData, threadID);
            break;
            
        default:
            api.sendMessage("❌ Invalid action! Use 'on', 'off', 'list', 'allow', or 'deny'", threadID, messageID);
    }
};

async function showAllowedUsers(api, event, threadData) {
    const { threadID, messageID } = event;
    
    if (threadData.allowedUsers.length === 0) {
        return api.sendMessage("📝 No users are allowed to change nicknames.", threadID, messageID);
    }
    
    let userList = "👥 **ALLOWED USERS:**\n\n";
    
    for (const userID of threadData.allowedUsers) {
        try {
            const userInfo = await api.getUserInfo(userID);
            const userName = userInfo[userID]?.name || 'Unknown User';
            userList += `• ${userName} (${userID})\n`;
        } catch (error) {
            userList += `• ${userID}\n`;
        }
    }
    
    api.sendMessage(userList, threadID, messageID);
}

async function allowUser(api, event, userID, nickLockData, threadID) {
    const { messageID } = event;
    
    if (!userID) {
        return api.sendMessage("❌ Please provide a user ID!", threadID, messageID);
    }
    
    if (nickLockData[threadID].allowedUsers.includes(userID)) {
        return api.sendMessage("❌ User is already allowed!", threadID, messageID);
    }
    
    nickLockData[threadID].allowedUsers.push(userID);
    saveNickLockData(nickLockData);
    
    try {
        const userInfo = await api.getUserInfo(userID);
        const userName = userInfo[userID]?.name || 'Unknown User';
        api.sendMessage(`✅ ${userName} can now change their nickname!`, threadID, messageID);
    } catch (error) {
        api.sendMessage(`✅ User ${userID} can now change their nickname!`, threadID, messageID);
    }
}

async function denyUser(api, event, userID, nickLockData, threadID) {
    const { messageID } = event;
    
    if (!userID) {
        return api.sendMessage("❌ Please provide a user ID!", threadID, messageID);
    }
    
    const index = nickLockData[threadID].allowedUsers.indexOf(userID);
    if (index === -1) {
        return api.sendMessage("❌ User is not in the allowed list!", threadID, messageID);
    }
    
    nickLockData[threadID].allowedUsers.splice(index, 1);
    saveNickLockData(nickLockData);
    
    api.sendMessage(`✅ User removed from allowed list!`, threadID, messageID);
}