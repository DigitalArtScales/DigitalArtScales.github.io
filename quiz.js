"use strict";

var questions = [
  {
    question: "1...",
    answer: 0,
    type: "default",
    valuesYes: [{ axis: "c0", value: 3 }],
    valuesNo:  [{ axis: "c1", value: 3 }]
  },
  {
    question: "2...",
    answer: 0,
    type: "bothoptions",
    valuesYes: [{ axis: "c0", value: 3 }],
    valuesNo:  [{ axis: "c1", value: 3 }]
  },
  {
    question: "3...",
    answer: 0,
    type: "default",
    valuesYes: [{ axis: "c0", value: 3 }, { axis: "b0", value: 3 }],
    valuesNo:  [{ axis: "c1", value: 3 }, { axis: "b1", value: 3 }]
  },
  {
    question: "4...",
    answer: 0,
    type: "testoption",
    valuesYes: [{ axis: "j0", value: 3 }],
    valuesNo:  [{ axis: "j1", value: 3 }]
  }
];

var qn = 0; // Question number
var prev_answer = null;

function shuffle(array) {
  var i = 0,
    j = 0,
    temp = null;

  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}
shuffle(questions);

init_question();

function init_question() {
  const currentQuestion = questions[qn];
  document.getElementById("question-text").innerHTML = questions[qn].question;
  document.getElementById(
    "question-number"
  ).innerHTML = "Вопрос %num% из %sum%"
    .replace("%num%", qn + 1)
    .replace("%sum%", questions.length);

  const optionsContainer = document.getElementById("question-options");
  optionsContainer.innerHTML = "";

  if (currentQuestion.type === "bothoptions") {
    optionsContainer.innerHTML = `
      <button class="button" onclick="next_question(1)" style="background-color: #1b5e20;">Всегда</button> <br>
      <button class="button" onclick="next_question(2/3)" style="background-color: #4caf50;">Часто</button> <br>
      <button class="button" onclick="next_question(0)" style="background-color: #bbbbbb;">Иногда</button> <br>
      <button class="button" onclick="next_question(-2/3)" style="background-color: #f44336;">Редко</button> <br>
      <button class="button" onclick="next_question(-1)" style="background-color: #b71c1c;">Никогда</button>`;
    } 
  else if (currentQuestion.type === "testoption") {
    optionsContainer.innerHTML = `
      <button class="button" onclick="next_question(1)" style="background-color: #4e9dba;">Первая кнопка</button> <br>
      <button class="button" onclick="next_question(-1)" style="background-color: #af4b7a;">Вторая кнопка</button> <br>
      <button class="button" onclick="next_question(0)" style="background-color: #bbbbbb;">Никакая из этих</button>`;
    } 
  else {
    optionsContainer.innerHTML = `
      <button class="button" onclick="next_question(1)" style="background-color: #1b5e20;">Полностью согласен</button> <br>
      <button class="button" onclick="next_question(2/3)" style="background-color: #4caf50;">Скорее согласен</button> <br>
      <button class="button" onclick="next_question(0)" style="background-color: #bbbbbb;">Не знаю/Не уверен</button> <br>
      <button class="button" onclick="next_question(-2/3)" style="background-color: #f44336;">Скорее не согласен</button> <br>
      <button class="button" onclick="next_question(-1)" style="background-color: #b71c1c;">Абсолютно не согласен</button>`;
  }
  
  if (qn == 0) {
    document.getElementById("back_button").style.display = "none";
    document.getElementById("back_button_off").style.display = "block";
  } else {
    document.getElementById("back_button").style.display = "block";
    document.getElementById("back_button_off").style.display = "none";
  }
}

function next_question(mult) {
  questions[qn].answer = mult;
  qn++;

  if (qn < questions.length) {
    init_question();
  } else {
    results();
  }
}
function prev_question() {
  if (qn == 0) {
    return;
  }
  qn--;
  init_question();
}

function calc_score(score, max_value) {
  return ((100 * score) / max_value).toFixed(0);
}

function results() {
  var axes = {};

  for (var i = 0; i < questions.length; i++) {
    var q = questions[i];

    for (var j = 0; j < q.valuesYes.length; j++) {
      var a = q.valuesYes[j];
      if (!(a.axis in axes)) {
        axes[a.axis] = {
          val: 0,
          sum: 0
        };
      }

      if (q.answer > 0) {
        axes[a.axis].val += q.answer * a.value;
      }
      axes[a.axis].sum += Math.max(a.value, 0);
    }

    for (var j = 0; j < q.valuesNo.length; j++) {
      var a = q.valuesNo[j];
      if (!(a.axis in axes)) {
        axes[a.axis] = {
          val: 0,
          sum: 0
        };
      }

      if (q.answer < 0) {
        axes[a.axis].val -= q.answer * a.value;
      }
      axes[a.axis].sum += Math.max(a.value, 0);
    }
  }

  var url = "";
  for (var aK in axes) {
    if (axes[aK].val > 0) {
      if (url != "") url += "&";
      url += aK + "=" + calc_score(axes[aK].val, axes[aK].sum);
    }
  }
  url = window.btoa(url);
  url = "/results/?" + url;

  location.href = url;
}
