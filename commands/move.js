var moveEmbed;
var Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();
var typeURL = {
    normal:'https://cdn.bulbagarden.net/upload/9/95/Normal_icon_SwSh.png',
    fighting:'https://cdn.bulbagarden.net/upload/3/3b/Fighting_icon_SwSh.png',
    flying:'https://cdn.bulbagarden.net/upload/b/b5/Flying_icon_SwSh.png',
    poison:'https://cdn.bulbagarden.net/upload/b/b5/Flying_icon_SwSh.png',
    ground:'https://cdn.bulbagarden.net/upload/2/27/Ground_icon_SwSh.png',
    rock:'https://cdn.bulbagarden.net/upload/1/11/Rock_icon_SwSh.png',
    bug:'https://cdn.bulbagarden.net/upload/9/9c/Bug_icon_SwSh.png',
    ghost:'https://cdn.bulbagarden.net/upload/0/01/Ghost_icon_SwSh.png',
    steel:'https://cdn.bulbagarden.net/upload/0/09/Steel_icon_SwSh.png',
    fire:'https://cdn.bulbagarden.net/upload/a/ab/Fire_icon_SwSh.png',
    water:'https://cdn.bulbagarden.net/upload/8/80/Water_icon_SwSh.png',
    grass:'https://cdn.bulbagarden.net/upload/a/a8/Grass_icon_SwSh.png',
    electric:'https://cdn.bulbagarden.net/upload/7/7b/Electric_icon_SwSh.png',
    psychic:'https://cdn.bulbagarden.net/upload/7/73/Psychic_icon_SwSh.png',
    ice:'https://cdn.bulbagarden.net/upload/1/15/Ice_icon_SwSh.png',
    dragon:'https://cdn.bulbagarden.net/upload/7/70/Dragon_icon_SwSh.png',
    dark:'https://cdn.bulbagarden.net/upload/d/d5/Dark_icon_SwSh.png',
    fairy:'https://cdn.bulbagarden.net/upload/c/c6/Fairy_icon_SwSh.png'
};
var embedColours = {
  normal:0xffffff,
  fighting:0xff4d00,
  flying:0x438b9d,
  poison:0x8b3aa1,
  ground:0xf76c22,
  rock:0xd08d4e,
  bug:0x92fe39,
  ghost:0x4d5ba3,
  steel:0x84b1eb,
  fire:0xff7b00,
  water:0x0088ff,
  grass:0x1eff00,
  electric:0xffff00,
  psychic:0xe86dc1,
  ice:0x84e6da,
  dragon:0x4c7090,
  dark:0x585c5f,
  dairy:0xdd5fbb
};
module.exports = {
	name: 'move',
	args: true,
	description: 'Displays a moves information',
  aliases: ['m','attack'],
	usage: `<name>`,
	execute(message, args) {
        args = args.join('-');
        args = args.toLowerCase();
        P.getMoveByName(args)
      .then(function(move) {
        var movePower = '';
        if(move.power == null)
        {
          movePower = '-';
        }
        else {
          movePower = move.power;
        }
        var moveAccuracy = '';
        if(move.accuracy == null)
        {
          moveAccuracy = '-';
        }
        else {
          moveAccuracy = move.accuracy;
        }
        var moveEffectRate = '';
        if(move.meta.ailment_chance == 0)
        {
          moveEffectRate = '-';
        }
        else {
          moveEffectRate = move.meta.ailment_chance;
        }
        moveName = '';
        for(j=0;j<move.names.length;j++)
        {
          if(move.names[j].language.name == 'en')
          {
            moveName = move.names[j].name
          }
        }
        moveDesc = '';
        for(j=0;j<move.flavor_text_entries.length;j++)
        {
          if(move.flavor_text_entries[j].language.name == 'en' && move.flavor_text_entries[j].version_group.name == 'ultra-sun-ultra-moon')
          {
            moveDesc = move.flavor_text_entries[j].flavor_text;
          }
        }
        moveClass = move.damage_class.name[0].toUpperCase() + move.damage_class.name.slice(1);
        moveEmbed =
        {
          color: embedColours[move.type.name],
          thumbnail:
          {
            url:typeURL[move.type.name],
          },
          fields:
          [
            {
              name: 'Name',
              value: moveName,
              inline: true
            },
            {
              name: 'Description',
              value: moveDesc,
              inline: false
            },
            {
              name: 'Power',
              value: movePower,
              inline: true
            },
            {
              name: 'Accuracy',
              value: moveAccuracy,
              inline:true
            },
            {
              name: 'PP',
              value: move.pp,
              inline:true
            },
            {
              name: 'Effect Rate',
              value: moveEffectRate,
              inline:true
            },
            {
              name: 'Class',
              value: moveClass,
              inline:true
            }
          ],
        }
        return message.channel.send('',{embed: moveEmbed});
      })
      .catch(function(error) {
        console.log('There was an ERROR: ', error);
        return message.channel.send('Move not found.');
      });
	},
};
