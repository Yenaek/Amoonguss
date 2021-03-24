const move = require('../moves.json')
const { prefix } = require('../config.json');
var typeURL = {
    Normal:'https://cdn.bulbagarden.net/upload/9/95/Normal_icon_SwSh.png',
    Fighting:'https://cdn.bulbagarden.net/upload/3/3b/Fighting_icon_SwSh.png',
    Flying:'https://cdn.bulbagarden.net/upload/b/b5/Flying_icon_SwSh.png',
    Poison:'https://cdn.bulbagarden.net/upload/b/b5/Flying_icon_SwSh.png',
    Ground:'https://cdn.bulbagarden.net/upload/2/27/Ground_icon_SwSh.png',
    Rock:'https://cdn.bulbagarden.net/upload/1/11/Rock_icon_SwSh.png',
    Bug:'https://cdn.bulbagarden.net/upload/9/9c/Bug_icon_SwSh.png',
    Ghost:'https://cdn.bulbagarden.net/upload/0/01/Ghost_icon_SwSh.png',
    Steel:'https://cdn.bulbagarden.net/upload/0/09/Steel_icon_SwSh.png',
    Fire:'https://cdn.bulbagarden.net/upload/a/ab/Fire_icon_SwSh.png',
    Water:'https://cdn.bulbagarden.net/upload/8/80/Water_icon_SwSh.png',
    Grass:'https://cdn.bulbagarden.net/upload/a/a8/Grass_icon_SwSh.png',
    Electric:'https://cdn.bulbagarden.net/upload/7/7b/Electric_icon_SwSh.png',
    Psychic:'https://cdn.bulbagarden.net/upload/7/73/Psychic_icon_SwSh.png',
    Ice:'https://cdn.bulbagarden.net/upload/1/15/Ice_icon_SwSh.png',
    Dragon:'https://cdn.bulbagarden.net/upload/7/70/Dragon_icon_SwSh.png',
    Dark:'https://cdn.bulbagarden.net/upload/d/d5/Dark_icon_SwSh.png',
    Fairy:'https://cdn.bulbagarden.net/upload/c/c6/Fairy_icon_SwSh.png'
};
var embedColours = {
  Normal:0xffffff,
  Fighting:0xff4d00,
  Flying:0x438b9d,
  Poison:0x8b3aa1,
  Ground:0xf76c22,
  Rock:0xd08d4e,
  Bug:0x92fe39,
  Ghost:0x4d5ba3,
  Steel:0x84b1eb,
  Fire:0xff7b00,
  Water:0x0088ff,
  Grass:0x1eff00,
  Electric:0xffff00,
  Psychic:0xe86dc1,
  Ice:0x84e6da,
  Dragon:0x4c7090,
  Dark:0x585c5f,
  Fairy:0xdd5fbb
};
module.exports = {
	name: 'move',
	args: true,
	description: 'Displays a moves information',
  aliases: ['m','a','attack'],
	usage: `${prefix}move <name||number>`,
	execute(message, args) {
    var found = false;
    args = args.join(' ');
		for(i=0;i<move.length;i++){
      if(args==move[i].name)
      {
        found = true;
        var movePower = '';
        if(move[i].power == -1)
        {
          movePower = '-';
        }
        else {
          movePower = move[i].power;
        }
        var moveAccuracy = '';
        if(move[i].hit_rate == 101)
        {
          moveAccuracy = '-';
        }
        else {
          moveAccuracy = move[i].hit_rate;
        }
        var moveEffectRate = '';
        if(move[i].effect_rate == -1)
        {
          moveEffectRate = '-';
        }
        else {
          moveEffectRate = move[i].effect_rate;
        }
        var moveEmbed =
        {
          color: embedColours[move[i].type],
          thumbnail:
          {
            url:typeURL[move[i].type],
          },
          fields:
          [
            {
              name: 'Name',
              value: move[i].name,
              inline: true
            },
            {
              name: 'Description',
              value: move[i].description,
              inline:false
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
              value: move[i].pp,
              inline:true
            },
            {
              name: 'Effect Rate',
              value: moveEffectRate,
              inline:true
            },
          ],
        }
        return message.channel.send('',{embed: moveEmbed});
      }
    }
    if(!found)
    {
      return message.channel.send('Couldn\'t find move.');
    }
	},
};
