module.exports.config = {
  name: "spam",
  version: "1.0.0",
  role: 1,
  hasPrefix: true,
  credits: "CHAND",
  description: "spam emoji",
  usages: "spam",
  cooldowns: 0,
};

module.exports.run = function ({ api, event, Users }) {
  var { threadID, messageID } = event;
  var k = function (k) { api.sendMessage(k, threadID)};

  //*vonglap

for (i = 0; i < 200; i++) {
 k("🪽🍂");
}

  }
