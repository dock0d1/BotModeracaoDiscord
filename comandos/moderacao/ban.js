const Discord = require('discord.js');
const { prefix, color } = require('../settings.json');

exports.run = (client, message, args) => {
    message.delete();
    let membro = message.mentions.members.first();
    if(!message.member.hasPermission("BAN_MEMBERS")) {
        message.reply(`Você não tem perm para banir alguém`).then(m => m.delete({ timeout: 5000 }))
      }
      
      if(!message.guild.me.hasPermission("BAN_MEMBERS")) {
        message.reply(`Eu não tenho perm para banir alguém!`).then(m => m.delete({ timeout: 5000 }))
      }
    if(!args[0]) return message.reply('Formato correto: ' + prefix + 'ban <mencione o usuário>').then(m => m.delete({ timeout: 5000 }))
    if(message.mentions.users.size[0]) return message.reply('Mencione um usuário válido para punir!').then(m => m.delete({ timeout: 5000 }))

    let banembed = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle('Ops... Pareçe que alguém desobedeceu as regras...')
    .setDescription(`
    **STAFF:** ${message.author.tag}
    **USUÁRIO PUNIDO:** ${message.mentions.users.first().tag}
    **ID DO USUÁRIO:** ${message.mentions.users.first().id}`)
    .setTimestamp()
    .setFooter(`Novo usuário punido!`, client.user.displayAvatarURL({}))
    message.channel.send(banembed).then(m => m.delete({ timeout: 15000 }))
    membro.ban();
};