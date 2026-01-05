module.exports.config = {
  name: "groupcolor",
  version: "1.0.0",
  role: 0,
  hasPrefix: true,
  credits: "CHAND",
  description: "Change thread color",
  usages: "Use this command to change the thread color.",
  cooldowns: 0,
};

module.exports.run = async ({ event, api }) => {
  // Array of color IDs
  const colors = [
    '196241301102133', '169463077092846', '2442142322678320', '234137870477637',
    '980963458735625', '175615189761153', '2136751179887052', '2058653964378557',
    '2129984390566328', '174636906462322', '1928399724138152', '417639218648241',
    '930060997172551', '164535220883264', '370940413392601', '205488546921017',
    '809305022860427'
  ];

  // Select a random color from the array
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  // Attempt to change the thread color
  try {
    await api.changeThreadColor(randomColor, event.threadID);
    api.sendMessage("Thread color changed successfully!", event.threadID, event.messageID);
  } catch (err) {
    console.error("Error changing thread color:", err);
    api.sendMessage("There was an error changing the thread color. Please try again.", event.threadID, event.messageID);
  }
};
