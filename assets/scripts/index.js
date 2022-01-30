const wordList = ["mount", "thorn", "packs", "apoxy", "table", "chair"];

let word = wordList[Math.floor(Math.random() * wordList.length)];

let inputElement = document.querySelector("#r1Input");

console.log(word);

inputElement.addEventListener("keyup", function (e) {
  if (e.key === "Enter" && inputElement.value.length === 5) {
    console.log(inputElement.value);
    checkGuess(inputElement.value);
  }
});

function checkGuess(guess) {
  for (let i = 0; i < word.length; i++) {
    if (guess[i] === word[i]) {
      displayCorrect(i);
    } else if (guess[i] != word[i]) {
      for (let letter in word) {
        if (guess[i] === letter) {
          displayPresent(i);
        }
      }
    }
  }
}

function displayCorrect(position) {}

function displayPresent(position) {
  console.log("present");
}
