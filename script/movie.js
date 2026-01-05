module.exports.config = {
  name: "movie",
  version: "1.0.0",
  role: 0,
  hasPrefix: true,
  description: "Get info of movie",
  usage: "movie name",
  credits: "CHAND",
  cooldown: 0
};

module.exports.run = async function({ api, event, args }) {
  const axios = require('axios');
  const request = require('request');
  const fs = require('fs');
  const path = __dirname + '/cache/juswa.png';

  try {
    var juswa = args.join(' ');
    if (!juswa) return api.sendMessage('Add text lmao', event.threadID, event.messageID);

    const res = await axios.get(`https://api.popcat.xyz/imdb?q=${encodeURIComponent(juswa)}`);
    let { title, year: date, runtime: time, genres, director, actors, plot, poster } = res.data;

    const callback = () => {
      api.sendMessage({
        body: `Title: ${title}\n\nActors: ${actors}\n\nRelease Date: ${date}\n\nGenres: ${genres}\n\nDirector: ${director}\n\nPlot: ${plot}`,
        attachment: fs.createReadStream(path)
      }, event.threadID, () => fs.unlinkSync(path), event.messageID);
    };

    request(encodeURI(poster)).pipe(fs.createWriteStream(path)).on('close', callback);

  } catch (error) {
    console.error('Error occurred:', error);
    return api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
  }
};
