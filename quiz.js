
// ================================Questions========================
var questions = [
    {
        q: "Who is the father of Computer",
        a: "Mark",
        b: "Charles Babbage",
        c: "James",
        d: "Shaun",
        ans: "b",
        opt1: "a",
        opt2: "c"
    },
    {
        q: "Who is the father of Nation",
        a: "Gandhi Ji",
        b: "Raju Ji",
        c: "Ravi Ji",
        d: "Ajay Ji",
        ans: "a",
        opt1: "b",
        opt2: "d"
    },
    {
        q: "Full form of ATM",
        a: "Any Time Money",
        b: "all time Masti",
        c: "All the Monkeys",
        d: "Automated Teller Machine",
        ans: "d",
        opt1: "a",
        opt2: "b"
    },
    {
        q: "What is the largest mammal in the world?",
        a: "Elephant",
        b: "Giraffe",
        c: "Whale",
        d: "Hippopotamus",
        ans: "b"
    },
    {
        q: "From where the sun rises ?",
        a: "East",
        b: "West",
        c: "North",
        d: "South",
        ans: "a"
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

// ================================Strart Quiz Button========================
$("#startQuizBtn").click(function () {
    pname = $("#playerName").val();
    $("#startQuiz").hide();
    $("#quizBox").show();
    if (pname != "") {
        $("#changePlayerName").text(pname);
    }
    loadQuestion();
    startTime();
});
// ================================loadQuestion Function========================
function loadQuestion() {
    $("#q").text(questions[count].q);
    $("#a").val(questions[count].a);
    $("#b").val(questions[count].b);
    $("#c").val(questions[count].c);
    $("#d").val(questions[count].d);
    $("#questionNo").text(`Question No. ${count + 1}/${len}`);
}
// ================================validation===============
$(".opt").click(function () {
    cid = $(this).attr("id");
    if (cid == questions[count].ans) {
        $(this).css("background", "green");
        points++;
        $("#points").text(`Points: ${points}`);
    } else {
        $(this).css("background", "red");
        $("#" + questions[count].ans).css("background", "green");
    }
    $(".opt").prop("disabled", "true");
    if (count + 1 == 1) {
        $("#nextQuestion").show();
        $("#preQuestion").hide();
        $("#submitQuestion").hide();
    }
    else if (count + 1 == 5) {
        $("#nextQuestion").hide();
        $("#preQuestion").show();
        $("#submitQuestion").show();
    }
    else {
        $("#nextQuestion").show();
        $("#preQuestion").show();
        $("#submitQuestion").hide();
    }
});
// ================================ Previous Button===============
$("#preQuestion").click(function () {
    count--;
    $(".opt").css("background", "");
    $(".opt").prop("disabled", "");
    loadQuestion();
});

// ================================Next Button===============
$("#nextQuestion").click(function () {
    count++;
    $(".opt").css("background", "");
    $(".opt").prop("disabled", "");
    loadQuestion();
});
//===============================submit button=================
$("#submitQuestion").click(function () {
    $("#restartQuiz").show();
    $("#finalPoints").text(`Final Points: ${points}`);
    let result = (percentage / 100) * points;
    if (result >= 3) {
        $("#percentage").text(`Result: Pass`);
    }
    else {
        $("#percentage").text(`Result: Fail`);
    }
    $("#quizBox").hide();
}
);
// ================================Restart quiz Button===============
$("#restartQuizBtn").click(function () {
    $("#quizBox").hide();
    $("#restartQuiz").hide();
    resetQuiz();
    loadQuestion();
    startTime();
});
// ===========================Reset Quiz ==============
function resetQuiz() {
    count = 0;
    points = 0;
    clearInterval(quiztime);
    $("#time").text("05:00");
    $("#points").text(`Points: 0`);
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
function startTime() {
    totalmins = 5;
    convertedtosecs = 60 * totalmins;
    function timer() {
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
}

