var Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();
module.exports = {
	name: 'ability',
	args: true,
	description: 'Shows ability information',
	aliases: ['a'],
	usage: `<name>`,
	execute(message, args) {
		var ab = args.join('-');
		ab = ab.toLowerCase();
		P.getAbilityByName(ab)
	 .then(function(abil) {
		 abName = '';
		 for(j=0;j<abil.names.length;j++)
		 {
			 if(abil.names[j].language.name == 'en')
			 {
				 abName = abil.names[j].name
			 }
		 }
		 abEff = '';
		 for(j=0;j<abil.effect_entries.length;j++)
		 {
			 if(abil.effect_entries[j].language.name == 'en')
			 {
				 abEff = abil.effect_entries[j].effect
			 }
		 }
		 abPoke = '';
		 for(i=0;i<abil.pokemon.length;i++)
		 {
			 if(abil.pokemon[i].is_hidden)
			 {
				 abPoke = abPoke + '*' + abil.pokemon[i].pokemon.name[0].toUpperCase() + abil.pokemon[i].pokemon.name.slice(1) + '*';
			 }
			 else
			 {
				 abPoke = abPoke + abil.pokemon[i].pokemon.name[0].toUpperCase() + abil.pokemon[i].pokemon.name.slice(1);
			 }
			 if(i != abil.pokemon.length - 1)
			 {
			 	 abPoke += ' | ';
		 	 }
		 }
					var abEmbed =
					{
						fields:
						[
							{
								name: 'Name',
								value: abName,
								inline: false
							},
							{
								name: 'Effect',
								value: abEff,
								inline: false
							},
							{
								name: 'Pokemon with the ability',
								value: abPoke,
								inline: false
							}
						]
					}
					return message.channel.send('',{embed: abEmbed});
				})
				.catch(function(error) {
					console.log('There was an ERROR: ', error);
					return message.channel.send('Ability not found.');
				});
	},
};
