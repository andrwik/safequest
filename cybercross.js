let timer = 0;
let interval = setInterval(() => {
    timer++;
    document.getElementById("timer").innerText = timer + "s";
}, 1000);

const questions = [
    { question: "Que sigla melhor representa a frase: Virtual Private Network?", answer: "VPN" },
    { question: "Qual a principal função de um FireWall?", answer: "PROTEGER" },
    { question: "Qual é o nome do ataque que captura dados em redes públicas?", answer: "SNIFFING" },
    { question: "Qual é o nome correto utilizado para sequestro de dados?", answer: "RANSOMWARE" },
    { question: "Que programa foi criado para infectar e danificar os dispositivos?", answer: "MALWARE" }
];

let shuffledQuestions = questions.sort(() => Math.random() - 0.5);
let currentQuestionIndex = 0;
let hints = questions.map(q => q.answer).sort(() => Math.random() - 0.5);
document.getElementById("hints").innerText = "Dicas: " + hints.join(", ");

function endGame() {
    let playerName = prompt("Digite seu nome para salvar no ranking:");
    let rankings = JSON.parse(localStorage.getItem("rankings")) || [];
    rankings.push({ name: playerName, time: timer });
    localStorage.setItem("rankings", JSON.stringify(rankings));
    alert("Jogo finalizado! Confira o ranking no menu principal.");
}

function loadQuestion() {
    if (currentQuestionIndex >= shuffledQuestions.length) {
        endGame();
        return;
    }
    let questionObj = shuffledQuestions[currentQuestionIndex];
    document.getElementById("question-text").innerText = questionObj.question;
    document.getElementById("word-box").innerHTML = "";
    questionObj.answer.split('').forEach(() => {
        let letterDiv = document.createElement("div");
        document.getElementById("word-box").appendChild(letterDiv);
    });
}

// Função para teclado virtual e físico
function handleKeyPress(letter) {
    let wordBoxes = document.querySelectorAll(".word-box div");
    for (let i = 0; i < wordBoxes.length; i++) {
        if (wordBoxes[i].innerText === "") {
            wordBoxes[i].innerText = letter;
            break;
        }
    }
}

document.addEventListener("keydown", (event) => {
    let key = event.key.toUpperCase();
    if (/^[A-Z]$/.test(key)) {
        handleKeyPress(key);
    } else if (event.key === "Backspace") {
        let wordBoxes = document.querySelectorAll(".word-box div");
        for (let i = wordBoxes.length - 1; i >= 0; i--) {
            if (wordBoxes[i].innerText !== "") {
                wordBoxes[i].innerText = "";
                break;
            }
        }
    } else if (event.key === "Enter") {
        document.getElementById("confirm-btn").click();
    }
});

// Gerando teclado virtual
const keyboardLayout = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const keyboardDiv = document.getElementById("keyboard");

keyboardLayout.split("").forEach(letter => {
    let button = document.createElement("button");
    button.innerText = letter;
    button.addEventListener("click", () => handleKeyPress(letter));
    keyboardDiv.appendChild(button);
});

document.getElementById("confirm-btn").addEventListener("click", function() {
    let answer = document.querySelectorAll(".word-box div");
    let userAnswer = Array.from(answer).map(div => div.innerText).join("");
    let correctAnswer = shuffledQuestions[currentQuestionIndex].answer.toUpperCase();

    if (userAnswer === correctAnswer) {
        document.getElementById("message").innerText = "PARABÉNS! Você acertou!";
        document.getElementById("message").style.color = "green";
        document.getElementById("next-btn").style.display = "inline-block";
        document.getElementById("confirm-btn").style.display = "none";
    } else {
        document.getElementById("message").innerText = "OPS! Esta não é a palavra, tente novamente.";
        document.getElementById("message").style.color = "red";
    }
});

document.getElementById("next-btn").addEventListener("click", function() {
    currentQuestionIndex++;
    loadQuestion();
    this.style.display = "none";
    document.getElementById("confirm-btn").style.display = "inline-block";
    document.getElementById("message").innerText = "";
});

loadQuestion();
