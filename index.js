const fs = require('fs');
const Discord = require('discord.js');
const { prefix } = require('./config.json');
const dotenv = require('dotenv');
dotenv.config();
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.folders = new Discord.Collection();
const commandFolders = fs.readdirSync('./commands');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	var folders = [];
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
		folders.push(command.name);
	}
	client.folders.set(folder, folders)
}
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
	try
	{
		customprefix = prefix;
		fs.readFile('./server_config.json','utf8',function(err, data){
			if(err) throw err;
			file = JSON.parse(data);
			if(msg.guild)
			{
				for (var i = 0; i < file.guild_prefix.length; i++) {
					if(file.guild_prefix[i][msg.guild.id]) {
						customprefix = file.guild_prefix[i][msg.guild.id];
					}
				}
			}
			if (!msg.content.startsWith(customprefix) || msg.author.bot) return;

			const args = msg.content.slice(customprefix.length).trim().split(/ +/);
			const commandName = args.shift().toLowerCase();

			const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
			if (!command) return;
			if(command.args && !args.length){
				return msg.channel.send(`Error: No Arguments`);
			}
			try {
				if(command.name == 'help') command.execute(msg, args, customprefix);
				else command.execute(msg, args);
			} catch (error) {
				console.error(error);
				msg.reply('there was an error trying to execute that command');
			}
		});
	}
	catch (error)
	{
		console.error(error);
		msg.reply('there was an error');
	}
});
client.login(process.env.TOKEN);
