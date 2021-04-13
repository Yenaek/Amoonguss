var Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();
var tools = require('.././tools');
module.exports = {
	name: 'shiny',
	args: true,
	description: 'Displays a pokemons shiny form',
  aliases: ['s'],
	usage: `<name||number>`,
  execute(message, args) {
    var pok = args.join('-');
    pok = pok.toLowerCase();
    P.getPokemonByName(pok)
        .then(function(poke) {
          pokeURL='https://img.pokemondb.net/sprites/home/shiny/' + tools.fixUrl(poke.name) + '.png';
          var pokeEmbed =
          {
            image:
            {
              url:pokeURL,
            },
          }
          return message.channel.send('',{embed: pokeEmbed});
        })
        .catch(function(error) {
          console.log('There was an ERROR: ', error);
          return message.channel.send('Pokemon not found.');
        });
	},
};
