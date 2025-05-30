let currentLanguage = localStorage.getItem('appLanguage') || 'en';
let currentAffirmationObject = null; // Stores the currently displayed affirmation {en: '', ja: ''}

// Bilingual affirmations list
const allAffirmations = [
    { en: "Today is a brand new day, full of possibilities.", ja: "今日は可能性に満ちた、全く新しい一日です。" },
    { en: "I am capable of amazing things.", ja: "私には素晴らしいことを成し遂げる能力があります。" },
    { en: "I choose to focus on the positive.", ja: "私はポジティブなことに焦点を合わせることを選びます。" },
    { en: "I am grateful for all that I have.", ja: "私が持っているすべてのものに感謝しています。" },
    { en: "I approach challenges with courage and strength.", ja: "私は勇気と力をもって困難に立ち向かいます。" },
    { en: "My mind is calm and my heart is at peace.", ja: "私の心は穏やかで、私の心は平和です。" },
    { en: "I embrace learning and growth.", ja: "私は学びと成長を受け入れます。" },
    { en: "I radiate kindness and compassion.", ja: "私は優しさと思いやりの心で輝いています。" },
    { en: "Every day, in every way, I am getting better.", ja: "毎日、あらゆる面で、私は良くなっています。" },
    { en: "I am resilient and can overcome any obstacle.", ja: "私には回復力があり、どんな障害も乗り越えられます。" },
    { en: "I am worthy of love and happiness.", ja: "私は愛と幸福に値します。" },
    { en: "I trust my intuition and inner wisdom.", ja: "私は自分の直感と内なる知恵を信頼します。" },
    { en: "I am creating a life I love.", ja: "私は自分が愛する人生を創造しています。" },
    { en: "I am surrounded by positive energy.", ja: "私はポジティブなエネルギーに囲まれています。" },
    { en: "I let go of what I cannot control.", ja: "コントロールできないことは手放します。" },
    { en: "I am open to new opportunities and experiences.", ja: "私は新しい機会や経験に対して開かれています。" },
    { en: "I am strong, capable, and confident.", ja: "私は強く、有能で、自信に満ちています。" },
    { en: "I choose peace and joy today.", ja: "私は今日、平和と喜びを選びます。" },
    { en: "My potential is limitless.", ja: "私の可能性は無限です。" },
    { en: "I am grateful for my unique journey.", ja: "私は自分のユニークな旅に感謝しています。" },
    { en: "I attract abundance and prosperity.", ja: "私は豊かさと繁栄を引き寄せます。" },
    { en: "I am a source of inspiration to others.", ja: "私は他の人々にとってインスピレーションの源です。" },
    { en: "I forgive myself and others easily.", ja: "私は自分自身と他人を容易に許します。" },
    { en: "I am making a positive impact in the world.", ja: "私は世界にポジティブな影響を与えています。" },
    { en: "I am healthy, vibrant, and full of energy.", ja: "私は健康で、活気に満ち、エネルギーに溢れています。" },
    { en: "I believe in my dreams and work towards them.", ja: "私は自分の夢を信じ、それに向かって努力します。" },
    { en: "I find beauty in the simple things.", ja: "私はシンプルなものの中に美しさを見つけます。" },
    { en: "I am always learning and evolving.", ja: "私は常に学び、進化しています。" },
    { en: "I handle challenges with grace and resilience.", ja: "私は優雅さと回復力をもって困難に対処します。" },
    { en: "My heart is open and I give and receive love freely.", ja: "私の心は開かれており、自由に愛を与え、受け取ります。" }
];

const setLanguage = (lang) => {
    currentLanguage = lang;
    localStorage.setItem('appLanguage', lang);
    const elements = document.querySelectorAll('[data-lang-key]');
    elements.forEach(element => {
        const key = element.getAttribute('data-lang-key');
        if (translations[lang] && translations[lang][key]) {
            element.innerHTML = translations[lang][key];
        }
    });
    // Update the language switcher button text
    const langSwitcherButton = document.getElementById('lang-switcher');
    if (langSwitcherButton) {
        langSwitcherButton.textContent = lang === 'en' ? 'JA' : 'EN';
    }

    // Update modal content if a modal is open (basic example for titles)
    // More specific translation logic will be needed inside startPractice/openActivity
    // if they are called *after* a language switch while a modal is open,
    // or if their content needs to be re-rendered.
    // For now, this focuses on static page elements.

    // If affirmation modal is open, update its text
    const affirmationModalInstance = document.getElementById('affirmation-modal');
    if (affirmationModalInstance && affirmationModalInstance.style.display === 'block' && currentAffirmationObject) {
        const affirmationTextElement = document.getElementById('affirmation-text');
        if (affirmationTextElement && currentAffirmationObject[lang]) {
            affirmationTextElement.textContent = currentAffirmationObject[lang];
        }
        // Also ensure the title of the affirmation modal is re-translated if it's open
        const affirmationPopupTitle = affirmationModalInstance.querySelector('[data-lang-key="affirmationPopupTitle"]');
        if (affirmationPopupTitle && translations[lang] && translations[lang]['affirmationPopupTitle']) {
            affirmationPopupTitle.innerHTML = translations[lang]['affirmationPopupTitle'];
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const langSwitcherButton = document.getElementById('lang-switcher');
    if (langSwitcherButton) {
        langSwitcherButton.addEventListener('click', () => {
            const newLang = currentLanguage === 'en' ? 'ja' : 'en';
            setLanguage(newLang);
        });
    }

    // Apply initial language
    setLanguage(currentLanguage);

    // Affirmation Modal Elements and Listeners
    const dailyAffirmationLink = document.getElementById('daily-affirmation-link');
    const affirmationModal = document.getElementById('affirmation-modal');
    const affirmationTextElement = document.getElementById('affirmation-text');
    const affirmationCloseButton = affirmationModal.querySelector('.affirmation-close');

    if (dailyAffirmationLink) {
        dailyAffirmationLink.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default anchor behavior
            const affirmationModal = document.getElementById('affirmation-modal');
            const affirmationTextElement = document.getElementById('affirmation-text');
            if (!affirmationModal || !affirmationTextElement) return;

            const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
            let lastAffirmationDate = localStorage.getItem('lastAffirmationDate');
            let lastAffirmationIndex = parseInt(localStorage.getItem('lastAffirmationIndex'), 10);

            let newAffirmationIndex;

            if (lastAffirmationDate === today && !isNaN(lastAffirmationIndex) && lastAffirmationIndex >= 0 && lastAffirmationIndex < allAffirmations.length) {
                // Already shown an affirmation today, show the same one
                newAffirmationIndex = lastAffirmationIndex;
            } else {
                // New day or no valid previous affirmation, pick a new one
                if (isNaN(lastAffirmationIndex) || lastAffirmationIndex < 0 || lastAffirmationIndex >= allAffirmations.length -1 ) {
                    newAffirmationIndex = 0; // Start from the beginning or pick random
                } else {
                    newAffirmationIndex = lastAffirmationIndex + 1;
                }
                if (newAffirmationIndex >= allAffirmations.length) { // Wrap around
                    newAffirmationIndex = 0;
                }
                localStorage.setItem('lastAffirmationDate', today);
                localStorage.setItem('lastAffirmationIndex', newAffirmationIndex.toString());
            }
            
            currentAffirmationObject = allAffirmations[newAffirmationIndex];
            affirmationTextElement.textContent = currentAffirmationObject[currentLanguage];
            
            // Ensure modal title is translated
            const affirmationPopupTitle = affirmationModal.querySelector('[data-lang-key="affirmationPopupTitle"]');
            if (affirmationPopupTitle && translations[currentLanguage] && translations[currentLanguage]['affirmationPopupTitle']) {
                affirmationPopupTitle.innerHTML = translations[currentLanguage]['affirmationPopupTitle'];
            }

            affirmationModal.style.display = 'flex';
        });
    }

    if (affirmationCloseButton) {
        affirmationCloseButton.onclick = () => {
            affirmationModal.style.display = 'none';
            currentAffirmationObject = null;
        };
    }

    // Close affirmation modal if clicked outside
    window.addEventListener('click', (event) => {
        if (event.target === affirmationModal) {
            affirmationModal.style.display = 'none';
            currentAffirmationObject = null;
        }
    });

    // Remove the old showDailyAffirmation if it exists as a standalone function
// function showDailyAffirmation() { ... } - this logic is now inside the event listener.

    // Initialize modal
    const modal = document.getElementById('practice-modal');
    const closeBtn = document.querySelector('.close');
    
    closeBtn.onclick = () => {
        modal.style.display = 'none';
    }

    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }

    // Activity Modal listeners
    const activityModal = document.getElementById('activity-modal');
    const activityCloseButton = activityModal.querySelector('.activity-close');

    if (activityCloseButton) {
        activityCloseButton.onclick = () => {
            activityModal.style.display = 'none';
        };
    }

    window.addEventListener('click', (event) => {
        if (event.target === activityModal) {
            activityModal.style.display = 'none';
        }
    });

});

// Ensure translations are available for dynamic content
// This is a simplified approach. For full dynamic content translation,
// you might pass the current language or access it within these functions
// and use translation keys for all dynamic strings.

function openActivity(activityType) {
    const modal = document.getElementById('activity-modal');
    const titleElement = document.getElementById('activity-title');
    const contentElement = document.getElementById('activity-content');

    if (!modal || !titleElement || !contentElement) {
        console.error('Activity modal elements not found!');
        return;
    }

    // Default content - can be expanded with a switch for activityType
    let activityTitleKey = 'activityModalTitlePlaceholder';
    let activityContentHTML = `<p data-lang-key="activityModalContentPlaceholder">Activity content for ${activityType} will appear here.</p>`;

    switch(activityType) {
        case 'gratitudeJournal':
            activityTitleKey = 'activityGratitudeTitle'; // Use existing key for now, or create specific modal title key
            activityContentHTML = `<p data-lang-key="gratitudeJournalPrompt">Take a few moments to write down three things you are grateful for today.</p><textarea id="gratitude-journal-entry" rows="5" style="width: 95%; margin-top: 10px;" placeholder="${translations[currentLanguage]?.gratitudeJournalPlaceholder || 'Type here...'}"></textarea><button onclick="saveGratitudeEntry()" style="margin-top:10px;" data-lang-key="saveButtonText">Save Entry</button>`;
            break;
        case 'mindfulDrawing':
            activityTitleKey = 'activityDrawingTitle';
            activityContentHTML = `<p data-lang-key="mindfulDrawingPrompt">Find a piece of paper and something to draw with. Focus on the sensation of drawing, the lines, and the colors. Let your creativity flow without judgment.</p><p style="margin-top:10px;" data-lang-key="mindfulDrawingTip">There's no right or wrong way to do this, just enjoy the process!</p>`;
            break;
        // Add more cases for other activities as they are developed
        default:
            // Keep default placeholders for unknown activity types
            activityContentHTML = `<p>Details for '${activityType}' are coming soon!</p>`;
            break;
    }

    // Set title using translation
    if (translations[currentLanguage] && translations[currentLanguage][activityTitleKey]) {
        titleElement.innerHTML = translations[currentLanguage][activityTitleKey];
    } else {
        titleElement.innerHTML = activityType; // Fallback to activity type if key not found
    }
    
    // Set content (already includes data-lang-key for static parts or uses dynamic HTML)
    contentElement.innerHTML = activityContentHTML;
    
    // Re-apply translations for any new data-lang-key attributes within the dynamic content
    const dynamicElements = contentElement.querySelectorAll('[data-lang-key]');
    dynamicElements.forEach(element => {
        const key = element.getAttribute('data-lang-key');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            element.innerHTML = translations[currentLanguage][key];
        }
    });

    modal.style.display = 'flex';
}

function saveGratitudeEntry() {
    const entry = document.getElementById('gratitude-journal-entry').value;
    if (entry.trim() === "") {
        alert(translations[currentLanguage]?.gratitudeJournalEmptyAlert || "Please write something before saving.");
        return;
    }
    // For now, just log it. Later, this could save to localStorage or a backend.
    console.log("Gratitude Entry:", entry);
    alert(translations[currentLanguage]?.gratitudeJournalSavedAlert || "Entry saved! (Logged to console for now)");
    document.getElementById('activity-modal').style.display = 'none'; // Close modal after saving
}

function startPractice(type = 'breathing') {
    const modal = document.getElementById('practice-modal');
    const content = document.getElementById('practice-content');
    
    let practiceContent = '';
    
    switch(type) {
        case 'breathing':
            practiceContent = `
                <h3>Focus on Breathing</h3>
                <p class="instructions">
                    Let's practice focusing on our breath. Find a comfortable position, either sitting or lying down.
                </p>
                <div class="practice-timer">
                    <div class="progress-bar"></div>
                </div>
                <div class="audio-guide">
                    <audio controls autoplay>
                        <source src="audio/breathing.mp3" type="audio/mpeg">
                        Your browser does not support the audio element.
                    </audio>
                </div>
                <div class="practice-steps">
                    <ol>
                        <li>Find a comfortable position</li>
                        <li>Close your eyes gently</li>
                        <li>Focus on your natural breath</li>
                        <li>Notice the sensation of air entering and leaving your nostrils</li>
                        <li>When your mind wanders, gently bring it back to your breath</li>
                    </ol>
                </div>
            `;
            break;
            
        case 'body-scan':
            practiceContent = `
                <h3>Body Scan</h3>
                <p class="instructions">
                    Let's explore awareness of your body sensations. Find a comfortable lying position.
                </p>
                <div class="practice-timer">
                    <div class="progress-bar"></div>
                </div>
                <div class="audio-guide">
                    <audio controls autoplay>
                        <source src="audio/body-scan.mp3" type="audio/mpeg">
                        Your browser does not support the audio element.
                    </audio>
                </div>
                <div class="practice-steps">
                    <ol>
                        <li>Lie down in a comfortable position</li>
                        <li>Close your eyes gently</li>
                        <li>Start at your toes and slowly move your attention up your body</li>
                        <li>Notice any sensations, warmth, or tension</li>
                        <li>When your mind wanders, gently bring it back to your body</li>
                    </ol>
                </div>
            `;
            break;
            
        case 'mindful-movement':
            practiceContent = `
                <h3>Mindful Movement</h3>
                <p class="instructions">
                    Let's connect your body and mind through simple movements.
                </p>
                <div class="practice-timer">
                    <div class="progress-bar"></div>
                </div>
                <div class="video-guide">
                    <video controls autoplay>
                        <source src="video/mindful-movement.mp4" type="video/mp4">
                        Your browser does not support the video element.
                    </video>
                </div>
                <div class="practice-steps">
                    <ol>
                        <li>Find a comfortable standing position</li>
                        <li>Focus on your breath and body movements</li>
                        <li>Move slowly and deliberately</li>
                        <li>Notice how your body feels with each movement</li>
                        <li>When your mind wanders, gently bring it back to your movements</li>
                    </ol>
                </div>
            `;
            break;
            
        case 'loving-kindness':
            practiceContent = `
                <h3>Loving Kindness</h3>
                <p class="instructions">
                    Let's cultivate kindness and compassion through meditation.
                </p>
                <div class="practice-timer">
                    <div class="progress-bar"></div>
                </div>
                <div class="audio-guide">
                    <audio controls autoplay>
                        <source src="audio/loving-kindness.mp3" type="audio/mpeg">
                        Your browser does not support the audio element.
                    </audio>
                </div>
                <div class="practice-steps">
                    <ol>
                        <li>Find a comfortable sitting position</li>
                        <li>Close your eyes gently</li>
                        <li>Repeat phrases of kindness to yourself</li>
                        <li>Extend these phrases to others</li>
                        <li>When your mind wanders, gently bring it back to the phrases</li>
                    </ol>
                </div>
            `;
            break;
        case 'mindful-walking':
            practiceContent = `
                <h3>Mindful Walking</h3>
                <p class="instructions">
                    Let's practice bringing awareness to the experience of walking. Find a space where you can walk back and forth a few steps.
                </p>
                <div class="audio-guide">
                    <audio controls autoplay>
                        <source src="audio/mindful-walking.mp3" type="audio/mpeg">
                        Your browser does not support the audio element. (Placeholder: mindful-walking.mp3)
                    </audio>
                </div>
                <div class="practice-steps">
                    <ol>
                        <li>Stand comfortably, feeling your feet on the ground.</li>
                        <li>Begin to walk slowly, paying attention to the sensation of lifting one foot, moving it through space, and placing it down.</li>
                        <li>Notice the sensations in your feet and legs.</li>
                        <li>If your mind wanders, gently bring your attention back to the sensations of walking.</li>
                        <li>Continue for a few minutes, or as long as you feel comfortable.</li>
                    </ol>
                </div>
            `;
            break;
        case 'mindful-eating':
            practiceContent = `
                <h3>Mindful Eating</h3>
                <p class="instructions">
                    Let's bring mindful awareness to the simple act of eating. Take a small piece of food (like a raisin or a nut).
                </p>
                <div class="audio-guide">
                    <audio controls autoplay>
                        <source src="audio/mindful-eating.mp3" type="audio/mpeg">
                        Your browser does not support the audio element. (Placeholder: mindful-eating.mp3)
                    </audio>
                </div>
                <div class="practice-steps">
                    <ol>
                        <li>Look at the food as if you've never seen it before. Notice its texture, color, shape.</li>
                        <li>Touch it, feeling its surface.</li>
                        <li>Smell it, noticing any aroma.</li>
                        <li>Place it in your mouth, but don't chew yet. Notice the sensations.</li>
                        <li>Begin to chew slowly, paying attention to the taste and texture.</li>
                        <li>Swallow, noticing the sensation as it goes down.</li>
                        <li>Reflect on the experience.</li>
                    </ol>
                </div>
            `;
            break;
        case 'breathing-space':
            practiceContent = `
                <h3>Three Minute Breathing Space</h3>
                <p class="instructions">
                    This is a short practice to help you step out of automatic pilot and reconnect with the present moment.
                </p>
                <div class="audio-guide">
                    <audio controls autoplay>
                        <source src="audio/breathing-space.mp3" type="audio/mpeg">
                        Your browser does not support the audio element. (Placeholder: breathing-space.mp3)
                    </audio>
                </div>
                <div class="practice-steps">
                    <ol>
                        <li><strong>Step 1: Awareness.</strong> Bring awareness to your inner experience. What thoughts are going through your mind? What feelings are present? What body sensations are you aware of?</li>
                        <li><strong>Step 2: Gathering.</strong> Gently redirect your full attention to your breath. Experience the breath as it enters and leaves your body.</li>
                        <li><strong>Step 3: Expanding.</strong> Expand your awareness around your breathing to include your whole body, your posture, and facial expression. Sense the space around you.</li>
                    </ol>
                </div>
            `;
            break;
        case 'sounds-thoughts':
            practiceContent = `
                <h3>Sounds & Thoughts Meditation</h3>
                <p class="instructions">
                    This practice involves becoming aware of sounds and thoughts without getting caught up in them.
                </p>
                <div class="audio-guide">
                    <audio controls autoplay>
                        <source src="audio/sounds-thoughts.mp3" type="audio/mpeg">
                        Your browser does not support the audio element. (Placeholder: sounds-thoughts.mp3)
                    </audio>
                </div>
                <div class="practice-steps">
                    <ol>
                        <li>Find a comfortable sitting position and gently close your eyes.</li>
                        <li>Bring your awareness to any sounds you can hear. Listen to them as pure sound, without labeling or judging.</li>
                        <li>After a while, shift your attention to your thoughts. Observe them as they arise and pass, like clouds in the sky.</li>
                        <li>If you find yourself getting carried away by a sound or thought, gently bring your attention back.</li>
                        <li>Continue for the duration of the practice.</li>
                    </ol>
                </div>
            `;
            break;
        case 'mindful-seeing':
            practiceContent = `
                <h3>Mindful Seeing</h3>
                <p class="instructions">
                    Let's practice looking at something as if for the first time. Choose an object in your surroundings.
                </p>
                <div class="audio-guide">
                    <audio controls autoplay>
                        <source src="audio/mindful-seeing.mp3" type="audio/mpeg">
                        Your browser does not support the audio element. (Placeholder: mindful-seeing.mp3)
                    </audio>
                </div>
                <div class="practice-steps">
                    <ol>
                        <li>Settle into a comfortable position. Take a few gentle breaths.</li>
                        <li>Let your gaze rest on your chosen object.</li>
                        <li>Notice its colors, shapes, textures, and how light interacts with it.</li>
                        <li>Imagine you are seeing this object for the very first time, with curiosity.</li>
                        <li>If your mind wanders, gently bring your attention back to simply seeing.</li>
                    </ol>
                </div>
            `;
            break;
        case 'gratitude-meditation':
            practiceContent = `
                <h3>Gratitude Meditation</h3>
                <p class="instructions">
                    This practice helps cultivate a sense of appreciation and thankfulness.
                </p>
                <div class="audio-guide">
                    <audio controls autoplay>
                        <source src="audio/gratitude-meditation.mp3" type="audio/mpeg">
                        Your browser does not support the audio element. (Placeholder: gratitude-meditation.mp3)
                    </audio>
                </div>
                <div class="practice-steps">
                    <ol>
                        <li>Find a comfortable and quiet position. Close your eyes gently.</li>
                        <li>Bring to mind something or someone you are grateful for.</li>
                        <li>Notice any feelings that arise as you focus on this. Allow yourself to feel the gratitude.</li>
                        <li>You can continue by thinking of other things, people, or experiences you are grateful for.</li>
                        <li>Stay with each one for a few moments, soaking in the feeling of gratitude.</li>
                    </ol>
                </div>
            `;
            break;
        case 'mindful-listening-music':
            practiceContent = `
                <h3>Mindful Listening to Music</h3>
                <p class="instructions">
                    Choose a piece of music, perhaps something without lyrics if you're new to this. Let's listen with full attention.
                </p>
                <div class="audio-guide">
                    <audio controls autoplay>
                        <source src="audio/mindful-music-piece.mp3" type="audio/mpeg">
                        Your browser does not support the audio element. (Placeholder: mindful-music-piece.mp3 for the actual music)
                    </audio>
                </div>
                <div class="practice-steps">
                    <ol>
                        <li>Settle in and get comfortable. Press play on your chosen music.</li>
                        <li>Pay attention to the sounds, the different instruments, melodies, and rhythms.</li>
                        <li>Notice any emotions or sensations that arise as you listen.</li>
                        <li>If your mind wanders, gently bring your focus back to the music.</li>
                        <li>Listen to the entire piece with this focused awareness.</li>
                    </ol>
                </div>
            `;
            break;
    }
    
    content.innerHTML = practiceContent;
    modal.style.display = 'flex';
}

function getDailyAffirmation() {
    const affirmations = translations.affirmations;
    if (!affirmations || affirmations.length === 0) {
        return { [currentLanguage]: "No affirmations available." };
    }

    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    let lastAffirmationDate = localStorage.getItem('lastAffirmationDate');
    let lastAffirmationIndex = parseInt(localStorage.getItem('lastAffirmationIndex'), 10);

    if (lastAffirmationDate === today && affirmations[lastAffirmationIndex]) {
        return affirmations[lastAffirmationIndex];
    }

    let affirmationHistory = JSON.parse(localStorage.getItem('affirmationHistory')) || [];
    let randomIndex;
    let selectedAffirmation;
    let attempts = 0;
    const maxAttempts = affirmations.length * 2; // Prevent infinite loop

    do {
        randomIndex = Math.floor(Math.random() * affirmations.length);
        selectedAffirmation = affirmations[randomIndex];
        attempts++;
    } while (affirmationHistory.includes(randomIndex) && affirmations.length > affirmationHistory.length && attempts < maxAttempts);
    
    // If all affirmations have been shown recently (and history is full), or max attempts reached, just pick one
    if (attempts >= maxAttempts && affirmationHistory.includes(randomIndex)) {
        randomIndex = Math.floor(Math.random() * affirmations.length); 
        selectedAffirmation = affirmations[randomIndex];
    }


    localStorage.setItem('lastAffirmationDate', today);
    localStorage.setItem('lastAffirmationIndex', randomIndex.toString());

    affirmationHistory.push(randomIndex);
    if (affirmationHistory.length > Math.min(10, affirmations.length -1)) { // Keep history size reasonable
        affirmationHistory.shift();
    }
    localStorage.setItem('affirmationHistory', JSON.stringify(affirmationHistory));

    return selectedAffirmation;
}

function showDailyAffirmation() {
    const affirmationObject = getDailyAffirmation();
    currentAffirmationObject = affirmationObject; // Store for language switching

    const affirmationModal = document.getElementById('affirmation-modal');
    const affirmationTextElement = document.getElementById('affirmation-text');
    
    if (affirmationTextElement && affirmationObject && affirmationObject[currentLanguage]) {
        affirmationTextElement.textContent = affirmationObject[currentLanguage];
    }
    // Ensure the title is also set/translated correctly when opening
    const affirmationPopupTitle = affirmationModal.querySelector('[data-lang-key="affirmationPopupTitle"]');
    if (affirmationPopupTitle && translations[currentLanguage] && translations[currentLanguage]['affirmationPopupTitle']) {
        affirmationPopupTitle.innerHTML = translations[currentLanguage]['affirmationPopupTitle'];
    }

    if (affirmationModal) {
        affirmationModal.style.display = 'flex';
    }
}

function openActivity(type) {
    const modal = document.getElementById('practice-modal'); // Reusing the practice modal
    const content = document.getElementById('practice-content');
    let activityContent = '';

    switch(type) {
        case 'gratitudeJournal':
            activityContent = `
                <h3>Gratitude Journal</h3>
                <p class="instructions">
                    Take a few moments to reflect on your day. Write down three things you are grateful for and why.
                </p>
                <textarea id="gratitude-text" rows="5" placeholder="1. ...
2. ...
3. ..." style="width: 100%; margin-top: 10px; padding: 10px; border-radius: 5px; border: 1px solid #ccc;"></textarea>
                <button onclick="saveGratitude()" style="margin-top: 10px; padding: 10px 15px; background-color: var(--primary-color); color: white; border: none; border-radius: 5px; cursor: pointer;">Save Entry</button>
            `;
            break;
        case 'mindfulDrawing':
            activityContent = `
                <h3>Mindful Drawing</h3>
                <p class="instructions">
                    Find a quiet space and some drawing materials. Focus on the sensation of drawing – the movement of your hand, the texture of the paper. Don't worry about the outcome, just enjoy the process.
                </p>
                <p style="margin-top:10px;">You can draw anything that comes to mind, or try focusing on a simple object in front of you.</p>
                <div style="margin-top: 15px; text-align:center;">
                    <img src="https://via.placeholder.com/300x200.png?text=Mindful+Drawing+Space" alt="Mindful Drawing Placeholder" style="max-width:100%; border-radius: 5px;">
                </div>
            `;
            break;
        case 'mindfulListening':
            activityContent = `
                <h3>Mindful Listening</h3>
                <p class="instructions">
                    Find a comfortable position and close your eyes if you wish. Pay attention to the sounds around you. 
                </p>
                <p style="margin-top:10px;">Listen without judgment. Notice sounds near and far. What is the quietest sound you can hear? What is the loudest?</p>
                <div class="audio-guide" style="margin-top:15px;">
                    <p>Listen to this soundscape (optional):</p>
                    <audio controls>
                        <source src="audio/nature-sounds.mp3" type="audio/mpeg">
                        Your browser does not support the audio element. (Placeholder: nature_sounds.mp3)
                    </audio>
                </div>
            `;
            break;
        case 'emotionCheckIn':
            activityContent = `
                <h3 data-lang-key="modalContent.emotionCheckIn.title">${translations[currentLanguage].modalContent.emotionCheckIn.title}</h3>
                <p class="instructions" data-lang-key="modalContent.emotionCheckIn.introduction">${translations[currentLanguage].modalContent.emotionCheckIn.introduction}</p>
                
                <label for="emotionalCheckInInput" style="display:block; margin-top:15px;" data-lang-key="modalContent.emotionCheckIn.detailedInputLabel">${translations[currentLanguage].modalContent.emotionCheckIn.detailedInputLabel}</label>
                <textarea id="emotionalCheckInInput" rows="5" placeholder="${translations[currentLanguage].modalContent.emotionCheckIn.detailedInputPlaceholder}" style="width: 100%; margin-top: 5px; padding: 10px; border-radius: 5px; border: 1px solid #ccc; box-sizing: border-box;"></textarea>
                <button onclick="saveEmotionalCheckIn()" style="margin-top: 10px; padding: 10px 15px; background-color: var(--primary-color); color: white; border: none; border-radius: 5px; cursor: pointer;" data-lang-key="modalContent.emotionCheckIn.saveButtonText">${translations[currentLanguage].modalContent.emotionCheckIn.saveButtonText}</button>

                <div id="pastEmotionalCheckIns" style="margin-top: 20px;">
                    <h4 data-lang-key="modalContent.emotionCheckIn.savedCheckInsTitle">${translations[currentLanguage].modalContent.emotionCheckIn.savedCheckInsTitle}</h4>
                    <ul id="emotionalCheckInList" style="list-style-type: none; padding-left: 0;"></ul>
                </div>
                <p style="margin-top:15px;" data-lang-key="modalContent.emotionCheckIn.reflectionPrompt">${translations[currentLanguage].modalContent.emotionCheckIn.reflectionPrompt}</p>
            `;
            break;
        case 'mindfulMovements':
            activityContent = `
                <h3 data-lang-key="mindfulMovementsModalTitle">Mindful Movements & Stretching</h3>
                <p class="instructions" data-lang-key="mindfulMovementsIntro">Find a comfortable space where you can move a little. These gentle movements are designed to help you connect with your body and release tension.</p>
                <ul style="margin-top:15px; list-style-position: inside; padding-left: 20px;">
                    <li data-lang-key="mindfulMovementsPrompt1" style="margin-bottom: 10px;">Start with some gentle neck stretches. Slowly tilt your head from side to side, then gently look up and down. Feel the stretch.</li>
                    <li data-lang-key="mindfulMovementsPrompt2" style="margin-bottom: 10px;">Move to shoulder rolls. Roll your shoulders forwards a few times, then backwards. Notice any sensations.</li>
                    <li data-lang-key="mindfulMovementsPrompt3" style="margin-bottom: 10px;">Try some gentle wrist and ankle circles. How does this movement feel?</li>
                    <li data-lang-key="mindfulMovementsPrompt4" style="margin-bottom: 10px;">If you have space, try a gentle torso twist. Sitting or standing, slowly twist your upper body from side to side.</li>
                </ul>
                <p style="margin-top:15px;" data-lang-key="mindfulMovementsOutro">Remember to listen to your body and only move in ways that feel comfortable and safe.</p>
                <div class="audio-guide" style="margin-top:20px;">
                    <p data-lang-key="audioGuideLabel">Listen to guided instructions (optional):</p>
                    <audio controls style="width: 100%; margin-top: 5px;">
                        <source src="" type="audio/mpeg">
                        Your browser does not support the audio element.
                    </audio>
                </div>
            `;
            // Dynamically set audio source
            const audioElement = modal.querySelector('#practice-content audio source'); // Query within the correct modal content
            if (audioElement) {
                const audioFileName = `mindful_movements_${currentLanguage}.mp3`;
                audioElement.src = `audio/${currentLanguage}/${audioFileName}`;
                audioElement.parentElement.load(); // Reload the audio element to apply the new source
            } else {
                console.warn('Audio source element not found for mindfulMovements');
            }
            break;
        case 'sensoryAwareness':
            activityContent = `
                <h3 data-lang-key="sensoryAwarenessModalTitle">Sensory Awareness Exploration</h3>
                <p class="instructions" data-lang-key="sensoryAwarenessIntro">This activity helps you tune into your senses. Choose one sense to focus on (sight, sound, smell, taste, or touch) or follow the prompts to explore several.</p>
                <ul style="margin-top:15px; list-style-position: inside; padding-left: 20px;">
                    <li data-lang-key="sensoryAwarenessPromptSight" style="margin-bottom: 10px;">Sight: Look around you. Notice colors, shapes, and textures you hadn't paid attention to before. Find something small and examine it closely.</li>
                    <li data-lang-key="sensoryAwarenessPromptSound" style="margin-bottom: 10px;">Sound: Close your eyes for a moment. What sounds can you hear? Notice sounds near and far, loud and soft.</li>
                    <li data-lang-key="sensoryAwarenessPromptSmell" style="margin-bottom: 10px;">Smell: What can you smell right now? If possible, find something with a distinct smell (like a fruit or a flower) and gently inhale its aroma.</li>
                    <li data-lang-key="sensoryAwarenessPromptTouch" style="margin-bottom: 10px;">Touch: Pick up an object near you. Notice its texture, temperature, and weight. You can also focus on the sensation of your clothes on your skin or your feet on the floor.</li>
                    <li data-lang-key="sensoryAwarenessPromptTaste" style="margin-bottom: 10px;">Taste (if you have something to eat/drink): Take a small bite or sip. Notice the flavors, textures, and temperature in your mouth slowly.</li>
                </ul>
                <p style="margin-top:15px;" data-lang-key="sensoryAwarenessOutro">Focusing on your senses can help ground you in the present moment.</p>
                <div class="audio-guide" style="margin-top:20px;">
                    <p data-lang-key="audioGuideLabel">Listen to guided instructions (optional):</p>
                    <audio controls style="width: 100%; margin-top: 5px;">
                        <source src="" type="audio/mpeg">
                        Your browser does not support the audio element.
                    </audio>
                </div>
            `;
            // Dynamically set audio source
            const sensoryAudioElement = modal.querySelector('#practice-content audio source');
            if (sensoryAudioElement) {
                const audioFileName = `sensory_awareness_${currentLanguage}.mp3`;
                sensoryAudioElement.src = `audio/${currentLanguage}/${audioFileName}`;
                sensoryAudioElement.parentElement.load();
            } else {
                console.warn('Audio source element not found for sensoryAwareness');
            }
            break;
        case 'natureObservation':
            activityContent = `
                <h3 data-lang-key="natureObservationModalTitle">Observing Nature's Wonders</h3>
                <p class="instructions" data-lang-key="natureObservationIntro">Find a comfortable spot where you can observe nature, whether it's a plant indoors, a view from your window, or being outside.</p>
                <ul style="margin-top:15px; list-style-position: inside; padding-left: 20px;">
                    <li data-lang-key="natureObservationPrompt1" style="margin-bottom: 10px;">Look closely at a plant or flower. Notice its colors, shapes, and textures. Are there any insects or dew drops?</li>
                    <li data-lang-key="natureObservationPrompt2" style="margin-bottom: 10px;">If you can see animals (birds, insects, squirrels), observe their movements and behaviors without disturbing them.</li>
                    <li data-lang-key="natureObservationPrompt3" style="margin-bottom: 10px;">Look up at the sky. What do you see? Notice the clouds, their shapes, and how they move. If it's night, observe the moon and stars.</li>
                    <li data-lang-key="natureObservationPrompt4" style="margin-bottom: 10px;">Listen to the sounds of nature. Can you hear birds, wind, rustling leaves, or rain?</li>
                </ul>
                <p style="margin-top:15px;" data-lang-key="natureObservationOutro">Spending a few moments observing nature can be calming and refreshing.</p>
                <div class="audio-guide" style="margin-top:20px;">
                    <p data-lang-key="audioGuideLabel">Listen to guided instructions (optional):</p>
                    <audio controls style="width: 100%; margin-top: 5px;">
                        <source src="" type="audio/mpeg">
                        Your browser does not support the audio element.
                    </audio>
                </div>
            `;
            // Dynamically set audio source
            const natureAudioElement = modal.querySelector('#practice-content audio source');
            if (natureAudioElement) {
                const audioFileName = `nature_observation_${currentLanguage}.mp3`;
                natureAudioElement.src = `audio/${currentLanguage}/${audioFileName}`;
                natureAudioElement.parentElement.load();
            } else {
                console.warn('Audio source element not found for natureObservation');
            }
            break;
        case 'kindnessReflection':
            activityContent = `
                <h3 data-lang-key="kindnessReflectionModalTitle">Reflecting on Kindness</h3>
                <p class="instructions" data-lang-key="kindnessReflectionIntro">Take a few quiet moments to think about kindness. This can be kindness you've shown to others, or kindness others have shown to you.</p>
                <ul style="margin-top:15px; list-style-position: inside; padding-left: 20px;">
                    <li data-lang-key="kindnessReflectionPrompt1" style="margin-bottom: 10px;">Think about a time recently when someone was kind to you. What did they do? How did it make you feel?</li>
                    <li data-lang-key="kindnessReflectionPrompt2" style="margin-bottom: 10px;">Recall a time you were kind to someone else. What motivated you? How do you think it made the other person feel? How did it make you feel?</li>
                    <li data-lang-key="kindnessReflectionPrompt3" style="margin-bottom: 10px;">Consider small, everyday acts of kindness. These can be as simple as a smile, holding a door, or offering help.</li>
                    <li data-lang-key="kindnessReflectionPrompt4" style="margin-bottom: 10px;">How can you bring a little more kindness into your day today, for yourself or for others?</li>
                </ul>
                <p style="margin-top:15px;" data-lang-key="kindnessReflectionOutro">Reflecting on kindness can help us appreciate it more and inspire us to be kinder.</p>
                <div class="audio-guide" style="margin-top:20px;">
                    <p data-lang-key="audioGuideLabel">Listen to guided reflection (optional):</p> 
                    <audio controls style="width: 100%; margin-top: 5px;">
                        <source src="" type="audio/mpeg">
                        Your browser does not support the audio element.
                    </audio>
                </div>
            `;
            // Dynamically set audio source
            const kindnessAudioElement = modal.querySelector('#practice-content audio source');
            if (kindnessAudioElement) {
                const audioFileName = `kindness_reflection_${currentLanguage}.mp3`;
                kindnessAudioElement.src = `audio/${currentLanguage}/${audioFileName}`;
                kindnessAudioElement.parentElement.load();
            } else {
                console.warn('Audio source element not found for kindnessReflection');
            }
            break;
        default:
            activityContent = '<p>Activity not found.</p>';
            break;
        case 'mindfulColoring':
            activityContent = `
                <h3>Mindful Coloring</h3>
                <p class="instructions">
                    Find a coloring page (you can search for 'mindfulness coloring pages online') and some colors. 
                </p>
                <p style="margin-top:10px;">As you color, pay attention to the movement of your hand, the colors you choose, and the sensation of the crayon or pencil on the paper. There's no right or wrong way to do it.</p>
                <div style="margin-top: 15px; text-align:center;">
                    <img src="https://via.placeholder.com/300x200.png?text=Mindful+Coloring+Example" alt="Mindful Coloring Placeholder" style="max-width:100%; border-radius: 5px;">
                </div>
            `;
            break;
        case 'positiveAffirmations':
            activityContent = `
                <h3>Positive Affirmations</h3>
                <p class="instructions">
                    Positive affirmations are statements that can help you to challenge and overcome self-sabotaging and negative thoughts. Repeat them to yourself, or write them down.
                </p>
                <ul style="margin-top:10px; list-style-position: inside;">
                    <li>I am calm and peaceful.</li>
                    <li>I am capable and strong.</li>
                    <li>I choose to be happy today.</li>
                    <li>I am grateful for what I have.</li>
                    <li>I treat myself with kindness and respect.</li>
                </ul>
                <p style="margin-top:10px;" data-lang-key="affirmationsCreateOwn">You can also create your own affirmations!</p>
                <div style="margin-top: 20px;">
                    <textarea id="user-affirmation-text" rows="3" style="width: 100%; padding: 10px; border-radius: 5px; border: 1px solid #ccc;" data-lang-placeholder-key="affirmationInputPlaceholder"></textarea>
                    <button onclick="saveUserAffirmation()" style="margin-top: 10px; padding: 10px 15px; background-color: var(--primary-color); color: white; border: none; border-radius: 5px; cursor: pointer;" data-lang-key="saveMyAffirmationButton">Save My Affirmation</button>
                </div>
                <div id="user-affirmations-list" style="margin-top: 20px;">
                    <h4 data-lang-key="mySavedAffirmationsTitle">My Saved Affirmations:</h4>
                    <ul id="user-affirmations-ul" style="list-style-position: inside;"></ul>
                </div>
            `;
            displayUserAffirmations(); // Call function to load and display saved affirmations
            break;
        case 'mindfulStorytelling':
            activityContent = `
                <h3>Mindful Storytelling</h3>
                <p class="instructions">
                    Engage in storytelling with full attention. You can either create your own story or listen to one.
                </p>
                <p style="margin-top:10px;"><strong>Create a Story:</strong> Start with a simple prompt (e.g., 'Once upon a time, there was a curious cloud...'). Let the story unfold, focusing on the details, characters, and setting without judgment.</p>
                <p style="margin-top:10px;"><strong>Listen to a Story:</strong> Find a calming story or a guided narrative. Pay attention to the narrator's voice, the imagery, and any feelings that arise. (Placeholder for story audio below)</p>
                <div class="audio-guide" style="margin-top:15px;">
                    <audio controls>
                        <source src="audio/mindful-story.mp3" type="audio/mpeg">
                        Your browser does not support the audio element. (Placeholder: mindful-story.mp3)
                    </audio>
                </div>
            `;
            break;
    }

    content.innerHTML = activityContent;

    if (type === 'emotionCheckIn') {
        if (typeof displayEmotionalCheckIns === 'function') {
            displayEmotionalCheckIns();
        } else {
            console.error('displayEmotionalCheckIns function not found. Please define it.');
        }
    }
    if (type === 'positiveAffirmations') { // Also ensure displayUserAffirmations is called for consistency
        if (typeof displayUserAffirmations === 'function') {
             displayUserAffirmations();
        } else {
            console.error('displayUserAffirmations function not found. Please define it.');
        }
    }

    modal.style.display = 'flex';
}

function saveUserAffirmation() {
    const affirmationText = document.getElementById('user-affirmation-text').value.trim();
    if (affirmationText === "") {
        alert(translations[currentLanguage]?.affirmationEmptyAlert || "Please write an affirmation.");
        return;
    }

    let userAffirmations = JSON.parse(localStorage.getItem('userAffirmations')) || [];
    if (userAffirmations.includes(affirmationText)) {
        alert(translations[currentLanguage]?.affirmationExistsAlert || "This affirmation is already saved.");
        return;
    }
    userAffirmations.push(affirmationText);
    localStorage.setItem('userAffirmations', JSON.stringify(userAffirmations));

    alert(translations[currentLanguage]?.affirmationSavedAlert || "Affirmation saved!");
    document.getElementById('user-affirmation-text').value = ''; // Clear textarea
    displayUserAffirmations(); // Refresh the displayed list
}

function displayUserAffirmations() {
    const ul = document.getElementById('user-affirmations-ul');
    if (!ul) return; // Make sure the element exists
    ul.innerHTML = ''; // Clear existing list
    let userAffirmations = JSON.parse(localStorage.getItem('userAffirmations')) || [];
    if (userAffirmations.length === 0) {
        const li = document.createElement('li');
        li.textContent = translations[currentLanguage]?.noSavedAffirmations || "You haven't saved any affirmations yet.";
        ul.appendChild(li);
    } else {
        userAffirmations.forEach(affirmation => {
            const li = document.createElement('li');
            li.textContent = affirmation;
            ul.appendChild(li);
        });
    }
}

function saveGratitude() {
    const gratitudeText = document.getElementById('gratitude-text').value;
    if (gratitudeText.trim() === "") {
        alert("Please write something you are grateful for.");
        return;
    }
    // In a real app, you would save this to local storage or a backend.
    console.log("Gratitude Entry:", gratitudeText);
    alert("Gratitude entry saved (check console)!");
    document.getElementById('gratitude-text').value = ''; // Clear textarea
    // Optionally close the modal
    // document.getElementById('practice-modal').style.display = 'none';
}

function saveEmotionalCheckIn() {
    const inputElement = document.getElementById('emotionalCheckInInput');
    if (!inputElement) {
        console.error('emotionalCheckInInput element not found.');
        return;
    }
    const checkInText = inputElement.value.trim();

    if (checkInText === "") {
        alert(translations[currentLanguage]?.modalContent?.emotionCheckIn?.emptyTextareaAlert || "Please write something before saving.");
        return;
    }

    const newEntry = {
        text: checkInText,
        timestamp: new Date().toISOString()
    };

    let emotionalCheckIns = JSON.parse(localStorage.getItem('userEmotionalCheckIns')) || [];
    emotionalCheckIns.push(newEntry);
    localStorage.setItem('userEmotionalCheckIns', JSON.stringify(emotionalCheckIns));

    alert(translations[currentLanguage]?.modalContent?.emotionCheckIn?.checkInSavedAlert || "Your emotional check-in has been saved.");
    inputElement.value = ''; // Clear textarea
    
    if (typeof displayEmotionalCheckIns === 'function') {
        displayEmotionalCheckIns(); // Refresh the displayed list
    } else {
        console.error('displayEmotionalCheckIns function not found after saving.');
    }
}

function displayEmotionalCheckIns() {
    const listElement = document.getElementById('emotionalCheckInList');
    if (!listElement) {
        return; 
    }
    listElement.innerHTML = ''; // Clear existing list

    let emotionalCheckIns = JSON.parse(localStorage.getItem('userEmotionalCheckIns')) || [];

    if (emotionalCheckIns.length === 0) {
        const li = document.createElement('li');
        li.textContent = translations[currentLanguage]?.modalContent?.emotionCheckIn?.noCheckInsYet || "You haven't saved any check-ins yet.";
        li.style.fontStyle = 'italic';
        listElement.appendChild(li);
    } else {
        emotionalCheckIns.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        emotionalCheckIns.forEach(entry => {
            const li = document.createElement('li');
            const timestamp = new Date(entry.timestamp);
            const formattedTime = timestamp.toLocaleString(currentLanguage, { 
                year: 'numeric', month: 'long', day: 'numeric', 
                hour: 'numeric', minute: '2-digit', second: '2-digit' 
            });

            li.innerHTML = `<strong>${formattedTime}:</strong><br>${entry.text.replace(/\n/g, '<br>')}`;
            li.style.marginBottom = '10px';
            li.style.paddingBottom = '10px';
            li.style.borderBottom = '1px solid #eee';
            listElement.appendChild(li);
        });
    }
}
