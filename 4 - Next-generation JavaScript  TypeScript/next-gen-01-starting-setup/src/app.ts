const person = {
  x: 12,
  y: 45,
};

const { x: override, y } = person;
console.log(override);
console.log(y);
