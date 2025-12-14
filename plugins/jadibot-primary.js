// plugins/jadibot-primary.js

//* Código creado por Félix, no quites créditos *//

const fake = {
  key: {
    fromMe: false,
    participant: '0@s.whatsapp.net',
    remoteJid: 'status@broadcast'
  },
  message: {
    conversation: "Canal Oficial"
  }
}

// SETPRIMARY: Solo un bot responde en el grupo
let setprimary = async (m, { conn, text }) => {
  // Validar número
  if (!text || !text.replace(/[^0-9]/g, '')) {
    return await conn.reply(m.chat, '「🩵」Debes etiquetar al bot que quieres hacer principal en este grupo.', m, fake)
  }
  let botNumber = text.replace(/[^0-9]/g, '')
  let botJid = botNumber + '@s.whatsapp.net'

  if (!global.db.data.chats[m.chat]) global.db.data.chats[m.chat] = {}
  global.db.data.chats[m.chat].primaryBot = botJid

  await conn.reply(m.chat, `El bot principal para este grupo ahora es:\n*${botJid}*\n\nSolo ese bot responderá aquí.`, m, fake)
}

setprimary.help = ['setprimary @bot']
setprimary.tags = ['owner']
setprimary.command = ['setprimary']
setprimary.admin = true

// RESETPRIMARY: Todos los bots vuelven a responder
let resetprimary = async (m, { conn }) => {
  let data = global.db.data.chats[m.chat]
  if (!data || !data.primaryBot) {
    return await conn.reply(m.chat, '💙 En este grupo ya no hay bot principal. Ahora todos los bots pueden responder como antes.', m, fake)
  }
  delete data.primaryBot
  await conn.reply(m.chat, '💙 El bot principal ha sido eliminado. Ahora todos los bots pueden responder como antes.', m, fake)
}

resetprimary.help = ['resetprimary']
resetprimary.tags = ['owner']
resetprimary.command = ['resetprimary']
resetprimary.admin = true

export default setprimary
export { resetprimary }