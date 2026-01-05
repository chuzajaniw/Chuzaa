module.exports.config = {
  name: 'help',
  version: '1.0.0',
  role: 0,
  hasPrefix: true,
  aliases: ['menu'],
  description: "Beginner's guide",
  usage: "Help [page] or [command]",
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
    if (!input) {
      const pages = 10;
      let page = 1;
      let start = (page - 1) * pages;
      let end = start + pages;
      let helpMessage = ` ╔═════•| 💜 |•═════╗\n         𝐀𝐓𝐅 𝐏𝐑𝐎𝐉𝐄𝐂𝐓\n╚═════•| 💜 |•═════╝\n\n━❮●❯━━━❪💝❫━━━❮●❯━\n\n╭━─━─━≪✠≫━─━─━╮\n│━━━━━━━━━━━━━\n`;
      for (let i = start; i < Math.min(end, commands.length); i++) {
        helpMessage += `│\t${i + 1} ➥ ${commands[i]} \n│━━━━━━━━━━━━━\n`;
      }

      helpMessage += `╰━─━─━≪✠≫━─━─━╯\n\n╭━─━─━≪✠≫━─━─━╮\n│ 𝐏𝐀𝐆𝐄   ${page}/${Math.ceil(commands.length / pages)}.\n│ 𝗧𝘆𝗽𝗲: °${prefix}𝗛𝗲𝗹𝗽°\n╰━─━─━≪✠≫━─━─━╯\n❤🧡💛💚💙💜🤎🖤❤💛\n𝐓𝐇𝐈𝐒 𝐁𝐎𝐓 𝐉𝐔𝐒𝐓 𝐅𝐎𝐑 \n┏━━━━━━━━━━━┓\n│   1 💝  𝐂𝐇𝐔𝐙𝐀    │\n│   2 💜 𝐏𝐔𝐁𝐋𝐈𝐂    │\n┗━━━━━━━━━━━┛\n𝐇𝐨𝐰 𝐓𝐨 𝐌𝐚𝐤𝐞 𝐅𝐫𝐞𝐞 𝐓𝐡𝐢𝐬 𝐁𝐨𝐭\n\nᥬ🥶᭄  ᥬ😝᭄  ᥬ🙄᭄ ᥬ😱᭄ ᥬ🤡᭄  ᥬ🥵᭄\n━❮●❯━━━❪💝❫━━━❮●❯━\n┎───────────┑\n ❘  𝐀𝐓𝐅-𝐏𝐑𝐎𝐉𝐄𝐂𝐓    ❘\n┗───────────┙`;
      api.sendMessage(helpMessage, event.threadID, event.messageID);
    } else if (!isNaN(input)) {
      const page = parseInt(input);
      const pages = 10;
      let start = (page - 1) * pages;
      let end = start + pages;
      let helpMessage = ` ╔═════•| 💜 |•═════╗\n         𝐀𝐓𝐅 𝐏𝐑𝐎𝐉𝐄𝐂𝐓\n╚═════•| 💜 |•═════╝\n\n━❮●❯━━━❪💝❫━━━❮●❯━\n\n╭━─━─━≪✠≫━─━─━╮\n│━━━━━━━━━━━━━\n`;
      for (let i = start; i < Math.min(end, commands.length); i++) {
        helpMessage += `│\t${i + 1} ➥ ${commands[i]} \n│━━━━━━━━━━━━━\n`;
      }
      helpMessage += `╰━─━─━≪✠≫━─━─━╯\n\n╭━─━─━≪✠≫━─━─━╮\n│ 𝐏𝐀𝐆𝐄   ${page}/${Math.ceil(commands.length / pages)}.\n│ 𝗧𝘆𝗽𝗲: °${prefix}𝗛𝗲𝗹𝗽°\n╰━─━─━≪✠≫━─━─━╯\n❤🧡💛💚💙💜🤎🖤❤💛\n𝐓𝐇𝐈𝐒 𝐁𝐎𝐓 𝐉𝐔𝐒𝐓 𝐅𝐎𝐑 \n┏━━━━━━━━━━━┓\n│   1 💝  𝐂𝐇𝐔𝐙𝐀    │\n│   2 💜 𝐏𝐔𝐁𝐋𝐈𝐂    │\n┗━━━━━━━━━━━┛\n\nᥬ🥶᭄  ᥬ😝᭄  ᥬ🙄᭄ ᥬ😱᭄ ᥬ🤡᭄  ᥬ🥵᭄\n━❮●❯━━━❪💝❫━━━❮●❯━\n┎───────────┑\n ❘  𝐀𝐓𝐅-𝐏𝐑𝐎𝐉𝐄𝐂𝐓    ❘\n┗───────────┙`;
      api.sendMessage(helpMessage, event.threadID, event.messageID);
    } else {
      const command = [...Utils.handleEvent, ...Utils.commands].find(([key]) => key.includes(input?.toLowerCase()))?.[1];
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
        const roleMessage = role !== undefined ? (role === 0 ? '➛ Permission: user' : (role === 1 ? '➛ Permission: admin' : (role === 2 ? '➛ Permission: thread Admin' : (role === 3 ? '➛ Permission: super Admin' : '')))) : '';
        const aliasesMessage = aliases.length ? `➛ Aliases: ${aliases.join(', ')}\n` : '';
        const descriptionMessage = description ? `Description: ${description}\n` : '';
        const usageMessage = usage ? `➛ Usage: ${usage}\n` : '';
        const creditsMessage = credits ? `➛ Credits: ${credits}\n` : '';
        const versionMessage = version ? `➛ Version: ${version}\n` : '';
        const cooldownMessage = cooldown ? `➛ Cooldown: ${cooldown} second(s)\n` : '';
        const message = ` 「 Command 」\n\n➛ Name: ${name}\n${versionMessage}${roleMessage}\n${aliasesMessage}${descriptionMessage}${usageMessage}${creditsMessage}${cooldownMessage}`;
        api.sendMessage(message, event.threadID, event.messageID);
      } else {
        api.sendMessage('Command not found.', event.threadID, event.messageID);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
