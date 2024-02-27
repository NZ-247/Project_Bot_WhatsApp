const cfonts = require("cfonts")
const chalk = require("chalk")
const axios = require("axios")
const fetch = require("node-fetch")
const mimetype = require("mime-types")
const FormData = require("form-data")
const { fromBuffer } = require("file-type")
const { color } = require("./color")

var corzinhas = ["white"]
var corzinhas1 = ["red"]
var corzinhas2 = ["white"]
const cor1 = corzinhas[Math.floor(Math.random() * (corzinhas.length))]	
const cor2 = corzinhas1[Math.floor(Math.random() * (corzinhas1.length))]	
const cor3 = corzinhas2[Math.floor(Math.random() * (corzinhas2.length))]	


const getBuffer = (url, options) => new Promise(async (resolve, reject) => { 
options ? options : {}
await axios({method: "get", url, headers: {"DNT": 1, "Upgrade-Insecure-Request": 1}, ...options, responseType: "arraybuffer"}).then((res) => {
resolve(res.data)
}).catch(reject)
})

const getGroupAdmins = (participants) => {
admins = []
for (let i of participants) {
if(i.admin == "admin") admins.push(i.id)
if(i.admin == "superadmin") admins.push(i.id)
}
return admins
}

const getExtension = async (type) => {
	return await mimetype.extension(type)
}

const getRandom = (ext) => {
	return `${Math.floor(Math.random() * 10000)}${ext}`;
}

function upload (midia)  {
return new Promise(async (resolve, reject) => {
try {
let { ext } = await fromBuffer(midia)
let form = new FormData()
form.append("file", midia, "tmp." + ext)
await fetch("https://telegra.ph/upload", {
method: "POST",
body: form
})
.then(html => html.json())
.then(post => {
resolve("https://telegra.ph" + post[0].src)
})
.catch(erro => reject(erro))
} catch (erro) {
return console.log(erro)
}
})
}

const log = console.log

module.exports = { getGroupAdmins, getBuffer, getExtension, getRandom, upload, log }