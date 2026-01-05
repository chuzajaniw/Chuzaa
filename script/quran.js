module.exports.config = {
  name: "quran",
  version: "1.0.0",
  role: 0,
  hasPrefix: true,
  usage: 'quran',
  description: 'photo quran',
  credits: 'CHAND',
  cooldowns: 5
};
module.exports.run = async function({api, event, args, utils, Users, Threads}) {
const axios = require("axios")
const request = require("request")
const fs = require("fs-extra")
var link = ["https://i.imgur.com/qH2Hb9Z.jpeg", "https://i.imgur.com/3QjXcwo.jpeg", "https://i.imgur.com/tUWF1qD.jpeg", "https://i.imgur.com/0lbMSHZ.jpeg", "https://i.imgur.com/hGmjRO7.jpeg", "https://i.imgur.com/4LyiZOC.jpeg", "https://i.imgur.com/nr0Po7U.jpeg", "https://i.imgur.com/biVmA6I.jpeg", "https://i.imgur.com/eStDAB8.jpeg", "https://i.imgur.com/S09KWaH.jpeg"];
var amir = [`Surat No 10 : سورة يونس - Ayat No 25

وَ اللّٰہُ یَدۡعُوۡۤا اِلٰی دَارِ السَّلٰمِ ؕ وَ یَہۡدِیۡ مَنۡ یَّشَآءُ  اِلٰی صِرَاطٍ مُّسۡتَقِیۡمٍ ﴿۲۵﴾

اور اللہ تعالٰی سلامتی کے گھر کی طرف تم کو بلاتا ہے اور جس کو چاہتا ہے راہ راست پ\n ر چلنے کی توفیق دیتا ہے. 𝗖𝗼𝗱𝗲𝗱 𝗯𝘆:\n𝐂𝐇𝐔𝐙𝐀` ,`Surat No 36 : سورة يس - Ayat No 50

فَلَا یَسۡتَطِیۡعُوۡنَ تَوۡصِیَۃً  وَّ لَاۤ  اِلٰۤی اَہۡلِہِمۡ   یَرۡجِعُوۡنَ ﴿۵۰﴾٪                   2

اس وقت نہ تو یہ وصیت کر سکیں گے اور نہ اپنے اہل کی طرف لوٹ سکیں گے ۔  

\n𝗖𝗼𝗱𝗲𝗱 𝗯𝘆:\n𝐂𝐇𝐔𝐙𝐀`,`Surat No 17 : سورة بنی اسراءیل - Ayat No 52

یَوۡمَ  یَدۡعُوۡکُمۡ فَتَسۡتَجِیۡبُوۡنَ بِحَمۡدِہٖ وَ  تَظُنُّوۡنَ   اِنۡ   لَّبِثۡتُمۡ   اِلَّا   قَلِیۡلًا  ﴿۵۲﴾٪                 

جس دن وہ تمہیں  بلائے گا تم اس کی تعریف کرتے ہوئے تعمیل ارشاد کرو گے اور گمان کرو گے کہ تمہارا رہنا بہت ہی تھوڑا ہے  ۔  

\n𝗖𝗼𝗱𝗲𝗱 𝗕𝘆:\n𝐂𝐇𝐔𝐙𝐀` ,`Surat No 17 : سورة بنی اسراءیل - Ayat No 52

یَوۡمَ  یَدۡعُوۡکُمۡ فَتَسۡتَجِیۡبُوۡنَ بِحَمۡدِہٖ وَ  تَظُنُّوۡنَ   اِنۡ   لَّبِثۡتُمۡ   اِلَّا   قَلِیۡلًا  ﴿۵۲﴾٪                 

جس دن وہ تمہیں  بلائے گا تم اس کی تعریف کرتے ہوئے تعمیل ارشاد کرو گے اور گمان کرو گے کہ تمہارا رہنا بہت ہی تھوڑا ہے  ۔  

\n𝗖𝗼𝗱𝗲𝗱 𝗕𝘆:\n𝐂𝐇𝐔𝐙𝐀` ,`Surat No 28 : سورة القصص - Ayat No 81

فَخَسَفۡنَا بِہٖ وَ بِدَارِہِ  الۡاَرۡضَ ۟ فَمَا  کَانَ لَہٗ  مِنۡ فِئَۃٍ  یَّنۡصُرُوۡنَہٗ  مِنۡ دُوۡنِ اللّٰہِ ٭ وَ مَا  کَانَ مِنَ الۡمُنۡتَصِرِیۡنَ ﴿۸۱﴾

۔   ( آخرکار )  ہم نے اسے  اس کے محل سمیت زمین میں دھنسا دیا  اور اللہ کے سوا کوئی جماعت اس کی مدد کے لئے تیار نہ ہوئی نہ وہ خود اپنے بچانے والوں میں سے ہو سکا ۔  

\n𝗖𝗼𝗱𝗲𝗱 𝗕𝘆:\n𝐂𝐇𝐔𝐙𝐀`];
var juswa1 = amir[Math.floor(Math.random() * amir.length)];
var callback = () => api.sendMessage({body:`${juswa1}`,attachment: fs.createReadStream(__dirname + "/cache/zac.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/zac.jpg")); 
    return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/zac.jpg")).on("close",() => callback());
 };