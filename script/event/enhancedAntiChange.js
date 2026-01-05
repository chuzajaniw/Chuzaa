const fs = require('fs');

module.exports.config = {
    name: "enhancedAntiChange",
    version: "1.0.0",
    description: "Enhanced protection against group info changes"
};

module.exports.handleEvent = async function({ api, event }) {
    const { threadID, type, logMessageData, author } = event;
    
    // Ignore bot actions
    if (author === api.getCurrentUserID()) return;
    
    // Check info locks
    await checkInfoLocks(api, event, threadID);
    
    // Check nickname locks
    await checkNicknameLocks(api, event, threadID);
};

async function checkInfoLocks(api, event, threadID) {
    const lockDataPath = './data/lockdata.json';
    if (!fs.existsSync(lockDataPath)) return;
    
    const lockData = JSON.parse(fs.readFileSync(lockDataPath, 'utf8'));
    const threadLockData = lockData[threadID];
    
    if (!threadLockData) return;
    
    const { type, logMessageData, author } = event;
    
    try {
        const userInfo = await api.getUserInfo(author);
        const userName = userInfo[author]?.name || 'Someone';
        
        switch (type) {
            case 'log:thread-name':
                if (threadLockData.name) {
                    await api.setTitle(threadLockData.originalName, threadID);
                    await sendWarning(api, threadID, userName, 'group name');
                }
                break;
                
            case 'log:thread-icon':
                if (threadLockData.dp) {
                    await sendWarning(api, threadID, userName, 'profile picture');
                }
                break;
                
            case 'log:thread-color':
                if (threadLockData.theme) {
                    await sendWarning(api, threadID, userName, 'group theme');
                }
                break;
                
            case 'log:thread-emoji':
                if (threadLockData.emoji && threadLockData.originalEmoji) {
                    await api.changeThreadEmoji(threadLockData.originalEmoji, threadID);
                    await sendWarning(api, threadID, userName, 'group emoji');
                }
                break;
        }
    } catch (error) {
        console.error('Enhanced anti-change error:', error);
    }
}

async function checkNicknameLocks(api, event, threadID) {
    const nickLockPath = './data/nicklock.json';
    if (!fs.existsSync(nickLockPath)) return;
    
    const nickLockData = JSON.parse(fs.readFileSync(nickLockPath, 'utf8'));
    const threadNickLock = nickLockData[threadID];
    
    if (!threadNickLock || !threadNickLock.enabled) return;
    
    const { type, logMessageData, author } = event;
    
    if (type === 'log:user-nickname') {
        const participantID = logMessageData.participant_id;
        
        // Check if user is allowed to change nickname
        if (threadNickLock.allowedUsers.includes(author)) return;
        
        try {
            // Reset nickname
            await api.changeNickname('', threadID, participantID);
            
            const userInfo = await api.getUserInfo(author);
            const userName = userInfo[author]?.name || 'Someone';
            
            await api.sendMessage(
                `⚠️ **NICKNAME CHANGE BLOCKED** ⚠️\n\n${userName} tried to change a nickname!\n🔒 Nickname has been reset.\n\n💡 Only allowed users can change nicknames.`,
                threadID
            );
        } catch (error) {
            console.error('Failed to reset nickname:', error);
        }
    }
}

async function sendWarning(api, threadID, userName, itemType) {
    await api.sendMessage(
        `⚠️ **CHANGE BLOCKED** ⚠️\n\n${userName} tried to change ${itemType}!\n🔒 Changes have been prevented.\n\nThis ${itemType} is locked by admin.`,
        threadID
    );
}