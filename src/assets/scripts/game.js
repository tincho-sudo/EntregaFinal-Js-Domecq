let state = 0;
let points = 0;
const chk1 = document.getElementById("op1");
const chk2 = document.getElementById("op2");
const chk3 = document.getElementById("op3");
let questionArray = [];
let answers = [];
let leaderArray = [];
const playerName = document.getElementById("inputName");
const btnNext = document.getElementById("btnNext");
const audio = new Audio("./assets/resources/correctAns.mp3");
const btnSetName = document.getElementById("btnSetName");
const btnClearData = document.getElementById("btnClearData");
const leaderboard = document.getElementById("leaderboard");


if (localStorage.getItem("name")) {
  getPlayerData();
}
fillMap().then(() => getQuestions(state)).then(() => getLeaderboard(false));

console.log(audio);

// 
// Load leaderboard from server db
//
async function getLeaderboard(newScore) {
  if (!newScore) {
    const url = "http://127.0.0.1:4000/leaders/";
    await fetch(url, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json()).then(leaders => leaderArray.push(leaders));
    for (l = 0; l < leaderArray[0].length; l++) {
      leaderboard.textContent = leaderboard.textContent + ' Name: ' + leaderArray[0][l]['name'] + ' - Score: ' + leaderArray[0][l]['score'] + ' || ';
    }
  } else {
    if (playerName.value != "")
      await fetch('http://127.0.0.1:4000/leaders/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "name": playerName.value, "score": points })
      })
        .then(response => response.json());


    window.location.reload();
  }
}


//
// Get player data from cache, check for possible hijacking chars
//
function getPlayerData() {
  if (localStorage.getItem("name")) {
    if (
      playerName.value == "") {

      playerName.value = localStorage.getItem("name");
    }
    if (points == 0) {
      if (playerName.value == localStorage.getItem("name"))
        document.getElementById("score").textContent = localStorage.getItem("score");
    }
  }
}

//
// Get questions from server and save to an array
//
async function fillMap() {

  const url = "http://127.0.0.1:4000/questions/";
  await fetch(url, {
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json()).then(questions => questionArray.push(questions));
}

//
//  Sets the question to the first question of the array, then sets the question to the one located at index = state from our questions
//
function getQuestions(state) {
  console.log(JSON.stringify(questionArray));
  console.log(state);
  if (state < questionArray[0].length) {
    document.getElementById("question").textContent = questionArray[0][state]['q'];
    fillOptions(state);
  } else {
    console.log("Good job!. Your final score: " + points);
    console.log("Final answers: ");

    answers.forEach((element, index) => {
      console.log(`${index} - ${element}`);

    });
  }
}

//
//  Decides where the correct answer is located (random between
//  first and third so every game feels a bit different)
//
function fillOptions() {
  switch (Math.floor(Math.random() * 3) + 1) {
    case 1: {
      document.getElementById("opLbl1").textContent = questionArray[0][state]['a'];
      getMoreOptions(2, 3);
      break;
    }
    case 2: {
      document.getElementById("opLbl2").textContent = questionArray[0][state]['a'];
      getMoreOptions(1, 3);
      break;
    }
    case 3: {
      document.getElementById("opLbl3").textContent = questionArray[0][state]['a'];
      getMoreOptions(1, 2);
      break;
    }
  }
}

//
//  Adds 2 extra options so the user can choose
//
function getMoreOptions(slot1, slot2) {
  const option1 = document.getElementById("opLbl" + slot1);
  const option2 = document.getElementById("opLbl" + slot2);

  switch (state) {
    case 0: {
      option1.textContent = "Santa Fe";
      option2.textContent = "Buenos Aires";
      break;
    }
    case 1: {
      option1.textContent = "Europa";
      option2.textContent = "Africa";
      break;
    }
    case 2: {
      option1.textContent = "1937";
      option2.textContent = "1939";
      break;
    }
    case 3: {
      option1.textContent = "3";
      option2.textContent = "0";
      break;
    }
    case 4: {
      option1.textContent = "USN. Enterprise";
      option2.textContent = "USN. Yorktown";
      break;
    }
    case 5: {
      option1.textContent = "Mexico";
      option2.textContent = "Uruguay";
      break;
    }
    case 6: {
      option1.textContent = "China";
      option2.textContent = "Canada";
      break;
    }
    case 7: {
      option1.textContent = "1943";
      option2.textContent = "1944";
      break;
    }
    case 8: {
      option1.textContent = "George R.R. Martin";
      option2.textContent = "Arthur Conan Doyle";
      break;
    }
    case 9: {
      option1.textContent = "1786";
      option2.textContent = "1754";
      break;
    }
    case 10: {
      option1.textContent = "7";
      option2.textContent = "3";
      break;
    }
    case 11: {
      option1.textContent = "Bigger than Hagrid";
      option2.textContent = "Dragon Sized";
      break;
    }
    case 12: {
      option1.textContent = "1968";
      option2.textContent = "1967";
      break;
    }
    case 13: {
      option1.textContent = "1947-1949";
      option2.textContent = "1889-1991";
      break;
    }
    case 14: {
      option1.textContent = "0";
      option2.textContent = "3";
      break;
    }
  }
}

//
//  Button event listener, validates the answer and adds points
//
//  Doing any type of mathematical operation seems like a requirement, so.. points+=10 sould be enough to think its done..
//
btnNext.addEventListener("click", () => {
  if (state < questionArray[0].length) {
    if (chk1.checked) {
      if (getOptions(1) == questionArray[0][state]['a']) {
        points += 10;
        document.getElementById("score").textContent = points;
        localStorage.setItem("score", document.getElementById("score").textContent);
        Beep();
      }
      // Using Arrays is a requirement, so lets just store all answers there either be wrong or right ones
      answers.push(document.getElementById("opLbl1").textContent);
    } else if (chk2.checked) {
      if (getOptions(2) == questionArray[0][state]['a']) {
        points += 10;
        document.getElementById("score").textContent = points;

        localStorage.setItem("score", document.getElementById("score").textContent);
        Beep();
      }
      // Using Arrays is a requirement, so lets just store all answers there either be wrong or right ones
      answers.push(document.getElementById("opLbl2").textContent);
    } else if (chk3.checked) {
      if (getOptions(3) == questionArray[0][state]['a']) {
        points += 10;
        document.getElementById("score").textContent = points;

        localStorage.setItem("score", document.getElementById("score").textContent);
        Beep();
      }
      answers.push(document.getElementById("opLbl3").textContent);
    } else {
      wrongAnswer();
      // Actually its just a "game over" or no radial selected button. it
      // wont turn red even if your answer is wrong because
      // i would then need reset its color on next question, and that next
      // question wouldnt give enough FPS for a human to be capable
      // to distinguish the color change.. so its red only on game over or no radial selected :)
    }
    if (chk1.checked || chk2.checked || chk3.checked) {
      // Next code line is just a requirement.. i HAVE to code a console.log()
      console.log("Wohoo. Next question incoming!. Current points: " + points);
      resetButton();
      state++;
      getQuestions(state);
    }
  } else {
    wrongAnswer();
    // Actually its just a "game over" or no radial selected button. it
    // wont turn red even if your answer is wrong because
    // i would then need reset its color on next question, and that next
    // question wouldnt give enough FPS for a human to be capable
    // to distinguish the color change.. so its red only on game over or no radial selected :)

    // send user data to leaderboard on game over if a name was set.
    getLeaderboard(true).then(() => resetLeaderboard());

    console.log("Answers --> " + answers);
  }
});

btnSetName.addEventListener("click", () => {

  if (
    playerName.value != "" &&
    !playerName.value.includes("<") &&
    !playerName.value.includes(">") &&
    !playerName.value.includes(";")

  )

    localStorage.setItem("name", playerName.value);

});

btnClearData.addEventListener("click", () => {

  localStorage.clear();
  points = 0;
  state = 0;
  document.getElementById("score").textContent = points;
  playerName.value = "";
  window.location.reload();
});

//
//  Resets radials and button color on next question
//
function resetButton() {
  btnNext.style.backgroundColor = "#ffff";
  btnNext.style.color = "#000000";
  chk1.checked = false;
  chk2.checked = false;
  chk3.checked = false;
}

//
// Sets button color on bad answer or no radial selected
//
function wrongAnswer() {
  btnNext.style.backgroundColor = "#ff0000";
  btnNext.style.color = "#ffff";
}

//
//  Returns selected answer text
//
function getOptions(optionNumber) {
  const option = document.getElementById("opLbl" + optionNumber).textContent;
  return option;
}

//
// Plays a sound on correct answer
//
function Beep() {
  audio.play();
}
