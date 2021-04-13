var Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();
var redis = require('redis');
const { regis_port } = require('../config.json')
const client = redis.createClient(regis_port);
var tools = require('.././tools');
attack = ['*Hardy*','Lonely','Adamant','Naughty','Brave'];
defense = ['Bold','*Docile*','Impish','Lax','Relaxed'];
spattack = ['Modest','Mild','*Bashful*','Rash','Quiet'];
spdefense = ['Calm','Gentle','Careful','*Quirky*','Sassy'];
speed = ['Timid','Hasty','Jolly','Naive','*Serious*'];
function createEmbed(message, nature)
{
  var increasedStat = tools.isNull(nature.increased_stat, 'name');
  var decreasedStat = tools.isNull(nature.decreased_stat, 'name');
  var likedFlavor = tools.isNull(nature.likes_flavor, 'name');
  var hatedFlavor = tools.isNull(nature.hates_flavor, 'name');
  var natEmbed =
  {
    fields:
    [
      {
        name: 'Name',
        value: tools.makeReadable(nature.name),
        inline: false
      },
      {
        name: 'Increased Stat',
        value: increasedStat,
        inline: true
      },
      {
        name: '\u200B',
        value: '\u200B',
        inline: true
      },
      {
        name: 'Decreased Stat',
        value: decreasedStat,
        inline: true
      },
      {
        name: 'Liked Flavor',
        value: likedFlavor,
        inline: true
      },
      {
        name: '\u200B',
        value: '\u200B',
        inline: true
      },
      {
        name: 'Hated Flavor',
        value: hatedFlavor,
        inline: true
      },
    ]
  }
  return message.channel.send('',{embed: natEmbed});
}
module.exports = {
  name: 'nature',
  args: false,
  description: 'Shows the information for all Natures or information of a specific one',
  aliases: ['n'],
  usage: `<name>`,
  execute(message, args) {
    if (!args.length)
    {
      var natEmbed =
      {
        fields:
        [
          {
            name: 'Attack+',
            value: attack.join('\n'),
            inline: true
          },
          {
            name: '\u200B',
            value: '\u200B',
            inline: true
          },
          {
            name: 'Defense+',
            value: defense.join('\n'),
            inline: true
          },
          {
            name: 'Sp. Attack+',
            value: spattack.join('\n'),
            inline: true
          },
          {
            name: '\u200B',
            value: '\u200B',
            inline: true
          },
          {
            name: 'Sp. Defense+',
            value: spdefense.join('\n'),
            inline: true
          },
          {
            name: 'Speed+',
            value: speed.join('\n'),
            inline: false
          },
        ]
      }
      return message.channel.send('',{embed: natEmbed});
    }
    else
    {
      args = args[0].toLowerCase();
      client.get('nature/'+args, (err,data) => {
        if (err) throw err;
        if(data !== null)
        {
          createEmbed(message,JSON.parse(data));
        }
        else {
          P.getNatureByName(args)
          .then(function(nature) {
            console.log(`fetching data for nature/${args}`)
            client.set('nature/'+args,JSON.stringify(nature));
            createEmbed(message,nature);
          })
          .catch(function(error) {
            console.log('There was an ERROR: ', error);
            return message.channel.send('Nature not found.');
          });
        }
      });
    }
  },
};
