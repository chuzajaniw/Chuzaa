module.exports.config = {
  name: "autofbdl",
  eventType: ["message"],
  version: "2.0.0",
  credits: "CHAND & 𓆩✮͢𝘈𝘴𝘪𝘮✮͢𓆪",
  description: "Auto Facebook Video Downloader",
  cooldowns: 5
};

module.exports.handleEvent = async function({ api, event }) {
  try {
    // Only process if it's a message and not from bot
    if (event.type !== "message" || event.senderID === api.getCurrentUserID()) {
      return;
    }

    const getFBInfo = require("@xaviabot/fb-downloader");
    const axios = require('axios');
    const fs = require('fs');
    const path = require('path');

    // Create cache directory if it doesn't exist
    const cacheDir = './script/cache';
    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir, { recursive: true });
    }

    const videoPath = path.join(cacheDir, `fb_video_${Date.now()}.mp4`);
    
    // Improved Facebook URL regex
    const regexFB = /https?:\/\/(?:www\.|m\.)?(?:facebook\.com|fb\.watch)\/(?:[^\s]+)/g;
    const matches = event.body?.match(regexFB);
    
    if (!matches || matches.length === 0) {
      return;
    }

    const url = matches[0];

    // Validate URL
    if (!url.includes('facebook.com') && !url.includes('fb.watch')) {
      return;
    }

    // Add reaction to show processing
    api.setMessageReaction("⏳", event.messageID, () => {}, true);
    api.sendTypingIndicator(event.threadID, true);

    try {
      // Download Facebook video info
      const result = await getFBInfo(url);
      
      if (!result || !result.sd) {
        throw new Error('No video found or video is private');
      }

      // Choose best quality available
      const videoUrl = result.hd || result.sd;
      
      // Send processing message
      const processingMsg = await api.sendMessage('📥 Facebook video download started...', event.threadID, event.messageID);

      // Download video
      const videoResponse = await axios({
        method: 'GET',
        url: encodeURI(videoUrl),
        responseType: 'stream',
        timeout: 60000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Referer': 'https://www.facebook.com/',
          'Accept': '*/*'
        }
      });

      // Create write stream
      const writer = fs.createWriteStream(videoPath);
      videoResponse.data.pipe(writer);

      writer.on('finish', async () => {
        try {
          // Get file stats
          const stats = fs.statSync(videoPath);
          const fileSize = (stats.size / (1024 * 1024)).toFixed(2);

          // Check file size (Facebook limit ~50MB)
          if (stats.size > 50 * 1024 * 1024) {
            fs.unlinkSync(videoPath);
            await api.sendMessage("❌ Video is too large to send (max 50MB)", event.threadID);
            return;
          }

          // Update reaction
          api.setMessageReaction("✅", event.messageID, () => {}, true);

          // Send the video
          await api.sendMessage({
            body: `✅ Facebook Video Downloaded Successfully!\n\n📊 Size: ${fileSize} MB\n🎬 Quality: ${result.hd ? 'HD' : 'SD'}\n🔗 Source: ${url}\n\n✨ Downloaded by Auto Facebook DL`,
            attachment: fs.createReadStream(videoPath)
          }, event.threadID);

          // Delete processing message
          if (processingMsg && processingMsg.messageID) {
            api.unsendMessage(processingMsg.messageID);
          }

          // Clean up file after sending
          setTimeout(() => {
            try {
              if (fs.existsSync(videoPath)) {
                fs.unlinkSync(videoPath);
              }
            } catch (cleanupError) {
              console.log('Cleanup error:', cleanupError.message);
            }
          }, 5000);

        } catch (sendError) {
          console.error('Send error:', sendError);
          await api.sendMessage("❌ Error sending video. The video might be too large.", event.threadID);
          
          // Clean up file
          if (fs.existsSync(videoPath)) {
            fs.unlinkSync(videoPath);
          }
        }
      });

      writer.on('error', async (error) => {
        console.error('Write error:', error);
        await api.sendMessage("❌ Error downloading video file.", event.threadID);
        
        if (fs.existsSync(videoPath)) {
          fs.unlinkSync(videoPath);
        }
      });

    } catch (error) {
      console.error('Facebook download error:', error);
      
      // Remove processing reaction
      api.setMessageReaction("❌", event.messageID, () => {}, true);
      
      let errorMessage = "❌ Failed to download Facebook video. ";
      
      if (error.message.includes('private') || error.message.includes('No video')) {
        errorMessage += "Video might be private or not available.";
      } else if (error.message.includes('timeout')) {
        errorMessage += "Download timeout. Please try again.";
      } else if (error.message.includes('rate limit')) {
        errorMessage += "Rate limit exceeded. Please wait a moment.";
      } else {
        errorMessage += error.message;
      }
      
      await api.sendMessage(errorMessage, event.threadID);
    }

  } catch (outerError) {
    console.error('Outer error in autofbdl:', outerError);
  }
};