const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Theme logic
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

// Lotto logic
function generateLotto() {
    const lottoContainer = document.getElementById('lotto-container');
    const numbers = [];
    
    while (numbers.length < 6) {
        const num = Math.floor(Math.random() * 45) + 1;
        if (!numbers.includes(num)) {
            numbers.push(num);
        }
    }
    
    numbers.sort((a, b) => a - b);
    
    lottoContainer.innerHTML = '';
    numbers.forEach(num => {
        const ball = document.createElement('div');
        ball.className = 'ball active';
        ball.textContent = num;
        lottoContainer.appendChild(ball);
    });
    
    const btn = document.getElementById('lotto-btn');
    btn.textContent = '다시 추첨하기';
}
