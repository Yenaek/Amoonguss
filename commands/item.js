var Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();
var tools = require('.././tools');
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
      const itemURL = 'https://img.pokemondb.net/sprites/items/' + item.name + '.png';
      itemName = tools.getEnName(item.names, 'name');
      itemCost = item.cost;
      if(item.cost == 0)
      {
        itemCost = '-';
      }
      else {
        itemCost = '₽' + itemCost;
      }
      itemEff = tools.getEnName(item.effect_entries, 'short_effect');
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
