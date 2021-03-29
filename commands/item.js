var Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();
module.exports = {
	name: 'item',
	args: true,
	description: 'Displays an items information',
	aliases: ['i'],
	usage: `<name>`,
	execute(message, args)
  {
    args = args.join('-');
    args = args.toLowerCase();
    P.getItemByName(args)
    .then(function(item)
    {
      const itemURL = 'https://img.pokemondb.net/sprites/items/' + args + '.png';
      itemName = '';
      for(j=0;j<item.names.length;j++)
      {
        if(item.names[j].language.name == 'en')
        {
          itemName = item.names[j].name;
        }
      }
      itemCost = item.cost;
      if(item.cost == 0)
      {
        itemCost = '-';
      }
      else {
        itemCost = '₽' + itemCost;
      }
      itemEff = '';
      for(j=0;j<item.effect_entries.length;j++)
      {
        if(item.effect_entries[j].language.name == 'en')
        {
          itemEff = item.effect_entries[j].short_effect;
        }
      }
      itemEmbed =
      {
        thumbnail:
        {
          url:itemURL,
        },
        fields:
        [
          {
            name: 'Name',
            value: itemName,
            inline: true
          },
          {
            name: 'Cost',
            value: itemCost,
            inline: true
          },
          {
            name: 'Effect',
            value: itemEff,
            inline: false
          },
        ],
      }
      return message.channel.send('',{embed: itemEmbed});
    })
    .catch(function(error)
    {
      return message.channel.send('Item not found.');
      console.log('There was an ERROR: ', error);
    });
	},
};