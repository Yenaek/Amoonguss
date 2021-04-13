var Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();
attack = ['*Hardy*','Lonely','Adamant','Naughty','Brave'];
defense = ['Bold','*Docile*','Impish','Lax','Relaxed'];
spattack = ['Modest','Mild','*Bashful*','Rash','Quiet'];
spdefense = ['Calm','Gentle','Careful','*Quirky*','Sassy'];
speed = ['Timid','Hasty','Jolly','Naive','*Serious*'];
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
function isNULL(attribute)
{
  if(attribute == null || attribute == 0)
  {
    return '-';
  }
  else {
    return makeReadable(attribute.name);
  }
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
      P.getNatureByName(args)
      .then(function(nature)
      {
        var increasedStat = isNULL(nature.increased_stat);
        var decreasedStat = isNULL(nature.decreased_stat);
        var likedFlavor = isNULL(nature.likes_flavor);
        var hatedFlavor = isNULL(nature.hates_flavor);
        var natEmbed =
        {
          fields:
          [
            {
              name: 'Name',
              value: makeReadable(nature.name),
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
      })
      .catch(function(error)
      {
        return message.channel.send('Nature not found.');
        console.log('There was an ERROR: ', error);
      });
    }
	},
};
