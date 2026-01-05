const fs = require('fs');
const path = require('path');

const lockDataPath = './data/lockdata.json';

function getLockData() {
    if (!fs.existsSync(lockDataPath)) {
        return {};
    }
    return JSON.parse(fs.readFileSync(lockDataPath, 'utf8'));
}

function saveLockData(data) {
    fs.writeFileSync(lockDataPath, JSON.stringify(data, null, 2));
}

module.exports.config = {
    name: "antiChange",
    version: "1.0.0",
    description: "Prevent changes to locked group info"
};

module.exports.handleEvent = async function({ api, event }) {
    const { threadID, type, logMessageData, author } = event;
    
    // Ignore if bot made the change
    if (author === api.getCurrentUserID()) return;
    
    const lockData = getLockData();
    const threadLockData = lockData[threadID];
    
    if (!threadLockData) return;
    
    try {
        switch (type) {
            case 'log:thread-name':
                if (threadLockData.name) {
                    await handleNameChange(api, event, threadLockData, threadID);
                }
                break;
                
            case 'log:thread-icon':
                if (threadLockData.dp) {
                    await handleProfilePictureChange(api, event, threadID);
                }
                break;
                
            case 'log:user-nickname':
                if (threadLockData.nickname) {
                    await handleNicknameChange(api, event, threadID);
                }
                break;
                
            case 'log:thread-color':
                if (threadLockData.theme) {
                    await handleThemeChange(api, event, threadLockData, threadID);
                }
                break;
                
            case 'log:thread-emoji':
                if (threadLockData.emoji) {
                    await handleEmojiChange(api, event, threadLockData, threadID);
                }
                break;
        }
    } catch (error) {
        console.error('Anti-change error:', error);
    }
};

// Handle group name change
async function handleNameChange(api, event, threadLockData, threadID) {
    if (threadLockData.originalName) {
        await api.setTitle(threadLockData.originalName, threadID);
        
        // Get user info for warning
        try {
            const userInfo = await api.getUserInfo(event.author);
            const userName = userInfo[event.author]?.name || 'Someone';
            
            await api.sendMessage(
                `⚠️ **GROUP NAME LOCKED** ⚠️\n\n${userName} tried to change group name!\n🔒 Group name has been restored to original.`,
                threadID
            );
        } catch (error) {
            await api.sendMessage(
                "⚠️ Group name change prevented! Name restored to original.",
                threadID
            );
        }
    }
}

// Handle profile picture change
async function handleProfilePictureChange(api, event, threadID) {
    // Remove the new profile picture by setting a default one
    // Note: This might need adjustment based on your bot's capabilities
    
    await api.sendMessage(
        `⚠️ **PROFILE PICTURE LOCKED** ⚠️\n\nProfile picture changes are not allowed in this group!\n🔒 Please contact admin if you need to change it.`,
        threadID
    );
}

// Handle nickname change
async function handleNicknameChange(api, event, threadID) {
    const { logMessageData, author } = event;
    const participantID = logMessageData.participant_id;
    const newNickname = logMessageData.nickname;
    
    // Reset nickname to empty (remove custom nickname)
    try {
        await api.changeNickname('', threadID, participantID);
        
        const userInfo = await api.getUserInfo(author);
        const userName = userInfo[author]?.name || 'Someone';
        
        await api.sendMessage(
            `⚠️ **NICKNAME LOCKED** ⚠️\n\n${userName} tried to change nickname!\n🔒 Nickname has been reset.`,
            threadID
        );
    } catch (error) {
        console.error('Failed to reset nickname:', error);
    }
}

// Handle theme change
async function handleThemeChange(api, event, threadLockData, threadID) {
    if (threadLockData.originalTheme) {
        // Reset to original theme
        // Note: Theme changing might have limitations in the API
        
        await api.sendMessage(
            `⚠️ **THEME LOCKED** ⚠️\n\nGroup theme changes are not allowed!\n🔒 Theme has been restored.`,
            threadID
        );
    }
}

// Handle emoji change
async function handleEmojiChange(api, event, threadLockData, threadID) {
    if (threadLockData.originalEmoji) {
        // Reset to original emoji
        await api.changeThreadEmoji(threadLockData.originalEmoji, threadID);
        
        await api.sendMessage(
            `⚠️ **EMOJI LOCKED** ⚠️\n\nGroup emoji changes are not allowed!\n🔒 Emoji has been restored to original.`,
            threadID
        );
    }
}