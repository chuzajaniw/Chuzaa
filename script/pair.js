const fs = require('fs');
const path = require('path');
const axios = require('axios');
const jimp = require('jimp');

module.exports = {
  config: {
    name: "pair",
    role: 0, // Everyone can use
    version: "2.0.0",
    hasPrefix: true,
    aliases: ["couple", "match", "lovepair"],
    description: "🔮 Pair with random group member with VIP stylish design",
    usage: "pair [@mention] or just pair",
    credits: "𓆩✮͢𝘈𝘴𝘪𝘮✮͢𓆪",
    cooldown: 30
  },

  run: async function({ api, event, args }) {
    try {
      api.sendMessage("🔮 Creating VIP Pair... Please wait...", event.threadID);

      const threadInfo = await api.getThreadInfo(event.threadID);
      const participants = threadInfo.participantIDs.filter(id => id !== api.getCurrentUserID());
      
      if (participants.length < 2) {
        return api.sendMessage("❌ Need at least 2 members in group to pair!", event.threadID);
      }

      let user1, user2;

      // Check if user mentioned someone
      if (Object.keys(event.mentions).length > 0) {
        user1 = event.senderID;
        user2 = Object.keys(event.mentions)[0];
      } else {
        // Random pairing
        const randomUsers = getRandomUsers(participants, 2, event.senderID);
        user1 = randomUsers[0];
        user2 = randomUsers[1];
      }

      if (!user1 || !user2) {
        return api.sendMessage("❌ Error selecting users for pairing!", event.threadID);
      }

      // Get user info
      const userInfo = await api.getUserInfo([user1, user2]);
      const user1Info = userInfo[user1];
      const user2Info = userInfo[user2];

      // Generate pair image
      const pairImage = await generatePairImage(user1Info, user2Info);
      
      // Calculate compatibility
      const compatibility = calculateCompatibility(user1, user2);
      
      // Get pair message
      const pairMessage = getPairMessage(compatibility);
      
      // Create final message
      const finalMessage = `💖 𝗩𝗜𝗣 𝗣𝗔𝗜𝗥 𝗠𝗔𝗧𝗖𝗛  🔮

👤 𝗨𝗦𝗘𝗥 𝟭: ${user1Info.name}
🆔 𝗜𝗗: ${user1}

👤 𝗨𝗦𝗘𝗥 𝟮: ${user2Info.name}  
🆔 𝗜𝗗: ${user2}

💫 𝗖𝗢𝗠𝗣𝗔𝗧𝗜𝗕𝗜𝗟𝗜𝗧𝗬: ${compatibility}%
📜 𝗠𝗘𝗦𝗦𝗔𝗚𝗘: ${pairMessage}

✨ 𝗠𝗔𝗗𝗘 𝗪𝗜𝗧𝗛 𝗟𝗢𝗩𝗘 𝗕𝗬 𝗕𝗢𝗧 ✨`;

      // Send the pair result
      await api.sendMessage({
        body: finalMessage,
        attachment: pairImage
      }, event.threadID);

    } catch (error) {
      console.error('Pair command error:', error);
      api.sendMessage("❌ Error generating pair! Please try again later.", event.threadID);
    }
  }
};

// Get random users from participants
function getRandomUsers(participants, count, senderID) {
  const shuffled = [...participants].sort(() => 0.5 - Math.random());
  let selected = [];
  
  // Always include sender
  selected.push(senderID);
  
  // Add other random users
  const others = shuffled.filter(id => id !== senderID);
  if (others.length > 0) {
    selected.push(others[0]);
  }
  
  return selected.slice(0, count);
}

// Calculate compatibility (fun algorithm)
function calculateCompatibility(userId1, userId2) {
  const seed = parseInt(userId1.slice(-4)) + parseInt(userId2.slice(-4));
  const random = (seed % 80) + 20; // Between 20-100%
  return Math.min(100, Math.max(20, random));
}

// Get romantic message based on compatibility
function getPairMessage(compatibility) {
  if (compatibility >= 90) {
    return "Soulmates! Perfect match made in heaven! 💕";
  } else if (compatibility >= 80) {
    return "Excellent match! Great chemistry! ✨";
  } else if (compatibility >= 70) {
    return "Very good compatibility! Strong potential! 🌟";
  } else if (compatibility >= 60) {
    return "Good match! Worth exploring! 💫";
  } else if (compatibility >= 50) {
    return "Average compatibility. Could work! 🤔";
  } else if (compatibility >= 40) {
    return "Challenging but possible! 💪";
  } else {
    return "Might need some work! Keep trying! 🌈";
  }
}

// Generate beautiful pair image with logos
async function generatePairImage(user1Info, user2Info) {
  try {
    // Create canvas
    const width = 1200;
    const height = 600;
    const canvas = new jimp(width, height, 0x000000FF);
    
    // Load background
    const bg = await createGradientBackground(width, height);
    canvas.composite(bg, 0, 0);
    
    // Load and process user images
    const user1Avatar = await loadAndProcessImage(user1Info.thumbSrc);
    const user2Avatar = await loadAndProcessImage(user2Info.thumbSrc);
    
    const avatarSize = 200;
    const borderSize = 5;
    
    // Create circular avatars with border
    const user1Circular = await createCircularImage(user1Avatar, avatarSize, borderSize, 0xFF1493FF);
    const user2Circular = await createCircularImage(user2Avatar, avatarSize, borderSize, 0x4169E1FF);
    
    // Position avatars
    const avatar1X = 200;
    const avatar2X = width - 200 - avatarSize;
    const avatarY = 150;
    
    canvas.composite(user1Circular, avatar1X, avatarY);
    canvas.composite(user2Circular, avatar2X, avatarY);
    
    // Add heart between avatars
    const heart = await createHeartLogo();
    const heartX = (width - 100) / 2;
    const heartY = avatarY + (avatarSize - 100) / 2;
    canvas.composite(heart, heartX, heartY);
    
    // Add VIP logo
    const vipLogo = await createVIPLogo();
    canvas.composite(vipLogo, width - 150, 20);
    
    // Add user names
    await addStyledText(canvas, user1Info.name, avatar1X + avatarSize/2, avatarY + avatarSize + 30, 0xFFFFFFFF, 24);
    await addStyledText(canvas, user2Info.name, avatar2X + avatarSize/2, avatarY + avatarSize + 30, 0xFFFFFFFF, 24);
    
    // Add ID text
    await addStyledText(canvas, `ID: ${user1Info.id || 'N/A'}`, avatar1X + avatarSize/2, avatarY + avatarSize + 60, 0xCCCCCCFF, 16);
    await addStyledText(canvas, `ID: ${user2Info.id || 'N/A'}`, avatar2X + avatarSize/2, avatarY + avatarSize + 60, 0xCCCCCCFF, 16);
    
    // Add pair logo at bottom
    const pairLogo = await createPairLogo();
    canvas.composite(pairLogo, width/2 - 100, height - 120);
    
    // Convert to buffer
    const imageBuffer = await canvas.getBufferAsync(jimp.MIME_JPEG);
    return imageBuffer;
    
  } catch (error) {
    console.error('Image generation error:', error);
    // Return a simple image if generation fails
    return await createSimpleImage();
  }
}

// Create gradient background
async function createGradientBackground(width, height) {
  const bg = new jimp(width, height);
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const r = Math.floor(128 + 127 * Math.sin(x / 100));
      const g = Math.floor(64 + 64 * Math.cos(y / 100));
      const b = Math.floor(192 + 63 * Math.sin((x + y) / 150));
      const color = jimp.rgbaToInt(r, g, b, 255);
      bg.setPixelColor(color, x, y);
    }
  }
  
  return bg;
}

// Load and process user image
async function loadAndProcessImage(url) {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data);
    let image = await jimp.read(buffer);
    image = image.resize(256, 256).quality(100);
    return image;
  } catch (error) {
    // Return default avatar if image load fails
    return createDefaultAvatar();
  }
}

// Create default avatar
async function createDefaultAvatar() {
  const size = 256;
  const avatar = new jimp(size, size, 0x666666FF);
  
  // Add initial letter
  const font = await jimp.loadFont(jimp.FONT_SANS_64_WHITE);
  const text = "?";
  const textWidth = jimp.measureText(font, text);
  const textHeight = jimp.measureTextHeight(font, text, size);
  
  avatar.print(font, (size - textWidth) / 2, (size - textHeight) / 2, text);
  return avatar;
}

// Create circular image with border
async function createCircularImage(image, size, borderSize, borderColor) {
  const canvas = new jimp(size + borderSize * 2, size + borderSize * 2, 0x00000000);
  
  // Create circular mask
  const mask = new jimp(size, size, 0x00000000);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const distance = Math.sqrt(Math.pow(x - size/2, 2) + Math.pow(y - size/2, 2));
      if (distance <= size/2) {
        mask.setPixelColor(0xFFFFFFFF, x, y);
      }
    }
  }
  
  // Resize image to fit circle
  image.resize(size, size);
  
  // Apply mask
  image.mask(mask, 0, 0);
  
  // Add border
  if (borderSize > 0) {
    const border = new jimp(size + borderSize * 2, size + borderSize * 2, 0x00000000);
    const borderMask = new jimp(size + borderSize * 2, size + borderSize * 2, 0x00000000);
    
    for (let y = 0; y < size + borderSize * 2; y++) {
      for (let x = 0; x < size + borderSize * 2; x++) {
        const distance = Math.sqrt(Math.pow(x - (size/2 + borderSize), 2) + Math.pow(y - (size/2 + borderSize), 2));
        if (distance <= size/2 + borderSize && distance > size/2) {
          borderMask.setPixelColor(0xFFFFFFFF, x, y);
        }
      }
    }
    
    border.scan(0, 0, border.bitmap.width, border.bitmap.height, function(x, y, idx) {
      if (borderMask.getPixelColor(x, y) === 0xFFFFFFFF) {
        this.setPixelColor(borderColor, x, y);
      }
    });
    
    canvas.composite(border, 0, 0);
  }
  
  canvas.composite(image, borderSize, borderSize);
  return canvas;
}

// Create heart logo
async function createHeartLogo() {
  const size = 100;
  const heart = new jimp(size, size, 0x00000000);
  
  // Simple heart shape
  heart.scan(0, 0, size, size, function(x, y, idx) {
    const dx = (x - size/2) / (size/2);
    const dy = (y - size/2) / (size/2);
    
    // Heart equation
    const heartEq = Math.pow(dx * dx + dy * dy - 1, 3) - dx * dx * dy * dy * dy;
    
    if (heartEq <= 0.1) {
      this.setPixelColor(0xFF1493FF, x, y);
    }
  });
  
  return heart;
}

// Create VIP logo
async function createVIPLogo() {
  const width = 120;
  const height = 40;
  const logo = new jimp(width, height, 0x00000000);
  
  // Gold gradient background
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const r = 255;
      const g = 215;
      const b = Math.floor(0 + 100 * (y / height));
      const color = jimp.rgbaToInt(r, g, b, 255);
      logo.setPixelColor(color, x, y);
    }
  }
  
  // Add VIP text
  try {
    const font = await jimp.loadFont(jimp.FONT_SANS_32_BLACK);
    logo.print(font, 10, 5, "⭐ VIP");
  } catch (error) {
    // Fallback if font loading fails
    logo.print(jimp.FONT_SANS_16_BLACK, 10, 10, "VIP");
  }
  
  return logo;
}

// Create pair logo
async function createPairLogo() {
  const width = 200;
  const height = 80;
  const logo = new jimp(width, height, 0x00000000);
  
  // Romantic gradient
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const r = Math.floor(255 * (y / height));
      const g = Math.floor(105 * (x / width));
      const b = Math.floor(180 * ((x + y) / (width + height)));
      const color = jimp.rgbaToInt(r, g, b, 200);
      logo.setPixelColor(color, x, y);
    }
  }
  
  // Add pair text
  try {
    const font = await jimp.loadFont(jimp.FONT_SANS_32_WHITE);
    logo.print(font, 20, 20, "💞 PAIRED");
  } catch (error) {
    logo.print(jimp.FONT_SANS_16_WHITE, 20, 30, "PAIRED");
  }
  
  return logo;
}

// Add styled text to canvas
async function addStyledText(canvas, text, x, y, color, fontSize = 16) {
  try {
    let font;
    if (fontSize === 24) {
      font = await jimp.loadFont(jimp.FONT_SANS_32_WHITE);
    } else {
      font = await jimp.loadFont(jimp.FONT_SANS_16_WHITE);
    }
    
    const textWidth = jimp.measureText(font, text);
    canvas.print(font, x - textWidth/2, y, text);
  } catch (error) {
    // Fallback text
    canvas.print(jimp.FONT_SANS_16_WHITE, x - 50, y, text.substring(0, 20));
  }
}

// Create simple image if main generation fails
async function createSimpleImage() {
  const canvas = new jimp(800, 400, 0x2C3E50FF);
  
  const font = await jimp.loadFont(jimp.FONT_SANS_32_WHITE);
  canvas.print(font, 200, 150, "💖 PAIR MATCH 💖");
  canvas.print(jimp.FONT_SANS_16_WHITE, 250, 200, "VIP Stylish Matching");
  
  const buffer = await canvas.getBufferAsync(jimp.MIME_JPEG);
  return buffer;
}