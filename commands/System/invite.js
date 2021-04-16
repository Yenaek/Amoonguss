module.exports = {
    name: 'invite',
    args: false,
    description: 'posts an invite link for the bot',
    aliases: [],
    usage: '',
    execute(message, args) {
        return message.channel.send('https://discord.com/oauth2/authorize?client_id=824034925928906752&scope=bot&permissions=3072');
    },
}