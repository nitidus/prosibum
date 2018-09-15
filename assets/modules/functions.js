module.exports = {
  _convertKeywordToToken: (keyword) => {
    return keyword.replace(/_/ig, ' ').replace(/\b\w/ig, char => char.toUpperCase());
  },
  _generateNewUniqueObjectKey: () => {
    const today = new Date(),
          randomToken = Math.random();

    return parseInt(today.getTime().toString() + (randomToken * Math.pow(10, randomToken.toString().length - 2)).toString());
  }
};
