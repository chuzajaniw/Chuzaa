module.exports.config = {
  name: "lyrics",
  version: "1.0.0",
  role: 0,
  hasPrefix: true,
  description: "Get info of lyrics",
  usage: "lyrics name",
  credits: "CHAND",
  cooldown: 0
};

module.exports.run = async function({ api, event, args }) {
  const axios = require("axios");
  const fs = require("fs-extra");

  try {
    let searchQuery = args.join(" ");
    const res = await axios.get(`https://api.popcat.xyz/itunes?q=${searchQuery}`);

    const data = res.data;
    const thumbnailUrl = data.thumbnail;
    const name = data.name;
    const artist = data.artist;
    const album = data.album;
    const releaseDate = data.release_date;
    const length = data.length;
    const genre = data.genre;
    const url = data.url;

    // Fetch and save the image
    const imgResponse = await axios.get(thumbnailUrl, { responseType: 'arraybuffer' });
    fs.writeFileSync(__dirname + "/cache/img1.png", Buffer.from(imgResponse.data));

    // Send the message
    return api.sendMessage({
      body: `Music Name: ${name}\nArtist Name: ${artist}\nAlbum: ${album}\nGenre: ${genre}\nRelease Date: ${releaseDate}\nUrl: ${url}`,
      attachment: fs.createReadStream(__dirname + "/cache/img1.png")
    }, event.threadID, event.messageID);

  } catch (error) {
    console.error('Error occurred:', error);
    api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
  }
};
