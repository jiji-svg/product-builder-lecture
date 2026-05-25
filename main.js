document.getElementById('generate').addEventListener('click', () => {
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }

    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

    const numberElements = document.querySelectorAll('.number');
    numberElements.forEach((el, i) => {
        el.textContent = sortedNumbers[i];
        el.style.animation = 'none'; // Reset animation
        void el.offsetWidth; // Trigger reflow
        el.style.animation = `popIn 0.5s ease-in-out forwards`;
        el.style.animationDelay = `${i * 0.1}s`;
    });
});
