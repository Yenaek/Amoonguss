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
var tools = require('.././tools');
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
      pokeURL='https://img.pokemondb.net/sprites/home/normal/' + tools.fixUrl(poke.name) + '.png';
      var color = 'black';
      P.getPokemonSpeciesByName(args[0].toLowerCase())
      .then(function(spec) {
        color = spec.color.name;
        var pokeName = tools.getEnName(spec.names, 'name');
        pokeStats = tools.makeList(poke.stats, 'base_stat');
        pokeType = tools.makeList(poke.types, 'type', 'name');
        pokeAbilities = '';
        switch(poke.abilities.length)
        {
          case 1:
          pokeAbilities = tools.makeReadable(poke.abilities[0].ability.name);
          break;
          case 2:
          pokeAbilities = tools.makeReadable(poke.abilities[0].ability.name);
          pokeAbilities += ' | *' + tools.makeReadable(poke.abilities[1].ability.name) + '*';
          break;
          case 3:
          pokeAbilities = tools.makeReadable(poke.abilities[0].ability.name);
          pokeAbilities += ' | ' + tools.makeReadable(poke.abilities[1].ability.name);
          pokeAbilities += ' | *' + tools.makeReadable(poke.abilities[2].ability.name) + '*';
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
