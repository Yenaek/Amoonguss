var Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();
var tools = require('.././tools');
module.exports = {
  name: 'berry',
  args: false,
  description: 'Displays information of a berry or a list of all the berries',
  aliases: ['b'],
  usage: `<name>`,
  execute(message, args) {
    if (!args.length) {
      P.getBerriesList()
      .then(function(berries)
      {
        msg = 'Here is a list of all the Berries:\n' + tools.makeList(berries.results, 'name');
        return message.channel.send(msg)
      })
      .catch(function(error)
      {
        console.log('There was an ERROR: ', error);
        return message.channel.send('An Error occoured.');
      });
    }
    else
    {
      args = args[0].toLowerCase();
      P.getBerryByName(args)
      .then(function(berry) {
        const berryURL = 'https://img.pokemondb.net/sprites/items/' + berry.name + '-berry.png';
        berryFlavor = tools.makeList(berry.flavors, 'potency');
        itemEmbed =
        {
          thumbnail:
          {
            url:berryURL,
          },
          fields:
          [
            {
              name: 'Name',
              value: tools.makeReadable(berry.name) + ' Berry',
              inline: false
            },
            {
              name: 'Growth Time',
              value: berry.growth_time,
              inline: true
            },
            {
              name: 'Max Harvest',
              value: berry.max_harvest,
              inline: true
            },
            {
              name: 'Size',
              value: berry.size + 'mm',
              inline: false
            },
            {
              name: 'Spicy | Dry | Sweet | Bitter | Sour',
              value: berryFlavor,
              inline: true
            },
            {
              name: 'Firmness',
              value: tools.makeReadable(berry.firmness.name),
              inline: true
            },
          ],
        }
        return message.channel.send('',{embed: itemEmbed});
      })
      .catch(function(error) {
        console.log('There was an ERROR: ', error);
        return message.channel.send('Berry not found.');
      });
    }
  },
};
