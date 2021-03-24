const { prefix } = require('../config.json');
module.exports = {
	name: 'help',
	description: 'Gives information about commands',
  args: false,
	aliases: ['commands','info'],
	usage: `${prefix}help <command name>`,
	execute(message, args) {
    const data = [];
    const { commands } = message.client;

    if (!args.length) {
      data.push('Here\'s a list of all my commands:\n');
      data.push(`**${prefix}**`+commands.map(command => command.name).join(`\n**${prefix}**`));
      data.push(`\nYou can send \`${prefix}help <command name>\` to get info on a specific command!`);

      return message.channel.send(data, { split: true })
	           .catch(error => {
		             console.error(`Could not send help.\n`, error);
	              });
     }
     const name = args[0].toLowerCase();
     const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

     if (!command) {
	      return message.reply('Command not found.');
      }

      data.push(`**Name:** ${command.name}`);

      if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
      if (command.description) data.push(`**Description:** ${command.description}`);
      if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

      message.channel.send(data, { split: true });
	},
};
