const {
default: makeWASocket,
downloadContentFromMessage, 
fetchLatestBaileysVersion, 
useSingleFileAuthState, 
makeInMemoryStore, 
DisconnectReason,
WAGroupMetadata,
relayWAMessage,	
MediaPathMap, 
mentionedJid, 
processTime,	
MediaType, 
Browser, 
MessageType, 
Presence, 
Mimetype, 
Browsers, 
delay
} = require('@whiskeysockets/baileys');
const fs = require("fs")
const chalk = require("chalk")
const P = require("pino")
const p = require("pino")
const Pino = require("pino")
const axios = require('axios')
const clui = require("clui")
const util = require("util")
const fetch = require("node-fetch")
const yts = require("yt-search")
const Crypto = require("crypto")
const ff = require('fluent-ffmpeg')
const webp = require("node-webpmux")
const path = require("path")
const cheerio = require("cheerio")
const cfonts = require("cfonts")
const mimetype = require("mime-types")
const speed = require("performance-now")

// MÓDULOS ABAIXO.. 

const setting = JSON.parse(fs.readFileSync('./datab/files/config/config.json'))
const countMessage = JSON.parse(fs.readFileSync('./datab/funções/grupos/countmsg.json'))


