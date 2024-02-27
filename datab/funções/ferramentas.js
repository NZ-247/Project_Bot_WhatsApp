const fetch = require('node-fetch')
const fs = require('fs')
const axios = require('axios')
let BodyForm = require('form-data')
let { fromBuffer } = require('file-type')
const cfonts = require('cfonts')
const { tmpdir } = require("os")
const ff = require('fluent-ffmpeg')
const webp = require("node-webpmux")
const path = require("path")
const Crypto = require('crypto')
const chalk = require('chalk')
const exec = require("child_process").exec
const log = console.debug
const mimetype = require('mime-types')
const cheerio = require('cheerio')
const moment = require('moment-timezone');
const hr = moment.tz('America/Sao_Paulo').format('HH:mm:ss')

//=======================================\\

var ase = new Date();
var waktoo = ase.getHours();
switch (waktoo) {
case 0: waktoo = 'meia\nnoite!'; break;
case 1: waktoo = 'meia\nnoite!'; break;
case 2: waktoo = 'De\nmanhã\ncedo!'; break;
case 3: waktoo = 'De\nmanhã\ncedo!'; break;
case 4: waktoo = 'Alvorecer!'; break;
case 5: waktoo = 'Alvorecer!'; break;
case 6: waktoo = 'bom\ndia!'; break;
case 7: waktoo = 'bom\ndia!'; break;
case 8: waktoo = 'bom \ndia!'; break;
case 9: waktoo = 'bom\ndia!'; break;
case 10: waktoo = 'bom\ndia!'; break;
case 11: waktoo = 'Boa\ntarde!'; break;
case 12: waktoo = 'Boa\ntarde!'; break;
case 13: waktoo = 'Boa\ntarde!'; break;
case 14: waktoo = 'Boa\ntarde!'; break;
case 15: waktoo = 'Boa\ntarde!'; break;
case 16: waktoo = 'Boa\ntarde!'; break;
case 17: waktoo = 'Boa\ntarde!'; break;
case 18: waktoo = 'Boa\n noite!'; break;
case 19: waktoo = 'Boa\n noite!'; break;
case 20: waktoo = 'Boa\n noite!'; break;
case 21: waktoo = 'Boa\n noite!'; break;
case 22: waktoo = 'Boa\n noite!'; break;
case 23: waktoo = 'Boa\n noite!'; break;
}
var tampilUcapan = '' + waktoo;

//=======================================\\

const color = (text, color) => {
return !color ? chalk.green(text) : chalk.keyword(color)(text)
}

const bgcolor = (text, bgcolor) => {
return !bgcolor ? chalk.green(text) : chalk.bgKeyword(bgcolor)(text)
}

const mylog = (text, color) => {
return !color ? chalk.greenBright('[ WHATSAPP BOT ] ') + chalk.magentaBright(text) : chalk.greenBright('[ WHATSAPP BOT ] ') + chalk.keyword(color)(text)
}

const infolog = (text) => {
return chalk.greenBright('[ WHATSAPP BOT ] ') + chalk.magentaBright(text)
}

//=======================================\\

async function imageToWebp(media) {
const tmpFileOut = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`);
const tmpFileIn = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.jpg`);

fs.writeFileSync(tmpFileIn, media);

await new Promise((resolve, reject) => {
ff(tmpFileIn)
.on("error", reject)
.on("end", () => resolve(true))
.addOutputOptions([
"-vcodec",
"libwebp",
"-vf",
"scale='min(1000,iw)':min'(1000,ih)':force_original_aspect_ratio=decrease,fps=15, pad=0:0:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"
])
.toFormat("webp")
.save(tmpFileOut);
});

const buff = fs.readFileSync(tmpFileOut);
fs.unlinkSync(tmpFileOut);
fs.unlinkSync(tmpFileIn);
return buff;
}

async function videoToWebp (media) {
const tmpFileOut = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`);
const tmpFileIn = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.mp4`);

fs.writeFileSync(tmpFileIn, media);

await new Promise((resolve, reject) => {
ff(tmpFileIn)
.on("error", reject)
.on("end", () => resolve(true))
.addOutputOptions([
"-vcodec",
"libwebp",
"-vf",
"scale=320:320,fps=15,pad=320:320:-1:-1:color=white@0.0,split[a][b];[a]palettegen=reserve_transparent=on:transparency_color=ffffff[p];[b][p]paletteuse",
 "-loop",
 "0",
"-ss",
"00:00:00",
"-t",
"00:00:05",
"-preset",
"default",
"-an",
"-vsync",
"0"
])
.toFormat("webp")
.save(tmpFileOut);
});

const buff = fs.readFileSync(tmpFileOut);
fs.unlinkSync(tmpFileOut);
fs.unlinkSync(tmpFileIn);
return buff;
}

async function writeExifImg (media, metadata) {
let wMedia = await imageToWebp(media)
const tmpFileIn = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`)
const tmpFileOut = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`)
fs.writeFileSync(tmpFileIn, wMedia)

if (metadata.packname || metadata.author) {
const img = new webp.Image()
const json = { "sticker-pack-id": `https://github.com/DikaArdnt/Hisoka-Morou`, "sticker-pack-name": metadata.packname, "sticker-pack-publisher": metadata.author, "emojis": metadata.categories ? metadata.categories : [""] }
const exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00])
const jsonBuff = Buffer.from(JSON.stringify(json), "utf-8")
const exif = Buffer.concat([exifAttr, jsonBuff])
exif.writeUIntLE(jsonBuff.length, 14, 4)
await img.load(tmpFileIn)
fs.unlinkSync(tmpFileIn)
img.exif = exif
await img.save(tmpFileOut)
return tmpFileOut
}
}

async function writeExifVid (media, metadata) {
let wMedia = await videoToWebp(media)
const tmpFileIn = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`)
const tmpFileOut = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`)
fs.writeFileSync(tmpFileIn, wMedia)

if (metadata.packname || metadata.author) {
const img = new webp.Image()
const json = { "sticker-pack-id": `NewBot MD`, "sticker-pack-name": metadata.packname, "sticker-pack-publisher": metadata.author, "emojis": metadata.categories ? metadata.categories : [""] }
const exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00])
const jsonBuff = Buffer.from(JSON.stringify(json), "utf-8")
const exif = Buffer.concat([exifAttr, jsonBuff])
exif.writeUIntLE(jsonBuff.length, 14, 4)
await img.load(tmpFileIn)
fs.unlinkSync(tmpFileIn)
img.exif = exif
await img.save(tmpFileOut)
return tmpFileOut
}
}

async function writeExif (media, metadata) {
let wMedia = /webp/.test(media.mimetype) ? media.data : /image/.test(media.mimetype) ? await imageToWebp(media.data) : /video/.test(media.mimetype) ? await videoToWebp(media.data) : ""
const tmpFileIn = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`)
const tmpFileOut = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`)
fs.writeFileSync(tmpFileIn, wMedia)

if (metadata.packname || metadata.author) {
const img = new webp.Image()
const json = { "sticker-pack-id": `DUDA MD`, "sticker-pack-name": metadata.packname, "sticker-pack-publisher": metadata.author, "emojis": metadata.categories ? metadata.categories : [""] }
const exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00])
const jsonBuff = Buffer.from(JSON.stringify(json), "utf-8")
const exif = Buffer.concat([exifAttr, jsonBuff])
exif.writeUIntLE(jsonBuff.length, 14, 4)
await img.load(tmpFileIn)
fs.unlinkSync(tmpFileIn)
img.exif = exif
await img.save(tmpFileOut)
return tmpFileOut
}
}

//=======================================\\

function convertSticker(base64, author, pack){
return new Promise((resolve, reject) =>{
axios('https://sticker-api-tpe3wet7da-uc.a.run.app/prepareWebp', {
method: 'POST',
headers: {
Accept: 'application/json, text/plain, */*',
'Content-Type': 'application/json;charset=utf-8',
'User-Agent': 'axios/0.21.1',
'Content-Length': 151330
},
data: `{"image": "${base64}","stickerMetadata":{"author":"${author}","pack":"${pack}","keepScale":true,"removebg":"HQ"},"sessionInfo":{"WA_VERSION":"2.2106.5","PAGE_UA":"WhatsApp/2.2037.6 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36","WA_AUTOMATE_VERSION":"3.6.10 UPDATE AVAILABLE: 3.6.11","BROWSER_VERSION":"HeadlessChrome/88.0.4324.190","OS":"Windows Server 2016","START_TS":1614310326309,"NUM":"6247","LAUNCH_TIME_MS":7934,"PHONE_VERSION":"2.20.205.16"},"config":{"sessionId":"session","headless":true,"qrTimeout":20,"authTimeout":0,"cacheEnabled":false,"useChrome":true,"killProcessOnBrowserClose":true,"throwErrorOnTosBlock":false,"chromiumArgs":["--no-sandbox","--disable-setuid-sandbox","--aggressive-cache-discard","--disable-cache","--disable-application-cache","--disable-offline-load-stale-cache","--disk-cache-size=0"],"executablePath":"C:\\\\Program Files (x86)\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe","skipBrokenMethodsCheck":true,"stickerServerEndpoint":true}}`
}).then(({data}) =>{
resolve(data.webpBase64)
}).catch(reject)
     
}) 
}

//=======================================\\

function TelegraPh(Path) {
return new Promise (async (resolve, reject) => {
if (!fs.existsSync(Path)) return reject(new Error("File not Found"))
try {
const form = new BodyForm();
form.append("file", fs.createReadStream(Path))
const data = await  axios({
url: "https://telegra.ph/upload",
method: "POST",
headers: {
...form.getHeaders()
},
data: form
})
return resolve("https://telegra.ph" + data.data[0].src)
} catch (err) {
return reject(new Error(String(err)))
}
})
}

async function UploadFileUgu(input) {
return new Promise (async (resolve, reject) => {
const form = new BodyForm();
form.append("files[]", fs.createReadStream(input))
await axios({
url: "https://uguu.se/upload.php",
method: "POST",
headers: {
"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
...form.getHeaders()
},
data: form
}).then((data) => {
resolve(data.data.files[0])
}).catch((err) => reject(err))
})
}

function webp2mp4File(path) {
return new Promise((resolve, reject) => {
const form = new BodyForm()
form.append('new-image-url', '')
form.append('new-image', fs.createReadStream(path))
axios({
method: 'post',
url: 'https://s6.ezgif.com/webp-to-mp4',
data: form,
headers: {
'Content-Type': `multipart/form-data; boundary=${form._boundary}`
}
}).then(({ data }) => {
const bodyFormThen = new BodyForm()
const $ = cheerio.load(data)
const file = $('input[name="file"]').attr('value')
bodyFormThen.append('file', file)
bodyFormThen.append('convert', "Convert WebP to MP4!")
axios({
method: 'post',
url: 'https://ezgif.com/webp-to-mp4/' + file,
data: bodyFormThen,
headers: {
'Content-Type': `multipart/form-data; boundary=${bodyFormThen._boundary}`
}
}).then(({ data }) => {
const $ = cheerio.load(data)
const result = 'https:' + $('div#output > p.outfile > video > source').attr('src')
resolve({
status: true,
message: "Created By MRHRTZ",
result: result
})
}).catch(reject)
}).catch(reject)
})
}

async function floNime(medianya, options = {}) {
const { ext } = await fromBuffer(medianya) || options.ext
var form = new BodyForm()
form.append('file', medianya, 'tmp.'+ext)
jsonnya = await fetch('https://flonime.my.id/upload', {
method: 'POST',
body: form
})
.then((response) => response.json())
.then((result) => {
return result
})
.catch(e => {
return e
})
return jsonnya
}

//=======================================\\

module.exports = {

//=======================================\\

color,
bgcolor,
mylog,
infolog,

//=======================================\\

imageToWebp,
videoToWebp,
writeExifImg,
writeExifVid,

//=======================================\\

convertSticker,

//=======================================\\

TelegraPh,
UploadFileUgu,
webp2mp4File,
floNime }