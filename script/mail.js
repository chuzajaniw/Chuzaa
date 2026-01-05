module.exports.config = {
  name: "mail",
  version: "1.0.0",
  role: 0,
  hasPrefix: true,
  description: "Get mail",
  usage: "mail",
  credits: "CHAND",
  cooldown: 0
};
module.exports.run = async function({ api, event, args }) {
  const axios = require('axios');
  try {
    if (args[0] === "new") {
      const res = await axios.get('https://10minutemail.net/address.api.php?new=1');
      const { mail_get_user: user, mail_get_host: host, mail_get_time: time, mail_server_time: stime, mail_get_key: kmail, mail_left_time: ltime, mail_list } = res.data;
      const { mail_id: mid, subject: sub, datetime2: date } = mail_list[0];
      return api.sendMessage(`» Name mail: ${user}\n» Host: ${host}\n» Mail: ${user}@${host}\n» Time: ${time}\n» Time at server: ${stime}\n» Key: ${kmail}\n» Time remaining: ${ltime}s\n» Mail ID: ${mid}\n» Content: ${sub}\n» Date: ${date}`, event.threadID, event.messageID);
    }
    else if (args[0] === "list") {
      const res = await axios.get('https://www.phamvandienofficial.xyz/mail10p/domain');
      const list = res.data.domain;
      return api.sendMessage(`List of domains:\n${list}`, event.threadID, event.messageID);
    }
    else if (args[0] === "more") {
      const res = await axios.get('https://10minutemail.net/address.api.php?more=1');
      const { mail_get_user: user, mail_get_host: host, mail_get_time: time, mail_server_time: stime, mail_get_key: kmail, mail_left_time: ltime, mail_list } = res.data;
      const { mail_id: mid, subject: sub, datetime2: date } = mail_list[0];
      return api.sendMessage(`» Name mail: ${user}\n» Host: ${host}\n» Mail: ${user}@${host}\n» Time: ${time}\n» Time at server: ${stime}\n» Key: ${kmail}\n» Time remaining: ${ltime}s\n» Mail ID: ${mid}\n» Content: ${sub}\n» Date: ${date}`, event.threadID, event.messageID);
    }
    else if (args[0] === "get") {
      const res = await axios.get('https://10minutemail.net/address.api.php');
      const { mail_get_mail: mail, session_id: id, permalink: { url, key: key_mail } } = res.data;
      const urlMail = url.replace(/\./g, ' . ');
      const maill = mail.replace(/\./g, ' . ');
      return api.sendMessage(`» Email: ${maill}\n» ID Mail: ${id}\n» URL Mail: ${urlMail}\n» Key Mail: ${key_mail}`, event.threadID, event.messageID);
    }
    else if (args[0] === "check") {
      const res = await axios.get('https://10minutemail.net/address.api.php');
      const { mail_list, mail_get_mail: email } = res.data;
      const { mail_id: id, from, subject, datetime2: time } = mail_list[0];
      const formMail = from.replace(/\./g, ' . ');
      const maill = email.replace(/\./g, ' . ');
      return api.sendMessage(`» Email: ${maill}\n» ID Mail: ${id}\n» From: ${formMail}\n» Title: ${subject}\n» Date: ${time}`, event.threadID, event.messageID);
    }
    else if (args.length === 0) {
      return api.sendMessage(`NEW - Create a new email\nCHECK - Check your inbox\nGET - Get current email\n-------------------------\n\nYou can click on the mail URL and enter the Mail Key to see the mail content.`, event.threadID, event.messageID);
    }
  } catch (error) {
    console.error('Error occurred:', error);
    return api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
  }
};
