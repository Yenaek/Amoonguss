var movesetEmbed;
var Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();
var redis = require('redis');
const { regis_port } = require('../.././config.json')
const client = redis.createClient(regis_port);
var tools = require('../.././tools');

function createEmbed(message, pokemon)
{
  var lvlMoves = [];
  var eggMoves = [];
  var tutorMoves = [];
  var machineMoves = [];
  var specialMoves = [];
  for (var i = 0; i < pokemon.moves.length; i++) {
    switch (tools.mostRecentInfo(pokemon.moves[i].version_group_details,'move_learn_method').name) {
      case 'level-up':
        lvlMoves.push({level:tools.mostRecentInfo(pokemon.moves[i].version_group_details,'level_learned_at'), name:tools.makeReadable(pokemon.moves[i].move.name)});
        break;
      case 'egg':
        eggMoves.push(tools.makeReadable(pokemon.moves[i].move.name));
        break;
      case 'tutor':
        tutorMoves.push(tools.makeReadable(pokemon.moves[i].move.name));
        break;
      case 'machine':
        machineMoves.push(tools.makeReadable(pokemon.moves[i].move.name));
        break;
      default:
        specialMoves.push(tools.makeReadable(pokemon.moves[i].move.name));
    }
  }
  for (var i = 1; i < lvlMoves.length; i++) {
    var j = i - 1;
    while ((lvlMoves[i].level < lvlMoves[j].level)) { j--; if(j < 0) { break; }}
    var temp = lvlMoves[i];
    lvlMoves.splice(i, 1);
    lvlMoves.splice(j+1, 0, temp);
  }
  var lvlMovesList = []
  for (var i = 0; i < lvlMoves.length; i++) {
    lvlMovesList.push(lvlMoves[i].level + ' | ' + lvlMoves[i].name);
  }
  lvlMovesList = lvlMovesList.join(`\n`);
  var eggMovesList = eggMoves.join(`\n`);
  var tutorMovesList = tutorMoves.join(`\n`);
  var machineMovesList = machineMoves.join(`\n`);
  var specialMovesList = specialMoves.join(`\n`);
  lvlMovesList = (tools.splitFieldList(lvlMovesList));
  eggMovesList = (tools.splitFieldList(eggMovesList));
  tutorMovesList = (tools.splitFieldList(tutorMovesList));
  machineMovesList = (tools.splitFieldList(machineMovesList));
  specialMovesList = (tools.splitFieldList(specialMovesList));
  movesetEmbed =
  {
    thumbnail:
    {
      url:'https://img.pokemondb.net/sprites/home/normal/' + tools.fixUrl(pokemon.name) + '.png',
    },
    fields:
    [
      {
        name: 'Pokemon',
        value: tools.makeReadable(pokemon.name),
        inline: false
      }
    ],
  }
  for (var i = 0; i < lvlMovesList.length; i++) { movesetEmbed.fields.push({name: 'Level Up', value: lvlMovesList[i], inline: true}); }
  for (var i = 0; i < eggMovesList.length; i++) { movesetEmbed.fields.push({name: 'Egg', value: eggMovesList[i], inline: true}); }
  for (var i = 0; i < tutorMovesList.length; i++) { movesetEmbed.fields.push({name: 'Tutor', value: tutorMovesList[i], inline: true}); }
  for (var i = 0; i < machineMovesList.length; i++) { movesetEmbed.fields.push({name: 'HM/TM/TR', value: machineMovesList[i], inline: true}); }
  for (var i = 0; i < specialMovesList.length; i++) { movesetEmbed.fields.push({name: 'Special', value: specialMovesList[i], inline: true}); }
  return message.channel.send('',{embed: movesetEmbed});
}

module.exports = {
    name: 'moveset',
    args: true,
    description: 'shows all the moves a pokemon can learn',
    aliases: ['ms'],
    usage: '<pokemon>',
    execute(message, args) {
        console.log(`executing moveset ${args}`);
        args = args.join('-');
        args = args.toLowerCase();
        client.get('pokemon/'+args, (err,data) => {
          if (err) throw err;
          if(data !== null)
          {
            createEmbed(message,JSON.parse(data));
          }
          else {
            console.log(`fetching data for pokemon/${args}`);
            start = new Date();
            P.getPokemonByName(args)
            .then(function(pokemon) {
              end = new Date();
              console.log(`done. took ${end - start}ms`);
              client.set('pokemon/'+args,JSON.stringify(pokemon));
              createEmbed(message,pokemon);
            })
            .catch(function(error) {
              console.log('There was an ERROR: ', error);
              return message.channel.send('Pokemon not found.');
            });
          }
        });
    },
}
