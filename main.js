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

// Teachable Machine Logic
const URL = "https://teachablemachine.withgoogle.com/models/W2QOofDYm/";
let model, webcam, labelContainer, maxPredictions;

async function init() {
    const startBtn = document.getElementById('start-btn');
    const loadingDiv = document.getElementById('loading');
    
    startBtn.style.display = 'none';
    loadingDiv.style.display = 'block';

    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    try {
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        const flip = true;
        webcam = new tmImage.Webcam(300, 300, flip);
        await webcam.setup();
        await webcam.play();
        window.requestAnimationFrame(loop);

        loadingDiv.style.display = 'none';
        document.getElementById("webcam-container").appendChild(webcam.canvas);
        
        labelContainer = document.getElementById("label-container");
        for (let i = 0; i < maxPredictions; i++) {
            const resultBar = document.createElement("div");
            resultBar.className = "result-bar";
            resultBar.innerHTML = '<div class="bar-fill" style="width: 0%"></div><div class="bar-text"></div>';
            labelContainer.appendChild(resultBar);
        }
    } catch (error) {
        console.error("Error initializing webcam or model:", error);
        alert("카메라 권한이 필요하거나 모델을 불러오는 데 실패했습니다.");
        startBtn.style.display = 'block';
        loadingDiv.style.display = 'none';
    }
}

async function loop() {
    webcam.update();
    await predict();
    window.requestAnimationFrame(loop);
}

async function predict() {
    const prediction = await model.predict(webcam.canvas);
    for (let i = 0; i < maxPredictions; i++) {
        const classTitle = prediction[i].className === "Dog" ? "강아지상" : "고양이상";
        const probability = (prediction[i].probability * 100).toFixed(0);
        
        const barFill = labelContainer.childNodes[i].querySelector('.bar-fill');
        const barText = labelContainer.childNodes[i].querySelector('.bar-text');
        
        barFill.style.width = probability + "%";
        barText.innerHTML = classTitle + ": " + probability + "%";
    }
}
