let handler = async (m, { conn, usedPrefix, command, text }) => {
await conn.reply(m.chat, "xd we", m)

}
handler.command = ['test']
handler.botprem = true

export default handler 
