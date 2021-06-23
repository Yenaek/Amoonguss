var pokemonColors = {
  red: 0xff9741,
  blue: 0x3692dc,
  yellow: 0xfbd100,
  green: 0x38bf4b,
  black: 0x232323,
  brown: 0x754d14,
  purple: 0x7d1bba,
  gray: 0x919091,
  white: 0xeeeeee,
  pink: 0xfb89eb
}
var tools = require('../.././tools');
var Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();
var redis = require('redis');
const { regis_port } = require('../.././config.json')
const client = redis.createClient(regis_port);
function createEmbed(message, pokemon,args)
{
  args = args.split('-');
  pokeURL='https://img.pokemondb.net/sprites/home/normal/' + tools.fixUrl(pokemon.name) + '.png';
  var color = 'black';
  client.get('pokemon-species/'+args[0].toLowerCase(), (err,data) => {
    if (err) throw err;
    if(data !== null)
    {
      createSpeciesEmbed(message,pokemon,JSON.parse(data));
    }
    else {
      console.log(`fetching data for pokemon-species/${args[0].toLowerCase()}`);
      start = new Date();
      P.getPokemonSpeciesByName(args[0].toLowerCase())
      .then(function(species) {
        end = new Date();
        console.log(`done. took ${end - start}ms`);
        client.set('pokemon-species/'+args[0].toLowerCase(),JSON.stringify(species));
        createSpeciesEmbed(message,pokemon,species);
      })
      .catch(function(error) {
        console.log('There was an ERROR: ', error);
        return message.channel.send('An Error has occoured.');
      });
    }
  });
}
function createSpeciesEmbed(message, pokemon, species)
{
  color = species.color.name;
  var pokeName = tools.getEnName(species.names, 'name');
  pokeStats = tools.makeList(pokemon.stats, 'base_stat');
  pokeType = tools.makeList(pokemon.types, 'type', 'name');
  pokeAbilities = '';
  switch(pokemon.abilities.length)
  {
    case 1:
    pokeAbilities = tools.makeReadable(pokemon.abilities[0].ability.name);
    break;
    case 2:
    pokeAbilities = tools.makeReadable(pokemon.abilities[0].ability.name);
    pokeAbilities += ' | *' + tools.makeReadable(pokemon.abilities[1].ability.name) + '*';
    break;
    case 3:
    pokeAbilities = tools.makeReadable(pokemon.abilities[0].ability.name);
    pokeAbilities += ' | ' + tools.makeReadable(pokemon.abilities[1].ability.name);
    pokeAbilities += ' | *' + tools.makeReadable(pokemon.abilities[2].ability.name) + '*';
    break;
  }
  var pokeEmbed =
  {
    color:　pokemonColors[color],
    thumbnail:
    {
      url:pokeURL,
    },
    fields:
    [
      {
        name: 'ID',
        value: pokemon.id,
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
        value: pokemon.height/10 + 'm',
        inline:true
      },
      {
        name: 'Weight',
        value: pokemon.weight/10 + 'kg',
        inline:true
      }
    ],
  }
  return message.channel.send('',{embed: pokeEmbed});
}
module.exports = {
  name: 'pokemon',
  args: true,
  description: 'Displays a Pokemons information.\nCommon affixes:\nalola\ngalar\nmega\ngmax',
  aliases: ['p','pokedex','dex'],
  usage: `<name>`,
  execute(message, args) {
    console.log(`executing pokemon ${args}`);
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
        createEmbed(message,JSON.parse(data),args);
      }
      else {
        console.log(`fetching data for pokemon/${args}`);
        start = new Date();
        P.getPokemonByName(args)
        .then(function(pokemon) {
          end = new Date();
          console.log(`done. took ${end - start}ms`);
          client.set('pokemon/'+args,JSON.stringify(pokemon));
          createEmbed(message,pokemon,args);
        })
        .catch(function(error) {
          console.log('There was an ERROR: ', error);
          return message.channel.send('Pokemon not found.');
        });
      }
    });
  },
};
