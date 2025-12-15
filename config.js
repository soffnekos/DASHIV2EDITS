import {watchFile, unwatchFile} from 'fs';
import chalk from 'chalk';
import {fileURLToPath} from 'url';
import fs from 'fs'; 
import cheerio from 'cheerio';
import fetch from 'node-fetch';
import axios from 'axios';
import moment from 'moment-timezone';

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

//Si quiere evitar escribir el número que será bot en la consola, agregué desde aquí entonces:
//Sólo aplica para opción 2 (ser bot con código de texto de 8 digitos)
global.botNumber = '' //Ejemplo: 527222519827

//*──ׄ✰─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

global.owner = [
  ['51926427586', '𝗖𝗿𝗲𝗮𝗱𝗼𝗿', true],
  ['']
]

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

global.owner_lid = [
  [' 51926427586', ' 𝗖𝗿𝗲𝗮𝗱𝗼𝗿  (LID)', true],
  ['', 'Número 2 (LID)', true]
]

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

global.mods = []
global.suittag = ['51926427586'] 
global.prems = []

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

global.libreria = 'Baileys'
global.baileys = 'V 6.7.21'
global.vs = '2.0.0'
global.languaje = 'Español'
global.nameqr = 'DASHI Bot'
global.sessions = 'Session'
global.jadi = 'JadiBot'
global.makiJadibts = true

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

global.packsticker = `⏤͟͞ू⃪ DASHI-BOT𑁯ᰍ\n`
global.packname = `⏤͟͞ू⃪  ̸̷͢DASHI-BOT𑁯ᰍ`
global.author = `socket:\n✐ DASHI IKISUKI\n\nStickers Desarrollados en KJYOTAKA`;
global.wm = '⏤͟͞ू⃪  ̸̷͢MADE IN KJYOTAKA '
global.titulowm = '⏤͟͞ू⃪KJYOTAKA𑁯ᰍ'
global.igfg = 'KJYOTAKA'
global.botname = 'DASHI-BOT'
global.dev = '© ⍴᥆ᥕᥱrᥱძ ᑲᥡ KJYOTAKA'
global.textbot = '⏤͟͟͞͞KYOTAKA'
global.gt = '⏤͟͟͞͞KYOTAKA'
global.namechannel = 'DASHI-BOT'

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

global.moneda = 'PETRO-DOLARES'

//• ﹒⌗﹒𝑳𝑰𝑵𝑲𝑺 𝑮𝑹𝑼𝑷𝑶𝑺/𝑪𝑨𝑵𝑨𝑳𝑬𝑺 𝑶𝑭𝑰𝑪𝑰𝑨𝑳𝑬𝑺.ৎ˚₊‧ 
global.gp4 = 'https://chat.whatsapp.com/HAjCJJ2qMs52F75iewnHtN?mode=hqrt2' //Grupo Oficial  
global.gp1 = 'https://chat.whatsapp.com/IeyMc8ZRnwkBgoqFgzrXLl?mode=hqrt2' //Grupo Oficial 2
global.gp2 = 'https://chat.whatsapp.com/Lfhrxv1p3B69Bhw7LZ2ddh?mode=hqrt2'//Grupo Oficial 3
global.channel = 'https://whatsapp.com/channel/0029Vb73g1r1NCrTbefbFQ2T' //Canal Oficial
global.channel2 = ''
global.yt = ''
global.md = ''
global.correo = ''
//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

global.catalogo = fs.readFileSync('./src/catalogo.jpg');
global.estilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: packname, orderTitle: 'Bang', thumbnail: catalogo, sellerJid: '0@s.whatsapp.net'}}}
global.ch = {
ch1: '120363420979328566@newsletter',
}
global.multiplier = 70

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment   

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})