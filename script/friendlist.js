module.exports.config = {
  name: "friendlist",
  version: "1.0.0",
  role: 1,
  hasPrefix: true,
  credits: "CHAND",
  description: "see friendlist ",
  usages: "info",
  cooldowns: 0,
};

module.exports.run = async ({ event, api }) => {
  const moment = require("moment-timezone");

  const form = {
    av: api.getCurrentUserID(),
    fb_api_req_friendly_name: "FriendingCometFriendRequestsRootQueryRelayPreloader",
    fb_api_caller_class: "RelayModern",
    doc_id: "4499164963466303",
    variables: JSON.stringify({ input: { scale: 3 } })
  };

  try {
    const response = await api.httpPost("https://www.facebook.com/api/graphql/", form);
    const listRequest = JSON.parse(response).data.viewer.friending_possibilities.edges;

    let msg = "";
    listRequest.forEach((user, index) => {
      msg += (`\n${index + 1}. Name: ${user.node.name}`
        + `\nID: ${user.node.id}`
        + `\nUrl: ${user.node.url.replace("www.facebook", "fb")}`
        + `\nTime: ${moment(user.time * 1000).tz("Asia/Karachi").format("DD/MM/YYYY HH:mm:ss")}\n`);
    });

    api.sendMessage(`${msg}\n`, event.threadID, event.messageID);

  } catch (error) {
    console.error("Error retrieving friend requests:", error);
    api.sendMessage("Failed to retrieve friend requests. Please try again later.", event.threadID, event.messageID);
  }
};
