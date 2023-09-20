/* const form = document.getElementById("Form")
const Add = document.getElementById("Add")
const AddElement = () => {
    const duplicateForm = document.importNode(form, true);
    document.getElementById("form-control").appendChild(duplicateForm);
}
Add.onclick = () => AddElement(); */
// Variables
let Switch = false;
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("previous");
const submitButton= document.getElementById("submit");
const toggleButton = document.getElementById("toggle");
const state={
    add:false
}
let questionIndex = 0;

// Functions
function toggleSwitchTransformFunction() {
    const quizContainer =document.getElementById("quiz-container")
    const toggleSwitchCircle = document.getElementById("circle")
    if (!Switch) {
        Switch = true
        toggleSwitchCircle.style.transform = "translateX(100%)"
        quizContainer.classList.add("quizContainer")
        document.body.classList.add("dark-mode");
        toggleButton.style.background = "black";
    } else {
        Switch = false
        toggleButton.style.background= "white";
        quizContainer.classList.remove("quizContainer")
        toggleSwitchCircle.style.transform = "translateX(0%)"
        document.body.classList.remove("dark-mode")
    }
}
function Quiz() {
    const quiz = document.getElementById("quiz");
    const output=[]
    allQuestions.forEach(
        (currentQuestion, questionNumber) => {
            const answer = [];
            for(const item of currentQuestion.options){
                answer.push(`<label class="label"><input type="radio" name ="question${questionNumber}" value="${item}"><span class="custom-radio-button"></span>${item}</label>`);
            }

            output.push(
                `<div class="slide">
    <div class="question animation"><h1> MCQ's for Javascript <h2> Question # ${currentQuestion.id} of ${allQuestions.length} </h2> <h4>${currentQuestion.question}</h4></h1></div>
    <div class="answer animation"> ${answer.join('')} </div>
    </div>` );
        }
    );
    quiz.innerHTML = output.join('');
}
function showQuestion(n) {
    const slides= document.querySelectorAll(".slide");
    const buttonGroup=document.getElementById("buttons")
    slides[questionIndex].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    questionIndex = n;
    if(questionIndex===0){
        prevButton.style.display = 'none';
        buttonGroup.style.justifyContent = "end";
    }
    else{
        buttonGroup.style.justifyContent = "space-between";
        prevButton.style.display = 'inline-flex';
    }
    if(questionIndex === slides.length-1){
        nextButton.style.display = 'none';
        AddButton();
    }
    else{
        nextButton.style.display = 'inline-flex';
        submitButton.style.display = 'none';
    }
}
function result(){
    const dialogBox = document.getElementById("dialogBox");
    const Yes = document.getElementById("yes");
    const No = document.getElementById("no")
    dialogBox.style.display="flex";
    Yes.onclick = ()=>{
        const Answers = document.querySelectorAll('.answer');
        const result = document.getElementById('myResults');
        let score = 0;
        state.add = true;
        submitButton.style.display = 'none';
        dialogBox.style.display= 'none';
        allQuestions.forEach((currentQuestion, questionNumber) => {
            const CorrectAnswer = Answers[questionNumber]
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (CorrectAnswer.querySelector(selector) || {}).value;
            if (userAnswer === currentQuestion.answer) {
                score++;
                Answers[questionNumber].style.color = 'lightgreen';
            } else {
                Answers[questionNumber].style.color = 'red';
            }
        });
        if(score===allQuestions.length){
            const canvas= document.getElementById('drawing_canvas');
            canvas.style.display= 'block';
        }
        result.innerHTML = `${fullName.firstName+' '+ fullName.lastName} your score is ${score} out of ${allQuestions.length}`;
    }
    No.onclick =()=>{
        state.add=false;
        dialogBox.style.display="none";
    }
}
function AddButton(){
    if (!state.add){
        submitButton.style.display= 'inline-flex';
    }else{
        state.add= true;
        submitButton.style.display= 'none';
    }
}

function NameValidation(id){
    const startQuiz= document.getElementById("startQuiz");
    const Name= document.getElementById(id).value;
    const NameValidation= document.getElementById("name-id");
    const select= document.getElementById(id);
    if(!Name.match( /^[A-Z].*[a-z]$/)){
        NameValidation.style.display='flex';
        NameValidation.classList.add('name-validation');
        NameValidation.innerHTML= 'Password contains alphabets only and must start with a Capital letter';
        startQuiz.disabled = true;
        startQuiz.classList.add('nohover')
        select.style.borderColor= 'red';
        select.style.color= 'red';

    }else{
        NameValidation.style.display='none';
        select.style.borderColor= 'green';
        select.style.color= 'green';
        startQuiz.disabled = false;
    }
}
const fullName={};
const formContainer= document.getElementById('form-container');
formContainer.classList.add('active')
function Submission(){
    const startQuiz= document.getElementById("startQuiz");
    const firstName= document.getElementById("firstName").value;
    const lastName= document.getElementById("lastName").value;
    const name= document.getElementById("name-id")
    const start= document.getElementById("container");
    name.innerHTML= 'Please Enter the name';
    name.style.display='flex';
    name.classList.add('name-validation');
    startQuiz.disabled = true;
    startQuiz.classList.add('nohover')
    if(firstName && lastName){
        formContainer.classList.remove('active')
        start.classList.add('active','animation');
        startQuiz.disabled= false;
        name.style.display='none'
        fullName.firstName= firstName;
        fullName.lastName= lastName;
    }
}


//Sample Data
const allQuestions=[
    {
        id:1,
        question: "Which of the following variables takes precedence over the others if the names are the same?",
        options: [
            "Global variable",
            "The local element",
            "The two of the above"
        ],
        answer: "The local element"

    },
    {
        id:2,
        question: "Which one of the following also known as Conditional Expression ",
        options:[ "Immediate if","Switch statement","If-then-else statement"],
        answer: "Immediate if"
    },
    {
        id:3,
        question: "Which type of JavaScript language is",
        options:[ "Object-Oriented","Object-Based","Assembly-language","High-level"],
        answer: "Object-Based"
    },
]
// Function Calling
toggleButton.onclick = () => toggleSwitchTransformFunction();
Quiz();
showQuestion(questionIndex);
function showNext() {
    showQuestion(questionIndex+1);
}
function showPrevious() {
    showQuestion(questionIndex - 1);
}