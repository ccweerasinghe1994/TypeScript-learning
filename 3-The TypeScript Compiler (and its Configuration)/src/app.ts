const button = document.querySelector('button');

function add(num: number, num2: number) {
  if (num > num2) {
    return num + num2;
  }
  return;
}

function handleClick(message: string) {
  console.log('clicked -------->' + message);
}

if (button) {
  button.addEventListener('click', handleClick.bind(null, 'abc', 12));
}
