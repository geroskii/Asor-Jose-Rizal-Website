// Navigation
function navigateTo(pageId) {
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });
    const targetSection = document.getElementById(pageId);
    if (targetSection) {
        targetSection.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-target') === pageId) {
            item.classList.add('active');
        }
    });

    // Close mobile menu if open
    document.getElementById('navLinks').classList.remove('open');
}

function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('open');
}

// Smooth scroll to Novel Dossiers on Literary Works page
function scrollToNovel(elementId) {
    const el = document.getElementById(elementId);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Literary Works Filtering & Search
function setWorkFilter(category, btnElement) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btnElement.classList.add('active');

    const cards = document.querySelectorAll('.work-card');
    cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (category === 'all' || cat === category) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

function filterWorks() {
    const query = document.getElementById('workSearch').value.toLowerCase();
    const cards = document.querySelectorAll('.work-card');
    cards.forEach(card => {
        const title = card.getAttribute('data-title');
        const text = card.innerText.toLowerCase();
        if (title.includes(query) || text.includes(query)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// Lightbox Functions
function openLightbox(src, title, desc) {
    document.getElementById('lightboxImg').src = src;
    document.getElementById('lightboxTitle').innerText = title;
    document.getElementById('lightboxDesc').innerText = desc;
    document.getElementById('lightbox').classList.add('active');
}

function closeLightbox(e) {
    if (e.target.id === 'lightbox') {
        document.getElementById('lightbox').classList.remove('active');
    }
}

function closeLightboxDirect() {
    document.getElementById('lightbox').classList.remove('active');
}

// Interactive Quiz Data & Engine
const quizQuestions = [
    {
        question: "When and where was Dr. José Rizal born?",
        options: [
            "June 19, 1861 in Calamba, Laguna",
            "December 30, 1896 in Manila",
            "June 19, 1861 in Dapitan, Zamboanga",
            "December 19, 1872 in Vigan, Ilocos Sur"
        ],
        correct: 0,
        explanation: "José Rizal was born on June 19, 1861, in Calamba, Laguna."
    },
    {
        question: "Which novel was published by Rizal in Berlin in 1887?",
        options: ["El Filibusterismo", "Noli Me Tangere", "The Indolence of the Filipinos", "A La Juventud Filipina"],
        correct: 1,
        explanation: "Noli Me Tangere was published in Berlin in 1887 with the financial assistance of his friend Maximo Viola."
    },
    {
        question: "What does the Latin title 'Noli Me Tangere' translate to in English?",
        options: ["Touch Me Not", "The Reign of Greed", "To the Young Women of Malolos", "The Social Cancer"],
        correct: 0,
        explanation: "'Noli Me Tangere' translates from Latin as 'Touch Me Not' (derived from the Gospel of John)."
    },
    {
        question: "In which remote Mindanao town was Rizal exiled from 1892 to 1896?",
        options: ["Dapitan", "Dumaguete", "Cebu", "Zamboanga"],
        correct: 0,
        explanation: "Rizal was exiled to Dapitan in northern Mindanao, where he practiced medicine, taught, and engaged in community projects."
    },
    {
        question: "What is the title of Rizal's poignant final poem written before his execution?",
        options: ["A La Juventud Filipina", "Mi Último Adiós", "Sa Aking Mga Kabata", "Canto del Viajero"],
        correct: 1,
        explanation: "'Mi Último Adiós' (My Last Farewell) is Rizal's final masterpiece, smuggled out of Fort Santiago in an alcohol cooking stove."
    },
    {
        question: "What civic organization did Rizal found upon his return to Manila in July 1892?",
        options: ["Katipunan", "La Liga Filipina", "Propaganda Movement", "Kilusang Bagong Lipunan"],
        correct: 1,
        explanation: "Rizal founded La Liga Filipina on July 3, 1892, to unite the Filipino people and promote mutual aid and reform."
    },
    {
        question: "Where was José Rizal executed by firing squad on December 30, 1896?",
        options: ["Fort Santiago", "Cavite Arsenal", "Bagumbayan (Luneta)", "Malate Church"],
        correct: 2,
        explanation: "Rizal was executed at Bagumbayan (now Rizal Park / Luneta) in Manila on the morning of December 30, 1896."
    },
    {
        question: "Which of Rizal's essays defends Filipinos against the colonial stereotype of laziness?",
        options: ["The Philippines a Century Hence", "The Indolence of the Filipinos", "Letter to the Young Women of Malolos", "Annotation of Morga's Sucesos"],
        correct: 1,
        explanation: "'The Indolence of the Filipinos' examines why climatic and governance factors caused apparent lethargy rather than innate laziness."
    },
    {
        question: "Which European city saw the publication of Rizal's second novel, El Filibusterismo, in 1891?",
        options: ["Berlin, Germany", "Paris, France", "Ghent, Belgium", "Madrid, Spain"],
        correct: 2,
        explanation: "El Filibusterismo was published in Ghent, Belgium, in 1891 with funds borrowed from his friend Valentin Ventura."
    },
    {
        question: "What was Rizal's primary medical specialization, pursued largely to cure his mother's failing eyesight?",
        options: ["Cardiology", "Ophthalmology", "Neurology", "Pediatrics"],
        correct: 1,
        explanation: "Rizal specialized in ophthalmology and studied under renowned European eye specialists like Dr. Louis de Wecker in Paris."
    }
];

let currentQuestionIndex = 0;
let score = 0;
let answerSelected = false;

function loadQuizQuestion() {
    answerSelected = false;
    const q = quizQuestions[currentQuestionIndex];
    document.getElementById('questionCounter').innerText = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;
    document.getElementById('scoreTracker').innerText = `Score: ${score}`;
    document.getElementById('questionTitle').innerText = q.question;

    const optionsList = document.getElementById('optionsList');
    optionsList.innerHTML = '';

    q.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = option;
        btn.onclick = () => selectAnswer(index, btn);
        optionsList.appendChild(btn);
    });

    document.getElementById('quizFeedback').classList.remove('visible');
    document.getElementById('nextQuestionBtn').style.display = 'none';
}

function selectAnswer(selectedIndex, btnElement) {
    if (answerSelected) return;
    answerSelected = true;

    const q = quizQuestions[currentQuestionIndex];
    const allBtns = document.querySelectorAll('.option-btn');

    if (selectedIndex === q.correct) {
        btnElement.classList.add('correct');
        score++;
        document.getElementById('scoreTracker').innerText = `Score: ${score}`;
    } else {
        btnElement.classList.add('incorrect');
        allBtns[q.correct].classList.add('correct');
    }

    allBtns.forEach(btn => btn.disabled = true);

    const feedbackBox = document.getElementById('quizFeedback');
    feedbackBox.innerHTML = `<strong>Explanation:</strong> ${q.explanation}`;
    feedbackBox.classList.add('visible');

    document.getElementById('nextQuestionBtn').style.display = 'block';
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        loadQuizQuestion();
    } else {
        showQuizResults();
    }
}

function showQuizResults() {
    document.getElementById('quizContent').style.display = 'none';
    const resultsDiv = document.getElementById('quizResults');
    resultsDiv.style.display = 'block';

    const percentage = Math.round((score / quizQuestions.length) * 100);
    let message = "";
    if (percentage >= 90) message = "Exceptional scholarship! You have a profound understanding of Dr. José Rizal's life and legacy.";
    else if (percentage >= 70) message = "Well done! You have a solid grasp of Philippine history and Rizal's contributions.";
    else message = "Good effort! Explore the museum pages on Biography and Literary Works to learn even more about our national hero.";

    document.getElementById('finalScoreText').innerText = `You scored ${score} out of ${quizQuestions.length} (${percentage}%).\n\n${message}`;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('quizResults').style.display = 'none';
    document.getElementById('quizContent').style.display = 'block';
    loadQuizQuestion();
}

// Initialize Quiz on load
window.addEventListener('DOMContentLoaded', () => {
    loadQuizQuestion();
});