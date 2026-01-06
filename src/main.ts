import './style.css'


// // コーディングルール
// // 要素の取得には$でネーミング
// // 他の識別子はキャメルケースを採用

// // 設計
// // ①HTMLの要素を全て取得
// // ②演算子を押す前後の処理を実装
// //   currentValue
// //   previousValue
// //   operator
// //   各ボタンを押した際の処理
// // ③各演算子を押した際の処理を実装
// //   numberに変換


// ディスプレイの要素の取得
const $display = document.querySelector("#display") as HTMLInputElement;

// ボタン要素の取得
const $btn1 = document.querySelector("#btn1") as HTMLButtonElement;
const $btn2 = document.querySelector("#btn2") as HTMLButtonElement;
const $btn3 = document.querySelector("#btn3") as HTMLButtonElement;
const $btn4 = document.querySelector("#btn4") as HTMLButtonElement;
const $btn5 = document.querySelector("#btn5") as HTMLButtonElement;
const $btn6 = document.querySelector("#btn6") as HTMLButtonElement;
const $btn7 = document.querySelector("#btn7") as HTMLButtonElement;
const $btn8 = document.querySelector("#btn8") as HTMLButtonElement;
const $btn9 = document.querySelector("#btn9") as HTMLButtonElement;
const $btn0 = document.querySelector("#btn0") as HTMLButtonElement;

// Cボタン = ボタンの取得
const $btnClear = document.querySelector("#clear") as HTMLButtonElement;
const $btnEqual = document.querySelector("#equal") as HTMLButtonElement;

// 演算子の取得
const $btnMinus = document.querySelector("#minus") as HTMLButtonElement;
const $btnDivide = document.querySelector("#divide") as HTMLButtonElement;
const $btnMultiple = document.querySelector("#multiple") as HTMLButtonElement;
const $btnPlus = document.querySelector("#plus") as HTMLButtonElement;

// 小数点
const $btnDot = document.querySelector("#dot") as HTMLButtonElement;

// 初期値の設定
let currentValue: string = "0"; 
let previousValue: number | null = null;
let operator: string | null = null;
let justCBtn: boolean = false;

// 数字を押したときの処理
function inputNumber(num: string): void {
  const numOnlyLen = currentValue.replace(".", "").replace("-", "");
  if (numOnlyLen.length >= 8) 
    return;
  if (currentValue === "0") {
    currentValue = num; //初めて数字のボタンを押した時は０からそのボタンに変更する
    justCBtn = false;
  } else {
    currentValue += num; //2回目以降は押したボタンを追加していく
  }

  $display.value = currentValue; //表示画面のを入力中にする
}

//各のボタンにイベントを割り当てる
// 例：1を押した※文字列としての1を取得
//※+=の処理を　11 のように実行するため (計算実行前にnumberへ変換は後に記載)

$btn1.addEventListener("click",() => {
  inputNumber("1");
});

$btn2.addEventListener("click",() => {
  inputNumber("2")
});

$btn3.addEventListener("click",() => {
  inputNumber("3")
});

$btn4.addEventListener("click",() => {
  inputNumber("4")
});

$btn5.addEventListener("click",() => {
  inputNumber("5")
});

$btn6.addEventListener("click",() => {
  inputNumber("6")
});

$btn7.addEventListener("click",() => {
  inputNumber("7")
});

$btn8.addEventListener("click",() => {
  inputNumber("8")
});

$btn9.addEventListener("click",() => {
  inputNumber("9")
});

$btn0.addEventListener("click",() => {
  inputNumber("0")
});

//演算処理
// ①previousValueが空白→currentValueを移す
// ②両方ある場合→number型に変換し計算
// ③operatorを更新
// ④currentValueをリセット

function handleOperator(op: string): any {

  if (justCBtn && op !== "-") {
    return;
  }

  if (justCBtn && op === "-") {
    currentValue = "-";
    $display.value = currentValue;
    return;
  }

  if (previousValue === null && currentValue === "0" && op !== "-") {
    return;
  }

  if (previousValue === null && currentValue === "0" && op === "-") {
    currentValue = "-";
    $display.value = currentValue;
    return;
  }

  if (previousValue !== null && currentValue === "0") {
    operator = op;
    return;
  }

    // previousValueが空白ではない　かつ　currentValueが0ではない場合の処理
  if (previousValue !== null && currentValue !== "0") {        // 入力中に文字列としての数字と演算子を押す前の文字列の数字をnumberに変換
    const a = Number(previousValue);
    const b = Number(currentValue);

  //演算子の処理
    if (operator === "+") previousValue = a + b;
    if (operator === "-") previousValue = a - b;
    if (operator === "*") previousValue = a * b;
    if (operator === "/") previousValue = a / b;
  } else {
    previousValue = Number(currentValue);
  }

  operator = op;  //演算子は何かを記録
  currentValue = "0"; //入力中の数字を０にしてリセット
  $display.value = String(previousValue); //計算途中の結果を出す
}

// 演算子イベント
$btnPlus.addEventListener("click", () => {
  handleOperator("+")
});

$btnMinus.addEventListener("click", () => {
  handleOperator("-")
});

$btnMultiple.addEventListener("click", () => {
  handleOperator("*")
});

$btnDivide.addEventListener("click", () => {
  handleOperator("/")
});

// = の処理
$btnEqual.addEventListener("click", () => {

  if (previousValue !== null && operator !== null && currentValue === "0") {
    return;
  }

  if (previousValue !== null && operator !== null) {
    const a = Number(previousValue);
    const b = Number(currentValue);

    if (operator === "/" && b === 0) {
      $display.value = "エラー";
      currentValue = "0";
      previousValue = null;
      operator = null;
      return;
    }

    let result = 0;
    if (operator === "+") result = a + b;
    if (operator === "-") result = a - b;
    if (operator === "*") result = a * b;
    if (operator === "/") result = a / b;

    // 丸め処理
    result = Math.round(result * 1e12) / 1e12;
    
    // 8桁以上の場合は指数表記にする
    const bigIntNum = String(result).replace(".", "").replace("-", "").length;

    if (bigIntNum > 8) {
      const ex = result.toExponential(7);
      $display.value = ex;

      currentValue = String(result);
      previousValue = null;
      operator = null;
      return;
    }

    $display.value = String(result);

    currentValue = String(result);
    previousValue = null;
    operator = null;
  }
});

// C の処理
$btnClear.addEventListener("click", () => {
  currentValue = "0";
  previousValue = null;
  operator = null;
  justCBtn = true;
  $display.value = "0";
});

// 小数点の処理
$btnDot.addEventListener("click",() =>{

    if (justCBtn) {
      return;
    }

    if(currentValue.includes(".")){
      return;
    }

    if (currentValue === "-") {
      return;
    }

  if (!currentValue.includes(".")) {
    currentValue += ".";
    $display.value = currentValue;
  }
});
