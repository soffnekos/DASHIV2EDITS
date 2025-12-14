//Código creado por Félix  y modificado para los premium bots por cuervo ofc
import fs from 'fs';
import path from 'path';

const channelRD = {
  id: "120363418804796632@newsletter", 
  name: "KURAYAMI-HOST"
};
const thumbnailUrl = 'https://qu.ax/dXOUo.jpg'; 

let handler = async function (m, { args, command, usedPrefix, conn }) {
  const senderNumber = m.sender.split('@')[0];
  const premiumFilePath = path.join('./JadiBots', senderNumber, 'premium.json');

  try {
    const premiumConfig = JSON.parse(fs.readFileSync(premiumFilePath, 'utf8'));

    // --- 1. VERIFICA SI EL BOT ES PREMIUM ---
    if (premiumConfig.premiumBot === true) {
      
      // --- 2. SI ES PREMIUM, RESPONDE AL COMANDO ---
      if (!args[0]) {
        await conn.sendMessage(m.chat, {
          react: { text: "✖️", key: m.key }
        });
        const contextNewsletter = {
          isForwarded: true,
          forwardingScore: 999,
          forwardedNewsletterMessageInfo: {
            newsletterJid: channelRD.id,
            newsletterName: channelRD.name,
            serverMessageId: -1
          },
          externalAdReply: {
            title: channelRD.name,
            body: 'MAKIMA 2.0 BOT',
            thumbnailUrl: thumbnailUrl,
            mediaType: 1,
            renderLargerThumbnail: false,
            sourceUrl: `https://whatsapp.com/channel/${channelRD.id.replace('@newsletter', '')}`
          }
        };
        await conn.sendMessage(
          m.chat,
          {
            text: '「🩵」Debes ingresar un texto para usar este comando.',
            contextInfo: contextNewsletter
          },
          { quoted: m }
        );
        return;
      }
      const text = args.join(' ');
      const quotedMsg = {
        key: { fromMe: false, participant: "0@s.whatsapp.net", remoteJid: m.chat, id: Math.random().toString(36).slice(2) },
        message: { conversation: 'MAKIMA BOT MD' }
      };
      await conn.sendMessage(m.chat, { text }, { quoted: quotedMsg });

    } else {
      // --- 3. SI NO ES PREMIUM, RESPONDE CON EL MENSAJE DE RECHAZO ---
      m.reply('❌ Este comando solo está disponible para bots premium.');
    }
  } catch (e) {
    console.error('Error al verificar el estado premium:', e);
    m.reply('❀ Ocurrió un error al verificar tu estado premium.');
  }
};

handler.help = ['repite', 'repeat', 'copiame'].map(v => v + ' <texto>');
handler.tags = ['tools'];
handler.command = /^(repite|repeat|copiame)$/i;
handler.register = false;
handler.limit = false;
handler.group = false; 

export default handler;