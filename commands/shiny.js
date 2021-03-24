const poke = require('../dex.json')
const { prefix } = require('../config.json');
var embedColours = {
    Red: 16724530,
    Blue: 2456831,
    Yellow: 16773977,
    Green: 4128590,
    Black: 3289650,
    Brown: 10702874,
    Purple: 10894824,
    Gray: 9868950,
    White: 14803425,
    Pink: 16737701
};
module.exports = {
	name: 'shiny',
	args: true,
	description: 'Displays a pokemons shiny form',
  aliases: ['s'],
	usage: `${prefix}shiny <name||number>`,
  execute(message, args) {
    var found = false;
    args = args[0];
		for(i=0;i<poke.length;i++){
      if(args == poke[i].no||args==poke[i].name)
      {
        found = true;

        var pokeURL = 'https://img.pokemondb.net/sprites/home/shiny/'+poke[i].name.toLowerCase()+'.png'

        var pokeEmbed =
        {
          color: embedColours[poke[i].color],
          image:
          {
            url: pokeURL,
          }
        }

        return message.channel.send('',{embed: pokeEmbed});
      }
    }
    if(!found)
    {
      return message.channel.send('Couldn\'t find Pokemon.');
    }
	},
};
