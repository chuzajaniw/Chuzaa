const {
  Hercai
} = require('hercai');
const herc = new Hercai();
module.exports.config = {
  name: 'rani',
  version: '1.0.0',
  role: 0,
  hasPrefix: true,
  description: "An AI command for info",
  usage: "rani [prompt]",
  credits: 'CHAND',
  cooldown: 3,
};
module.exports.run = async function({
  api,
  event,
  args
}) {
  const input = args.join(' ');
  if (!input) {
    api.sendMessage(`Please provide a question or statement after 'hercai'. For example: 'hercai What is the capital of France?'`, event.threadID, event.messageID);
    return;
  }
  api.sendMessage(`🔍 "${input}"`, event.threadID, event.messageID);
  try {
    const response = await herc.question({
      model: "v3",
      content: input
    });
    api.sendMessage(response.reply, event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
  }
};
