const quotes = [
    { text: "천재는 1%의 영감과 99%의 노력으로 이루어진다.", author: "토마스 에디슨" },
    { text: "행복은 선택하는 것이다.", author: "알베르트 슈바이처" },
    { text: "가장 큰 위험은 아무것도 하지 않는 것이다.", author: "마크 저커버그" },
    { text: "우리의 운명은 우리가 결정하는 것이다.", author: "윌리엄 셰익스피어" },
    { text: "성공은 최종적인 것이 아니며, 실패는 치명적인 것이 아니다. 중요한 것은 계속하는 용기다.", author: "윈스턴 처칠" },
    { text: "내일의 꿈을 실현하는 데 있어서 유일한 제약은 오늘의 의구심일 것이다.", author: "프랭클린 D. 루스벨트" },
    { text: "인생은 우리가 만드는 것이다. 언제나 그랬고, 언제나 그럴 것이다.", author: "그랜마 모지스" },
    { text: "어제보다 나은 오늘을 만드는 것은 오직 당신 자신이다.", author: "미상" },
    { text: "모든 성취의 시작점은 갈망이다.", author: "나폴레온 힐" },
    { text: "단순함이 궁극의 정교함이다.", author: "레오나르도 다 빈치" }
];

function generateQuote() {
    const textElement = document.getElementById('quote-text');
    const authorElement = document.getElementById('quote-author');
    
    // Add fade out effect
    textElement.style.opacity = 0;
    authorElement.style.opacity = 0;
    
    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const quote = quotes[randomIndex];
        
        textElement.textContent = `"${quote.text}"`;
        authorElement.textContent = `- ${quote.author} -`;
        
        // Fade in
        textElement.style.transition = 'opacity 0.5s';
        authorElement.style.transition = 'opacity 0.5s';
        textElement.style.opacity = 1;
        authorElement.style.opacity = 1;
    }, 300);
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
