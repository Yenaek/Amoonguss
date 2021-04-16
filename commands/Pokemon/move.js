var moveEmbed;
var Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();
var redis = require('redis');
const { regis_port } = require('../.././config.json')
const client = redis.createClient(regis_port);
var tools = require('../.././tools');
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
var typeColors = {
  normal:0x919aa2,
  fighting:0xe0306a,
  flying:0x89aae3,
  poison:0xb567ce,
  ground:0xe87236,
  rock:0xc8b686,
  bug:0x83c300,
  ghost:0x4c6ab2,
  steel:0x5a8ea2,
  fire:0xff9741,
  water:0x3692dc,
  grass:0x38bf4b,
  electric:0xfbd100,
  psychic:0xff6675,
  ice:0x4cd1c0,
  dragon:0x006fc9,
  dark:0x5b5466,
  fairy:0xfb89eb
};
function createEmbed(message, move)
{
  var movePower = tools.isNull(move.power);
  var moveAccuracy = tools.isNull(move.accuracy);
  var moveEffectRate = tools.isNull(move.meta.ailment_chance)
  moveName = tools.getEnName(move.names, 'name');
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
    color: typeColors[move.type.name],
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
}
module.exports = {
	name: 'move',
	args: true,
	description: 'Displays a moves information',
  aliases: ['m','attack'],
	usage: `<name>`,
	execute(message, args) {
        args = args.join('-');
        args = args.toLowerCase();
        client.get('move/'+args, (err,data) => {
          if (err) throw err;
          if(data !== null)
          {
            createEmbed(message,JSON.parse(data));
          }
          else {
            console.log(`fetching data for move/${args}`);
            start = new Date();
            P.getMoveByName(args)
            .then(function(move) {
              end = new Date();
              console.log(`done. took ${end - start}ms`);
              client.set('move/'+args,JSON.stringify(move));
              createEmbed(message,move);
            })
            .catch(function(error) {
              console.log('There was an ERROR: ', error);
              return message.channel.send('Move not found.');
            });
          }
        });
	},
};
