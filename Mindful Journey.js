let currentLanguage = localStorage.getItem('appLanguage') || 'en';
let currentAffirmationObject = null; // Stores the currently displayed affirmation {en: '', ja: ''}

// User Favorites
let userFavorites = {};

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

// Favorite Management Functions
const loadFavorites = () => {
    const favorites = localStorage.getItem('userFavorites');
    if (favorites) {
        userFavorites = JSON.parse(favorites);
    }
};

const saveFavorites = () => {
    localStorage.setItem('userFavorites', JSON.stringify(userFavorites));
};

const updateFavoriteIcon = (iconElement, itemId, itemCategory) => {
    if (!iconElement) return;
    const isFavorited = userFavorites[itemCategory] && userFavorites[itemCategory].includes(itemId);
    if (isFavorited) {
        iconElement.classList.add('favorited');
        iconElement.classList.remove('fa-regular');
        iconElement.classList.add('fa-solid');
        iconElement.setAttribute('aria-label', translations[currentLanguage]?.removeFromFavorites || 'Remove from favorites');
    } else {
        iconElement.classList.remove('favorited');
        iconElement.classList.remove('fa-solid');
        iconElement.classList.add('fa-regular');
        iconElement.setAttribute('aria-label', translations[currentLanguage]?.addToFavorites || 'Add to favorites');
    }
    // For daily affirmation, the itemId might change, so ensure data attributes are current
    if (itemCategory === 'affirmation') {
        iconElement.dataset.itemId = itemId; 
    }
};

const toggleFavorite = (itemId, itemCategory, iconElement) => {
    if (!userFavorites[itemCategory]) {
        userFavorites[itemCategory] = [];
    }

    const itemIndex = userFavorites[itemCategory].indexOf(itemId);
    if (itemIndex > -1) {
        userFavorites[itemCategory].splice(itemIndex, 1);
        if (userFavorites[itemCategory].length === 0) {
            delete userFavorites[itemCategory];
        }
    } else {
        userFavorites[itemCategory].push(itemId);
    }
    saveFavorites();
    updateFavoriteIcon(iconElement, itemId, itemCategory);
};

const initializeFavoriteIcons = () => {
    const favoriteIcons = document.querySelectorAll('.favorite-icon');
    favoriteIcons.forEach(icon => {
        const itemId = icon.dataset.itemId;
        const itemCategory = icon.dataset.itemCategory;

        // If itemId is not set (e.g. for modals where it's set dynamically),
        // skip initialization for this icon. It will be updated when shown.
        if (!itemId && (itemCategory === 'practice' || itemCategory === 'affirmation')) {
            // Log for debugging, but don't treat as an error for these specific dynamic icons
            // console.log('Favorite icon missing itemId, will be set dynamically:', icon);
            return; // Skip if itemId is not set for practice/affirmation modal icons
        }

        if (!itemId || !itemCategory) {
            console.warn('Favorite icon missing itemId or itemCategory:', icon);
            return; // Skip if essential data attributes are missing
        }

        if (itemId && itemCategory) { // Ensure essential data attributes are present
            updateFavoriteIcon(icon, itemId, itemCategory);

            icon.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent card click event when clicking icon
                event.preventDefault(); // Prevent any default action if it's an anchor
                // For daily affirmation, the itemId might have been updated by showDailyAffirmation
                const currentItemId = (itemCategory === 'affirmation' && currentAffirmationObject) ? currentAffirmationObject[currentLanguage] : icon.dataset.itemId;
                toggleFavorite(currentItemId, itemCategory, icon);
            });

            icon.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.stopPropagation();
                    event.preventDefault();
                    const currentItemId = (itemCategory === 'affirmation' && currentAffirmationObject) ? currentAffirmationObject[currentLanguage] : icon.dataset.itemId;
                    toggleFavorite(currentItemId, itemCategory, icon);
                }
            });
        } else {
            console.warn('Favorite icon missing itemId or itemCategory:', icon);
        }
    });
};


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
    setLanguage(currentLanguage); // Set initial language based on localStorage or default
    loadFavorites(); // Load favorites from localStorage
    initializeFavoriteIcons(); // Set up favorite icons

    // Daily Affirmation Modal Logic
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
            
            const affirmation = allAffirmations[newAffirmationIndex];
            affirmationTextElement.textContent = affirmation[currentLanguage];
            currentAffirmationObject = affirmation; // Store the current affirmation object
            affirmationModal.style.display = 'block';

            // Update the favorite icon for the current affirmation
            const affirmationFavoriteIcon = document.querySelector('#affirmation-modal .favorite-icon');
            if (affirmationFavoriteIcon) {
                // Use the English version as a unique ID, or a combination if needed for more uniqueness
                const affirmationId = affirmation.en; 
                affirmationFavoriteIcon.dataset.itemId = affirmationId;
                updateFavoriteIcon(affirmationFavoriteIcon, affirmationId, 'affirmation');
            }
        }); // Closes dailyAffirmationLink event listener
    } // Closes if (dailyAffirmationLink)

    if (affirmationCloseButton) {
        affirmationCloseButton.onclick = () => {
            affirmationModal.style.display = 'none';
            currentAffirmationObject = null; // Clear when modal closes
        };
    }

    // Close affirmation modal if clicked outside
    window.addEventListener('click', (event) => {
        if (event.target === affirmationModal) {
            affirmationModal.style.display = 'none';
            currentAffirmationObject = null; // Clear when modal closes
        }
    });

    // Initialize modal (this is for the practice modal)
    const modal = document.getElementById('practice-modal');
    const closeBtn = document.querySelector('.close'); // Assuming this is the practice modal's close button
    
    if(closeBtn) {
        closeBtn.onclick = () => {
            if(modal) modal.style.display = 'none';
        }
    }

    window.addEventListener('click', (event) => { // For practice modal
        if (event.target === modal) {
            if(modal) modal.style.display = 'none';
        }
    });

    // Activity Modal listeners
    const activityModal = document.getElementById('activity-modal');
    const activityCloseButton = activityModal.querySelector('.activity-close');

    if (activityCloseButton) {
        activityCloseButton.onclick = () => {
            if(activityModal) activityModal.style.display = 'none';
        };
    }

    window.addEventListener('click', (event) => { // For activity modal
        if (event.target === activityModal) {
            if(activityModal) activityModal.style.display = 'none';
        }
    });

}); // Closes DOMContentLoaded

// Ensure functions are defined outside DOMContentLoaded
function openActivity(type) {
    const modal = document.getElementById('activity-modal'); // Target activity modal specifically
    const titleElement = document.getElementById('activity-title');
    const contentElement = document.getElementById('activity-content');

    if (!modal || !titleElement || !contentElement) {
        console.error('Activity modal elements not found!');
        return;
    }

    // Default content - can be expanded with a switch for activityType
    let activityTitleKey = 'activityModalTitlePlaceholder';
    let activityContentHTML = `<p data-lang-key="activityModalContentPlaceholder">Activity content for ${type} will appear here.</p>`;
    
    // Ensure translations are loaded before trying to access them here
    if (!translations[currentLanguage]) {
        console.error(`Translations for language '${currentLanguage}' not loaded.`);
        // Fallback or load them if necessary
        // For now, we'll proceed but expect potential issues if keys are missing
    }

    // The rest of the openActivity function's switch statement was here in the original view.
    // The target for replacement is just before 'let activityContent = '';' which is inside openActivity.
    // The replacement should be the closing braces and then the start of openActivity again.
    // The provided snippet seems to have started openActivity's content too early.
    // The actual 'let activityContent = '';' should be part of the openActivity function body.
    // The replacement should ensure that the DOMContentLoaded is closed *before* the 'function openActivity(type)' line.

    // Correcting the target to be just the line that starts the problematic openActivity content inside the event listener
    // This means the `let activityContent = '';` was the first line of the misplaced function. 
    // The replacement will close the necessary blocks and then redefine openActivity correctly.
    // The original `openActivity` code from line 221 in the view should be preserved after the DOMContentLoaded closes.
    // The target string needs to be precise. The error was that `openActivity` started inside `showDailyAffirmation`'s favorite update.

    // The line `updateFavoriteIcon(affirmationFavoriteIcon, affirmationId, 'affirmation');` is the last correct line inside the event listener for dailyAffirmationLink
    // The next line in the broken file was `let activityContent = '';` which is the start of `openActivity`
    // So, we replace that `let activityContent = '';` with the closing braces and the *start* of the `openActivity` function definition.
    // The actual content of `openActivity` (like its switch statement) should then follow naturally from the original file structure if it wasn't corrupted further down.
    // The view provided showed the start of openActivity's switch statement from line 221.
    // This means the `function openActivity(type) {` line itself was also misplaced or part of the corruption.

    // The target should be the point where `openActivity` was incorrectly inserted. 
    // Based on the view, line 220 is `updateFavoriteIcon(...)`, and line 221 is `let activityContent = '';` (which is inside `openActivity`).
    // This implies the `function openActivity(type) {` declaration itself was part of the malformed block.
    // The replacement will close the `DOMContentLoaded` and then correctly start `openActivity`.
    // The content of `openActivity` (switch statement etc.) should then be what was originally there.
    // The provided snippet for `openActivity` (lines 221-350) will be effectively reinstated after the fix.

    // The replacement content starts with the definition of openActivity.
    // The target is the line that *started* the misplaced `openActivity` content.
    // The `let activityContent = '';` was the symptom. The replacement must insert the closing braces and then the function definition.
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

    contentElement.innerHTML = activityContent;

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

// Guided Practice Modal Logic
const practiceDataStore = {
    'breathing': { 
        titleKey: 'practiceBreathingTitle', 
        simpleDescriptionKey: 'practiceBreathingDesc', 
        audioFileBase: 'breathing_practice.mp3',
        modalContentKey: 'breathing' 
    },
    'body-scan': { 
        titleKey: 'practiceBodyScanTitle', 
        simpleDescriptionKey: 'practiceBodyScanDesc', 
        audioFileBase: 'body_scan_practice.mp3',
        modalContentKey: 'bodyScan' 
    },
    'mindful-movement': { 
        titleKey: 'practiceMindfulMovementTitle', 
        simpleDescriptionKey: 'practiceMindfulMovementDesc', 
        audioFileBase: 'mindful_movement_practice.mp3',
        modalContentKey: 'mindfulMovement'
    },
    'loving-kindness': { 
        titleKey: 'practiceLovingKindnessTitle', 
        simpleDescriptionKey: 'practiceLovingKindnessDesc', 
        audioFileBase: 'loving_kindness_practice.mp3',
        modalContentKey: 'lovingKindness'
    },
    'mindful-walking': { 
        titleKey: 'practiceMindfulWalkingTitle', 
        simpleDescriptionKey: 'practiceMindfulWalkingDesc', 
        audioFileBase: 'mindful_walking_practice.mp3',
        modalContentKey: 'mindfulWalking'
    },
    'mindful-eating': { 
        titleKey: 'practiceMindfulEatingTitle', 
        simpleDescriptionKey: 'practiceMindfulEatingDesc', 
        audioFileBase: 'mindful_eating_practice.mp3',
        modalContentKey: 'mindfulEating'
    },
    'breathing-space': { 
        titleKey: 'practiceBreathingSpaceTitle', 
        simpleDescriptionKey: 'practiceBreathingSpaceDesc', 
        audioFileBase: 'breathing_space_practice.mp3',
        modalContentKey: 'breathingSpace' 
    },
    'sounds-thoughts': { 
        titleKey: 'practiceSoundsThoughtsTitle', 
        simpleDescriptionKey: 'practiceSoundsThoughtsDesc', 
        audioFileBase: 'sounds_thoughts_practice.mp3',
        modalContentKey: 'soundsThoughts'
    },
    'mindful-seeing': { 
        titleKey: 'practiceMindfulSeeingTitle', 
        simpleDescriptionKey: 'practiceMindfulSeeingDesc', 
        audioFileBase: 'mindful_seeing_practice.mp3',
        modalContentKey: 'mindfulSeeing'
    },
    'gratitude-meditation': { 
        titleKey: 'practiceGratitudeMeditationTitle', 
        simpleDescriptionKey: 'practiceGratitudeMeditationDesc', 
        audioFileBase: 'gratitude_meditation_practice.mp3',
        modalContentKey: 'gratitudeMeditation'
    },
    'mindful-listening-music': { 
        titleKey: 'practiceMindfulListeningMusicTitle', 
        simpleDescriptionKey: 'practiceMindfulListeningMusicDesc', 
        audioFileBase: 'mindful_listening_music_practice.mp3',
        modalContentKey: 'mindfulListeningMusic'
    }
};

function startPractice(practiceType) {
    const practiceDetails = practiceDataStore[practiceType];
    if (!practiceDetails) {
        console.error(`Details not found for practice type: ${practiceType}`);
        alert(translations[currentLanguage]?.generalError || 'Selected practice is currently unavailable.');
        return;
    }

    const { titleKey, simpleDescriptionKey, audioFileBase, modalContentKey } = practiceDetails;
    const modal = document.getElementById('practice-modal');
    const titleElement = document.getElementById('practice-title');
    const descriptionElement = document.getElementById('practice-description');
    const audioElement = document.getElementById('practice-audio');
    const audioSourceElement = audioElement ? audioElement.querySelector('source') : null;
    const favoriteIcon = modal ? modal.querySelector('.favorite-icon.practice-favorite-icon') : null; // Be more specific

    if (!modal || !titleElement || !descriptionElement || !audioElement || !audioSourceElement || !favoriteIcon) {
        console.error('Practice modal elements not found! Check IDs: practice-modal, practice-title, practice-description, practice-audio, source tag, and .favorite-icon.practice-favorite-icon within the modal.');
        return;
    }

    // Set title
    titleElement.textContent = translations[currentLanguage]?.[titleKey] || practiceDetails.titleKey || 'Practice Title';

    // Set description (rich content or fallback)
    let descriptionHtml = '';
    const richContent = translations[currentLanguage]?.modalContent?.[modalContentKey];

    if (richContent && richContent.introduction) {
        descriptionHtml = `<p>${richContent.introduction.replace(/\n/g, '<br>')}</p>`; // Replace \n with <br> if present
        if (richContent.steps && Array.isArray(richContent.steps) && richContent.steps.length > 0) {
            descriptionHtml += '<ol>';
            richContent.steps.forEach(step => {
                descriptionHtml += `<li>${step.replace(/\n/g, '<br>')}</li>`; // Replace \n with <br> if present
            });
            descriptionHtml += '</ol>';
        }
        descriptionElement.innerHTML = descriptionHtml;
    } else if (translations[currentLanguage]?.[simpleDescriptionKey]) {
        descriptionElement.innerHTML = `<p>${translations[currentLanguage][simpleDescriptionKey].replace(/\n/g, '<br>')}</p>`;
    } else {
        descriptionElement.innerHTML = '<p>Description not available.</p>';
    }
    
    // Set audio source
    const langSpecificAudioFile = `audio/${currentLanguage}/${audioFileBase}`;
    audioSourceElement.src = langSpecificAudioFile;
    audioElement.load(); // Reload the audio element to apply the new source
    // audioElement.play(); // Optional: auto-play, consider user experience

    // Update favorite icon
    favoriteIcon.dataset.itemId = practiceType;
    favoriteIcon.dataset.itemCategory = 'practice';
    updateFavoriteIcon(favoriteIcon, practiceType, 'practice');

    modal.style.display = 'flex'; // Show the modal
}
