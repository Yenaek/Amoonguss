var Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();
var redis = require('redis');
const { regis_port } = require('../.././config.json')
const client = redis.createClient(regis_port);
var tools = require('../.././tools');
function createEmbed(message, pokemon)
{
	pokeURL='https://img.pokemondb.net/sprites/home/shiny/' + tools.fixUrl(pokemon.name) + '.png';
	var pokeEmbed =
	{
		image:
		{
			url:pokeURL,
		},
	}
	return message.channel.send('',{embed: pokeEmbed});
}
module.exports = {
	name: 'shiny',
	args: true,
	description: 'Displays a pokemons shiny form',
  aliases: ['s'],
	usage: `<name||number>`,
  execute(message, args) {
		console.log(`executing shiny ${args}`);
		const mistype = tools.commonDatabaseError(args[0].toLowerCase())
    if(mistype[0] && !args[1])
    {
      return message.channel.send(tools.generateMultipleFormMessage(args[0].toLowerCase(), mistype))
    }
    var args = args.join('-');
    args = args.toLowerCase();
		client.get('pokemon/'+args, (err,data) => {
			if (err) throw err;
			if(data !== null)
			{
				createEmbed(message,JSON.parse(data));
			}
			else {
				console.log(`fetching data for pokemon/${args}`);
				start = new Date();
				P.getPokemonByName(args)
				.then(function(pokemon) {
					end = new Date();
          console.log(`done. took ${end - start}ms`);
					client.set('pokemon/'+args,JSON.stringify(pokemon));
					createEmbed(message,pokemon);
				})
				.catch(function(error) {
					console.log('There was an ERROR: ', error);
					return message.channel.send('Pokemon not found.');
				});
			}
		});
	},
};
