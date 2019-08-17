// Global Variables

var questions = [

    { q: "Who is Naruto's father?", a: ["Kakashi", "Madara", "Minato", "Jiraya"], c: "Minato" },
    { q: "What does Meliodas's sacred treasure do?", a: ["Stealing power", "Earth split", "Magic", "Clones"], c: "Clones" },
    { q: "How many dragon balls are there?", a: ["5", "6", "7", "8"], c: "7" },
    { q: "How did Netero kill Meruem?", a: ["By sacrificing his life", "Cut his head off", "pushed off the cliff", "Energy blast"], c: "By sacrificing his life" },
    { q: "Who was the first Hokage?", a: ["Minato", "Hashirama", "Naruto", "Tsunade"], c: "Hashirama" },
    { q: "What is L's last name from Death Note?", a: ["Lawliet", "Loraine", "Truce", "Alimi"], c: "Lawliet" },
    { q: "Who's the captain of Black Bulls?", a: ["Asta", "Yuno", "Yami", "William"], c: "Yami" },
];

let questionIndex = 0
let score = 0
let wrong = 0
let time = 20;

// Variable to store my timer
let counter;


// New game resets all variables to zero and displays a play button to get started.
const newGame = () => {
    questionIndex = 0
    score = 0
    wrong = 0
    $("#display-questions-text").html("<h4 class='newgame col-md-4'> Click Here To Play! </h4>")
    $("#score-text").append(`Total Correct : ${score}`)
    $("#wrong-text").append(`Total Wrong: ${wrong}`);

    $(".newgame").on("click", function() {
        $("#display-questions-text").empty()
        renderQuestion()
    })
}

const renderQuestion = () => {

    // Run the render question function if there is a question remaining
    if (questionIndex < questions.length) {


        counter = setInterval(timer, 1000);

        // Prints out key information for the user to see and inserts the called question and appends the answers
        $(".all").empty();
        $("#display-questions-text").html(`<h2 class="col-md-12 question"> ${questions[questionIndex].q}</h2>`)
        $("#score-text").text(`Total Correct : ${score}`);
        $("#wrong-text").text(`Total Wrong : ${wrong}`);

        $("#directions-text").html(`<h1 class="col-md-12 directions">Click one of the answers to submit your guess!</h2>`);
        $("#timer-text").html(`Remaining Time: ${time}`)

        for (let i = 0; i < questions[questionIndex].a.length; i++) {
            $("#display-answers-text").append(`<h4 class='answer col-md-5'>${questions[questionIndex].a[i]}</h4>`)

        }


        // When the user clicks an answer, selected extracts the string from the chosen answer and compares it to the correct answer.  
        $(".answer").on("click", function() {

            let selected = $(this).text();

            if (selected === questions[questionIndex].c) {

                clearInterval(counter);
                score++;
                $(".all").empty();
                $("#directions-text").html(`<h1 class="col-md-12 popup">One point for you!</h1>`)
                $("#directions-text").append(`<img src="https://media1.giphy.com/media/3o7TKqY0Wywy1Vp8vS/giphy.gif">`);
                questionIndex++;
                time = 20;
            } else {
                clearInterval(counter);
                wrong++;
                $(".all").empty()
                $("#directions-text").html(`<h1 class="col-md-12 popup">The right answer was ${questions[questionIndex].c}!</h1>`)
                $("#directions-text").append(`<img src="https://media2.giphy.com/media/l4pLY0zySvluEvr0c/giphy.gif">`);
                questionIndex++;
                time = 20;

            }
            setTimeout(renderQuestion, 5000);
            setTimeout(counter, 5000)
        })

    } else {
        $(".all").empty();
        $("#directions-text").html(`<h1 class="col-md-12">You finished the game! You got ${score} out of ${questions.length} correct!</h1>`);
        $("#display-questions-text").html(`<h2 class="col-md-12">Click the button below to return to play again!</h2>`)
        $("#display-answers-text").html("<h3 class='col-md-4 newgame'>Play Again!</button></h3>")

        $(".newgame").on("click", function() {

            $(".all").empty();
            questionIndex = 0
            score = 0
            wrong = 0
            renderQuestion();
        })

    }
}

function timer() {
    $("#timer-text").html(`Remaining Time: ${time}`);
    time--


    if (time < -1) {
        clearInterval(counter);
        $(".all").empty()
        $("#directions-text").html(`<h1 class="col-md-12 popup">Time is up! The right answer was ${questions[questionIndex].c}!<h1>`)
        $("#directions-text").append(`<img src="https://media1.tenor.com/images/f65259e16203121dbc38b9bbf7a9721c/tenor.gif?itemid=11093950">`);
        wrong++;
        questionIndex++;
        time = 20;
        setTimeout(renderQuestion, 5000);
    }

}

// Called Function 

newGame();


// 1. Hit a button to start a new game and display the first question.

// 2. Begin a timer and display the first question and potential answers.

// 3. The user has 30 seconds to select a potential answer.

// 4. If the user selects the correct or wrong answer, update their score and take them to a recap screen.

// 5.  Display the next question and repeat 4.

// 6.  Once the user runs out of questions, display their final score at the end and a button to reset the game.