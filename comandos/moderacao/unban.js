const Discord = require('discord.js');
const { prefix } = require('../settings.json');

exports.run = async (client, message, args) => {
    message.delete();
    if(!message.member.hasPermission("BAN_MEMBERS")) {
        message.reply(`Você não tem perm para desbanir alguém!`).then(m => m.delete({ timeout: 5000 }))
      }
      
      if(!message.guild.me.hasPermission("BAN_MEMBERS")) {
        message.reply(`Eu não tenho perm para desbanir alguém!`).then(m => m.delete({ timeout: 5000 }))
      }

      if(!args[0]) return message.reply('Formato correto: ' + prefix + 'unban <id do usuário>').then(m => m.delete({ timeout: 5000 }))

      let userID = args[0]
      message.guild.fetchBans().then(bans=> {
        if(bans.size == 0) return 
        let bUser = bans.find(b => b.user.id == userID)
        if(!bUser) return
        if(message.guild.members.unban(bUser.user)){
            message.reply(`O usuário <@${args[0]}> foi desbanido!`).then(m => m.delete({ timeout: 15000 }))
        }
  })
};