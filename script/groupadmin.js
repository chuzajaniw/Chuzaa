module.exports.config = {
  name: "groupadmin",
  version: "1.0.0",
  role: 1,
  hasPrefix: true,
  credits: "CHAND",
  description: "make admin of group",
  usages: "groupadmin mentioned ",
  cooldowns: 0,
};

module.exports.run = async function({ api, event, args, Users }) {
    var threadInfo = await api.getThreadInfo(event.threadID);
    let qtv = threadInfo.adminIDs.length;
    var listad = '';
    var qtv2 = threadInfo.adminIDs;
    var fs = require["fs-extra"];
    dem = 1;
    for (let i = 0; i < qtv2.length; i++) {
        const info = (await api.getUserInfo(qtv2[i].id));
        const name = info[qtv2[i].id].name;
        listad += '' + `${dem++}` + '. ' + name + '\n';
    }

    api.sendMessage(
        `The list of ${qtv} administrators includes:\n${listad}`,
        event.threadID,
        event.messageID
    );
};
