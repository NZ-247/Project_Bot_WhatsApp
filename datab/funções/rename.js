
const fs = require('fs-extra');
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./ferramentas.js');

const sendStickerr = async (conny, jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0);
let buffer;
if (options && (options.packname || options.author)) {
buffer = await writeExifImg(buff, options);
} else {
buffer = await imageToWebp(buff);
}

await conny.sendMessage(jid, {sticker: {url: buffer}, ...options}, {quoted})
return buffer;
};

const sendSticker = async (conny, jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0);
let buffer;
if (options && (options.packname || options.author)) {
buffer = await writeExifVid(buff, options);
} else {
buffer = await videoToWebp(buff);
}

await conny.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer;
}

module.exports = {
sendSticker,
sendStickerr
};