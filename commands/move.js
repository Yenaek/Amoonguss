var moveEmbed;
var Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();
var typeURL = {
    normal:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Pokémon_Normal_Type_Icon.svg/200px-Pokémon_Normal_Type_Icon.svg.png',
    fighting:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Pokémon_Fighting_Type_Icon.svg/200px-Pokémon_Fighting_Type_Icon.svg.png',
    flying:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Pokémon_Flying_Type_Icon.svg/200px-Pokémon_Flying_Type_Icon.svg.png',
    poison:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Pokémon_Poison_Type_Icon.svg/200px-Pokémon_Poison_Type_Icon.svg.png',
    ground:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Pokémon_Ground_Type_Icon.svg/200px-Pokémon_Ground_Type_Icon.svg.png',
    rock:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Pokémon_Rock_Type_Icon.svg/200px-Pokémon_Rock_Type_Icon.svg.png',
    bug:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Pokémon_Bug_Type_Icon.svg/200px-Pokémon_Bug_Type_Icon.svg.png',
    ghost:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Pokémon_Ghost_Type_Icon.svg/200px-Pokémon_Ghost_Type_Icon.svg.png',
    steel:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Pokémon_Steel_Type_Icon.svg/200px-Pokémon_Steel_Type_Icon.svg.png',
    fire:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Pokémon_Fire_Type_Icon.svg/200px-Pokémon_Fire_Type_Icon.svg.png',
    water:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Pokémon_Water_Type_Icon.svg/200px-Pokémon_Water_Type_Icon.svg.png',
    grass:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Pokémon_Grass_Type_Icon.svg/200px-Pokémon_Grass_Type_Icon.svg.png',
    electric:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Pokémon_Electric_Type_Icon.svg/200px-Pokémon_Electric_Type_Icon.svg.png',
    psychic:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Pokémon_Psychic_Type_Icon.svg/200px-Pokémon_Psychic_Type_Icon.svg.png',
    ice:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Pokémon_Ice_Type_Icon.svg/200px-Pokémon_Ice_Type_Icon.svg.png',
    dragon:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Pokémon_Dragon_Type_Icon.svg/200px-Pokémon_Dragon_Type_Icon.svg.png',
    dark:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Pokémon_Dark_Type_Icon.svg/200px-Pokémon_Dark_Type_Icon.svg.png',
    fairy:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Pokémon_Fairy_Type_Icon.svg/200px-Pokémon_Fairy_Type_Icon.svg.png'
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
