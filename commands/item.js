var Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();
var redis = require('redis');
const { regis_port } = require('../config.json')
const client = redis.createClient(regis_port);
var tools = require('.././tools');
function createEmbed(message, item)
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
}
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
    client.get('item/'+args, (err,data) => {
      if (err) throw err;
      if(data !== null)
      {
        createEmbed(message,JSON.parse(data));
      }
      else {
        P.getItemByName(args)
        .then(function(item) {
          console.log(`fetching data for item/${args}`)
          client.set('item/'+args,JSON.stringify(item));
          createEmbed(message,item);
        })
        .catch(function(error) {
          console.log('There was an ERROR: ', error);
          return message.channel.send('Item not found.');
        });
      }
    });
  },
};
