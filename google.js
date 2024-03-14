
import { googleIt } from '@bochilteam/scraper';

const googleHandler = async (m, { conn, command, args }) => {
    const fetch = (await import('node-fetch')).default;
    const full = /f$/i.test(command);
    const text = args.join` `;
    
    if (!text) return conn.reply(m.chat, 'Não há texto para pesquisar', m);

    const url = 'https://google.com/search?q=' + encodeURIComponent(text);
    const search = await googleIt(text);

    const msg = search.articles.map(({ title, url, description }) => {
        return `*${title}*\n_${url}_\n_${description}_`;
    }).join('\n\n');

    try {
        const ss = await (await fetch(global.API('nrtm', '/api/ssweb', { delay: 1000, url, full }))).arrayBuffer();
        if (/<!DOCTYPE html>/i.test(ss.toBuffer().toString())) throw '';
        await conn.sendFile(m.chat, ss, 'screenshot.png', url + '\n\n' + msg, m);
    } catch (e) {
        m.reply(msg);
    }
};

googleHandler.help = ['google'];
googleHandler.tags = ['internet'];
googleHandler.command = /^googlef?$/i;

export default googleHandler;
