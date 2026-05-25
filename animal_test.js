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
let model, labelContainer, maxPredictions;

async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    if (!model) {
        const loadingDiv = document.getElementById('loading');
        loadingDiv.style.display = 'block';
        try {
            model = await tmImage.load(modelURL, metadataURL);
            maxPredictions = model.getTotalClasses();
            
            labelContainer = document.getElementById("label-container");
            labelContainer.innerHTML = ''; // Clear previous if any
            for (let i = 0; i < maxPredictions; i++) {
                const resultBar = document.createElement("div");
                resultBar.className = "result-bar";
                resultBar.innerHTML = '<div class="bar-fill" style="width: 0%"></div><div class="bar-text"></div>';
                labelContainer.appendChild(resultBar);
            }
        } catch (e) {
            console.error(e);
            alert("모델을 불러오는데 실패했습니다.");
        } finally {
            loadingDiv.style.display = 'none';
        }
    }
}

async function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async function(e) {
        const img = document.getElementById('face-image');
        img.src = e.target.result;
        img.style.display = 'block';
        document.getElementById('upload-placeholder').style.display = 'none';
        
        await init();
        await predict(img);
    };
    reader.readAsDataURL(file);
}

async function predict(imgElement) {
    const prediction = await model.predict(imgElement);
    for (let i = 0; i < maxPredictions; i++) {
        const classTitle = prediction[i].className === "Dog" ? "강아지상" : "고양이상";
        const probability = (prediction[i].probability * 100).toFixed(0);
        
        const barFill = labelContainer.childNodes[i].querySelector('.bar-fill');
        const barText = labelContainer.childNodes[i].querySelector('.bar-text');
        
        barFill.style.width = probability + "%";
        barText.innerHTML = classTitle + ": " + probability + "%";
    }
}
