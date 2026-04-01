let wordIndex = 0;
let word = wordList[wordIndex];

let guess = "";
let k = 0;
let isChecking = false;

const validWordSet = new Set(validWords);

rowFieldList.forEach((input, index) => {
  input.disabled = index !== 0;
});

let inputElement = rowFieldList[k];
inputElement.disabled = false;
inputElement.focus();

takeInput();
