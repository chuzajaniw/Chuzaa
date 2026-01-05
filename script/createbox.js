module.exports.config = {
  name: "createbox",
  version: "1.0.0",
  role: 0,
  hasPrefix: true,
  usage: '[text1 | text2]',
  description: 'Create a new group with mentioned users and a title',
  credits: 'CHAND',
  cooldown: 5
};

module.exports.run = async function({ api, Users, args, event }) {
  try {
    // Initialize id as an array
    let id = [];

    // Check if 'me' is mentioned and add the senderID
    if (args[0] === "me") {
      id.push(event.senderID);
    }

    // Extract the group title
    const main = event.body;
    const delimiterIndex = main.indexOf("|");

    // Check if delimiter exists
    if (delimiterIndex === -1) {
      return api.sendMessage('Please use the correct format: me [mentioned user | groupname]!', event.threadID, event.messageID);
    }

    // Extract groupTitle safely
    const groupTitle = main.slice(delimiterIndex + 1).trim();

    // Add mentioned user IDs
    const mentionedIDs = Object.keys(event.mentions);
    if (mentionedIDs.length > 0) {
      id = id.concat(mentionedIDs);
    }

    // Create the new group
    api.createNewGroup(id, groupTitle, (error, response) => {
      if (error) {
        api.sendMessage(`Failed to create the group: ${error.message}`, event.threadID, event.messageID);
      } else {
        api.sendMessage(`Successfully created the group: ${groupTitle}`, event.threadID, event.messageID);
      }
    });
  } catch (e) {
    api.sendMessage(`An error occurred: ${e.message}`, event.threadID, event.messageID);
  }
};
