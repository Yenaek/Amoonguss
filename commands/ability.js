var Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();
var tools = require('.././tools');
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
      abName = tools.getEnName(abil.names, 'name');
      abEff = tools.getEnName(abil.effect_entries, 'effect');
      abPoke = '';
      var i = 0;
      while(i<abil.pokemon.length)
      {
        if(abil.pokemon[i].is_hidden)
        {
          abPoke = abPoke + '*' + tools.makeReadable(abil.pokemon[i].pokemon.name) + '*';
        }
        else
        {
          abPoke += tools.makeReadable(abil.pokemon[i].pokemon.name);
        }
        if(i != abil.pokemon.length - 1)
        {
          abPoke += ' | ';
        }
        i++;
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
