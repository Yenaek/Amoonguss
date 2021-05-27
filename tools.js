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
  }
}
