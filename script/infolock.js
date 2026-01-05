const fs = require('fs');
const path = require('path');

// Store locked groups data
const lockDataPath = './data/lockdata.json';

// Initialize lock data file
function initLockData() {
    if (!fs.existsSync('./data')) {
        fs.mkdirSync('./data');
    }
    if (!fs.existsSync(lockDataPath)) {
        fs.writeFileSync(lockDataPath, JSON.stringify({}));
    }
}

// Get lock data
function getLockData() {
    initLockData();
    return JSON.parse(fs.readFileSync(lockDataPath, 'utf8'));
}

// Save lock data
function saveLockData(data) {
    fs.writeFileSync(lockDataPath, JSON.stringify(data, null, 2));
}

module.exports.config = {
    name: "infolock",
    version: "1.0.0",
    role: 2, // Thread admin only
    hasPrefix: true,
    aliases: ["lock", "antichange"],
    description: "Lock group info to prevent changes",
    usage: "{p}infolock [all/nickname/name/dp/theme/emoji] [on/off]",
    credits: "Developer",
    cooldown: 5
};

module.exports.run = async function({ api, event, args, prefix }) {
    const { threadID, messageID, senderID } = event;

    // Check if user is thread admin
    try {
        const threadInfo = await api.getThreadInfo(threadID);
        const isAdmin = threadInfo.adminIDs.some(admin => admin.id === senderID);
        
        if (!isAdmin) {
            return api.sendMessage("❌ You need to be a group admin to use this command!", threadID, messageID);
        }
    } catch (error) {
        return api.sendMessage("❌ Failed to verify admin status!", threadID, messageID);
    }

    if (args.length === 0) {
        const helpMessage = `
🔒 **INFO LOCK SYSTEM** 🔒

Prevent unauthorized changes to group information.

📝 **Usage:**
${prefix}infolock all on/off          - Lock/unlock all info
${prefix}infolock nickname on/off     - Lock/unlock nicknames
${prefix}infolock name on/off         - Lock/unlock group name
${prefix}infolock dp on/off           - Lock/unlock group profile picture
${prefix}infolock theme on/off        - Lock/unlock group theme
${prefix}infolock emoji on/off        - Lock/unlock group emoji
${prefix}infolock status             - Show current lock status

🛡️ **Features:**
• Prevents unauthorized changes
• Auto-restores original info
• Admin bypass available
• Real-time protection

💡 **Examples:**
${prefix}infolock all on
${prefix}infolock nickname off
${prefix}infolock status
        `;
        return api.sendMessage(helpMessage, threadID, messageID);
    }

    const lockData = getLockData();
    if (!lockData[threadID]) {
        lockData[threadID] = {
            nickname: false,
            name: false,
            dp: false,
            theme: false,
            emoji: false,
            originalName: '',
            originalEmoji: '',
            originalTheme: ''
        };
    }

    const action = args[0].toLowerCase();
    const state = args[1] ? args[1].toLowerCase() : '';

    switch (action) {
        case 'status':
            await showLockStatus(api, event, lockData[threadID]);
            break;
            
        case 'all':
            await toggleAllLocks(api, event, state, lockData, threadID);
            break;
            
        case 'nickname':
        case 'name':
        case 'dp':
        case 'theme':
        case 'emoji':
            await toggleSpecificLock(api, event, action, state, lockData, threadID);
            break;
            
        default:
            api.sendMessage("❌ Invalid option! Use 'all', 'nickname', 'name', 'dp', 'theme', or 'emoji'", threadID, messageID);
    }
};

// Show current lock status
async function showLockStatus(api, event, threadLockData) {
    const { threadID, messageID } = event;
    
    const statusMessage = `
🔒 **LOCK STATUS** 🔒

👤 Nickname Lock: ${threadLockData.nickname ? '✅ ON' : '❌ OFF'}
📛 Group Name Lock: ${threadLockData.name ? '✅ ON' : '❌ OFF'}
🖼️ Profile Picture Lock: ${threadLockData.dp ? '✅ ON' : '❌ OFF'}
🎨 Theme Lock: ${threadLockData.theme ? '✅ ON' : '❌ OFF'}
😊 Emoji Lock: ${threadLockData.emoji ? '✅ ON' : '❌ OFF'}

💡 Use ${prefix}infolock [type] on/off to change settings
    `;
    
    api.sendMessage(statusMessage, threadID, messageID);
}

// Toggle all locks
async function toggleAllLocks(api, event, state, lockData, threadID) {
    const { messageID } = event;
    
    if (state !== 'on' && state !== 'off') {
        return api.sendMessage("❌ Usage: infolock all on/off", threadID, messageID);
    }
    
    const isLock = state === 'on';
    const threadInfo = await api.getThreadInfo(threadID);
    
    lockData[threadID] = {
        nickname: isLock,
        name: isLock,
        dp: isLock,
        theme: isLock,
        emoji: isLock,
        originalName: threadInfo.name || '',
        originalEmoji: threadInfo.emoji || '',
        originalTheme: threadInfo.color || ''
    };
    
    saveLockData(lockData);
    
    api.sendMessage(
        `✅ All info locks turned ${isLock ? 'ON 🔒' : 'OFF 🔓'}\n\nAll group information is now ${isLock ? 'protected from changes' : 'unlocked'}`,
        threadID,
        messageID
    );
}

// Toggle specific lock
async function toggleSpecificLock(api, event, type, state, lockData, threadID) {
    const { messageID } = event;
    
    if (state !== 'on' && state !== 'off') {
        return api.sendMessage(`❌ Usage: infolock ${type} on/off`, threadID, messageID);
    }
    
    const isLock = state === 'on';
    const threadInfo = await api.getThreadInfo(threadID);
    
    lockData[threadID][type] = isLock;
    
    // Save original values when locking
    if (isLock) {
        if (type === 'name') lockData[threadID].originalName = threadInfo.name || '';
        if (type === 'emoji') lockData[threadID].originalEmoji = threadInfo.emoji || '';
        if (type === 'theme') lockData[threadID].originalTheme = threadInfo.color || '';
    }
    
    saveLockData(lockData);
    
    const typeNames = {
        nickname: 'Nickname',
        name: 'Group Name',
        dp: 'Profile Picture',
        theme: 'Group Theme',
        emoji: 'Group Emoji'
    };
    
    api.sendMessage(
        `✅ ${typeNames[type]} lock turned ${isLock ? 'ON 🔒' : 'OFF 🔓'}`,
        threadID,
        messageID
    );
}