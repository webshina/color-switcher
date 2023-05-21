export const generateRandomString = (n: number) => {
  var CODE_TABLE =
    '0123456789' + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz';
  var r = '';
  for (var i = 0, k = CODE_TABLE.length; i < n; i++) {
    r += CODE_TABLE.charAt(Math.floor(k * Math.random()));
  }
  return r;
};
