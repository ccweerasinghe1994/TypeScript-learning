const addArrow = (a: number = 2, b: number): number => a + b;

const printValue: (a: string | number) => void = (value) => console.log(value);

const button = document.querySelector('button');

button?.addEventListener('click', () => {
  console.log('clicked');
});

addArrow(1);
