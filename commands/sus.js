const { prefix } = require('../config.json');
module.exports = {
	name: 'sus',
	args: false,
	description: 'kinda sus bro',
	usage: `${prefix}sus`,
	execute(message, args) {
		message.channel.send('ඞ');
	},
};
