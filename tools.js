module.exports =
{
  makeReadable: function makeReadable(msg)
  {
    msg = msg.split('-');
    for(i=0;i<msg.length;i++)
    {
      msg[i] = msg[i][0].toUpperCase() + msg[i].slice(1).toLowerCase();
    }
    msg = msg.join(' ');
    return msg;
  },
  getEnName: function getEnName(nameArray, getName)
  {
    for(i=0;i<nameArray.length;i++)
    {
      if(nameArray[i].language.name == 'en')
      {
        return nameArray[i][getName]
      }
    }
  },
  isNull: function isNull(attribute, var1)
  {
    if(var1 != null && attribute != null)
    {
      attribute = attribute[var1];
    }
    if(attribute == null || attribute == 0)
    {
      return '-';
    }
    else {
      if(typeof attribute === 'string' || attribute instanceof String)
      {
        return attribute[0].toUpperCase() + attribute.slice(1).toLowerCase();
      }
      else
      {
        return attribute;
      }
    }
  },
  makeList: function makeList(array, var1, var2)
  {
    res = '';
    for(i = 0;i<array.length;i++)
    {
      let str;
      if(var2 != null)
      {
        str = array[i][var1][var2];
      }
      else
      {
        str = array[i][var1];
      }
      if (typeof str === 'string' || str instanceof String)
      {
        str = str[0].toUpperCase() + str.slice(1).toLowerCase();
      }
      if(i == array.length - 1)
      {
        res = res + str;
      }
      else
      {
        res = res + str + ' | ';
      }
    }
    return res;
  },
  fixUrl: function fixUrl(name)
  {
    name = name.split('-');
    for(i = 0; i < name.length; i++)
    {
      switch (name[i]) {
        case 'gmax':
          name[i] = 'gigantamax'
          break;
        case 'alola':
          name[i] = 'alolan'
          break;
        case 'galar':
          name[i] = 'galarian'
          break;
        default:

      }
    }
    return name.join('-');
  },
  mostRecentInfo: function mostRecentInfo(array, information)
  {
    return array[array.length-1][information];
  },
  splitFieldList: function splitFieldList(str)
  {
    if (!str) {return [];}
    var output = [];
    var prevSlice = 0;
    for (var i = 0; i < Math.floor(str.length/1024); i++) {
      for (var i = prevSlice + 1024; i > 0; i--) {
        if (str.charAt(i) == "\n") {
          output.push(str.slice(prevSlice,prevSlice + i));
          prevSlice = i + 1;
          break;
        }
      }
    }
    output.push(str.slice(prevSlice, str.length))
    return output;
  },
  commonDatabaseError: function commonDatabaseError(name)
  {
    switch (name) {
      case 'nidoran':
        return ['m', 'f']
      case 'deoxys':
        return ['normal', 'attack', 'defense', 'speed']
      case 'wormadam':
        return ['plant', 'sandy', 'trash']
      case 'giratina':
        return ['altered', 'origin']
      case 'shaymin':
        return ['land', 'sky']
      case 'basculin':
        return ['red-striped', 'blue-striped']
      case 'darmanitan':
        return ['standard', 'zen']
      case 'tornadus':
        return ['incarnate', 'therian']
      case 'thunderus':
        return ['incarnate' , 'therian']
      case 'landorus':
        return ['incarnate', 'therian']
      case 'keldeo':
        return ['ordinary', 'resolute']
      case 'meloetta':
        return ['aria', 'pirouette']
      case 'meowstic':
        return ['male', 'female']
      case 'aegislash':
        return ['shield', 'blade']
      case 'pumpkaboo':
        return ['small', 'average', 'large', 'super']
      case 'gourgeist':
        return ['small', 'average', 'large', 'super']
      case 'oricorio':
        return ['baile', 'pom-pom', 'pau', 'sensu']
      case 'lyncanroc':
        return ['midday', 'midnight', 'dusk']
      case 'wishiwashi':
        return ['solo', 'school']
      case 'minior':
        return ['minior-red-meteor', 'minior-orange-meteor', 'minior-yellow-meteor', 'minior-green-meteor', 'minior-blue-meteor', 'minior-indigo-meteor', 'minior-violet-meteor', 'minior-red', 'minior-orange', 'minior-yellow', 'minior-green', 'minior-blue', 'minior-indigo', 'minior-violet']
      case 'mimikyu':
        return ['diguised', 'busted']
      case 'toxtricity':
        return ['amped', 'low-key']
      case 'eiscue':
        return ['ice', 'noice']
      case 'indeedee':
        return ['male', 'female']
      case 'zacian':
        return ['hero', 'crowned']
      case 'zamazenta':
        return ['hero', 'crowned']
      case 'urshifu':
        return ['single-strike', 'rapid-strike']
      default:
        return []
    }
  },
  generateMultipleFormMessage: function generateMultipleFormMessage(name, mistype)
  {
    var output = ''
    for (var i = 0; i < mistype.length; i++) {
      output = output + name + '-' + mistype[i] + '\n'
    }
    return `this pokemon has multiple forms:\n${output}`
  }
}
