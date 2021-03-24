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
	name: 'pokemon',
	args: true,
	description: 'Displays a pokemons information',
  aliases: ['p','poke','pokedex'],
	usage: `${prefix}pokemon <name||number>`,
	execute(message, args) {
    var found = false;
    args = args[0][0].toUpperCase() + args[0].slice(1).toLowerCase();
		for(i=0;i<poke.length;i++){
      if(args == poke[i].no||args==poke[i].name)
      {
        found = true;
        var stat = poke[i].base_stats;
        var pokeStats = stat[0] + '/' + stat[1] + '/' + stat[2] + '/' + stat[3] + '/' + stat[4] + '/' + stat[5];
        var ability = poke[i].abilities;
        var type = poke[i].types;

        var pokeAbilities = '';
        if(ability[0] == ability[1] && ability[0] == ability[2])
        {
          pokeAbilities = ability[0];
        }
        else if (ability[0] == ability[1])
        {
          pokeAbilities = ability[0] + ', ' + '*' + ability[2] + '*';
        }
        else
        {
          pokeAbilities = ability[0] + ', ' + ability[1] + ', ' + '*' + ability[2] + '*';
        }

        var pokeType = '';
        if(!type[1])
        {
          pokeType = type[0];
        }
        else
        {
          pokeType = type[0] + '/' + type[1];
        }

        var pokeURL = 'https://img.pokemondb.net/sprites/home/normal/'+poke[i].name.toLowerCase()+'.png'

        var pokeEmbed =
        {
          color: embedColours[poke[i].color],
          thumbnail:
          {
            url:pokeURL,
          },
          fields:
          [
            {
              name: 'ID',
              value: poke[i].no,
              inline: true
            },
            {
              name: 'Name',
              value: poke[i].name,
              inline: true
            },
            {
              name: 'Type',
              value: pokeType,
              inline:false
            },
            {
              name: 'Base Stats',
              value: pokeStats,
              inline: false
            },
            {
              name: 'Abilities',
              value: pokeAbilities,
              inline:false
            },
          ],
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
