const fs = require('fs')
const axios = require('axios')
const fetch = require('node-fetch')
const { spawn } = require('child_process')

exports.fetchJson = fetchJson = (url, options) => new Promise(async (resolve, reject) => {fetch(url, options)
.then(response => response.json())
.then(json => {
resolve(json)})
.catch((err) => {
reject(err)})})

exports.getBuffer = getBuffer = async (url, options) => {
try {
options ? options : {}
const res = await axios({method: "get",url,headers: {'DNT': 1,'Upgrade-Insecure-Request': 1},...options,responseType: 'arraybuffer'})
return res.data
} catch (e) {
console.log(`Error : ${e}`)}}
