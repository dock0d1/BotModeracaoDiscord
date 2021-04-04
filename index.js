// PACOTES NECESSÁRIOS PARA RODAR O BOT
const Discord = require('discord.js');
const colors = require('colors');

// DEFINIÇÃO DO CLIENT ONDE USAREMOS PARA RODAR O BOT
const client = new Discord.Client();

// IMPORTAÇÃO NECESSÁRIA PARA PEGAR O TOKEN E O PREFIX E JOGAR NO INDEX.JS
const { prefix, token } = require('./comandos/settings.json');

// COMMAND HANDLER
client.on('message', message => {
    if (message.author.bot) return;
    if (message.channel.type == 'dm') return;
    if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;
    if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;
  
   const args = message.content
       .trim().slice(prefix.length)
       .split(/ +/g);
   const command = args.shift().toLowerCase();
  
   try {
       const mod_cmdh = require(`./comandos/moderacao/${command}.js`)
       mod_cmdh.run(client, message, args);
   } catch (err) {
   console.error('Erro:' + err);
  }
});

// AQUI MOSTRARÁ QUANDO O BOT FICAR ATIVO
client.on("ready", () => {
    console.log('Bot consultor feito por: '.green + "dock0d1'#0001".red);
    console.log('Logado no bot: '.green + `${app.user.tag}`.red);
});

// AQUI LOGARÁ PELO TOKEN
client.login(token);