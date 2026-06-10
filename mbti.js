let scores = { E: 0, I: 0, T: 0, F: 0, J: 0, P: 0 };
let currentStep = 1;
const totalSteps = 3;

function nextQuestion(type) {
    scores[type]++;
    
    const currentCard = document.querySelector(`.question-card[data-q="${currentStep}"]`);
    currentCard.classList.remove('active');
    
    currentStep++;
    
    if (currentStep <= totalSteps) {
        const nextCard = document.querySelector(`.question-card[data-q="${currentStep}"]`);
        nextCard.classList.add('active');
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById('quiz-area').style.display = 'none';
    const resultArea = document.getElementById('result-area');
    resultArea.style.display = 'block';
    
    const resultTitle = document.getElementById('result-title');
    const resultDesc = document.getElementById('result-desc');
    
    let result = "";
    if (scores.E > 0) result += "열정적인 "; else result += "사색적인 ";
    if (scores.T > 0) result += "전략가"; else result += "예술가";
    
    resultTitle.textContent = `당신은 [${result}] 타입입니다!`;
    
    if (scores.J > 0) {
        resultDesc.textContent = "당신은 체계적이고 계획적인 성향을 가지고 있으며, 목표를 달성하기 위해 꾸준히 노력하는 타입입니다. 연구소에서는 당신을 '정밀 분석관'으로 명명합니다.";
    } else {
        resultDesc.textContent = "당신은 자유롭고 창의적인 성향을 가지고 있으며, 새로운 아이디어와 가능성을 탐구하는 것을 즐깁니다. 연구소에서는 당신을 '창의적 탐험가'로 명명합니다.";
    }
}

// Theme logic
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
}
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    themeToggle.textContent = isDarkMode ? '☀️' : '🌙';
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
});
