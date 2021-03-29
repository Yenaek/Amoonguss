var embedColours = {
    red: 16724530,
    blue: 2456831,
    yellow: 16773977,
    green: 4128590,
    black: 3289650,
    brown: 10702874,
    purple: 10894824,
    gray: 9868950,
    white: 14803425,
    pink: 16737701
  }
  function makeReadable(msg)
  {
    msg = msg.split('-');
    for(i=0;i<msg.length;i++)
    {
      msg[i] = msg[i][0].toUpperCase() + msg[i].slice(1).toLowerCase();
    }
    msg = msg.join(' ');
    return msg;
  }
    var Pokedex = require('pokedex-promise-v2');
    var P = new Pokedex();
    module.exports = {
    	name: 'pokemon',
    	args: true,
    	description: 'Displays a Pokemons information',
      aliases: ['p','pokedex','dex'],
    	usage: `<name>`,
    	execute(message, args) {
        var pok = args.join('-');
        pok = pok.toLowerCase();
            P.getPokemonByName(pok)
          .then(function(poke) {
            pokeURL='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + poke.id + '.png';
            var color = 'black';
            var pokeName = '';
            P.getPokemonSpeciesByName(args[0].toLowerCase())
            .then(function(spec) {
              color = spec.color.name;
              for(j=0;j<spec.names.length;j++)
              {
                if(spec.names[j].language.name == 'en')
                {
                  pokeName = spec.names[j].name
                }
              }
              pokeStats = '';
              for(i=0;i<poke.stats.length;i++)
              {
                if(i==0)
                {
                  pokeStats += poke.stats[i].base_stat
                }
                else {
                  pokeStats = pokeStats + ' | ' +poke.stats[i].base_stat
                }
              }
              pokeType = '';
              for(i=0;i<poke.types.length;i++)
              {
                if(i==0)
                {
                  pokeType += poke.types[i].type.name[0].toUpperCase() +　poke.types[i].type.name.slice(1);
                }
                else {
                  pokeType = pokeType + ' | ' + poke.types[i].type.name[0].toUpperCase() +　poke.types[i].type.name.slice(1);
                }
              }
              pokeAbilities = '';
              switch(poke.abilities.length)
              {
                case 1:
                  pokeAbilities = makeReadable(poke.abilities[0].ability.name);
                  break;
                case 2:
                  pokeAbilities = makeReadable(poke.abilities[0].ability.name);
                  pokeAbilities += ' | *' + makeReadable(poke.abilities[1].ability.name) + '*';
                  break;
                case 3:
                  pokeAbilities = makeReadable(poke.abilities[0].ability.name);
                  pokeAbilities += ' | ' + makeReadable(poke.abilities[1].ability.name);
                  pokeAbilities += ' | *' + makeReadable(poke.abilities[2].ability.name) + '*';
                  break;
              }
            var pokeEmbed =
            {
              color:　embedColours[color],
              thumbnail:
              {
                url:pokeURL,
              },
              fields:
              [
                {
                  name: 'ID',
                  value: poke.id,
                  inline: true
                },
                {
                  name: 'Name',
                  value: pokeName,
                  inline: true
                },
                {
                  name: 'Type',
                  value: pokeType,
                  inline: false
                },
                {
                  name: 'Base Stats',
                  value: pokeStats,
                  inline:false
                },
                {
                  name: 'Abilities',
                  value: pokeAbilities,
                  inline:false
                },
                {
                  name: 'Height',
                  value: poke.height/10 + 'm',
                  inline:true
                },
                {
                  name: 'Weight',
                  value: poke.weight/10 + 'kg',
                  inline:true
                }
              ],
            }
            return message.channel.send('',{embed: pokeEmbed});
          })
          .catch(function(error) {
            console.log('There was an ERROR: ', error);
          });
        })

          .catch(function(error) {
            console.log('There was an ERROR: ', error);
            return message.channel.send('Pokemon not found.');
          });
    	},
    };
