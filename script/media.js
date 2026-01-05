const axios = require("axios");
const fs = require("fs");
const path = require("path");
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

module.exports.config = {
  name: "media",
  version: "2.0.0",
  role: 0,
  credits: "CHAND & 𓆩✮͢𝘈𝘴𝘪𝘮✮͢𓆪",
  hasPrefix: true,
  aliases: ["yt", "youtube", "music", "song"],
  description: "Download audio or video from YouTube",
  usage: "media [audio/video] [song name]",
  cooldowns: 10
};

module.exports.run = async ({ api, event, args }) => {
    try {
        // Check if user provided enough arguments
        if (args.length < 2) {
            return api.sendMessage(
                `🎵 YouTube Media Downloader\n\n` +
                `📝 Usage:\n` +
                `• media audio <song name> - Download as MP3\n` +
                `• media video <song name> - Download as MP4\n\n` +
                `✨ Examples:\n` +
                `• media audio shape of you\n` +
                `• media video despacito\n` +
                `• media audio bollywood songs`,
                event.threadID,
                event.messageID
            );
        }

        const mediaType = args[0].toLowerCase();
        const mediaTitle = args.slice(1).join(" ");

        // Validate media type
        if (mediaType !== 'audio' && mediaType !== 'video') {
            return api.sendMessage(
                "❌ Invalid media type! Please use 'audio' or 'video'.\n\n" +
                "Example: media audio song name",
                event.threadID,
                event.messageID
            );
        }

        if (!mediaTitle) {
            return api.sendMessage(
                "❌ Please provide a song/video name to search.",
                event.threadID,
                event.messageID
            );
        }

        api.sendMessage(`🔍 Searching for "${mediaTitle}"...`, event.threadID, event.messageID);

        // Use yt-search to search for videos
        const searchResults = await ytSearch(mediaTitle);

        if (!searchResults.videos || searchResults.videos.length === 0) {
            return api.sendMessage(
                `❌ No results found for "${mediaTitle}". Please try a different search term.`,
                event.threadID,
                event.messageID
            );
        }

        const media = searchResults.videos[0];
        const mediaUrl = `https://www.youtube.com/watch?v=${media.videoId}`;

        // Validate YouTube URL
        if (!ytdl.validateURL(mediaUrl)) {
            return api.sendMessage(
                "❌ Invalid YouTube URL generated. Please try again.",
                event.threadID,
                event.messageID
            );
        }

        // Create cache directory if it doesn't exist
        const cacheDir = path.join(__dirname, '../cache');
        if (!fs.existsSync(cacheDir)) {
            fs.mkdirSync(cacheDir, { recursive: true });
        }

        // Sanitize filename
        const sanitizeFilename = (name) => {
            return name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        };

        const fileName = `${sanitizeFilename(media.title)}_${Date.now()}.${mediaType === 'audio' ? 'mp3' : 'mp4'}`;
        const filePath = path.join(cacheDir, fileName);

        api.sendMessage(`📥 Downloading ${mediaType === 'audio' ? 'audio' : 'video'}...`, event.threadID, event.messageID);

        try {
            let stream;
            let fileSize = 0;

            if (mediaType === 'audio') {
                stream = ytdl(mediaUrl, {
                    filter: 'audioonly',
                    quality: 'highestaudio',
                });
            } else {
                stream = ytdl(mediaUrl, {
                    filter: 'videoandaudio',
                    quality: 'highest',
                });
            }

            // Track download progress
            stream.on('progress', (chunkLength, downloaded, total) => {
                fileSize = total;
                const percent = ((downloaded / total) * 100).toFixed(2);
                if (percent % 25 === 0) { // Update every 25% progress
                    api.sendMessage(`📥 Downloading... ${percent}%`, event.threadID);
                }
            });

            const writeStream = fs.createWriteStream(filePath);
            stream.pipe(writeStream);

            writeStream.on('finish', async () => {
                try {
                    console.info(`[DOWNLOADER] Downloaded: ${media.title}`);

                    // Check file size
                    const stats = fs.statSync(filePath);
                    const actualFileSize = (stats.size / (1024 * 1024)).toFixed(2);

                    // Facebook messenger file size limit (~50MB)
                    if (stats.size > 50 * 1024 * 1024) {
                        fs.unlinkSync(filePath);
                        return api.sendMessage(
                            `❌ File is too large (${actualFileSize}MB). Maximum allowed size is 50MB.`,
                            event.threadID,
                            event.messageID
                        );
                    }

                    const message = {
                        body: `✅ ${mediaType === 'audio' ? 'Audio' : 'Video'} Downloaded Successfully!\n\n` +
                              `🎵 Title: ${media.title}\n` +
                              `👤 Channel: ${media.author.name}\n` +
                              `⏱️ Duration: ${media.timestamp}\n` +
                              `📊 Size: ${actualFileSize} MB\n` +
                              `👀 Views: ${media.views}\n\n` +
                              `✨ Enjoy your ${mediaType === 'audio' ? 'music' : 'video'}!`,
                        attachment: fs.createReadStream(filePath),
                    };

                    await api.sendMessage(message, event.threadID, async (err, info) => {
                        if (err) {
                            console.error('Send message error:', err);
                            return;
                        }

                        // Clean up file after sending
                        try {
                            if (fs.existsSync(filePath)) {
                                fs.unlinkSync(filePath);
                                console.log(`[CLEANUP] Removed: ${filePath}`);
                            }
                        } catch (cleanupError) {
                            console.error('Cleanup error:', cleanupError);
                        }
                    });

                } catch (fileError) {
                    console.error('File processing error:', fileError);
                    api.sendMessage(
                        "❌ Error processing downloaded file.",
                        event.threadID,
                        event.messageID
                    );
                    
                    // Clean up file
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                    }
                }
            });

            writeStream.on('error', (error) => {
                console.error('Write stream error:', error);
                api.sendMessage(
                    "❌ Error saving file to disk.",
                    event.threadID,
                    event.messageID
                );
                
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            });

            stream.on('error', (error) => {
                console.error('YouTube download error:', error);
                api.sendMessage(
                    `❌ Error downloading from YouTube: ${error.message}`,
                    event.threadID,
                    event.messageID
                );
                
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            });

        } catch (downloadError) {
            console.error('Download setup error:', downloadError);
            api.sendMessage(
                "❌ Error setting up download. Please try again.",
                event.threadID,
                event.messageID
            );
        }

    } catch (error) {
        console.error('[MEDIA COMMAND ERROR]', error);
        
        let errorMessage = "❌ An error occurred while processing your request. ";
        
        if (error.message.includes('network') || error.message.includes('ECONNREFUSED')) {
            errorMessage += "Network error. Please check your connection.";
        } else if (error.message.includes('timeout')) {
            errorMessage += "Request timeout. Please try again.";
        } else if (error.message.includes('No results')) {
            errorMessage += "No search results found.";
        } else {
            errorMessage += "Please try again later.";
        }
        
        api.sendMessage(errorMessage, event.threadID, event.messageID);
    }
};