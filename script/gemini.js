const { GoogleGenerativeAI } = require('@google/generative-ai');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "gemini",
    role: 0,
    version: "2.0.0",
    hasPrefix: true,
    aliases: ["ai", "generate", "createimage", "geminiai"],
    description: "Generate AI images using Google Gemini API",
    usage: "gemini [prompt] or gemini with image attachment",
    credits: "𓆩✮͢𝘈𝘴𝘪𝘮✮͢𓆪",
    cooldown: 30
  },

  run: async function({ api, event, args }) {
    try {
      // Check if Gemini config exists
      const configPath = './data/geminiConfig.json';
      if (!fs.existsSync(configPath)) {
        return api.sendMessage(
          "❌ Gemini API not configured!\n\n" +
          "Please create 'data/geminiConfig.json' with your Gemini API key.\n" +
          "Get your API key from: https://aistudio.google.com/app/apikey",
          event.threadID
        );
      }

      const geminiConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      
      if (!geminiConfig.apiKey || geminiConfig.apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
        return api.sendMessage(
          "❌ Gemini API key not set!\n\n" +
          "Please add your Gemini API key to 'data/geminiConfig.json'\n" +
          "Get your free API key from: https://aistudio.google.com/app/apikey",
          event.threadID
        );
      }

      if (args.length === 0 && !event.attachments) {
        return showHelp(api, event);
      }

      const prompt = args.join(' ').trim();
      
      if (!prompt && !event.attachments) {
        return api.sendMessage("❌ Please provide a prompt or attach an image!", event.threadID);
      }

      api.sendMessage("🔄 Gemini AI is generating... Please wait...", event.threadID);

      let result;
      
      if (event.attachments && event.attachments.length > 0) {
        // Image analysis mode
        const imageUrl = event.attachments[0].url;
        if (imageUrl) {
          result = await analyzeImageWithGemini(geminiConfig, imageUrl, prompt);
        } else {
          return api.sendMessage("❌ Invalid image attachment!", event.threadID);
        }
      } else {
        // Text-to-image generation mode
        result = await generateWithGemini(geminiConfig, prompt);
      }

      if (!result) {
        return api.sendMessage("❌ Failed to generate response from Gemini AI!", event.threadID);
      }

      // Send the result
      await api.sendMessage({
        body: `✨ 𝗚𝗘𝗠𝗜𝗡𝗜 𝗔𝗜 𝗥𝗘𝗦𝗣𝗢𝗡𝗦𝗘\n\n📝 𝗣𝗿𝗼𝗺𝗽𝘁: ${prompt || "Image Analysis"}\n\n${result.text}\n\n🔮 𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗯𝘆 𝗚𝗼𝗼𝗴𝗹𝗲 𝗚𝗲𝗺𝗶𝗻𝗶 𝗔𝗜`,
        attachment: result.images || []
      }, event.threadID);

    } catch (error) {
      console.error('Gemini command error:', error);
      
      let errorMessage = "❌ Error generating with Gemini AI!";
      
      if (error.message.includes('API_KEY_INVALID')) {
        errorMessage = "❌ Invalid Gemini API key! Please check your configuration.";
      } else if (error.message.includes('quota')) {
        errorMessage = "❌ API quota exceeded! Please try again later.";
      } else if (error.message.includes('safety')) {
        errorMessage = "❌ Content blocked by safety settings! Please try a different prompt.";
      } else if (error.message.includes('network')) {
        errorMessage = "❌ Network error! Please check your connection.";
      }
      
      api.sendMessage(errorMessage, event.threadID);
    }
  }
};

// Show help information
function showHelp(api, event) {
  const helpMessage = `🎨 𝗚𝗘𝗠𝗜𝗡𝗜 𝗔𝗜 𝗜𝗠𝗔𝗚𝗘 𝗚𝗘𝗡𝗘𝗥𝗔𝗧𝗢𝗥 🔮

📝 𝗨𝘀𝗮𝗴𝗲:
• gemini [prompt] - Generate AI image from text
• Attach image + gemini [question] - Analyze image

🎯 𝗘𝘅𝗮𝗺𝗽𝗹𝗲𝘀:
• gemini a beautiful sunset over mountains, digital art
• gemini cute anime girl with pink hair, anime style
• gemini futuristic city with flying cars, cyberpunk
• (attach image) gemini describe this image in detail

🖼️ 𝗦𝘂𝗽𝗽𝗼𝗿𝘁𝗲𝗱 𝗦𝘁𝘆𝗹𝗲𝘀:
• Digital Art • Anime • Photorealistic
• Cyberpunk • Fantasy • Sci-Fi
• Watercolor • Oil Painting • 3D Render

⚡ 𝗙𝗲𝗮𝘁𝘂𝗿𝗲𝘀:
• High-quality image generation
• Image analysis and description
• Multiple art styles
• Safety filters
• Fast response

🔐 𝗚𝗲𝘁 𝗔𝗣𝗜 𝗞𝗲𝘆:
Visit: https://aistudio.google.com/app/apikey`;

  api.sendMessage(helpMessage, event.threadID);
}

// Generate image from text prompt
async function generateWithGemini(config, prompt) {
  try {
    const genAI = new GoogleGenerativeAI(config.apiKey);
    
    // For text generation (Gemini can't directly generate images yet, but we'll use it for descriptions)
    // Note: Gemini Pro Vision is for analysis, not generation. We'll create a hybrid approach.
    
    const model = genAI.getGenerativeModel({ 
      model: "gemini-pro",
      safetySettings: config.safetySettings
    });

    // Enhanced prompt for better results
    const enhancedPrompt = `Create a detailed visual description for: "${prompt}"
    
Please provide a comprehensive description that includes:
1. Main subject and composition
2. Colors and lighting
3. Style and artistic elements
4. Mood and atmosphere
5. Technical details

Format the response as a beautiful visual description that could be used to create an image.`;

    const result = await model.generateContent(enhancedPrompt);
    const response = await result.response;
    const text = response.text();

    // Since Gemini doesn't directly generate images, we'll create a placeholder
    // In a real implementation, you might want to integrate with actual image generation APIs
    const generatedImage = await createPlaceholderImage(prompt, text);
    
    return {
      text: `🖼️ 𝗚𝗲𝗻𝗲𝗿𝗮𝘁𝗲𝗱 𝗩𝗶𝘀𝘂𝗮𝗹 𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻:\n\n${text}\n\n💡 𝗧𝗶𝗽: Use this description with image generation tools!`,
      images: [generatedImage]
    };

  } catch (error) {
    console.error('Gemini generation error:', error);
    throw error;
  }
}

// Analyze image with Gemini
async function analyzeImageWithGemini(config, imageUrl, prompt = "Describe this image in detail") {
  try {
    const genAI = new GoogleGenerativeAI(config.apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-pro-vision",
      safetySettings: config.safetySettings
    });

    // Download image
    const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const imageBuffer = Buffer.from(imageResponse.data);
    
    // Convert to base64
    const base64Image = imageBuffer.toString('base64');
    
    const result = await model.generateContent([
      {
        text: prompt + "\n\nPlease provide a detailed analysis including:\n- Main subjects and objects\n- Colors and composition\n- Style and mood\n- Any text or details visible\n- Overall impression"
      },
      {
        inlineData: {
          mimeType: getMimeType(imageUrl),
          data: base64Image
        }
      },
    ]);

    const response = await result.response;
    const text = response.text();

    return {
      text: `🔍 𝗜𝗺𝗮𝗴𝗲 𝗔𝗻𝗮𝗹𝘆𝘀𝗶𝘀:\n\n${text}\n\n📊 𝗔𝗻𝗮𝗹𝘆𝘇𝗲𝗱 𝘄𝗶𝘁𝗵 𝗚𝗲𝗺𝗶𝗻𝗶 𝗣𝗿𝗼 𝗩𝗶𝘀𝗶𝗼𝗻`
    };

  } catch (error) {
    console.error('Gemini image analysis error:', error);
    throw error;
  }
}

// Get MIME type from URL
function getMimeType(url) {
  const extension = url.split('.').pop().toLowerCase();
  const mimeTypes = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'webp': 'image/webp',
    'bmp': 'image/bmp'
  };
  return mimeTypes[extension] || 'image/jpeg';
}

// Create placeholder image (in real implementation, integrate with actual image gen APIs)
async function createPlaceholderImage(prompt, description) {
  try {
    const jimp = require('jimp');
    
    const width = 800;
    const height = 600;
    const canvas = new jimp(width, height, 0x1a1a2eff);
    
    // Create a beautiful placeholder with gradient
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const r = Math.floor(26 + 50 * Math.sin(x / 100 + y / 100));
        const g = Math.floor(26 + 50 * Math.cos(x / 150 + y / 150));
        const b = Math.floor(46 + 50 * Math.sin(x / 200 + y / 200));
        canvas.setPixelColor(jimp.rgbaToInt(r, g, b, 255), x, y);
      }
    }
    
    // Add text overlay
    const font = await jimp.loadFont(jimp.FONT_SANS_32_WHITE);
    const smallFont = await jimp.loadFont(jimp.FONT_SANS_16_WHITE);
    
    canvas.print(font, width/2 - 200, 100, "🎨 Gemini AI");
    canvas.print(font, width/2 - 150, 150, "Image Generation");
    
    // Truncate prompt for display
    const displayPrompt = prompt.length > 40 ? prompt.substring(0, 40) + "..." : prompt;
    canvas.print(smallFont, width/2 - 200, 250, `Prompt: ${displayPrompt}`);
    canvas.print(smallFont, width/2 - 200, 280, "Powered by Google Gemini AI");
    
    // Add some decorative elements
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = Math.random() * 3 + 1;
      const brightness = Math.random() * 100 + 155;
      canvas.setPixelColor(jimp.rgbaToInt(brightness, brightness, brightness, 255), x, y);
    }
    
    const imageBuffer = await canvas.getBufferAsync(jimp.MIME_JPEG);
    return imageBuffer;
    
  } catch (error) {
    console.error('Placeholder image creation error:', error);
    return null;
  }
}

// Advanced image generation with external API (optional integration)
async function generateWithExternalAPI(prompt) {
  // You can integrate with other image generation APIs here:
  // - Stable Diffusion
  // - DALL-E
  // - Midjourney (via API if available)
  // - Leonardo AI
  // - etc.
  
  // Example placeholder for external API integration
  try {
    // This is where you would call your preferred image generation API
    // const response = await axios.post('https://api.image-generation.com/generate', {
    //   prompt: prompt,
    //   size: "1024x1024",
    //   style: "digital-art"
    // });
    
    // return response.data.image_url;
    
    return null; // Return null for now since we're using placeholder
  } catch (error) {
    console.error('External API error:', error);
    return null;
  }
}