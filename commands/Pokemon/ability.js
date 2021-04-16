var Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();
var redis = require('redis');
const { regis_port } = require('../.././config.json')
const client = redis.createClient(regis_port);
var tools = require('../.././tools');
function createEmbed(message,abil)
{
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
}
module.exports = {
  name: 'ability',
  args: true,
  description: 'Shows ability information',
  aliases: ['a'],
  usage: `<name>`,
  execute(message, args) {
    var args = args.join('-');
    args = args.toLowerCase();
    client.get('ability/'+args, (err,data) => {
      if (err) throw err;
      if(data !== null)
      {
        createEmbed(message,JSON.parse(data));
      }
      else {
        start = new Date();
        console.log(`fetching data for ability/${args}`)
        P.getAbilityByName(args)
        .then(function(abil) {
          end = new Date();
          console.log(`done. took ${end - start}ms`);
          client.set('ability/'+args,JSON.stringify(abil));
          createEmbed(message,abil);
        })
        .catch(function(error) {
          console.log('There was an ERROR: ', error);
          return message.channel.send('Ability not found.');
        });
      }
    });
  },
};
