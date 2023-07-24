const Decimal = require('decimal.js');
const JSONbig = require('json-bigint');

function parseJSONWithArbitraryPrecision(jsonStr) {
  // Use the reviver function to convert numbers to Decimal
  const parsedJSON = JSONbig.parse(jsonStr, (key, value) => {
    if (typeof value === 'string') {
      try {
        return new Decimal(value);
      } catch (error) {}
    }
    return value;
  });

  return parsedJSON;
}


const jsonStr = '{}';
const parsedJSON = parseJSONWithArbitraryPrecision(jsonStr);
console.log(parsedJSON);
