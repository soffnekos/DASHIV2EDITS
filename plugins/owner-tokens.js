import fs from 'fs';
import path from 'path';

const tokensFilePath = './src/database/sessions.json';

const handler = async (m, { conn, text, usedPrefix, command, isOwner }) => {
    
    if (!isOwner) {
        return m.reply('❌ Este comando es solo para el dueño del bot.');
    }

    
    if (command === "addnumber") {
        if (!text) {
            return m.reply(`❀ Faltan argumentos. Usa el comando así:\n*${usedPrefix + command} 52133×××××××× | 1*`);
        }

        const [number, id] = text.split('|').map(s => s.trim());
        const fullNumber = number.includes('@s.whatsapp.net') ? number : `${number}@s.whatsapp.net`;

        if (!number || !id) {
            return m.reply('❀ Formato incorrecto. Asegúrate de incluir el número y el ID separados por "|".');
        }

        try {
            const tokens = JSON.parse(fs.readFileSync(tokensFilePath, 'utf8'));
            const tokenIndex = tokens.findIndex(t => t.id.toString() === id);

            if (tokenIndex === -1) {
                return m.reply(`❀ No se encontró un token con el ID *${id}*.`);
            }

            const token = tokens[tokenIndex];

            if (token.estado !== 'libre') {
                return m.reply(`❌ El token con el ID *${id}* ya está en uso.`);
            }

            token.estado = fullNumber;
            token.numero = fullNumber;
            fs.writeFileSync(tokensFilePath, JSON.stringify(tokens, null, 2));

            m.reply(`✅ Token con ID *${id}* asignado exitosamente al número *${number}*.`);

        } catch (e) {
            console.error(e);
            m.reply('❀ Ocurrió un error al procesar la solicitud. Por favor, revisa la consola.');
        }

    } 
    
    if (command === "tokens") {
        try {
            const tokens = JSON.parse(fs.readFileSync(tokensFilePath, 'utf8'));
            let tokenList = '👑 *ESTADO DE LOS TOKENS*\n\n';

            tokens.forEach(token => {
                const status = token.estado === 'libre' ? '🟢 Libre' : '🔴 En uso';
                const number = token.estado === 'libre' ? 'N/A' : token.estado;
                
                tokenList += `╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄╮
│  *ID:* ${token.id}
│  *Estado:* ${status}
│  *Número:* ${number.replace('@s.whatsapp.net', '')}
│  *Premium:* ${token.premium ? '✅ Sí' : '❌ No'}
╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄╯\n\n`;
            });

            m.reply(tokenList.trim());

        } catch (e) {
            console.error(e);
            m.reply('❀ Ocurrió un error al leer el archivo de tokens.');
        }

    } 
    
    if (command === "addtoken") {
        if (!text) {
            return m.reply(`❀ Faltan argumentos. Usa el comando así:\n*${usedPrefix + command} MI-NUEVO-TOKEN-1234 | 2*`);
        }
        
        const [tokenString, id] = text.split('|').map(s => s.trim());
        
        if (!tokenString || !id) {
            return m.reply('❀ Formato incorrecto. Asegúrate de incluir el token y el ID separados por "|".');
        }
        
        try {
            const tokens = JSON.parse(fs.readFileSync(tokensFilePath, 'utf8'));
            const idExists = tokens.some(t => t.id.toString() === id);

            if (idExists) {
                return m.reply(`❌ Ya existe un token con el ID *${id}*.`);
            }
            
            const newToken = {
                id: id,
                token: tokenString,
                estado: "libre",
                numero: null,
                premium: true
            };

            tokens.push(newToken);
            fs.writeFileSync(tokensFilePath, JSON.stringify(tokens, null, 2));
            
            m.reply(`✅ Nuevo token con ID *${id}* agregado exitosamente.`);

        } catch (e) {
            console.error(e);
            m.reply('❀ Ocurrió un error al agregar el token.');
        }
    
    } 
    
    if (command === "deltoken") {
        if (!text) {
            return m.reply(`❀ Faltan argumentos. Usa el comando así:\n*${usedPrefix + command} MITOKENNUEVO1234 | 1*`);
        }

        const [newToken, id] = text.split('|').map(s => s.trim());
        
        if (!newToken || !id) {
            return m.reply('❀ Formato incorrecto. Asegúrate de incluir el nuevo token y el ID del token a modificar separados por "|".');
        }

        try {
            const tokens = JSON.parse(fs.readFileSync(tokensFilePath, 'utf8'));
            const tokenIndex = tokens.findIndex(t => t.id.toString() === id);

            if (tokenIndex === -1) {
                return m.reply(`❀ No se encontró un token con el ID *${id}*.`);
            }

            const token = tokens[tokenIndex];

            token.token = newToken;
            token.estado = "libre";
            token.numero = null;
            token.premium = true;

            fs.writeFileSync(tokensFilePath, JSON.stringify(tokens, null, 2));

            m.reply(`✅ Token con ID *${id}* actualizado y reseteado exitosamente.`);

        } catch (e) {
            console.error(e);
            m.reply('❀ Ocurrió un error al procesar la solicitud.');
        }
    }
};

handler.help = ['addnumber <número> | <ID>', 'tokens', 'addtoken <token> | <ID>', 'deltoken <token> | <ID>'];
handler.tags = ['owner'];
handler.command = /^(addnumber|tokens|addtoken|deltoken)$/i;
handler.owner = true;

export default handler;
