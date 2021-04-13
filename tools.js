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
    if(var1 != null)
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
      if(name[i] == 'gmax')
      {
        name[i] = 'gigantamax';
      }
      if(name[i] == 'alola')
      {
        name[i] = 'alolan';
      }
      if(name[i] == 'galar')
      {
        name[i] = 'galarian';
      }
    }
    return name.join('-');
  }
}
