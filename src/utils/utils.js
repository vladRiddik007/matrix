function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

export function createMatrixRow(length) {
  let id = Symbol('ID');
  return new Array(length).fill(0).map(() => ({
    [id]: Math.random(),
    amount: randomInteger(100, 999),
  }));
}

export function createMatrix(row, column) {
  let mtx = [];
  for (let i = 0; i < row; i++) {
    mtx = [...mtx, createMatrixRow(column)];
  }
  return mtx;
}

export function averageValueColumn(arr) {
  const average = arr
    .reduce((acc, item) => item.map((el, i) => el.amount + (acc[i] || 0)), [])
    .map(item => Math.trunc(item / arr.length));
  return average;
}

export function sumRow(arr) {
  const sum = arr.map(item =>
    Math.round(item.reduce((sum, current) => sum + current.amount, 0)),
  );
  return sum;
}

export function hoverSumUtils(i, event, arr, copyMatrix, rowSum) {
  let newRow = [];
  if (event.type === 'mouseenter') {
    copyMatrix = arr[i];
    const percentMatrixItem = arr[i].map(item => {
      return {
        amount: item.amount,
        percent: +((item.amount * 100) / rowSum[i]).toFixed(1),
      };
    });
    newRow = [...arr.slice(0, i), [...percentMatrixItem], ...arr.slice(++i)];
  } else {
    newRow = [...arr.slice(0, i), copyMatrix, ...arr.slice(++i)];
  }
  return [newRow, copyMatrix];
}

export function getClosest(number, event, matrix, step, copyMatrix) {
  let closest = [];
  const sortMatrix = [...new Set(matrix.flat().map(item => item.amount))].sort(
    (a, b) => a - b,
  );
  const index = sortMatrix.indexOf(number);
  const right = [];
  for (let i = 0; i <= Math.floor(step / 2); i++) {
    right[i] = sortMatrix[index + i];
  }
  const left = [];
  for (let i = 0; i <= Math.ceil(step / 2); i++) {
    left[i] = sortMatrix[index - i];
  }
  const around = [...new Set(left.concat(right))];
  const indexUndefined = around.indexOf(undefined);
  if (indexUndefined !== -1) {
    around.splice(indexUndefined, 1);
  }
  if (event.type === 'mouseenter') {
    copyMatrix = matrix;
    closest = matrix.map(row => {
      return row.map(item => {
        for (let i = 0; i < around.length; i++) {
          if (item.amount === around[i]) {
            item = {
              amount: item.amount,
              size: 30,
            };
          }
        }
        return item;
      });
    });
  } else {
    closest = copyMatrix;
  }
  return [closest, copyMatrix];
}
