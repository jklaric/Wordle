function takeInput() {
  inputElement.oninput = function () {
    if (isChecking) return;

    inputElement.value = inputElement.value.replace(/[^a-z]/gi, "").slice(0, 5);
    updateTiles();
  };

  inputElement.onkeyup = function (e) {
    if (isChecking) return;

    if (e.key === "Enter" && inputElement.value.length === 5) {
      guess = inputElement.value.toLowerCase().trim();

      if (!validWordSet.has(guess)) {
        showToast("Not in word list");
        inputElement.value = "";
        updateTiles();
        focusInput();
        return;
      }

      isChecking = true;
      checkGuess(guess);
    }
  };
}

function showToast(message) {
  const alertBox = document.querySelector(".main__alertbox");
  const alertText = document.querySelector(".main__alertbox--text");

  alertText.textContent = message;

  alertBox.classList.remove("show");
  void alertBox.offsetWidth; // restart animation
  alertBox.classList.add("show");

  clearTimeout(showToast.timeout);
  showToast.timeout = setTimeout(() => {
    alertBox.classList.remove("show");
    alertText.textContent = "";
  }, 1200);
}

function updateTiles() {
  const value = inputElement.value.toUpperCase();

  for (let i = 0; i < 5; i++) {
    const tile = rowList[k][i];
    const letter = value[i] || "";

    if (tile.textContent !== letter) {
      tile.textContent = letter;

      if (letter) {
        tile.classList.add("pop");
        setTimeout(() => tile.classList.remove("pop"), 100);
      }
    }
  }
}

function checkGuess(guess) {
  if (!guess || guess.length !== 5) {
    isChecking = false;
    return;
  }
  const letterCount = {};

  for (let i = 0; i < word.length; i++) {
    const letter = word[i];
    letterCount[letter] = (letterCount[letter] || 0) + 1;
  }

  const result = new Array(word.length).fill("absent");

  for (let i = 0; i < word.length; i++) {
    if (guess[i] === word[i]) {
      result[i] = "correct";
      letterCount[guess[i]]--;
    }
  }

  for (let i = 0; i < word.length; i++) {
    if (result[i] === "correct") continue;

    if (letterCount[guess[i]] > 0) {
      result[i] = "present";
      letterCount[guess[i]]--;
    }
  }

  displayResult(result);

  setTimeout(
    () => {
      moveToNextRow();
    },
    result.length * 300 + 200,
  );
}

function displayResult(result) {
  for (let i = 0; i < result.length; i++) {
    const tile = rowList[k][i];

    setTimeout(() => {
      tile.classList.add("flip");

      setTimeout(() => {
        tile.classList.remove("flip");
        tile.classList.add(result[i]);
        updateKeyboard(guess[i], result[i]);
      }, 150);
    }, i * 300);
  }
}

function displayCorrect(position) {
  rowList[k][position].style.backgroundColor = "green";
}

function displayPresent(position) {
  rowList[k][position].style.backgroundColor = "#EEEE9B";
}

function displayAbsent(position) {
  rowList[k][position].style.backgroundColor = "#787C7E";
}

function moveToNextRow() {
  if (guess === word) {
    inputElement.disabled = true;
    inputElement.onkeyup = null;
    inputElement.oninput = null;

    showToast("Correct! Press Enter for next word.");

    isChecking = false;
    nextWord();
  } else if (k !== 5) {
    inputElement.disabled = true;
    inputElement.onkeyup = null;
    inputElement.oninput = null;

    k++;
    inputElement = rowFieldList[k];
    inputElement.disabled = false;
    inputElement.focus();

    isChecking = false;
    takeInput();
  } else {
    inputElement.disabled = true;
    inputElement.onkeyup = null;
    inputElement.oninput = null;

    showToast("The word was: " + word + ". Press Enter for next word.");

    isChecking = false;
    nextWord();
  }
}

function focusInput() {
  setTimeout(() => {
    inputElement.focus();
    inputElement.setSelectionRange(
      inputElement.value.length,
      inputElement.value.length,
    );
  }, 0);
}

function nextWord() {
  document.onkeyup = function (e) {
    if (e.key === "Enter") {
      wordIndex++;

      if (wordIndex >= wordList.length) {
        showToast("Done! You've completed all words 🎉");
        return;
      }

      resetGame();
    }
  };
}

function resetGame() {
  document.onkeyup = null;
  guess = "";
  isChecking = false;

  for (let i = 0; i < rowList.length; i++) {
    for (let j = 0; j < 5; j++) {
      const tile = rowList[i][j];
      tile.textContent = "";
      tile.className = "main__board--row--tile";
    }
  }

  rowFieldList.forEach((input, index) => {
    input.value = "";
    input.disabled = index !== 0;
    input.onkeyup = null;
    input.oninput = null;
  });

  document.querySelectorAll(".key").forEach((key) => {
    key.classList.remove("correct", "present", "absent");
  });

  k = 0;
  word = wordList[wordIndex];

  inputElement = rowFieldList[k];
  inputElement.disabled = false;
  inputElement.focus();

  document.querySelector(".main__alertbox").classList.remove("show");
  document.querySelector(".main__alertbox--text").textContent = "";

  takeInput();
}

function resetBoard() {
  document.onkeyup = function (e) {
    if (e.key === "Enter") {
      location.reload();
    }
  };
}

function updateKeyboard(letter, state) {
  const keys = document.querySelectorAll(".key");

  keys.forEach((key) => {
    if (key.textContent.toLowerCase() === letter) {
      if (state === "correct") {
        key.classList.remove("present", "absent");
        key.classList.add("correct");
      } else if (state === "present" && !key.classList.contains("correct")) {
        key.classList.add("present");
      } else if (
        !key.classList.contains("correct") &&
        !key.classList.contains("present")
      ) {
        key.classList.add("absent");
      }
    }
  });
}

document.querySelectorAll(".main__board--row").forEach((row) => {
  row.addEventListener("click", () => {
    inputElement.focus();
    inputElement.setSelectionRange(
      inputElement.value.length,
      inputElement.value.length,
    );
  });
});

document.querySelectorAll(".key").forEach((key) => {
  key.addEventListener("click", () => {
    if (isChecking) return;

    if (key.classList.contains("enter")) {
      inputElement.dispatchEvent(new KeyboardEvent("keyup", { key: "Enter" }));
      focusInput();
      return;
    }

    if (key.classList.contains("back")) {
      inputElement.value = inputElement.value.slice(0, -1);
      updateTiles();
      focusInput();
      return;
    }

    if (inputElement.value.length < 5) {
      inputElement.value += key.textContent.toLowerCase();
      updateTiles();
    }

    focusInput();
  });
});
