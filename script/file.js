const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
    name: "file",
    version: "1.0.0",
    role: 1,
    hasPrefix: true,
    credits: "CHAND",
    description: "Manage files and folders in the cache",
    usages: "file <command> [options]",
    cooldowns: 0,
};

module.exports.run = async function({ api, event, args }) {
    const { threadID, messageID } = event;
    const allowedUID = ['100072727941471']; 
      if (!allowedUID.includes(event.senderID)) {
          return api.sendMessage("❮●❯━━━━❪💝❫━━━━❮●❯\n\n𝐎𝐧𝐥𝐲 𝐂𝐇𝐔𝐙𝐀  𝐜𝐚𝐧 𝐮𝐬𝐞\n\n❮●❯━━━━❪💝❫━━━━❮●❯", event.threadID);
    }
    let files = fs.readdirSync(__dirname) || [];
    let msg = "";
    let i = 1;

    if (args[0] === 'help') {
        msg = `
Cách dùng lệnh:
•Key: start <text>
•Tác dụng: Lọc ra file cần xóa có ký tự bắt đầu tùy chọn
•Ví dụ: commands rank
•Key: ext <text>
•Tác dụng: Lọc ra file cần xóa có đuôi tùy chọn
•Ví dụ: commands .txt
•Key: để trống
•Tác dụng: lọc ra tất cả các file trong thư mục
•Ví dụ: commands
•Key: help
•Tác dụng: xem cách dùng lệnh
•Ví dụ: commands help`;

        return api.sendMessage(msg, threadID, messageID);
    }

    if (args[0] === "start" && args[1]) {
        const word = args.slice(1).join(" ");
        files = files.filter(file => file.startsWith(word));

        if (files.length === 0) {
            return api.sendMessage(`There are no files starting with: ${word}`, threadID, messageID);
        }
        msg = `Files starting with "${word}":`;
    }
    else if (args[0] === "ext" && args[1]) {
        const ext = args[1];
        files = files.filter(file => file.endsWith(ext));

        if (files.length === 0) {
            return api.sendMessage(`There are no files ending with: ${ext}`, threadID, messageID);
        }
        msg = `Files with extension "${ext}":`;
    }
    else if (!args[0]) {
        if (files.length === 0) {
            return api.sendMessage("No files or folders found.", threadID, messageID);
        }
        msg = "All files and folders:";
    }
    else {
        const word = args.join(" ");
        files = files.filter(file => file.includes(word));

        if (files.length === 0) {
            return api.sendMessage(`No files with the character: ${word}`, threadID, messageID);
        }
        msg = `Files containing "${word}":`;
    }

    files.forEach(file => {
        const fileOrDir = fs.statSync(path.join(__dirname, file));
        const typef = fileOrDir.isDirectory() ? "[Folder🗂️]" : "[File📄]";
        msg += `${i++}. ${typef} ${file}\n`;
    });

    api.sendMessage(`All Files in This Bot \n${msg}`, threadID, messageID);
};
