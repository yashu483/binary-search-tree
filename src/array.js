'use strict';

const sortAndRemoveDuplicateFromArray =
  function sortAndRemoveDuplicateFromArray(array) {
    const sortedArr = array.sort((a, b) => {
      return a - b;
    });
    let removedDuplicates = [];
    sortedArr.forEach((item) => {
      if (!removedDuplicates.includes(item)) {
        removedDuplicates.push(item);
      }
    });
    return removedDuplicates;
  };
const demoArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

export { sortAndRemoveDuplicateFromArray, demoArr };
