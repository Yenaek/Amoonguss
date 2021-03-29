var Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();
berries = ['Aguav','Apicot','Aspear','Babiri','Charti','Cheri','Chesto','Chilan','Chople','Coba','Colbur','Custap','Enigma','Figy','Ganlon','Grepa','Haban','Hondew','Iapapa','Jaboca','Kasib','Kebia','Kee','Kelpsy','Lansat','Leppa','Liechi','Lum','Mago','Maranga','Micle','Occa','Oran','Passho','Payapa','Pecha','Persim','Petaya','Pomeg','Qualot','Rawst','Rindo','Roseli','Rowap','Salac','Shuca','Sitrus','Starf','Tamato','Tanga','Wacan','Wiki','Yache'];
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
module.exports = {
	name: 'berry',
	args: false,
	description: 'Displays information of a berry or a list of all the berries',
	aliases: ['b'],
	usage: `<name>`,
	execute(message, args) {
    if (!args.length) {
      msg = 'Here is a list of all the Berries:\n';
      for(i = 0;i<berries.length;i++)
      {
        if(i == berries.length - 1)
        {
          msg += berries[i];
        }
        else
        {
          msg = msg + berries[i] + ' | ';
        }
      }
      return message.channel.send(msg)
     }
     else
    {
      args = args[0].toLowerCase();
      P.getBerryByName(args)
      .then(function(berry) {
        const berryURL = 'https://img.pokemondb.net/sprites/items/' + args + '-berry.png';
        berryFlavor = '';
        for(i=0;i<5;i++)
        {
          if(i == 4)
          {
            berryFlavor += berry.flavors[i].potency
          }
          else {
            berryFlavor = berryFlavor + berry.flavors[i].potency + ' | '
          }
        }
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
              value: makeReadable(berry.name) + ' Berry',
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
              value: makeReadable(berry.firmness.name),
              inline: true
            },
          ],
        }
        return message.channel.send('',{embed: itemEmbed});
      })
      .catch(function(error) {
        return message.channel.send('Berry not found.');
        console.log('There was an ERROR: ', error);
      });
    }
	},
};
