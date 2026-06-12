# Fizz Buzz プログラム 詳細解説

このドキュメントは、JavaScript を学習する学生向けに、Fizz Buzz プログラムの
仕組みを **1行ずつ** ていねいに解説する資料です。
HTML / CSS / JavaScript の 3 つのファイルがどう連携して動いているのかを理解できるようになることを目標とします。

---

## 目次

1. [このプログラムは何をするの？](#1-このプログラムは何をするの)
2. [ファイル構成と役割分担](#2-ファイル構成と役割分担)
3. [3つのファイルはどうやってつながっているの？](#3-3つのファイルはどうやってつながっているの)
4. [HTML の解説（index.html）](#4-html-の解説indexhtml)
5. [CSS の解説（style.css）](#5-css-の解説stylecss)
6. [JavaScript の解説（app.js）](#6-javascript-の解説appjs)
7. [プログラムが動く流れ（実行の順番）](#7-プログラムが動く流れ実行の順番)
8. [よくあるつまずきポイント](#8-よくあるつまずきポイント)
9. [発展課題（チャレンジ）](#9-発展課題チャレンジ)
10. [用語集](#10-用語集)

---

## 1. このプログラムは何をするの？

「カウント」ボタンを押すたびに数が 1 ずつ増えていき、その数によって表示が変わります。

| 数の条件 | 表示 |
| --- | --- |
| 3 で割り切れる | `Fizz` |
| 5 で割り切れる | `Buzz` |
| 3 でも 5 でも割り切れる（＝15で割り切れる） | `FizzBuzz` |
| どれにも当てはまらない | 数字そのまま |

「リセット」ボタンを押すと、カウントは 0 に戻ります。

実際の表示例（1 から数えていった場合）：

```
1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz, 11, Fizz, 13, 14, FizzBuzz, ...
```

---

## 2. ファイル構成と役割分担

```
OIC2026-FizzBuzz/
├── index.html      … 画面の「骨組み」（どんな部品があるか）
├── css/
│   └── style.css   … 画面の「見た目」（色・大きさ・配置）
└── js/
    └── app.js      … 画面の「動き」（ボタンを押したら何が起こるか）
```

Web ページ作りでは、この **3 つの役割をファイルごとに分ける** のが基本です。

- **HTML = 構造（HyperText Markup Language）** … 文章・ボタン・表示エリアなど「部品」を置く
- **CSS = 見た目（Cascading Style Sheets）** … その部品を「どう見せるか」を決める
- **JavaScript = 動き** … ボタンが押されたときなどに「何をするか」を決める

> 🏠 たとえると…
> HTML は **家の骨組み**、CSS は **壁紙やペンキ**、JavaScript は **電気の配線（スイッチを押すと動く仕組み）** です。

---

## 3. 3つのファイルはどうやってつながっているの？

バラバラの 3 ファイルは、`index.html` の中の **2 行** によってつながっています。

```html
<!-- <head> の中：CSSファイルを読み込む -->
<link rel="stylesheet" href="css/style.css">

<!-- </body> の直前：JavaScriptファイルを読み込む -->
<script src="js/app.js"></script>
```

- `<link>` … CSS を読み込んで「見た目」を適用する
- `<script>` … JavaScript を読み込んで「動き」を適用する

### なぜ `<script>` はページの一番下に書くの？

JavaScript は、HTML の部品（ボタンなど）を操作します。
もし HTML がまだ読み込まれていない段階で JavaScript が動くと、
**「操作したい部品がまだ存在しない」** というエラーになってしまいます。

そこで、`<script>` を **`</body>` の直前** に置くことで、
「先に HTML を全部用意してから JavaScript を動かす」という順番を守っています。

---

## 4. HTML の解説（index.html）

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Fizz Buzz ゲーム</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <main class="container">
    <h1>Fizz Buzz</h1>

    <!-- カウンタ及びFizz Buzzの表示を行うエリア -->
    <div class="display">
      <div class="count-row">
        <span class="label">カウント</span>
        <span id="count" class="count">0</span>
      </div>
      <div class="result-row">
        <span class="label">結果</span>
        <span id="result" class="result">0</span>
      </div>
    </div>

    <!-- 操作ボタン -->
    <div class="buttons">
      <button id="countButton" type="button">カウント</button>
      <button id="resetButton" type="button" class="reset">リセット</button>
    </div>
  </main>

  <script src="js/app.js"></script>
</body>
</html>
```

### 重要なポイント

#### ① `<head>` の中身（画面には表示されない設定）

| タグ | 役割 |
| --- | --- |
| `<meta charset="UTF-8">` | 文字コードの指定。これがないと日本語が文字化けすることがある |
| `<meta name="viewport" ...>` | スマホでも正しい大きさで表示するための設定 |
| `<title>` | ブラウザのタブに表示されるページ名 |

#### ② `id` と `class` の違い

このプログラムを理解するうえで **一番大事なポイント** です。

```html
<span id="count" class="count">0</span>
```

- **`id`（識別名）** … ページ内で **1つだけ** の名札。JavaScript が「この部品」と名指しするために使う
- **`class`（分類名）** … 複数の部品に **同じ名前** を付けられる。主に CSS でまとめてスタイルを当てるために使う

このプログラムでは、JavaScript が操作する部品に `id` を付けています。

| `id` の名前 | どの部品か |
| --- | --- |
| `count` | カウントの **数字** を表示する場所 |
| `result` | Fizz / Buzz などの **結果** を表示する場所 |
| `countButton` | 「カウント」ボタン |
| `resetButton` | 「リセット」ボタン |

#### ③ `<span>` と `<div>` の違い

- `<div>` … 大きな「箱」。中に複数の部品をまとめるのに使う（ブロック要素）
- `<span>` … 文字など小さな範囲を囲むのに使う（インライン要素）

---

## 5. CSS の解説（style.css）

CSS は「**どの部品を、どう見せるか**」を指定します。基本の書き方は次の形です。

```css
セレクタ {
  プロパティ: 値;
}
```

例：

```css
.result {
  font-size: 2.2rem;   /* 文字の大きさ */
  font-weight: bold;   /* 太字にする */
  color: #2c3e50;      /* 文字の色 */
}
```

- **セレクタ** … 「どの部品に」スタイルを当てるかの指定
  - `.result` のように **ドット（.）** で始まると **class** を指す
  - `#count` のように **シャープ（#）** で始まると **id** を指す
- **プロパティ** … 「何を」変えるか（色・大きさなど）
- **値** … 「どう」変えるか

### このプログラムでの CSS の見どころ：色の切り替え

結果に応じて背景色・文字色を変えるため、結果ごとに別々のクラスを用意しています。

```css
/* Fizz のとき：緑色 */
.result.fizz {
  background: #d5f5e3;
  color: #27ae60;
}

/* Buzz のとき：青色 */
.result.buzz {
  background: #d6eaf8;
  color: #2980b9;
}

/* FizzBuzz のとき：オレンジ色 */
.result.fizzbuzz {
  background: #fdebd0;
  color: #e67e22;
}
```

> 🔑 ここがポイント
> `.result.fizz` は「`result` クラス **かつ** `fizz` クラスの両方を持つ部品」という意味です。
> JavaScript が `fizz` クラスを **付けたり外したり** することで、色が切り替わります（詳しくは次章）。

---

## 6. JavaScript の解説（app.js）

ここが「動き」を作る本体です。上から順に解説します。

### 6-1. 部品を JavaScript に取り込む

```js
const countDisplay = document.getElementById("count");
const resultDisplay = document.getElementById("result");
const countButton = document.getElementById("countButton");
const resetButton = document.getElementById("resetButton");
```

- `document` … 今表示している HTML ページ全体を表す特別な存在
- `document.getElementById("count")` … HTML の中から **`id="count"` の部品を探して取ってくる** 命令
- `const countDisplay = ...` … 取ってきた部品に `countDisplay` という名前を付けて、後で使えるようにする

> 💡 `const`（コンスト）は「**後で中身を入れ替えない**」変数を作るキーワードです。
> 部品を入れる箱は途中で別物に差し替えないので `const` を使います。

これで、HTML の部品を JavaScript から **操作できる状態** になりました。

### 6-2. カウンタの数を覚えておく変数

```js
let counter = 0;
```

- `let`（レット）は「**あとで中身を変える**」変数を作るキーワード
- カウントは増えたり 0 に戻ったりするので、`const` ではなく `let` を使います

> 📌 `const` と `let` の使い分け
> - 変わらない → `const`
> - 変わる → `let`

### 6-3. 数から表示文字列を決める関数

```js
function getFizzBuzz(num) {
  if (num % 15 === 0) {
    return "FizzBuzz";
  } else if (num % 3 === 0) {
    return "Fizz";
  } else if (num % 5 === 0) {
    return "Buzz";
  } else {
    return String(num);
  }
}
```

- `function getFizzBuzz(num) { ... }` … `getFizzBuzz` という **関数（処理のかたまり）** を定義
- `num` … 関数に渡される数字（**引数** という）
- `return` … 結果を「呼び出した側に返す」キーワード

#### `%`（剰余演算子）とは？

`%` は **割り算の「余り」** を求める記号です。

| 式 | 計算 | 結果 |
| --- | --- | --- |
| `9 % 3` | 9 ÷ 3 = 3 余り **0** | `0` |
| `10 % 3` | 10 ÷ 3 = 3 余り **1** | `1` |
| `10 % 5` | 10 ÷ 5 = 2 余り **0** | `0` |

つまり **「余りが 0 ＝ 割り切れる」** ということ。
`num % 3 === 0` は「num は 3 で割り切れる」という意味になります。

> ⚠️ `=` と `===` の違い
> - `=`（イコール1つ）… 「代入」＝箱に値を入れる
> - `===`（イコール3つ）… 「比較」＝左右が等しいか調べる（true / false を返す）
> 条件判定では必ず `===` を使います。

#### なぜ「15」を一番先に判定するの？（最重要ポイント）

`if ... else if ...` は **上から順にチェックし、最初に当てはまったものだけを実行** します。

もし「3」を先に判定してしまうと、`15` は 3 でも割り切れるので
**`Fizz` だと判定された時点で終了** してしまい、`FizzBuzz` にたどり着けません。

そのため「両方で割り切れる（= 15 で割り切れる）」という **一番きびしい条件を先に** 書く必要があります。

```
15 を判定する流れ：
  15 % 15 === 0 ？ → はい！ → "FizzBuzz" を返して終了 ✅
```

### 6-4. 画面に表示を反映する関数

```js
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
```

#### `textContent` … 部品の中の文字を書き換える

```js
countDisplay.textContent = counter;
```

これは「`countDisplay`（id=count の部品）の表示文字を `counter` の値にする」という意味です。
これによって **画面の数字が実際に書き換わります**。

#### `classList` … クラスを付けたり外したりする

色を切り替えるための仕組みです。

- `resultDisplay.classList.remove("fizz", "buzz", "fizzbuzz")`
  … まず **古い色のクラスを全部外す**（前回の色を消す）
- `resultDisplay.classList.add("fizzbuzz")`
  … 今回の結果に合った **色のクラスを付ける**

> 🎨 なぜ毎回 remove してから add するの？
> もし remove を忘れると、前回の `fizz` が残ったまま `buzz` も追加され、
> 色がおかしくなってしまいます。「**いったん全部消してから付け直す**」のが安全です。

### 6-5. ボタンが押されたときの処理（イベント）

```js
// カウントボタン
countButton.addEventListener("click", function () {
  counter++;
  updateDisplay();
});

// リセットボタン
resetButton.addEventListener("click", function () {
  counter = 0;
  updateDisplay();
});
```

- `addEventListener("click", ...)` … 「**クリックされたら、この処理をしてね**」と登録する命令
- `function () { ... }` … クリックされたときに実行される処理のかたまり

#### カウントボタンの中身

- `counter++` … `counter` の値を **1 増やす**（`counter = counter + 1` の短い書き方）
- `updateDisplay()` … 増えた値を画面に反映する

#### リセットボタンの中身

- `counter = 0` … カウントを **0 に戻す**
- `updateDisplay()` … 0 を画面に反映する

> 💡 「値を変える」だけでは画面は変わりません。
> 値を変えたあとに **必ず `updateDisplay()` を呼んで画面に反映** しているのがポイントです。

### 6-6. 最初の表示

```js
updateDisplay();
```

ページを開いた瞬間に 1 回だけ実行され、初期状態（カウント 0）を画面に表示します。
これがないと、最初の画面が空っぽに見えてしまいます。

---

## 7. プログラムが動く流れ（実行の順番）

「カウント」ボタンを押してから画面が変わるまでの流れを追ってみましょう。
（例：カウントが 14 のときにボタンを押した場合）

```
① ユーザーが「カウント」ボタンをクリック
        ↓
② addEventListener に登録した処理が動き出す
        ↓
③ counter++         → counter が 14 から 15 になる
        ↓
④ updateDisplay()   が呼ばれる
        ↓
⑤ getFizzBuzz(15)   → 15 % 15 === 0 なので "FizzBuzz" を返す
        ↓
⑥ countDisplay.textContent = 15      → 画面のカウントが「15」に
   resultDisplay.textContent = "FizzBuzz" → 画面の結果が「FizzBuzz」に
        ↓
⑦ classList で古い色を外し、"fizzbuzz" クラスを付ける → 背景がオレンジに
        ↓
⑧ 画面に「カウント：15 / 結果：FizzBuzz（オレンジ）」が表示される 🎉
```

---

## 8. よくあるつまずきポイント

| 症状 | 原因 | 対処 |
| --- | --- | --- |
| ボタンを押しても何も起こらない | `id` のスペルが HTML と JS で違う | `getElementById` の文字列と HTML の `id` を見比べる |
| `null` というエラーが出る | HTML より先に JS が動いてしまった | `<script>` が `</body>` の直前にあるか確認 |
| 日本語が文字化けする | 文字コードの指定がない | `<meta charset="UTF-8">` があるか確認 |
| 15 が `Fizz` になってしまう | 3 の判定を 15 より先に書いている | `% 15` の判定を一番上に書く |
| 色が前のまま残る／重なる | `classList.remove` を忘れている | 色を付ける前に古いクラスを外す |
| `console` でエラーを確認したい | — | ブラウザで **F12 キー** → 「Console」タブを見る |

---

## 9. 発展課題（チャレンジ）

理解が深まったら、次の改造に挑戦してみましょう。

1. **マイナスボタンを追加する**
   カウントを 1 減らす「戻る」ボタンを作ってみよう。（ヒント：`counter--`）
   ※ 0 より下に行かないように工夫してみよう。

2. **キーボードで操作できるようにする**
   Enter キーを押したらカウントが進むようにしてみよう。（ヒント：`addEventListener("keydown", ...)`）

3. **数字を 7 で割り切れるときは "Pop" にする**
   条件を 1 つ増やして、自分だけのルールを追加してみよう。

4. **連続して数えた履歴を一覧表示する**
   これまでの結果を下にリストで並べてみよう。（ヒント：`document.createElement`）

5. **ボタンを押さなくても自動でカウントアップ**
   一定時間ごとに自動で進むようにしてみよう。（ヒント：`setInterval`）

---

## 10. 用語集

| 用語 | 読み | 意味 |
| --- | --- | --- |
| DOM | ドム | ブラウザが HTML を部品の集まりとして扱う仕組み。JS から操作できる |
| 要素（element） | ようそ | `<button>` や `<div>` など、HTML の 1 つ 1 つの部品 |
| 変数 | へんすう | 値を入れておく「名前付きの箱」 |
| `const` / `let` | コンスト / レット | 変数を作るキーワード。const は変えない、let は変える |
| 関数（function） | かんすう | まとまった処理に名前を付けたもの。何度でも呼び出せる |
| 引数（ひきすう） | ひきすう | 関数に渡す値（例：`getFizzBuzz(15)` の `15`） |
| 戻り値（return） | もどりち | 関数が処理の結果として返す値 |
| イベント | — | クリックやキー入力など、ユーザーの操作のこと |
| イベントリスナー | — | 「○○されたら△△する」を登録する仕組み |
| 剰余演算子 `%` | じょうよ | 割り算の余りを求める記号 |

---

### 関連ファイル

- [index.html](../index.html) … 画面の構造
- [css/style.css](../css/style.css) … 見た目
- [js/app.js](../js/app.js) … 動き
- [README.md](../README.md) … 課題の説明

**まずはコードを実際に書き換えて、動きがどう変わるか試してみるのが一番の近道です。がんばってください！**
