module.exports.config = {
  name: 'event',
  version: '1.0.0',
  role: 0,
  hasPrefix: true,
  aliases: ['allevent'],
  description: "Beginner's guide",
  usage: "event [page] or [command]",
  credits: 'CHAND',
};

module.exports.run = async function({
  api,
  event,
  enableCommands,
  args,
  Utils,
  prefix
}) {
  const input = args.join(' ');
  try {
    const eventCommands = enableCommands[1].handleEvent;
    const commands = enableCommands[0].commands;
    let helpMessage = '';

    if (!input) {
      const itemsPerPage = 10;  // Adjust the number of items per page as needed
      let page = 1;
      let start = (page - 1) * itemsPerPage;
      let end = start + itemsPerPage;

      helpMessage += ' ╔═════•| 💜 |•═════╗\n         𝐀𝐓𝐅 𝐏𝐑𝐎𝐉𝐄𝐂𝐓\n╚═════•| 💜 |•═════╝\n\n━❮●❯━━━❪💝❫━━━❮●❯━\n\n╭━─━─━≪✠≫━─━─━╮\n│━━━━━━━━━━━━━\n';
      eventCommands.slice(start, end).forEach((eventCommand, index) => {
        helpMessage += `│\t${start + index + 1} ➥  ${prefix}${eventCommand} \n│━━━━━━━━━━━━━\n`;
      });
      helpMessage += `╰━─━─━≪✠≫━─━─━╯\n\n╭━─━─━≪✠≫━─━─━╮\n│ 𝐏𝐀𝐆𝐄   ${page}/${Math.ceil(eventCommands.length / itemsPerPage)}.\n│ 𝗧𝘆𝗽𝗲: °${prefix}𝗛𝗲𝗹𝗽°\n╰━─━─━≪✠≫━─━─━╯\n❤🧡💛💚💙💜🤎🖤❤💛\n𝐓𝐇𝐈𝐒 𝐁𝐎𝐓 𝐉𝐔𝐒𝐓 𝐅𝐎𝐑 \n┏━━━━━━━━━━━┓\n│   1 💝  𝐂𝐇𝐔𝐙𝐀    │\n│   2 💜 𝐏𝐔𝐁𝐋𝐈𝐂    │\n━❮●❯━━━❪💝❫━━━❮●❯━\n┎───────────┑\n ❘  𝐀𝐓𝐅-𝐏𝐑𝐎𝐉𝐄𝐂𝐓    ❘\n┗───────────┙`;
      api.sendMessage(helpMessage, event.threadID, event.messageID);
    } else if (!isNaN(input)) {
      const page = parseInt(input, 10);
      const itemsPerPage = 10;  // Adjust the number of items per page as needed
      let start = (page - 1) * itemsPerPage;
      let end = start + itemsPerPage;

      helpMessage += '\nEvent List:\n\n';
      eventCommands.slice(start, end).forEach((eventCommand, index) => {
        helpMessage += `\t${start + index + 1}. 「 ${prefix}${eventCommand} 」\n`;
      });
      helpMessage += `\nPage ${page} of ${Math.ceil(eventCommands.length / itemsPerPage)}`;
      api.sendMessage(helpMessage, event.threadID, event.messageID);
    } else {
      const command = [...Utils.handleEvent, ...Utils.commands].find(([key]) => key.toLowerCase().includes(input.toLowerCase()))?.[1];
      if (command) {
        const {
          name,
          version,
          role,
          aliases = [],
          description,
          usage,
          credits,
          cooldown,
          hasPrefix
        } = command;

        const roleMessage = role !== undefined 
          ? `➛ Permission: ${['user', 'admin', 'thread Admin', 'super Admin'][role]}\n`
          : '';
        const aliasesMessage = aliases.length ? `➛ Aliases: ${aliases.join(', ')}\n` : '';
        const descriptionMessage = description ? `Description: ${description}\n` : '';
        const usageMessage = usage ? `➛ Usage: ${usage}\n` : '';
        const creditsMessage = credits ? `➛ Credits: ${credits}\n` : '';
        const versionMessage = version ? `➛ Version: ${version}\n` : '';
        const cooldownMessage = cooldown ? `➛ Cooldown: ${cooldown} second(s)\n` : '';

        const message = `「 Command 」\n\n➛ Name: ${name}\n${versionMessage}${roleMessage}${aliasesMessage}${descriptionMessage}${usageMessage}${creditsMessage}${cooldownMessage}`;
        api.sendMessage(message, event.threadID, event.messageID);
      } else {
        api.sendMessage('Command not found.', event.threadID, event.messageID);
      }
    }
  } catch (error) {
    console.error('An error occurred while processing the event command:', error);
    api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
  }
};
