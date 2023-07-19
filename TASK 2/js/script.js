//& Setting some global variable 
const currQue = document.getElementsByClassName('current-q');
const totalQue = document.getElementsByClassName('total');
const options = document.getElementsByClassName('opt-value');
const question = document.getElementsByClassName('query1');
const category = document.getElementsByClassName('category');
let correctAnswer = "", currentScore = 0, currentQuestion = 1, totalQueries = 5, selectedAnswer = '', answers = [];

document.addEventListener('DOMContentLoaded', () => {
    fetchQuestion();
});

//& Loading 
function loading(){
    setTimeout(() => {
        document.getElementById("loader").style.visibility = "hidden";
        document.getElementById("que-container").style.visibility = "visible";
        document.getElementById('extra-opt').style.visibility = 'visible';
    }, 1800);
} 

//& Fetch questions from api 
async function fetchQuestion() {
    const url = 'https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple';
    const result = await fetch(url);
    loading();
    const data = await result.json();
    showQuestion(data.results[0]);
}

//& Display questions 
function showQuestion(data) {

    totalQue[0].textContent = totalQueries;
    currQue[0].textContent = currentQuestion;
    // currQue += 1;
    correctAnswer = data.correct_answer;
    answers[currentQuestion] = correctAnswer;
    let incorrectAnswer = data.incorrect_answers;
    let optionList = incorrectAnswer;
    optionList.splice(Math.floor(Math.random() * (incorrectAnswer.length + 1)), 0, correctAnswer);
    
    question[0].innerHTML = `${currentQuestion}. <span>${data.question}</span>`;
    category[0].innerHTML = `Category : [ ${data.category} ]`;
    
    for (let i = 0; i < optionList.length; i++) {
        options[i].innerHTML = `${optionList[i]}`;
    }

    let inputs = document.querySelectorAll('.answers');
    for (let i = 0; i < optionList.length; i++) {
        inputs[i].checked = false;
    }
    selectOption();
}

//& Select the option for answer 
function selectOption() {
    let checkBtn = document.getElementById('check-btn');
    let check = document.getElementById('check-answer');
    let greet = document.getElementById('greet-msg');
    let greetElement = document.getElementById('greet');
    
    check.innerHTML = '<p class="check">Select Answer to check</p>';
    
    document.querySelectorAll(".value").forEach((option) => {
        option.addEventListener('click', () => {
            selectedAnswer = option.querySelector('span').innerHTML;
            checkBtn.classList.remove('disable');
            checkBtn.removeAttribute('disabled');
            let inputs =  document.querySelectorAll("input")
            inputs.forEach((input) => {
                input.removeAttribute('disabled');
            })
        })
    })
    
    if (currentQuestion < 5) {
        checkBtn.onclick = () => { checkAnswer() };
    } else {
        checkBtn.innerHTML = "Submit";
        checkBtn.onclick = () => {
            setTimeout(() => {
                document.getElementById('check').style.display = 'none';
                document.getElementById('question').style.display = 'none';
                document.getElementById('extra-opt').style.visibility = 'hidden';
                document.getElementById('reset').style.display = 'block';
                document.getElementById('result').style.display = 'block';
                
                let img = document.createElement('img');
                if (currentScore >= 30) {
                    img.src = "/Images/happy.png";
                    img.id = 'expre';
                    greet.innerHTML = `<p><b>Congratulations!!</b><br> You passed the test</p></p>`;
                    greetElement.appendChild(img);
                } else {
                    img.src = "/Images/sad.png";
                    img.id = 'expre';
                    greet.innerHTML = `<p><b>You haven't cleared the test!!</b><br>Let's try again</p></p>`;
                    greetElement.appendChild(img);
                }
                document.getElementById('achieved').innerHTML = `Score : ${currentScore}`
                document.getElementById('reset-btn').onclick = () =>{ 
                    restartQuiz()
                };
            }, 1200);
            checkAnswer();
        };
    }
    
}

//& Check answer is correct or not 
function checkAnswer() {
    let check = document.getElementById('check-answer');
    var checkBtn = document.getElementById('check-btn');

    if (selectedAnswer == correctAnswer) {
        currentScore += 10;
        check.innerHTML = '<p class="check">Correct Answer!</p>';
    } else {
        check.innerHTML = `<p class="check"><p>Incorrect Answer!</p><small><b>Correct Answer :</b> ${correctAnswer}</small></p>`;
    }
    
    checkBtn.classList.add('disable');
    checkBtn.setAttribute('disabled', 'disabled');
    let inputs =  document.querySelectorAll("input")
    inputs.forEach((input) => {
        input.setAttribute('disabled','disabled');
    })
    checkBtn.onclick = () => {};
    currentQuestion += 1;
    if(currentQuestion<=5){
        setTimeout(() => {
            fetchQuestion();
        }, 600);
    }
}


//& Restart the quiz
function restartQuiz(){
    document.getElementById("loader").style.visibility = "visible";
    document.getElementById("que-container").style.visibility = "hidden";
    document.getElementById('expre').style.display = "none";
    document.getElementById('check-btn').innerHTML = "Check Answer";

    loading();

    document.getElementById('check').style.display = 'block';
    document.getElementById('question').style.display = 'block';
    document.getElementById('reset').style.display = 'none';
    document.getElementById('result').style.display = 'none';
    
    currentScore = 0;
    currentQuestion = 1;

    fetchQuestion();
}