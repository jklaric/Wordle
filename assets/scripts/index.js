const wordList = [
  "mount",
  "thorn",
  "packs",
  "apoxy",
  "table",
  "chair",
  "eager",
  "eagle",
  "faces",
  "kebab",
  "pizza",
  "other",
  "clown",
  "faith",
  "towel",
  "sharp",
  "house",
  "mouse",
  "tanks",
  "entry",
  "about",
  "their",
  "lunch",
];

let word = wordList[Math.floor(Math.random() * wordList.length)];

let guess;

let rowFieldList = [
  document.querySelector("#r1Input"),
  document.querySelector("#r2Input"),
  document.querySelector("#r3Input"),
  document.querySelector("#r4Input"),
  document.querySelector("#r5Input"),
  document.querySelector("#r6Input"),
];

k = 0;

let inputElement = rowFieldList[k];

inputElement.focus();

let firstRow = [
  document.querySelector("#r1t1"),
  document.querySelector("#r1t2"),
  document.querySelector("#r1t3"),
  document.querySelector("#r1t4"),
  document.querySelector("#r1t5"),
];

let secondRow = [
  document.querySelector("#r2t1"),
  document.querySelector("#r2t2"),
  document.querySelector("#r2t3"),
  document.querySelector("#r2t4"),
  document.querySelector("#r2t5"),
];

let thirdRow = [
  document.querySelector("#r3t1"),
  document.querySelector("#r3t2"),
  document.querySelector("#r3t3"),
  document.querySelector("#r3t4"),
  document.querySelector("#r3t5"),
];

let fourthRow = [
  document.querySelector("#r4t1"),
  document.querySelector("#r4t2"),
  document.querySelector("#r4t3"),
  document.querySelector("#r4t4"),
  document.querySelector("#r4t5"),
];

let fifthRow = [
  document.querySelector("#r5t1"),
  document.querySelector("#r5t2"),
  document.querySelector("#r5t3"),
  document.querySelector("#r5t4"),
  document.querySelector("#r5t5"),
];

let sixthRow = [
  document.querySelector("#r6t1"),
  document.querySelector("#r6t2"),
  document.querySelector("#r6t3"),
  document.querySelector("#r6t4"),
  document.querySelector("#r6t5"),
];

let rowList = [firstRow, secondRow, thirdRow, fourthRow, fifthRow, sixthRow];

takeInput();

function takeInput() {
  inputElement.addEventListener("keyup", function (e) {
    if (e.key === "Enter" && inputElement.value.length === 5) {
      guess = inputElement.value;
      checkGuess(guess);
    }
  });
}

function checkGuess(guess) {
  for (let i = 0; i < word.length; i++) {
    if (guess[i] === word[i]) {
      displayCorrect(i);
    } else if (guess[i] != word[i]) {
      for (let j = 0; j < word.length; j++) {
        if (guess[i] === word[j]) {
          displayPresent(i);
        }
      }
    }
  }
  moveToNextRow();
}

function displayCorrect(position) {
  rowList[k][position].style.backgroundColor = "green";
}

function displayPresent(position) {
  rowList[k][position].style.backgroundColor = "#EEEE9B";
}

function moveToNextRow() {
  if (guess === word) {
    document.querySelector(".main__alertbox--text").innerHTML =
      "You win! Congratulations! Press Enter to reset.";
    resetBoard();
  } else if (k != 5) {
    k++;
    inputElement.disabled = true;
    inputElement = rowFieldList[k];
    inputElement.focus();

    takeInput();
  } else {
    document.querySelector(".main__alertbox--text").innerHTML =
      "The word is: " + word + "." + " Press Enter to reset.";
    resetBoard();
  }
}

function resetBoard() {
  inputElement.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
      location.reload();
    }
  });
}
