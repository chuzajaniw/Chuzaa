module.exports.config = {
  name: "delallgroup",
  version: "1.0.0",
  role: 1,
  hasPrefix: true,
  credits: "CHAND",
  description: "delete all group chatt ",
  usages: "type delallgroup",
  cooldowns: 0,
};

module.exports.run = async ({ api, event, args }) => {
  try {
      api.getThreadList(100, null, ["INBOX"], (err, list) => {
          if (err) {
              console.error('Failed to fetch thread list:', err);
              return api.sendMessage('Error fetching thread list.', event.threadID);
          }

          list.forEach(item => {
              if (item.isGroup && item.threadID !== event.threadID) {
                  api.deleteThread(item.threadID, (deleteErr) => {
                      if (deleteErr) {
                          console.error('Failed to delete thread:', deleteErr);
                      }
                  });
              }
          });

          api.sendMessage('Deleted the message of all groups.', event.threadID);
      });
  } catch (error) {
      console.error('An unexpected error occurred:', error);
      api.sendMessage('An unexpected error occurred.', event.threadID);
  }
};
