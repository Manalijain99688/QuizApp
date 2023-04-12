let questions = [
    {
        q: "Who is the father of Computer ?",
        A: "Mark",
        B: "Charles Babbage",
        C: "James",
        D: "Shaun",
        ans: "B",
        opt1: "a",
        opt2: "c",
        uans: null,
        preans: null
    },
    {
        q: "Who is the father of Nation ?",
        A: "Gandhi Ji",
        B: "Raju Ji",
        C: "Ravi Ji",
        D: "Ajay Ji",
        ans: "A",
        opt1: "b",
        opt2: "d",
        uans: null
    },
    {
        q: "Full form of ATM ?",
        A: "Any Time Money",
        B: "all time Masti",
        C: "All the Monkeys",
        D: "Automated Teller Machine",
        ans: "D",
        opt1: "a",
        opt2: "b",
        uans: null
    },
    {
        q: "What is the largest mammal in the world?",
        A: "Elephant",
        B: "Giraffe",
        C: "Whale",
        D: "Hippopotamus",
        ans: "B",
        uans: null
    },
    {
        q: "From where the sun rises ?",
        A: "East",
        B: "West",
        C: "North",
        D: "South",
        ans: "A",
        uans: null

    },
];

$("#quizBox").hide();
$("#restartQuiz").hide();

let pname = "";
let count = 0;
let cid = "";
let points = 0;
let len = questions.length;
let percentage = 60;
let correct = 0;
let incorrect = 0;
let quizhtml = '';

// ================================Start Quiz Button========================
$("#startQuizBtn").click(function () {
    pname = $("#playerName").val();
    $("#startQuiz").hide();
    $("#quizBox").show();
    if (pname != "") {
        $("#changePlayerName").text(pname);
    }
    loadQuestion();
    updateBtn();
    startTime();
});

// ================================loadQuestion Function========================
function loadQuestion() {
    $("#q").text(questions[count].q);
    $("#A").val(questions[count].A);
    $("#B").val(questions[count].B);
    $("#C").val(questions[count].C);
    $("#D").val(questions[count].D);
    $("#questionNo").text(`Question No. ${count + 1}/${len}`);
    $(".opt").css("background", "");
    if (questions[count].uans != null) {
        $("#" + questions[count].uans).css("background", "red");
        $("#" + questions[count].ans).css("background", "green");
    }

}
// ================================validation===============
$(".opt").click(function () {
    cid = $(this).attr("id");
    questions[count].uans = cid;
    if (cid == questions[count].ans) {
        $(this).css("background", "green");
        points++;
        correct++;

        $("#points").text(`Points: ${points}`);
    } else {
        incorrect++;
        $(this).css("background", "red");
        $("#" + questions[count].ans).css("background", "green");
    }
    

});
// ================================ Previous Button===============
$("#preQuestion").click(() => {
    if (count > 0) {
        count--;
        loadQuestion();
        updateBtn();
        // Do not update correct and incorrect variables
    }
});

// ================================Next Button===============
$("#nextQuestion").click(() => {
    count++;
    loadQuestion();
    $(".opt").css("background", "");
    $(".opt").prop("disabled", "");
    updateBtn();
});
//===============================submit button=================
$("#submitQuestion").click(() => {

    $("#restartQuiz").show();
    $("#finalPoints").text(`Final Points: ${points}`);
    let result = (percentage / 100) * points;
    if (result > 2) {
        $("#percentage").text(`Result: Pass`);
        $("#correct").text(`Correct :${correct}`);
        $("#incorrect").text(`incorrect :${incorrect}`);

    }
    else {
        $("#percentage").text(`Result: Fail`);
        $("#correct").text(`Correct :${correct}`);
        $("#incorrect").text(`incorrect :${incorrect}`);
    }
    $("#quizBox").hide();
    quizHtml = '';
    for (let i = 0; i < len; i++) {
        quizHtml += `<div class="question"> Question : ${i + 1} ${questions[i].q}</div>
    <div class="opt">
    <label>Correct: ${questions[i].ans}<br>
    <label>Your Answer :${questions[i].uans}<br>
    </div>`;
    }

    $('#quiz-summary').html(quizHtml);



});
// ================================Restart quiz Button===============
$("#restartQuizBtn").click(() => {
    $("#quizBox").show();
    $("#restartQuiz").hide();
    resetQuiz();
    loadQuestion();
    $(".opt").css("background", "");
    $(".opt").prop("disabled", "");
    startTime();

});
// ===========================Reset Quiz ==============
function resetQuiz() {
    count = 0;
    points = 0;
    clearInterval(quiztime);
    $("#time").text("05:00");
    $("#questionNo").text(`Question No. ${count + 1}/${len}`);
   
}
// =========================Timer=========================
// ===========Variables=======
let totalmins = 0; // mins given by quiz master
let convertedtosecs = 0; //mins converted to secs
let remainingmins = 0;
let remainingsecs = 0;
let quiztime = "";
// ============= start time function===============
const startTime = () => {
totalmins = 5;
convertedtosecs = 60 * totalmins;
const timer = () => {
convertedtosecs--;
remainingmins = Math.floor(convertedtosecs / 60);
remainingsecs = convertedtosecs % 60;
if (remainingmins <= 9 && remainingmins >= 0) {
remainingmins = "0" + remainingmins;
}
if (remainingsecs <= 9 && remainingsecs >= 0) {
remainingsecs = "0" + remainingsecs;
}
$("#time").text(`${remainingmins}:${remainingsecs}`);
if (convertedtosecs == 0) {
clearInterval(quiztime);
$("#quizBox").hide();
$("#restartQuiz").show();
}
}
quiztime = setInterval(timer, 100);
};

let updateBtn = () => {
    if (count > 0) {
        $("#preQuestion").show();
    }
    else if(count==4){
        $("#preQuestion").show();
          
    } 
    else {
        $("#preQuestion").hide();
    }
}

