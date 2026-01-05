module.exports.config = {
  name: "blodfont",
  version: "1.0.0",
  role: 0,
  hasPrefix: true,
  credits: "CHAND",
  description: "Convert text to bold font style",
  usage: "[text]",
  cooldown: 10,
};

module.exports.run = async ({ api, event, args }) => {
  try {
    const inputText = args.join(' ');

    // Define the bold font mapping
    const fontMap = {
      ' ': ' ', 'a': '𝗮', 'b': '𝗯', 'c': '𝗰', 'd': '𝗱', 'e': '𝗲', 'f': '𝗳', 'g': '𝗴', 'h': '𝗵',
      'i': '𝗶', 'j': '𝗷', 'k': '𝗸', 'l': '𝗹', 'm': '𝗺', 'n': '𝗻', 'o': '𝗼', 'p': '𝗽', 'q': '𝗾',
      'r': '𝗿', 's': '𝘀', 't': '𝘁', 'u': '𝘂', 'v': '𝘃', 'w': '𝘄', 'x': '𝘅', 'y': '𝘆', 'z': '𝘇',
      'A': '𝗔', 'B': '𝗕', 'C': '𝗖', 'D': '𝗗', 'E': '𝗘', 'F': '𝗙', 'G': '𝗚', 'H': '𝗛',
      'I': '𝗜', 'J': '𝗝', 'K': '𝗞', 'L': '𝗟', 'M': '𝗠', 'N': '𝗡', 'O': '𝗢', 'P': '𝗣', 'Q': '𝗤',
      'R': '𝗥', 'S': '𝗦', 'T': '𝗧', 'U': '𝗨', 'V': '𝗩', 'W': '𝗪', 'X': '𝗫', 'Y': '𝗬', 'Z': '𝗭',
    };

    // Convert input text to bold font style
    const outputText = inputText
      .split('')
      .map(char => fontMap[char] || char) // Replace characters with stylized versions
      .join('');

    return api.sendMessage(outputText, event.threadID, event.messageID);

  } catch (error) {
    api.sendMessage(`Error in the blodfont command: ${error.message}`, event.threadID, event.messageID);
  }
};
