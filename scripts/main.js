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
