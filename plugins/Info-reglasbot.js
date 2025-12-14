// * Código creado por Félix, no quites créditos *//

let handler = async (m, { conn, command }) => {
  try {
    // Newsletter, banner y perfil igual que en tu menú:
    const dev = 'Félix Manuel';
    const redes = 'https://dash.kurayamihost.dpdns.org/home';
    const channelRD = { id: "120363418804796632@newsletter", name: "Kurayami Host" };
    let perfil = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://files.catbox.moe/mqtxvp.jpg');
    let botname = global.botNames?.[conn.user.jid] || 'Makima';
    let banner = global.bannerUrls?.[conn.user.jid] || 'https://qu.ax/XkPVZ.jpg';

    // 1. Enviar "Procesando reglas..."
    await conn.sendMessage(m.chat, {
      text: 'ꪹ͜🕑͡ Procesando reglas...',
      contextInfo: {
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: channelRD.id,
          newsletterName: channelRD.name,
          serverMessageId: -1,
        },
        forwardingScore: 999,
        externalAdReply: {
          title: 'Reglas del bot',
          body: dev,
          thumbnailUrl: perfil,
          sourceUrl: redes,
          mediaType: 1,
          renderLargerThumbnail: false,
        },
      }
    }, { quoted: m });

    // 2. Enviar las reglas con banner
    let reglas = `📝 *Reglas del bot*\n\n• No usar al bot en privado\n• No unir el bot en grupos que estén bots que no son del club\n• No reportes sin necesidad\n\n_Poerted By frlix_`;

    await conn.sendMessage(m.chat, {
      image: { url: banner },
      caption: reglas,
      contextInfo: {
        mentionedJid: [m.sender],
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: channelRD.id,
          newsletterName: channelRD.name,
          serverMessageId: -1,
        },
        forwardingScore: 999,
        externalAdReply: {
          title: 'Reglas del bot',
          body: dev,
          thumbnailUrl: perfil,
          sourceUrl: redes,
          mediaType: 1,
          renderLargerThumbnail: false,
        },
      }
    }, { quoted: m });

    await m.react('🅗︎Ⓞ︎🅛︎Ⓐ︎');
  } catch (e) {
    await m.reply(`✘ Ocurrió un error al mostrar las reglas.\n\n${e}`, m);
    await m.react('❌');
  }
};

handler.help = ['reglasbot', 'botreglas'];
handler.tags = ['main'];
handler.command = ['reglasbot', 'botreglas'];
handler.register = true;

export default handler;