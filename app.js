let currentLanguage = localStorage.getItem('appLanguage') || 'en';
let currentAffirmationObject = null;

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
    const dailyAffirmationButton = document.getElementById('daily-affirmation-button');
    const affirmationModal = document.getElementById('affirmation-modal');
    const affirmationTextElement = document.getElementById('affirmation-text');
    const affirmationCloseButton = affirmationModal.querySelector('.affirmation-close');

    if (dailyAffirmationButton) {
        dailyAffirmationButton.addEventListener('click', showDailyAffirmation);
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
});

// Ensure translations are available for dynamic content
// This is a simplified approach. For full dynamic content translation,
// you might pass the current language or access it within these functions
// and use translation keys for all dynamic strings.

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
    modal.style.display = 'block';
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
        affirmationModal.style.display = 'block';
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
                <h3>Emotion Check-In</h3>
                <p class="instructions">
                    Take a moment to check in with how you're feeling right now. 
                </p>
                <ul style="margin-top:10px; list-style-position: inside;">
                    <li>What emotions are you experiencing? (e.g., happy, sad, calm, anxious)</li>
                    <li>Where do you feel these emotions in your body?</li>
                    <li>Acknowledge your feelings without judgment.</li>
                </ul>
                <p style="margin-top:10px;">You can write down your reflections if you find it helpful.</p>
            `;
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
                <p style="margin-top:10px;">You can also create your own affirmations!</p>
            `;
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
    modal.style.display = 'block';
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
