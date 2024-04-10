exports.isUndefined = (value) => typeof value === 'undefined';

exports.isEmpty = (value) => {
  if (typeof value === 'string') {
    return value.trim() === '';
  }
  return false;
};

exports.filterSpecialCharacters = (value) => {
  if (typeof value === 'string') {
    return value.replace(/[^a-zA-Z0-9_\-]/g, '');
  }
  return '';
};

exports.filterSpecialCharactersEmail = (value) => {
  if (typeof value === 'string') {
    return value.replace(/[^a-zA-Z0-9.@]/g, '');
  }
  return '';
};

exports.filterSpecialCharactersPassword = (value) => {
  if (typeof value === 'string') {
    return value.replace(/[^a-zA-Z0-9.@\-!]/g, '');
  }
  return '';
};


