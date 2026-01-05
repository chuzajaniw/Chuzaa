module.exports.config = {
  name: "prefix",
  version: "1.0.0",
}

module.exports.handleEvent = async function({
  api,
  event,
  prefix,
  admin
}) {
  const {
    threadID,
    messageID,
    body
  } = event;

  // Handle prefix command
  if (body?.toLowerCase().startsWith('prefix')) {
    const prefixMessage = prefix 
      ? `╭━─━─━≪✠≫━─━─━╮\n│❮●❯━━━❪💝❫━━━❮●❯\n│This is my prefix: ${prefix}    \n│❮●❯━━━❪💝❫━━━❮●❯\n╰━─━─━≪✠≫━─━─━╯` 
      : `╭━─━─━≪✠≫━─━─━╮\n│❮●❯━━━❪💝❫━━━❮●❯\n│Sorry, I don't have a prefix    \n│❮●❯━━━❪💝❫━━━❮●❯│\n╰━─━─━≪✠≫━─━─━╯`;

    return api.sendMessage(prefixMessage, threadID, messageID);
  }

  // Handle admin ID command
  if (body?.toLowerCase().startsWith('adminid')) {
    const adminMessage = admin 
      ? `╭━─━─━≪✠≫━─━─━╮\n│❮●❯━━━❪💝❫━━━❮●❯\n│This is my admin ID: \n│${admin}    \n│❮●❯━━━❪💝❫━━━❮●❯\n╰━─━─━≪✠≫━─━─━╯` 
      : `╭━─━─━≪✠≫━─━─━╮\n│❮●❯━━━❪💝❫━━━❮●❯\n│Sorry, I don't have an admin ID    \n│❮●❯━━━❪💝❫━━━❮●❯│\n╰━─━─━≪✠≫━─━─━╯`;

    return api.sendMessage(adminMessage, threadID, messageID);
  }
};
