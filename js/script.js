fetch('https://quiztai.herokuapp.com/api/quiz')
    .then(resp => resp.json())
    .then(resp => {
        preQuestions = resp;
        setQuestion(index);
        activateAnswers();
    });

let next = document.querySelector('.next');
let previous = document.querySelector('.previous');
let list = document.querySelector('.list');
let question = document.querySelector('.question');
let answers = document.querySelectorAll('.list-group-item');
let numberOfQuestion = document.querySelector('#index');
let pointsElem = document.querySelector('.score');
let restart = document.querySelector('.restart');
let userScorePoint = document.querySelector('.userScorePoint');
let index = 0;
let points = 0;

for (let i = 0; i < answers.length; i++) {
    answers[i].addEventListener('click', doAction);
}

let clearClass = () => {
    for(let i = 0; i < answers.length; i++){
        answers[i].classList.remove('correct');
        answers[i].classList.remove('incorrect');
    }
};

function setQuestion(index){
    clearClass();
    numberOfQuestion.innerHTML = index + 1;
    question.innerHTML = preQuestions[index].question;

    answers[0].innerHTML = preQuestions[index].answers[0];
    answers[1].innerHTML = preQuestions[index].answers[1];
    answers[2].innerHTML = preQuestions[index].answers[2];
    answers[3].innerHTML = preQuestions[index].answers[3];

    if (preQuestions[index].answers.length === 2) {
        answers[2].style.display = 'none';
        answers[3].style.display = 'none';
    } else {
        answers[2].style.display = 'block';
        answers[3].style.display = 'block';
    }


}

function doAction(event) {
    //event.target - Zwraca referencję do elementu, do którego zdarzenie zostało pierwotnie wysłane.
    if (event.target.innerHTML === preQuestions[index].correct_answer) {
        points++;
        pointsElem.innerText = points;
        markCorrect(event.target);
    }
    else {
        markInCorrect(event.target);
    }
    disableAnswers();
}



restart.addEventListener('click', function (event) {
    event.preventDefault();

    index = 0;
    points = 0;
    let userScorePoint = document.querySelector('.score');
    userScorePoint.innerHTML = points;
    setQuestion(index);
    activateAnswers();
    list.style.display = 'block';
    results.style.display = 'none';
});


next.addEventListener('click', function () {
    if(index<19){
        index++;
        setQuestion(index);
        activateAnswers();
    }
 });


    previous.addEventListener('click', function () {
        if(index >=1){
        index--;
        setQuestion(index);
        activateAnswers();
        }
     });
    
function doAction(event) {
    //event.target - Zwraca referencję do elementu, do którego zdarzenie zostało pierwotnie wysłane.
    if (event.target.innerHTML === preQuestions[index].correct_answer) {
        points++;
        pointsElem.innerText = points;
        markCorrect(event.target);
    }
    else {
        markInCorrect(event.target);
    }
    disableAnswers(event.target);
}
function activateAnswers() {
    for (let i = 0; i < answers.length; i++) {
       answers[i].addEventListener('click', doAction);
    }
 }
 activateAnswers();

 function markCorrect(elem) {
    elem.classList.add('correct');
 }

 function markInCorrect(elem) {
    elem.classList.add('Incorrect');
 }

 function disableAnswers(elem) {
    for (let i = 0; i < answers.length; i++) {
        answers[i].removeEventListener('click', doAction);
     }
 }
 function saveScore() {

    if (localStorage.getItem("quizScore") != null) {
        let previousScore = JSON.parse(localStorage.getItem("quizScore"));
        let newScore = {
            "totalPoints": previousScore.totalPoints + points,
            "avgScore": (JSON.parse(localStorage.getItem("quizScore")).totalPoints + points) / (previousScore.numberOfGames + 1),
            "numberOfGames": JSON.parse(localStorage.getItem("quizScore")).numberOfGames + 1
        };
        localStorage.setItem("quizScore", JSON.stringify(newScore));
    } else {
        let newScore = {
            "totalPoints": points,
            "avgScore": points,
            "numberOfGames": 1
        };
        localStorage.setItem("quizScore", JSON.stringify(newScore));
    }
    averageScore.innerText = JSON.parse(localStorage.getItem("quizScore")).avgScore;
}
 