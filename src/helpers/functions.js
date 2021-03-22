/* eslint-disable import/prefer-default-export */
export const getUnikArrObj = (array, byWhat) => {
  // reliable
  const result = array.reduce(
    (acc, x) => acc.concat(acc.find((y) => y[byWhat] === x[byWhat]) ? [] : [x]),
    [],
  );
  return result;
};
