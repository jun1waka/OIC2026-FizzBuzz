// Fizz Buzz プログラム

// DOM要素を取得
const countDisplay = document.getElementById("count");
const resultDisplay = document.getElementById("result");
const countButton = document.getElementById("countButton");
const resetButton = document.getElementById("resetButton");

// カウンタの初期値
let counter = 0;

/**
 * 数値からFizz Buzzの判定結果を返す
 * @param {number} num 判定する数値
 * @returns {string} 表示する文字列
 */
function getFizzBuzz(num) {
  if (num % 15 === 0) {
    return "FizzBuzz"; // 3と5の両方で割り切れる
  } else if (num % 3 === 0) {
    return "Fizz"; // 3で割り切れる
  } else if (num % 5 === 0) {
    return "Buzz"; // 5で割り切れる
  } else {
    return String(num); // 条件に当てはまらない場合は数字をそのまま
  }
}

/**
 * 現在のカウンタ値を画面に反映する
 */
function updateDisplay() {
  const result = getFizzBuzz(counter);

  // カウントの数値と判定結果をそれぞれ表示
  countDisplay.textContent = counter;
  resultDisplay.textContent = result;

  // 結果の種類に応じてスタイルを切り替える
  resultDisplay.classList.remove("fizz", "buzz", "fizzbuzz");
  if (result === "FizzBuzz") {
    resultDisplay.classList.add("fizzbuzz");
  } else if (result === "Fizz") {
    resultDisplay.classList.add("fizz");
  } else if (result === "Buzz") {
    resultDisplay.classList.add("buzz");
  }
}

// カウントボタン: カウンタを1進めて表示を更新
countButton.addEventListener("click", function () {
  counter++;
  updateDisplay();
});

// リセットボタン: カウンタを0に戻して表示を更新
resetButton.addEventListener("click", function () {
  counter = 0;
  updateDisplay();
});

// 初期表示
updateDisplay();
