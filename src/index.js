module.exports = function check(str, bracketsConfig) {
  const stack = [];
  const bracketsMap = new Map();
  bracketsConfig.forEach(([open, close]) => {
    bracketsMap.set(open, close);
  });
  for (let i = 0; i < str.length; i += 1) {
    const char = str[i];
    if (bracketsMap.has(char)) {
      if (char === bracketsMap.get(char)) {
        if (stack.length > 0 && stack[stack.length - 1] === char) {
          stack.pop();
        } else {
          stack.push(char);
        }
      } else {
        stack.push(char);
      }
    } else {
      if (stack.length === 0) {
        return false;
      }

      const lastOpen = stack.pop();
      const expectedClose = bracketsMap.get(lastOpen);

      if (char !== expectedClose) {
        return false;
      }
    }
  }
  return stack.length === 0;
};
