const axios = require('axios');
const path = require('path');
const fs = require('fs');
const request = require('request');

module.exports.config = {
  name: "randomreact",
  version: "69",
  credits: "CHAND",
};

module.exports.handleEvent = async function ({ api, event }) {
  const emojis = [
    '🪽', '😒', '🍂', '👀', '', '😎', '', 
    '🤔', '🤠', '😅', '👑', '😊', '🙈', 
    '🌝', '💃', '🐉', '🫣', '🫀', 
    '⛏️', '', '🖤',🥰 '🧡', '❤️‍🩹', 
    '☪️', '✅'🦅'
  ];

  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

  // React to text messages
  if (event.body) {
    return api.setMessageReaction(randomEmoji, event.messageID, () => {}, true);
  }

  // React to photos
  if (event.attachments && event.attachments.length > 0 && event.attachments[0].type === 'photo') {
    return api.setMessageReaction(randomEmoji, event.messageID, () => {}, true);
  }

  // React to audio messages
  if (event.attachments && event.attachments.length > 0 && event.attachments[0].type === 'audio') {
    return api.setMessageReaction(randomEmoji, event.messageID, () => {}, true);
  }

  // React to video messages
  if (event.attachments && event.attachments.length > 0 && event.attachments[0].type === 'video') {
    return api.setMessageReaction(randomEmoji, event.messageID, () => {}, true);
  }
};
