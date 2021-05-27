module.exports = {
	name: 'help',
	description: 'Gives information about commands',
	args: false,
	aliases: ['commands','info','h'],
	usage: `<command name>`,
	execute(message, args, prefix) {
		console.log(`executing help ${args}`);
		const data = [];
		sus = [];
		const { commands, folders } = message.client;

		if (!args.length) {
			valueArray = folders.array();
			keyArray = folders.keyArray();
			helpEmbed =
			{
				title: 'List of all commands',
				description: `${prefix}help <command> for more info on a command`,
				footer: {text:'If you need further help contact me on Discord: Yenaek#9609'},
				fields:[],
			}
			for (var i = 0; i < valueArray.length; i++) {
				field = {name: '', value: '', inline: true};
				field.name = keyArray[i];
				field.value = valueArray[i].join('\n');
				helpEmbed.fields.push(field);
			}

			return message.channel.send('', { split: true, embed: helpEmbed})
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
