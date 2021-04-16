const fs = require('fs');
const { Permissions } = require('discord.js');
module.exports = {
  name: 'prefix',
  args: true,
  description: 'Changes the prefix',
  aliases: [],
  usage: `<prefix>`,
  execute(message, args) {
    if(!message.guild) return message.reply('You are currently not on a server');
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('You need to be mod to change the prefix');
    writeData = '';
    fs.readFile('./server_config.json','utf8',function(err, data){
      if(err) throw err;
      file = JSON.parse(data);
      exists = false;
      for (var i = 0; i < file.guild_prefix.length; i++) {
        if(file.guild_prefix[i][message.guild.id]) {
          file.guild_prefix[i][message.guild.id] = args[0];
          writeData = JSON.stringify(file);
          exists = true;
        }
      }
      if(!exists)
      {
        file.guild_prefix.push(JSON.parse(`{"${message.guild.id}":"${args[0]}"}`));
        writeData = JSON.stringify(file);
      }
      fs.writeFile('./server_config.json',writeData,'utf8',function(err, data){
        if(err) throw err;
        message.channel.send(`Changed the prefix to ${args[0]}`);
      });
    });
  },
};
