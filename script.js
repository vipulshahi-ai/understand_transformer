// State Management
let currentLevel = 0;
const levels = ["hero", "level1", "level2", "level3", "level4", "level5", "level6", "level7", "final-check"];

// Navigation
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");

function updateProgress() {
    const progress = (currentLevel / (levels.length - 1)) * 100;
    progressBar.style.width = `${progress}%`;
    progressText.innerText = `Mission Progress: ${Math.round(progress)}%`;
}

function showLevel(index) {
    levels.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el) {
            if (i === index) {
                el.classList.remove("hidden");
                el.classList.add("fade-in");
            } else {
                el.classList.add("hidden");
                el.classList.remove("fade-in");
            }
        }
    });

    currentLevel = index;
    updateProgress();

    // Button states
    prevBtn.disabled = currentLevel === 0;
    if (currentLevel === 0) {
        nextBtn.innerText = "Initialize Mission ->";
    } else if (currentLevel === levels.length - 1) {
        nextBtn.innerText = "Claim Certification ->";
        nextBtn.classList.add("hidden"); // Hide next on final level until ready
    } else {
        nextBtn.innerText = "Next Level ->";
        nextBtn.classList.remove("hidden");
    }

    // Level-specific triggers
    if (index === 5) initSelfAttention();
    if (levels[index] === "final-check") loadFinalQuiz();
}

nextBtn.addEventListener("click", () => {
    if (currentLevel < levels.length - 1) {
        showLevel(currentLevel + 1);
    }
});

prevBtn.addEventListener("click", () => {
    if (currentLevel > 0) {
        showLevel(currentLevel - 1);
    }
});

// Quiz Logic
function checkQuiz(qId, correctOpt) {
    const parent = document.querySelector(`[data-question="${qId}"]`);
    const options = parent.querySelectorAll(".quiz-opt");

    options.forEach(opt => {
        opt.classList.remove("correct", "incorrect");
        const btnText = opt.innerText.trim();
        if (btnText.startsWith(correctOpt)) {
            opt.classList.add("correct");
        } else {
            opt.onclick === null ? null : opt.classList.add("incorrect");
        }
    });
}

// Level 1: RNN vs Transformer Simulations
function runRNNViz() {
    const container = document.getElementById("rnn-animation");
    container.innerHTML = "";
    const words = ["I", "am", "learning", "AI"];

    words.forEach((word, i) => {
        setTimeout(() => {
            const span = document.createElement("span");
            span.className = "token";
            span.innerText = word;
            span.style.background = "var(--accent-primary)";
            container.appendChild(span);
        }, i * 1000);
    });
}

function runTransformerViz() {
    const container = document.getElementById("transformer-animation");
    container.innerHTML = "";
    const words = ["I", "am", "learning", "AI"];

    words.forEach((word) => {
        const span = document.createElement("span");
        span.className = "token";
        span.innerText = word;
        span.style.background = "var(--neon-blue)";
        container.appendChild(span);
    });
}

// Level 2: Transformer Flow Mission
async function startFlowMission() {
    const statusText = document.getElementById("mission-status-text");
    const layers = [
        { id: "layer-sa", text: "1. Self-Attention: Analyzing word relationships..." },
        { id: "layer-an", text: "2. Add & Norm: Stabilizing neural signals..." },
        { id: "layer-ff", text: "3. Feed Forward: Processing deep meanings..." },
        { id: "flow-bridge", text: "4. Context Bridge: Encoding the essence..." },
        { id: "layer-ma", text: "5. Masked Attention: Hiding future tokens..." },
        { id: "layer-ca", text: "6. Cross-Attention: Linking to Encoder signal..." },
        { id: "layer-dff", text: "7. Feed Forward: Finalizing translation..." }
    ];

    // Reset
    document.querySelectorAll(".sub-layer, .bridge-core").forEach(el => el.classList.remove("active"));

    for (const layer of layers) {
        const el = document.getElementById(layer.id);
        el.classList.add("active");
        statusText.innerText = layer.text;
        statusText.style.color = "var(--neon-blue)";
        await new Promise(r => setTimeout(r, 1200));
    }

    statusText.innerText = "MISSION SUCCESS: Data Transformed & Translated!";
    statusText.style.color = "var(--accent-success)";

    // Add a little glow to the whole hub
    document.querySelector(".mission-hub").style.boxShadow = "0 0 30px rgba(59, 165, 92, 0.3)";
}

// Level 4: Tokenization & Positional Encoding
function tokenize() {
    const input = document.getElementById("token-input").value;
    const viz = document.getElementById("token-viz");
    viz.innerHTML = "";

    const tokens = input.split(" ");
    tokens.forEach((t, i) => {
        const span = document.createElement("span");
        span.className = "token";
        span.id = `t-${i}`;
        span.innerText = t;
        viz.appendChild(span);
    });
}

function addPositionalEncoding() {
    const tokens = document.querySelectorAll("#token-viz .token");
    tokens.forEach((t, i) => {
        if (!t.querySelector(".pos-tag")) {
            const tag = document.createElement("span");
            tag.className = "pos-tag";
            tag.innerText = `Pos ${i + 1}`;
            t.appendChild(tag);
        }
    });
}

function checkOrderMeaning(isYes) {
    const feedback = document.getElementById("order-feedback");
    feedback.style.display = "block";
    if (isYes) {
        feedback.innerText = "Correct! The meaning changes completely.";
        feedback.style.borderLeft = "10px solid #000000";
    } else {
        feedback.innerText = "Actually, the meaning changes! The mouse is now eating the cat.";
        feedback.style.borderLeft = "10px solid #ff3b30"; // Red highlight for order impact
    }
}

function advanceRecap(step, result) {
    if (result === 'wrong') {
        alert("Not quite! Think about the journey data takes...");
        return;
    }

    // Hide current question
    document.getElementById(`recap-q${step}`).classList.add('hidden');
    document.getElementById(`recap-q${step}`).classList.remove('active');

    // Show next question or final
    const next = step + 1;
    let nextEl = document.getElementById(`recap-q${next}`);
    if (!nextEl) nextEl = document.getElementById('recap-final');

    nextEl.classList.remove('hidden');
    nextEl.classList.add('active');

    // Reveal Diagram Parts
    if (result === 'tokens') {
        document.getElementById('path1').classList.remove('hidden');
        setTimeout(() => document.getElementById('path1').classList.add('visible'), 10);
        document.getElementById('block-tokens').classList.remove('hidden');
    } else if (result === 'embeddings') {
        document.getElementById('path2').classList.remove('hidden');
        setTimeout(() => document.getElementById('path2').classList.add('visible'), 10);
        document.getElementById('block-embeddings').classList.remove('hidden');
    } else if (result === 'ready') {
        document.getElementById('path3').classList.remove('hidden');
        setTimeout(() => document.getElementById('path3').classList.add('visible'), 10);
        document.getElementById('block-ready').classList.remove('hidden');
    }
}

function connectContext(answer) {
    const feedback = document.getElementById("context-feedback");
    const path = document.getElementById("spotlight-path");
    const bank = document.getElementById("word-bank");
    const money = document.querySelector(`.clickable-word`);

    feedback.style.display = "block";

    if (answer === 'money') {
        feedback.innerText = "Bullseye! 'Money' gives 'Bank' its financial meaning. This focus is SELF-ATTENTION.";
        feedback.style.color = "#34c759"; // Success green

        // Draw SVG Spotlight
        const bankRect = bank.getBoundingClientRect();
        const moneyRect = money.getBoundingClientRect();
        const containerRect = document.getElementById("connector-canvas-container").getBoundingClientRect();

        const x1 = (bankRect.left + bankRect.width / 2) - containerRect.left;
        const x2 = (moneyRect.left + moneyRect.width / 2) - containerRect.left;
        const y = 30;

        path.setAttribute("d", `M ${x1} ${y} Q ${(x1 + x2) / 2} 0 ${x2} ${y}`);
        path.classList.remove("hidden");
    } else {
        feedback.innerText = "Almost! Think about which word removes the ambiguity of 'BANK'.";
        feedback.style.color = "#ff3b30";
    }
}

// Level 5: Self-Attention
function initSelfAttention() {
    const tbody = document.querySelector("#qkv-table tbody");
    tbody.innerHTML = "";
    const data = [
        { word: "Transformers (X1)", q: "[2, 1]", k: "[2, 1]", v: "[4, 4]" },
        { word: "are (X2)", q: "[0, 1]", k: "[0, 1]", v: "[1, 1]" },
        { word: "amazing (X3)", q: "[2, 1]", k: "[2, 2]", v: "[10, 8]" }
    ];

    data.forEach(row => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${row.word}</td>
            <td>${row.q}</td>
            <td>${row.k}</td>
            <td>${row.v}</td>
        `;
        tbody.appendChild(tr);
    });
}

// Level 7: Ethics
function fixBias() {
    const card = document.querySelector("#level7 .ethics-card.bias");
    const text = card.querySelector("p strong");
    text.innerText = "their";
    card.querySelector(".feedback").innerText = "Success! Gender-neutral language reduces bias.";
    card.querySelector(".feedback").style.color = "var(--accent-success)";
}

// Final Exam Logic
const finalExamData = [
    { q: "Which part of the Transformer generates the output word-by-word?", opts: ["ENCODER (The Reader)", "DECODER (The Writer)", "Tokenizer"], correct: "B" },
    { q: "In the Attention math, what represents 'What I'm looking for'?", opts: ["Key (K)", "Value (V)", "Query (Q)"], correct: "C" },
    { q: "Why do we need 'Masked' Attention in the Decoder?", opts: ["To keep the words private", "To prevent the AI from 'peeking' at future words", "To make the math faster"], correct: "B" },
    { q: "'Tokenization' is the process of:", opts: ["Translating English to Hindi", "Breaking text into IDs and Vectors", "Encrypting the AI's thoughts"], correct: "B" },
    { q: "A 'Hallucination' in an LLM means:", opts: ["The AI is dreaming", "The AI confidently states something that is factually false", "The AI has stopped working"], correct: "B" },
    { q: "True or False: Bias in AI usually happens because the AI is evil.", opts: ["True", "False (It comes from patterns in historical training data)"], correct: "B" }
];

function loadFinalQuiz() {
    const container = document.getElementById("final-quiz-container");
    container.innerHTML = "";
    finalExamData.forEach((item, i) => {
        const div = document.createElement("div");
        div.className = "quiz-item";
        div.setAttribute("data-question", `f-${i}`);
        div.innerHTML = `
            <p>${i + 1}. ${item.q}</p>
            ${item.opts.map((opt, idx) => `
                <button class="quiz-opt" onclick="checkFinalQuiz(${i}, '${String.fromCharCode(65 + idx)}')">${String.fromCharCode(65 + idx)}. ${opt}</button>
            `).join("")}
        `;
        container.appendChild(div);
    });
}

let score = 0;
function checkFinalQuiz(index, choice) {
    const parent = document.querySelector(`[data-question="f-${index}"]`);
    const options = parent.querySelectorAll(".quiz-opt");
    const item = finalExamData[index];

    options.forEach(opt => {
        opt.classList.remove("correct", "incorrect");
        if (opt.innerText.startsWith(item.correct)) {
            opt.classList.add("correct");
        } else if (opt.innerText.startsWith(choice)) {
            opt.classList.add("incorrect");
        }
        opt.disabled = true;
    });

    if (choice === item.correct) score++;
    if (document.querySelectorAll(".quiz-opt[disabled]").length === finalExamData.length * 3) {
        document.getElementById("certification").classList.remove("hidden");
        document.getElementById("certification").classList.add("fade-in");
    }
}

// Final Exam Logic and navigation are now integrated into showLevel

function advanceMaster(step, result) {
    if (result === 'wrong') {
        const feedback = ["Not quite! Think about the path we've taken...", "Almost! Remember the Engine Room steps?", "Try again! The data flow follows a specific order."];
        alert(feedback[Math.floor(Math.random() * feedback.length)]);
        return;
    }

    // Hide current question
    document.getElementById(`m-q${step}`).classList.add('hidden');
    document.getElementById(`m-q${step}`).classList.remove('active');

    // Show next question or final
    const next = step + 1;
    let nextEl = document.getElementById(`m-q${next}`);
    if (!nextEl) nextEl = document.getElementById('master-final');

    nextEl.classList.remove('hidden');
    nextEl.classList.add('active');

    // Reveal Diagram Parts (SVG blocks and lines)
    const mapping = {
        'tokens': ['m-tokens', 'm-line-1'],
        'pos': ['m-pos', 'm-line-2'],
        'attn': ['m-attn', 'm-line-3'],
        'ffn': ['m-ffn', 'm-line-4'],
        'norm': ['m-norm', 'm-line-5'],
        'ready': ['m-ready', 'm-line-6']
    };

    if (mapping[result]) {
        const [blockId, lineId] = mapping[result];
        document.getElementById(blockId).classList.remove('hidden');
        const line = document.getElementById(lineId);
        line.classList.remove('hidden');
        setTimeout(() => line.classList.add('visible'), 10);
    }
}

// Masked Attention Game Logic
let currentRevealStep = 0;
const totalRevealSteps = 3; // अद्भुत, हैं, [EOS]

function revealNextWord() {
    if (currentRevealStep < totalRevealSteps) {
        currentRevealStep++;
        const wordEl = document.getElementById(`rw-${currentRevealStep}`);
        if (wordEl) {
            wordEl.classList.remove('hidden');
            wordEl.classList.add('visible');
        }

        if (currentRevealStep === totalRevealSteps) {
            document.getElementById('reveal-btn').classList.add('hidden');
            document.getElementById('reset-reveal').classList.remove('hidden');
        }
    }
}

function resetReveal() {
    currentRevealStep = 0;
    const words = document.querySelectorAll('.r-word');
    words.forEach((word, index) => {
        if (index === 0) {
            word.classList.add('visible');
            word.classList.remove('hidden');
        } else {
            word.classList.add('hidden');
            word.classList.remove('visible');
        }
    });

    document.getElementById('reveal-btn').classList.remove('hidden');
    document.getElementById('reset-reveal').classList.add('hidden');
}

function advanceDecoderMaster(step, result) {
    if (result === 'wrong') {
        const feedback = [
            "Not quite! Remember: Skills 1-3 happen in order.",
            "Almost! Think about how the Writer (Decoder) works.",
            "Try again! Follow the 1 &rarr; 2 &rarr; 3 Skill flow."
        ];
        alert(feedback[Math.floor(Math.random() * feedback.length)]);
        return;
    }

    // Hide current question
    document.getElementById(`d-q${step}`).classList.add('hidden');
    document.getElementById(`d-q${step}`).classList.remove('active');

    // Show next question or final
    const next = step + 1;
    let nextEl = document.getElementById(`d-q${next}`);
    if (!nextEl) nextEl = document.getElementById('decoder-master-final');

    nextEl.classList.remove('hidden');
    nextEl.classList.add('active');

    // Reveal Diagram Parts (SVG blocks and lines)
    const mapping = {
        'memories': ['d-block-memories', 'd-line-1'],
        'handshake': ['d-block-handshake', 'd-line-2'],
        'vocab': ['d-block-vocab', 'd-line-3'],
        'forcing': ['d-block-forcing', 'd-line-4'],
        'ready': ['d-block-ready', 'd-line-5']
    };

    if (mapping[result]) {
        const [blockId, lineId] = mapping[result];
        document.getElementById(blockId).classList.remove('hidden');
        const line = document.getElementById(lineId);
        line.classList.remove('hidden');
        setTimeout(() => line.classList.add('visible'), 10);
    }
}

// Level 7: Ethics & Responsible AI Logic

// 7.2 Bias Mitigation
function fixDataBias() {
    const maleStack = document.querySelector('.interactive-bias-scale .male-stack'); // Will need to add classes to HTML
    const femaleStack = document.querySelector('.interactive-bias-scale .female-stack');
    const msg = document.getElementById('bias-fixed-msg');

    // I need to update HTML to have these classes or select by hierarchy
    // Let's use the style manipulation directly on the elements we defined in HTML
    const stacks = document.querySelectorAll('.interactive-bias-scale > div > div');
    // male stack container is stacks[0], female is stacks[2] considering the "▲" is [1]

    const maleBar = stacks[0].querySelector('div:first-child');
    const femaleBar = stacks[2].querySelector('div:first-child');

    // Animate to 50/50
    maleBar.style.height = "70px"; // Balanced height
    maleBar.style.background = "#34c759";
    maleBar.querySelector('span').innerText = "50%";

    femaleBar.style.height = "70px"; // Balanced height
    femaleBar.style.background = "#34c759";
    femaleBar.querySelector('span').innerText = "50%";
    femaleBar.querySelector('span').style.top = "50%";
    femaleBar.querySelector('span').style.transform = "translate(-50%, -50%)";
    femaleBar.querySelector('span').style.color = "white";

    msg.classList.remove('hidden');
    msg.classList.add('fade-in');
}

// 7.3 Hallucinations (Dice Roll)
function rollDice() {
    const resultBox = document.getElementById('hallucination-result');
    const roll = Math.random();

    resultBox.classList.remove('hidden');
    resultBox.style.opacity = '0';
    setTimeout(() => resultBox.style.opacity = '1', 100);

    if (roll > 0.95) { // 5% chance of Hallucination
        resultBox.innerHTML = `
            <div style="font-size: 3rem;">🎲 5% (Roll: ${(roll * 100).toFixed(1)}%)</div>
            <h3 style="color: #ff3b30; margin-top: 10px;">HALLUCINATION DETECTED!</h3>
            <p>"The moon is made of <strong style="color: #ff3b30; font-size: 1.2rem;">CHEESE</strong>."</p>
            <small>The AI picked a low-probability word just by chance!</small>
        `;
        resultBox.style.border = "4px solid #ff3b30";
        resultBox.style.color = "#ff3b30";
    } else {
        resultBox.innerHTML = `
            <div style="font-size: 3rem;">🎲 95% (Roll: ${(roll * 100).toFixed(1)}%)</div>
            <h3 style="color: #34c759; margin-top: 10px;">FACTUAL OUTPUT</h3>
            <p>"The moon is made of <strong style="color: #34c759; font-size: 1.2rem;">ROCK</strong>."</p>
            <small>The AI picked the most likely word.</small>
        `;
        resultBox.style.border = "4px solid #34c759";
        resultBox.style.color = "#34c759";
    }
}

// 7.4 Grandma Jailbreak (Safety)
function toggleGuardrail(active) {
    const responseBox = document.getElementById('jailbreak-response');
    const shield = document.getElementById('guardrail-shield');

    if (active) {
        shield.style.opacity = "1";
        shield.style.transform = "scale(1)";
        responseBox.innerHTML = `
            <strong style="color: #34c759;">🤖 AI System:</strong><br>
            "I cannot fulfill this request. Making napalm is dangerous and illegal. can I help you bake cookies instead?"
        `;
        responseBox.style.borderLeft = "5px solid #34c759";
        responseBox.style.background = "#f0fdf4";
    } else {
        shield.style.opacity = "0.2";
        shield.style.transform = "scale(0.9)";
        responseBox.innerHTML = `
            <strong style="color: #ff3b30;">🤖 AI System (Unsafe):</strong><br>
            "Sure, honey! Here is the recipe for napalm: Mix styrofoam and gasoline..."
        `;
        responseBox.style.borderLeft = "5px solid #ff3b30";
        responseBox.style.background = "#fff5f5";
    }
}

// Initial Call
updateProgress();
tokenize();
initSelfAttention();
showLevel(0);
