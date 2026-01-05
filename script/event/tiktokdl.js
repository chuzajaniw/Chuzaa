module.exports.config = {
  name: "tiktokdl",
  eventType: ["message"],
  version: "2.0.0",
  credits: "CHAND & 𓆩✮͢𝘈𝘴𝘪𝘮✮͢𓆪",
  description: "Auto TikTok Video Downloader",
  cooldowns: 5
};

module.exports.handleEvent = async function({ api, event }) {
  try {
    // Only process message events and ignore bot's own messages
    if (event.type !== "message" || event.senderID === api.getCurrentUserID()) {
      return;
    }

    const fs = require('fs');
    const axios = require('axios');
    const path = require('path');

    // Improved TikTok URL regex
    const regEx_tiktok = /https?:\/\/(?:www\.|vt\.|vm\.)?tiktok\.com\/(?:[\w\/-]+\/)?(?:\?.*)?/g;
    const link = event.body;
    
    if (!link || !regEx_tiktok.test(link)) {
      return;
    }

    // Extract the first TikTok URL found
    const tiktokUrl = link.match(regEx_tiktok)[0];
    
    if (!tiktokUrl) {
      return;
    }

    // Create cache directory if it doesn't exist
    const cacheDir = './script/cache';
    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir, { recursive: true });
    }

    const fileName = `tiktok_${Date.now()}.mp4`;
    const filePath = path.join(cacheDir, fileName);

    // Show processing indicators
    api.setMessageReaction("⏳", event.messageID, () => {}, true);
    api.sendTypingIndicator(event.threadID, true);

    try {
      // Send initial processing message
      const processingMsg = await api.sendMessage('📥 TikTok video download started...', event.threadID);

      // Get TikTok video info
      const response = await axios.post(`https://www.tikwm.com/api/`, {
        url: tiktokUrl
      }, {
        timeout: 30000,
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });

      if (!response.data || !response.data.data) {
        throw new Error('No video data received from API');
      }

      const data = response.data.data;

      // Validate required data
      if (!data.play) {
        throw new Error('No video URL found');
      }

      const userName = data.author?.unique_id || 'Unknown';
      const userNickname = data.author?.nickname || 'Unknown';
      const userID = data.author?.id || 'Unknown';
      const duration = data.duration || 'Unknown';
      const title = data.title || 'No Title';
      const videoUrl = data.play;

      // Download video stream
      const videoResponse = await axios({
        method: 'get',
        url: videoUrl,
        responseType: 'stream',
        timeout: 60000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Referer': 'https://www.tiktok.com/'
        }
      });

      // Create write stream
      const videoFile = fs.createWriteStream(filePath);
      videoResponse.data.pipe(videoFile);

      videoFile.on('finish', async () => {
        try {
          // Check file size
          const stats = fs.statSync(filePath);
          const fileSize = (stats.size / (1024 * 1024)).toFixed(2);

          // Facebook messenger file size limit (~50MB)
          if (stats.size > 50 * 1024 * 1024) {
            fs.unlinkSync(filePath);
            await api.sendMessage("❌ Video is too large to send (max 50MB)", event.threadID);
            return;
          }

          // Update reaction
          api.setMessageReaction("✅", event.messageID, () => {}, true);

          // Send the downloaded video
          await api.sendMessage({
            body: `✅ TikTok Video Downloaded Successfully!\n\n` +
                  `👤 User: @${userName}\n` +
                  `📛 Nickname: ${userNickname}\n` +
                  `🆔 User ID: ${userID}\n` +
                  `⏱️ Duration: ${duration}s\n` +
                  `📝 Title: ${title}\n` +
                  `📊 Size: ${fileSize} MB\n\n` +
                  `✨ Downloaded by Auto TikTok DL`,
            attachment: fs.createReadStream(filePath)
          }, event.threadID);

          // Delete processing message
          if (processingMsg && processingMsg.messageID) {
            api.unsendMessage(processingMsg.messageID);
          }

          // Clean up file after sending
          setTimeout(() => {
            try {
              if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
              }
            } catch (cleanupError) {
              console.log('Cleanup error:', cleanupError.message);
            }
          }, 5000);

        } catch (sendError) {
          console.error('Send error:', sendError);
          await api.sendMessage("❌ Error sending video file", event.threadID);
          
          // Clean up file
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        }
      });

      videoFile.on('error', async (error) => {
        console.error('File write error:', error);
        await api.sendMessage("❌ Error saving video file", event.threadID);
        
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });

    } catch (error) {
      console.error('TikTok download error:', error);
      
      // Remove processing reaction
      api.setMessageReaction("❌", event.messageID, () => {}, true);
      
      let errorMessage = "❌ Failed to download TikTok video. ";
      
      if (error.message.includes('timeout')) {
        errorMessage += "Download timeout. Please try again.";
      } else if (error.message.includes('No video data')) {
        errorMessage += "Video not found or private.";
      } else if (error.message.includes('network')) {
        errorMessage += "Network error. Check your connection.";
      } else {
        errorMessage += error.message;
      }
      
      await api.sendMessage(errorMessage, event.threadID);
    }

  } catch (outerError) {
    console.error('Outer error in tiktokdl:', outerError);
  }
};