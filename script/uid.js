  const request = require('request');
  const fs = require('fs');
  const path = require('path');

  module.exports.config = {
    name: "uid",
    version: "1.0.0",
    role: 0,
    hasPrefix: true,
    description: "Get FB ID",
    usage: "uid",
    credits: "CHAND",
    cooldowns: 0
  };

  module.exports.run = function({ api, event }) {
    // Check if the event is a reply to a message
    if (event.type === "message_reply") {
      // Get the ID of the sender of the replied message
      var uid = event.messageReply.senderID;
      return api.sendMessage(`User ID: ${uid}`, event.threadID, event.messageID);
    } 
    // Check if there are any mentions in the message
    else if (Object.keys(event.mentions).length === 0) {
      // No mentions; return the ID of the message sender
      return api.sendMessage(`Your ID: ${event.senderID}`, event.threadID, event.messageID);
    } 
    else {
      // Iterate over the mentioned users
      for (var i = 0; i < Object.keys(event.mentions).length; i++) {
        // Extract mention and ID
        const mention = Object.values(event.mentions)[i];
        const userId = Object.keys(event.mentions)[i];
        // Send a message with the mention and ID
        api.sendMessage(`${mention.replace('@', '')}: ${userId}`, event.threadID);
      }
      return;
    }
  };
