module.exports.config = {
    name: "broadcast",
    version: "1.0.0",
    role: 1, // Bot admin only
    hasPrefix: true,
    aliases: ["bc", "announce"],
    description: "Broadcast message to all groups",
    usage: "{p}broadcast [message]",
    credits: "Developer",
    cooldown: 30
};

module.exports.run = async function({ api, event, args }) {
    const { threadID, messageID, senderID } = event;
    
    // Check admin permissions (you'll need to implement this check)
    // For now, this is a simplified version
    
    if (args.length === 0) {
        return api.sendMessage("❌ Please provide a message to broadcast!", threadID, messageID);
    }
    
    const message = args.join(' ');
    
    try {
        const allThreads = await api.getThreadList(100, null, ['INBOX']);
        let successCount = 0;
        
        api.sendMessage(`📢 Starting broadcast to ${allThreads.length} groups...`, threadID, messageID);
        
        for (const thread of allThreads) {
            if (thread.isGroup && thread.threadID !== threadID) {
                try {
                    await api.sendMessage(
                        `📢 **BROADCAST MESSAGE**\n\n${message}\n\n- Bot System`,
                        thread.threadID
                    );
                    successCount++;
                    // Avoid rate limiting
                    await new Promise(resolve => setTimeout(resolve, 1000));
                } catch (error) {
                    console.error(`Failed to send to ${thread.threadID}:`, error);
                }
            }
        }
        
        api.sendMessage(`✅ Broadcast completed! Sent to ${successCount} groups.`, threadID, messageID);
    } catch (error) {
        console.error('Broadcast error:', error);
        api.sendMessage("❌ Failed to broadcast message!", threadID, messageID);
    }
};