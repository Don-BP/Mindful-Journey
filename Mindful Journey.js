let currentLanguage = localStorage.getItem('appLanguage') || 'en';
let currentAffirmationObject = null; 
let userFavorites = {};
let currentlyActiveCardElement = null; 
let feedbackTimeout;
let editingAffirmationIndex = null; 

let drawingCanvas = null;
let drawingCtx = null;
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let currentBrushSize = 5;
let currentColor = '#000000'; 

const coloringPagesData = [
    { id: 'dinosaurs', nameKey: 'coloringPageDinosaurs', svgFile: 'dinosaurs.svg' }, 
    { id: 'school', nameKey: 'coloringPageSchool', svgFile: 'school.svg' },  
    { id: 'fruit', nameKey: 'coloringPageFruit', svgFile: 'fruit.svg' },
    { id: 'sweets', nameKey: 'coloringPageSweets', svgFile: 'sweets_treats.svg' },
    { id: 'pets', nameKey: 'coloringPagePets', svgFile: 'cat_and_dog.svg' },
    { id: 'ocean', nameKey: 'coloringPageOcean', svgFile: 'ocean_animals.svg' },
    { id: 'food', nameKey: 'coloringPageFastFood', svgFile: 'fast_food.svg' },
    { id: 'spacecat', nameKey: 'coloringPageSpaceCat', svgFile: 'space_cat.svg' },
    { id: 'catrainbow', nameKey: 'coloringPageCatRainbow', svgFile: 'cat_rainbow.svg' },
    { id: 'flowers', nameKey: 'coloringPageFlowers', svgFile: 'flowers.svg' },
    { id: 'cactus', nameKey: 'coloringPageCactus', svgFile: 'cactus.svg' }
];
let selectedColoringPageSVGElement = null; // To hold the currently loaded SVG DOM element
let currentColorForColoring = '#FF0000'; // Default coloring color (e.g., red)

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

const practiceDataStore = {
    'breathing': { 
        titleKey: 'practiceBreathingTitle', 
        simpleDescriptionKey: 'practiceBreathingDesc', 
        audioFileBase: 'breathing_practice.mp3',
        modalContentKey: 'breathing',
        iconClass: 'fas fa-lungs'
    },
    'body-scan': { 
        titleKey: 'practiceBodyScanTitle', 
        simpleDescriptionKey: 'practiceBodyScanDesc', 
        audioFileBase: 'body_scan_practice.mp3',
        modalContentKey: 'bodyScan',
        iconClass: 'fas fa-magnifying-glass'
    },
    'mindful-movement': { 
        titleKey: 'practiceMindfulMovementTitle', 
        simpleDescriptionKey: 'practiceMindfulMovementDesc', 
        audioFileBase: 'mindful_movement_practice.mp3',
        modalContentKey: 'mindfulMovement',
        iconClass: 'fas fa-person-running'
    },
    'loving-kindness': { 
        titleKey: 'practiceLovingKindnessTitle', 
        simpleDescriptionKey: 'practiceLovingKindnessDesc', 
        audioFileBase: 'loving_kindness_practice.mp3',
        modalContentKey: 'lovingKindness',
        iconClass: 'fas fa-heart-pulse'
    },
    'mindful-walking': { 
        titleKey: 'practiceMindfulWalkingTitle', 
        simpleDescriptionKey: 'practiceMindfulWalkingDesc', 
        audioFileBase: 'mindful_walking_practice.mp3',
        modalContentKey: 'mindfulWalking',
        iconClass: 'fas fa-person-walking'
    },
    'mindful-eating': { 
        titleKey: 'practiceMindfulEatingTitle', 
        simpleDescriptionKey: 'practiceMindfulEatingDesc', 
        audioFileBase: 'mindful_eating_practice.mp3',
        modalContentKey: 'mindfulEating',
        iconClass: 'fas fa-utensils'
    },
    'breathing-space': { 
        titleKey: 'practiceBreathingSpaceTitle', 
        simpleDescriptionKey: 'practiceBreathingSpaceDesc', 
        audioFileBase: 'breathing_space_practice.mp3',
        modalContentKey: 'breathingSpace',
        iconClass: 'fas fa-clock'
    },
    'sounds-thoughts': { 
        titleKey: 'practiceSoundsThoughtsTitle', 
        simpleDescriptionKey: 'practiceSoundsThoughtsDesc', 
        audioFileBase: 'sounds_thoughts_practice.mp3',
        modalContentKey: 'soundsThoughts',
        iconClass: 'fas fa-ear-listen'
    },
    'mindful-seeing': { 
        titleKey: 'practiceMindfulSeeingTitle', 
        simpleDescriptionKey: 'practiceMindfulSeeingDesc', 
        audioFileBase: 'mindful_seeing_practice.mp3',
        modalContentKey: 'mindfulSeeing',
        iconClass: 'fas fa-eye'
    },
    'gratitude-meditation': { 
        titleKey: 'practiceGratitudeMeditationTitle', 
        simpleDescriptionKey: 'practiceGratitudeMeditationDesc', 
        audioFileBase: 'gratitude_meditation_practice.mp3',
        modalContentKey: 'gratitudeMeditation',
        iconClass: 'fas fa-hand-holding-heart'
    },
    'mindful-listening-music': { 
        titleKey: 'practiceMindfulListeningMusicTitle', 
        simpleDescriptionKey: 'practiceMindfulListeningMusicDesc', 
        audioFileBase: 'mindful_listening_music_practice.mp3',
        modalContentKey: 'mindfulListeningMusic',
        iconClass: 'fas fa-music'
    }
};

const gratitudePrompts = {
    en: [
        "What is one small thing that happened today that you're grateful for?",
        "Who is someone you appreciate in your life and why?",
        "What is a skill or talent you possess that you're thankful for?",
        "Describe a place that makes you feel peaceful or happy.",
        "What is something you learned recently that you're grateful for?",
        "What challenge have you overcome that you can now be grateful for the experience of?",
        "Think about a simple pleasure you enjoyed this week.",
        "What aspect of nature are you grateful for today?",
        "What is something about your home that you appreciate?",
        "Acknowledge a personal quality you are proud of."
    ],
    ja: [
        "今日あった小さなことで、感謝していることは何ですか？",
        "あなたの人生で感謝している人は誰ですか？また、その理由は何ですか？",
        "あなたが持っているスキルや才能で、感謝しているものは何ですか？",
        "あなたを平和な気持ちにさせたり、幸せにさせたりする場所を説明してください。",
        "最近学んだことで、感謝していることは何ですか？",
        "乗り越えた困難で、今ではその経験に感謝できることは何ですか？",
        "今週楽しんだささやかな喜びについて考えてみてください。",
        "今日、自然のどんな側面に感謝していますか？",
        "あなたの家について感謝していることは何ですか？",
        "あなたが誇りに思っている自分の資質を認めてください。"
    ]
};

const emotionPrompts = {
    en: [
        "What's the strongest emotion you're feeling right now? Where do you feel it in your body?",
        "If your current emotion had a color, what would it be and why?",
        "What might be a message this emotion is trying to tell you?",
        "Can you recall a time you felt this way before? What was the situation?",
        "How does this emotion affect your thoughts or actions right now?",
        "What's one small thing you could do to acknowledge or care for this emotion?",
        "Are there any underlying feelings beneath the most obvious one?",
        "How intense is this emotion on a scale of 1 to 10?",
        "If this emotion could speak, what would it say in one sentence?",
        "What are you learning from feeling this way?"
    ],
    ja: [
        "今感じている最も強い感情は何ですか？体のどこでそれを感じますか？",
        "もし今の感情に色があったとしたら、何色で、それはなぜですか？",
        "この感情があなたに伝えようとしているメッセージは何かもしれませんか？",
        "以前にこのように感じた時のことを思い出せますか？どんな状況でしたか？",
        "この感情は今、あなたの考えや行動にどのように影響していますか？",
        "この感情を認めたり、ケアしたりするためにできる小さなことは何ですか？",
        "最も明白な感情の下に、何か隠れた感情はありますか？",
        "この感情の強さは1から10のスケールでどのくらいですか？",
        "もしこの感情が話せるとしたら、一言で何を言いますか？",
        "このように感じることから何を学んでいますか？"
    ]
};

function showFeedbackMessage(message, type = 'success', duration = 3000) {
    const feedbackElement = document.getElementById('feedback-message');
    if (!feedbackElement) return;
    clearTimeout(feedbackTimeout); 
    feedbackElement.textContent = message;
    feedbackElement.className = 'show'; 
    feedbackElement.classList.add(type); 
    feedbackTimeout = setTimeout(() => {
        feedbackElement.classList.remove('show');
        setTimeout(() => {
             if (!feedbackElement.classList.contains('show')) {
                feedbackElement.className = ''; 
             }
        }, 500); 
    }, duration);
}

function formatTime(seconds) {
    if (isNaN(seconds) || seconds === Infinity) {
        return '00:00';
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
}

function clearCurrentActivityIndicator() {
    if (currentlyActiveCardElement) {
        currentlyActiveCardElement.classList.remove('current-item');
        currentlyActiveCardElement = null;
    }
}

const loadFavorites = () => {
    const favorites = localStorage.getItem('userFavorites');
    if (favorites) {
        userFavorites = JSON.parse(favorites);
    } else {
        userFavorites = { practice: [], activity: [], affirmation: [] }; 
    }
};

const saveFavorites = () => {
    localStorage.setItem('userFavorites', JSON.stringify(userFavorites));
};

const updateFavoriteIcon = (iconElement, itemId, itemCategory) => {
    if (!iconElement) return;
    const isFavorited = userFavorites[itemCategory] && userFavorites[itemCategory].includes(itemId);
    const iconTag = iconElement.querySelector('i');
    if (isFavorited) {
        iconElement.classList.add('favorited');
        if (iconTag) {
            iconTag.classList.remove('far'); 
            iconTag.classList.add('fas');   
        }
        iconElement.setAttribute('aria-label', translations[currentLanguage]?.removeFromFavorites || 'Remove from favorites');
    } else {
        iconElement.classList.remove('favorited');
        if (iconTag) {
            iconTag.classList.remove('fas'); 
            iconTag.classList.add('far');   
        }
        iconElement.setAttribute('aria-label', translations[currentLanguage]?.addToFavorites || 'Add to favorites');
    }
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
    } else {
        userFavorites[itemCategory].push(itemId);
    }
    saveFavorites();
    updateFavoriteIcon(iconElement, itemId, itemCategory);
    const favoritesSection = document.getElementById('favorites');
    if (favoritesSection && favoritesSection.classList.contains('current-section')) {
        displayFavoritesPage();
    }
};

const initializeFavoriteIcons = () => {
    document.querySelectorAll('.favorite-icon').forEach(icon => {
        const newIcon = icon.cloneNode(true);
        icon.parentNode.replaceChild(newIcon, icon);
        const itemId = newIcon.dataset.itemId;
        const itemCategory = newIcon.dataset.itemCategory;
        if (!itemId && (itemCategory === 'practice' || itemCategory === 'affirmation')) {
            return;
        }
        if (!itemId || !itemCategory) {
            console.warn('Favorite icon missing itemId or itemCategory:', newIcon);
            return; 
        }
        updateFavoriteIcon(newIcon, itemId, itemCategory);
        newIcon.addEventListener('click', (event) => {
            event.stopPropagation(); 
            event.preventDefault(); 
            const currentItemId = (itemCategory === 'affirmation' && currentAffirmationObject) ? currentAffirmationObject.en : newIcon.dataset.itemId;
            toggleFavorite(currentItemId, itemCategory, newIcon);
        });
        newIcon.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.stopPropagation();
                event.preventDefault();
                const currentItemId = (itemCategory === 'affirmation' && currentAffirmationObject) ? currentAffirmationObject.en : newIcon.dataset.itemId;
                toggleFavorite(currentItemId, itemCategory, newIcon);
            }
        });
    });
};

const setLanguage = (lang) => {
    currentLanguage = lang;
    localStorage.setItem('appLanguage', lang);
    document.querySelectorAll('[data-lang-key]').forEach(element => {
        const key = element.getAttribute('data-lang-key');
        if (translations[lang] && translations[lang][key]) {
            element.innerHTML = translations[lang][key];
        } else if (translations.en[key]) { 
            element.innerHTML = translations.en[key];
        }
    });
    const langSwitcherButton = document.getElementById('lang-switcher');
    if (langSwitcherButton) {
        langSwitcherButton.textContent = lang === 'en' ? 'JA' : 'EN';
    }

    const affirmationModalInstance = document.getElementById('affirmation-modal');
    if (affirmationModalInstance.classList.contains('show') && currentAffirmationObject) {
        const affirmationTextElement = document.getElementById('affirmation-text');
        if (affirmationTextElement && currentAffirmationObject[lang]) {
            affirmationTextElement.textContent = currentAffirmationObject[lang];
        }
        const affirmationPopupTitle = affirmationModalInstance.querySelector('[data-lang-key="affirmationPopupTitle"]');
        if (affirmationPopupTitle && translations[lang] && translations[lang]['affirmationPopupTitle']) {
            affirmationPopupTitle.innerHTML = translations[lang]['affirmationPopupTitle'];
        }
        const favIcon = affirmationModalInstance.querySelector('.favorite-icon');
        if (favIcon && favIcon.dataset.itemId && favIcon.dataset.itemCategory) {
            updateFavoriteIcon(favIcon, favIcon.dataset.itemId, favIcon.dataset.itemCategory);
        }
    }
    initializeFavoriteIcons(); 

    const favoritesSection = document.getElementById('favorites');
    if (favoritesSection && favoritesSection.classList.contains('current-section')) {
        displayFavoritesPage();
    }
    const activityModal = document.getElementById('activity-modal');
    if (activityModal.classList.contains('show')) {
        const currentActivityType = activityModal.dataset.currentActivityType;
        if (currentActivityType) {
            openActivity(currentActivityType, true); 
        }
    }
    const practiceModal = document.getElementById('practice-modal');
    if (practiceModal.classList.contains('show')) {
        const currentPracticeType = practiceModal.dataset.currentPracticeType;
        if (currentPracticeType) {
            startPractice(currentPracticeType, true); 
        }
    }
    updateThemeButtonAriaLabel();
};

function showSection(targetId) {
    document.querySelectorAll('main > section').forEach(section => {
        section.classList.remove('current-section');
    });
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
        targetSection.classList.add('current-section');
        if (targetId === 'favorites') {
            displayFavoritesPage();
        }
    }
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.sectionId === targetId) {
            link.classList.add('active');
        }
    });
    if (targetSection) {
        const headerHeight = document.querySelector('header')?.offsetHeight || 0;
        window.scrollTo({ top: targetSection.offsetTop - headerHeight - 10 , behavior: 'smooth' });
    }
}

function setTheme(theme) {
    const themeSwitcherButton = document.getElementById('theme-switcher');
    const icon = themeSwitcherButton.querySelector('i');
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        document.body.classList.remove('dark-mode');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
    localStorage.setItem('appTheme', theme);
    updateThemeButtonAriaLabel();
}

function updateThemeButtonAriaLabel() {
    const themeSwitcherButton = document.getElementById('theme-switcher');
    if (!themeSwitcherButton) return; 
    if (document.body.classList.contains('dark-mode')) {
        themeSwitcherButton.setAttribute('aria-label', translations[currentLanguage]?.switchToLightMode || 'Switch to light mode');
    } else {
        themeSwitcherButton.setAttribute('aria-label', translations[currentLanguage]?.switchToDarkMode || 'Switch to dark mode');
    }
}


document.addEventListener('DOMContentLoaded', () => {
    loadFavorites(); 

    const langSwitcherButton = document.getElementById('lang-switcher');
    if (langSwitcherButton) {
        langSwitcherButton.addEventListener('click', () => {
            const newLang = currentLanguage === 'en' ? 'ja' : 'en';
            setLanguage(newLang);
        });
    }

    const themeSwitcherButton = document.getElementById('theme-switcher');
    if (themeSwitcherButton) {
        themeSwitcherButton.addEventListener('click', () => {
            const newTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }

    const savedTheme = localStorage.getItem('appTheme') || 'light';
    setTheme(savedTheme);


    document.querySelectorAll('.nav-links a[data-section-id]').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const sectionId = link.dataset.sectionId;
            if (sectionId) {
                showSection(sectionId);
            }
        });
    });
    
    setLanguage(currentLanguage); 
    initializeFavoriteIcons(); 
    showSection('home'); 

    const dailyAffirmationLink = document.getElementById('daily-affirmation-link');
    const affirmationModal = document.getElementById('affirmation-modal');
    const affirmationCloseButton = affirmationModal.querySelector('.affirmation-close');

    if (dailyAffirmationLink) {
        dailyAffirmationLink.addEventListener('click', (event) => {
            event.preventDefault();
            const affirmationModalInstance = document.getElementById('affirmation-modal'); 
            const affirmationTextElem = document.getElementById('affirmation-text'); 
            if (!affirmationModalInstance || !affirmationTextElem) return;

            const today = new Date().toISOString().split('T')[0];
            let lastAffirmationDate = localStorage.getItem('lastAffirmationDate');
            let lastAffirmationIndex = parseInt(localStorage.getItem('lastAffirmationIndex'), 10);
            let newAffirmationIndex;

            if (lastAffirmationDate === today && !isNaN(lastAffirmationIndex) && lastAffirmationIndex >= 0 && lastAffirmationIndex < allAffirmations.length) {
                newAffirmationIndex = lastAffirmationIndex;
            } else {
                if (isNaN(lastAffirmationIndex) || lastAffirmationIndex < 0 || lastAffirmationIndex >= allAffirmations.length - 1) {
                    newAffirmationIndex = 0;
                } else {
                    newAffirmationIndex = lastAffirmationIndex + 1;
                }
                if (newAffirmationIndex >= allAffirmations.length) {
                    newAffirmationIndex = 0;
                }
                localStorage.setItem('lastAffirmationDate', today);
                localStorage.setItem('lastAffirmationIndex', newAffirmationIndex.toString());
            }
            
            const affirmation = allAffirmations[newAffirmationIndex];
            affirmationTextElem.textContent = affirmation[currentLanguage];
            currentAffirmationObject = affirmation; 
            affirmationModalInstance.classList.add('show');


            const affirmationFavoriteIcon = affirmationModalInstance.querySelector('.favorite-icon');
            if (affirmationFavoriteIcon) {
                const affirmationId = affirmation.en; 
                affirmationFavoriteIcon.dataset.itemId = affirmationId; 
                updateFavoriteIcon(affirmationFavoriteIcon, affirmationId, 'affirmation');
            }
        });
    }

    if (affirmationCloseButton) {
        affirmationCloseButton.onclick = () => {
            affirmationModal.classList.remove('show'); 
            currentAffirmationObject = null;
        };
    }

    window.addEventListener('click', (event) => {
        if (event.target === affirmationModal) {
            affirmationModal.classList.remove('show'); 
            currentAffirmationObject = null;
        }
    });

    const practiceModal = document.getElementById('practice-modal');
    const practiceCloseBtn = practiceModal.querySelector('.practice-close'); 
    const practiceAudioProgressDisplay = document.getElementById('audio-progress-display');
    
    if(practiceCloseBtn) {
        practiceCloseBtn.onclick = () => {
            practiceModal.classList.remove('show'); 
            clearCurrentActivityIndicator();
            const audioElement = document.getElementById('practice-audio');
            if (audioElement) {
                audioElement.pause();
                audioElement.currentTime = 0; 
            }
            if (practiceAudioProgressDisplay) {
                practiceAudioProgressDisplay.textContent = "00:00 / 00:00";
            }
        }
    }

    window.addEventListener('click', (event) => { 
        if (event.target === practiceModal) {
            practiceModal.classList.remove('show'); 
            clearCurrentActivityIndicator(); 
            const audioElement = document.getElementById('practice-audio');
            if (audioElement) {
                audioElement.pause();
                audioElement.currentTime = 0;
            }
            if (practiceAudioProgressDisplay) {
                practiceAudioProgressDisplay.textContent = "00:00 / 00:00";
            }
        }
    });

    const activityModal = document.getElementById('activity-modal');
    const activityCloseButton = activityModal.querySelector('.activity-close');

    if (activityCloseButton) {
        activityCloseButton.onclick = () => {
            activityModal.classList.remove('show'); 
            if (drawingCanvas) { 
                removeDrawingEventListeners();
                drawingCanvas = null;
                drawingCtx = null;
            }
            // Reset coloring page UI if it was open
            const coloringSelector = document.getElementById('coloring-page-selector');
            const coloringCanvasArea = document.getElementById('coloring-page-canvas-area');
            const coloringPalette = document.getElementById('coloring-palette-container');
            const resetColoringBtn = document.getElementById('reset-coloring-button');
            if (coloringSelector) coloringSelector.style.display = 'block'; // Show selector again
            if (coloringCanvasArea) coloringCanvasArea.style.display = 'none';
            if (coloringPalette) coloringPalette.style.display = 'none';
            if (resetColoringBtn) resetColoringBtn.style.display = 'none';
            selectedColoringPageSVGElement = null;


            clearCurrentActivityIndicator(); 
            const activityAudio = activityModal.querySelector('audio');
            if (activityAudio) {
                activityAudio.pause();
                activityAudio.currentTime = 0;
            }
            const activityProgressDisplay = activityModal.querySelector('.audio-progress-text');
            if (activityProgressDisplay) {
                activityProgressDisplay.textContent = "00:00 / 00:00";
            }
        };
    }

    window.addEventListener('click', (event) => { 
        if (event.target === activityModal) {
            activityModal.classList.remove('show'); 
            if (drawingCanvas) { 
                removeDrawingEventListeners();
                drawingCanvas = null;
                drawingCtx = null;
            }
            // Reset coloring page UI if it was open
            const coloringSelector = document.getElementById('coloring-page-selector');
            const coloringCanvasArea = document.getElementById('coloring-page-canvas-area');
            const coloringPalette = document.getElementById('coloring-palette-container');
            const resetColoringBtn = document.getElementById('reset-coloring-button');
            if (coloringSelector) coloringSelector.style.display = 'block';
            if (coloringCanvasArea) coloringCanvasArea.style.display = 'none';
            if (coloringPalette) coloringPalette.style.display = 'none';
            if (resetColoringBtn) resetColoringBtn.style.display = 'none';
            selectedColoringPageSVGElement = null;

            clearCurrentActivityIndicator(); 
            const activityAudio = activityModal.querySelector('audio');
            if (activityAudio) {
                activityAudio.pause();
                activityAudio.currentTime = 0;
            }
             const activityProgressDisplay = activityModal.querySelector('.audio-progress-text');
            if (activityProgressDisplay) {
                activityProgressDisplay.textContent = "00:00 / 00:00";
            }
        }
    });

    const hamburgerButton = document.getElementById('hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (hamburgerButton && navLinks) {
        hamburgerButton.addEventListener('click', (event) => {
            event.stopPropagation(); 
            navLinks.classList.toggle('mobile-nav-active');
            const isExpanded = navLinks.classList.contains('mobile-nav-active');
            hamburgerButton.setAttribute('aria-expanded', isExpanded);
            const icon = hamburgerButton.querySelector('i');
            if (isExpanded) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                document.body.classList.add('mobile-nav-open');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.classList.remove('mobile-nav-open');
            }
        });

        navLinks.querySelectorAll('li > a, li > button').forEach(linkOrButton => { 
            linkOrButton.addEventListener('click', () => {
                if (navLinks.classList.contains('mobile-nav-active')) {
                    if (linkOrButton.tagName === 'A' || (linkOrButton.tagName === 'BUTTON' && linkOrButton.id !== 'theme-switcher')) {
                        navLinks.classList.remove('mobile-nav-active');
                        hamburgerButton.setAttribute('aria-expanded', 'false');
                        const icon = hamburgerButton.querySelector('i');
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                        document.body.classList.remove('mobile-nav-open');
                    }
                }
            });
        });

        document.addEventListener('click', (event) => {
            if (navLinks.classList.contains('mobile-nav-active') && 
                !navLinks.contains(event.target) && 
                !hamburgerButton.contains(event.target)) {
                    navLinks.classList.remove('mobile-nav-active');
                    hamburgerButton.setAttribute('aria-expanded', 'false');
                    const icon = hamburgerButton.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                    document.body.classList.remove('mobile-nav-open');
            }
        });
    }
}); 


function createFavoritePracticeCard(practiceId) {
    const practiceDetails = practiceDataStore[practiceId];
    if (!practiceDetails || !practiceDetails.iconClass) {
        console.warn(`Details or iconClass missing for practice: ${practiceId}`);
        return null;
    }
    const card = document.createElement('div');
    card.className = 'practice-card'; 
    card.dataset.itemId = practiceId;
    card.onclick = () => startPractice(practiceId);
    const titleText = translations[currentLanguage]?.[practiceDetails.titleKey] || practiceId;
    const descText = translations[currentLanguage]?.[practiceDetails.simpleDescriptionKey] || 'Description';
    const favIconLabel = translations[currentLanguage]?.addToFavorites || 'Add to favorites';
    card.innerHTML = `
        <i class="${practiceDetails.iconClass}"></i>
        <h3 data-lang-key="${practiceDetails.titleKey}">${titleText}</h3>
        <span class="favorite-icon" data-item-id="${practiceId}" data-item-category="practice" role="button" aria-label="${favIconLabel}" tabindex="0"><i class="far fa-heart"></i></span>
        <p data-lang-key="${practiceDetails.simpleDescriptionKey}">${descText}</p>
    `;
    const favIcon = card.querySelector('.favorite-icon');
    if (favIcon) {
        updateFavoriteIcon(favIcon, practiceId, 'practice'); 
        favIcon.addEventListener('click', (event) => {
            event.stopPropagation();
            toggleFavorite(practiceId, 'practice', favIcon); 
            displayFavoritesPage(); 
        });
         favIcon.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.stopPropagation();
                event.preventDefault();
                toggleFavorite(practiceId, 'practice', favIcon);
                displayFavoritesPage();
            }
        });
    }
    return card;
}

function createFavoriteActivityCard(activityId) {
    const originalCard = document.querySelector(`.activity-card[data-item-id='${activityId}']`);
    if (!originalCard) {
        console.warn(`Original card not found for activity: ${activityId}`);
        return null;
    }
    const card = document.createElement('div');
    card.className = 'activity-card';
    card.dataset.itemId = activityId;
    card.onclick = () => openActivity(activityId);
    const iconClass = originalCard.querySelector('i') ? originalCard.querySelector('i').className : 'fas fa-puzzle-piece';
    const titleElement = originalCard.querySelector('h3');
    const descElement = originalCard.querySelector('p');
    const titleKey = titleElement ? titleElement.dataset.langKey : '';
    const descKey = descElement ? descElement.dataset.langKey : '';
    const titleText = titleElement ? (translations[currentLanguage][titleKey] || titleElement.textContent) : activityId;
    const descText = descElement ? (translations[currentLanguage][descKey] || descElement.textContent) : 'Activity Description';
    const favIconLabel = translations[currentLanguage]?.addToFavorites || 'Add to favorites';
    card.innerHTML = `
        <i class="${iconClass}"></i>
        <h3 ${titleKey ? `data-lang-key="${titleKey}"` : ''}>${titleText}</h3>
        <span class="favorite-icon" data-item-id="${activityId}" data-item-category="activity" role="button" aria-label="${favIconLabel}" tabindex="0"><i class="far fa-heart"></i></span>
        <p ${descKey ? `data-lang-key="${descKey}"` : ''}>${descText}</p>
    `;
    const favIcon = card.querySelector('.favorite-icon');
     if (favIcon) {
        updateFavoriteIcon(favIcon, activityId, 'activity'); 
        favIcon.addEventListener('click', (event) => {
            event.stopPropagation();
            toggleFavorite(activityId, 'activity', favIcon);
            displayFavoritesPage(); 
        });
        favIcon.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.stopPropagation();
                event.preventDefault();
                toggleFavorite(activityId, 'activity', favIcon);
                displayFavoritesPage();
            }
        });
    }
    return card;
}

function displayFavoritesPage() {
    const favPracticesGrid = document.getElementById('favorite-practice-grid');
    const favActivitiesGrid = document.getElementById('favorite-activity-grid');
    const noFavPracticesMsg = favPracticesGrid.querySelector('.empty-favorites-message');
    const noFavActivitiesMsg = favActivitiesGrid.querySelector('.empty-favorites-message');
    favPracticesGrid.innerHTML = ''; 
    favActivitiesGrid.innerHTML = ''; 
    let hasFavPractices = false;
    if (userFavorites.practice && userFavorites.practice.length > 0) {
        userFavorites.practice.forEach(practiceId => {
            const card = createFavoritePracticeCard(practiceId);
            if (card) {
                favPracticesGrid.appendChild(card);
                hasFavPractices = true;
            }
        });
    }
    if (!hasFavPractices) {
        if (noFavPracticesMsg) { 
            noFavPracticesMsg.style.display = 'block';
            favPracticesGrid.appendChild(noFavPracticesMsg);
        }
    } else if (noFavPracticesMsg) {
         noFavPracticesMsg.style.display = 'none'; 
    }
    let hasFavActivities = false;
    if (userFavorites.activity && userFavorites.activity.length > 0) {
        userFavorites.activity.forEach(activityId => {
            const card = createFavoriteActivityCard(activityId);
            if (card) {
                favActivitiesGrid.appendChild(card);
                hasFavActivities = true;
            }
        });
    }
    if (!hasFavActivities) {
        if (noFavActivitiesMsg) { 
            noFavActivitiesMsg.style.display = 'block';
            favActivitiesGrid.appendChild(noFavActivitiesMsg);
        }
    } else if (noFavActivitiesMsg) {
        noFavActivitiesMsg.style.display = 'none';
    }
}

function displayJournalPrompt(promptType) {
    const promptContainerId = `${promptType}-prompt-container`;
    const promptTextId = `${promptType}-prompt-text`;
    let promptContainer = document.getElementById(promptContainerId);
    if (!promptContainer) return; 
    const prompts = promptType === 'gratitude' ? gratitudePrompts[currentLanguage] : emotionPrompts[currentLanguage];
    if (!prompts || prompts.length === 0) {
        promptContainer.style.display = 'none';
        return;
    }
    promptContainer.style.display = 'block';
    const randomIndex = Math.floor(Math.random() * prompts.length);
    const promptTextElement = document.getElementById(promptTextId);
    if (promptTextElement) {
        promptTextElement.textContent = prompts[randomIndex];
    }
}

function openActivity(type, isRefresh = false) {
    const modal = document.getElementById('activity-modal'); 
    const titleElement = document.getElementById('activity-title');
    const contentElement = document.getElementById('activity-content');
    if (!modal || !titleElement || !contentElement) {
        console.error('Activity modal elements not found!');
        return;
    }
    if (!isRefresh) { 
        clearCurrentActivityIndicator(); 
        const activityCard = document.querySelector(`.activity-card[data-item-id="${type}"]`);
        if (activityCard) {
            activityCard.classList.add('current-item');
            currentlyActiveCardElement = activityCard;
        }
    }
    modal.dataset.currentActivityType = type; 
    let activityTitleKey = `activity${type.charAt(0).toUpperCase() + type.slice(1)}Title`; 
    titleElement.textContent = translations[currentLanguage]?.[activityTitleKey] || translations[currentLanguage]?.activityModalTitlePlaceholder || type;
    let activityContent = '';
    const journalPromptHTML = (journalType) => `
        <div id="${journalType}-prompt-container" class="journal-prompt-container">
            <p class="journal-prompt-title" data-lang-key="journalPromptTitle">${translations[currentLanguage]?.journalPromptTitle || "Need inspiration? Try this prompt:"}</p>
            <p id="${journalType}-prompt-text" class="journal-prompt-text"></p>
            <button onclick="displayJournalPrompt('${journalType}')" class="journal-prompt-button" data-lang-key="newPromptButtonText">
                ${translations[currentLanguage]?.newPromptButtonText || "New Prompt"}
            </button>
        </div>
    `;
    switch(type) {
        case 'gratitudeJournal':
            activityContent = `
                ${journalPromptHTML('gratitude')}
                <p class="instructions" data-lang-key="gratitudeJournalInstruction">${translations[currentLanguage]?.gratitudeJournalInstruction || "Take a few moments to write down things you are grateful for today, or respond to the prompt above."}</p>
                <textarea id="gratitude-text" rows="5" placeholder="${translations[currentLanguage]?.gratitudeJournalPlaceholder || "Type here..."}" style="width: 100%; margin-top: 10px; padding: 10px; border-radius: 5px; border: 1px solid var(--border-color);"></textarea>
                <button onclick="saveGratitude()" class="activity-action-button" data-lang-key="saveButtonText">${translations[currentLanguage]?.saveButtonText || "Save Entry"}</button>
                <div id="past-gratitude-entries" style="margin-top: 20px;">
                    <h4 data-lang-key="pastGratitudeEntriesTitle">${translations[currentLanguage]?.pastGratitudeEntriesTitle || "Your Past Gratitude Entries:"}</h4>
                    <ul id="gratitude-entries-list" class="past-entries-list"></ul>
                </div>
            `;
            break;
        case 'emotionCheckIn':
            activityContent = `
                ${journalPromptHTML('emotion')}
                <p class="instructions" data-lang-key="modalContent.emotionCheckIn.introduction">${translations[currentLanguage]?.modalContent?.emotionCheckIn?.introduction || "Take a moment to notice and name how you're feeling right now, without judgment. You can use the prompt above for reflection."}</p>
                <label for="emotionalCheckInInput" style="display:block; margin-top:15px;" data-lang-key="modalContent.emotionCheckIn.detailedInputLabel">${translations[currentLanguage]?.modalContent?.emotionCheckIn?.detailedInputLabel || "Share more about how you're feeling:"}</label>
                <textarea id="emotionalCheckInInput" rows="5" placeholder="${translations[currentLanguage]?.modalContent?.emotionCheckIn?.detailedInputPlaceholder || "Write your thoughts and feelings here..."}" style="width: 100%; margin-top: 5px; padding: 10px; border-radius: 5px; border: 1px solid var(--border-color); box-sizing: border-box;"></textarea>
                <button onclick="saveEmotionalCheckIn()" class="activity-action-button" data-lang-key="modalContent.emotionCheckIn.saveButtonText">${translations[currentLanguage]?.modalContent?.emotionCheckIn?.saveButtonText || "Save Check-in"}</button>
                <div id="pastEmotionalCheckIns" style="margin-top: 20px;">
                    <h4 data-lang-key="modalContent.emotionCheckIn.savedCheckInsTitle">${translations[currentLanguage]?.modalContent?.emotionCheckIn?.savedCheckInsTitle || "Your Past Check-ins:"}</h4>
                    <ul id="emotionalCheckInList" class="past-entries-list"></ul>
                </div>
            `; 
            break;
        case 'mindfulDrawing':
            activityContent = `
                <p class="instructions" data-lang-key="mindfulDrawingPrompt">${translations[currentLanguage]?.mindfulDrawingPrompt || "Focus on the sensation of drawing, the lines, and the colors. Let your creativity flow without judgment."}</p>
                <div class="drawing-controls">
                    <div>
                        <label for="drawing-color-picker" data-lang-key="drawingColorLabel">${translations[currentLanguage]?.drawingColorLabel || "Color:"}</label>
                        <input type="color" id="drawing-color-picker" value="${currentColor}">
                    </div>
                    <div>
                        <label for="drawing-brush-size" data-lang-key="drawingBrushSizeLabel">${translations[currentLanguage]?.drawingBrushSizeLabel || "Brush Size:"}</label>
                        <input type="range" id="drawing-brush-size" min="1" max="50" value="${currentBrushSize}">
                        <span id="drawing-brush-size-value">${currentBrushSize}px</span>
                    </div>
                    <button id="drawing-clear-canvas" class="activity-action-button" data-lang-key="drawingClearCanvas">${translations[currentLanguage]?.drawingClearCanvas || "Clear Canvas"}</button>
                </div>
                <canvas id="mindful-drawing-canvas"></canvas>
            `;
            break;
        case 'mindfulListening':
            activityContent = `
                <p class="instructions" data-lang-key="modalContent.mindfulListening.introduction">${translations[currentLanguage]?.modalContent?.mindfulListening?.introduction || "This activity helps you practice focused listening."}</p>
                <p style="margin-top:10px;" data-lang-key="modalContent.mindfulListening.prompt">${translations[currentLanguage]?.modalContent?.mindfulListening?.prompt || "Listen carefully to the sounds. What do you hear?"}</p>
                <div class="audio-guide" style="margin-top:15px;">
                    <p data-lang-key="modalContent.mindfulListening.audioPlayerLabel">${translations[currentLanguage]?.modalContent?.mindfulListening?.audioPlayerLabel || "Listen to the soundscape:"}</p>
                    <audio controls style="width:100%;">
                        <source src="audio/nature-sounds.mp3" type="audio/mpeg">
                        Your browser does not support the audio element. (Placeholder: nature_sounds.mp3)
                    </audio>
                </div>
                 <p style="margin-top:10px;" data-lang-key="modalContent.mindfulListening.afterAudioPrompt">${translations[currentLanguage]?.modalContent?.mindfulListening?.afterAudioPrompt || "What sounds did you notice?"}</p>
            `;
            break;
        case 'mindfulMovements':
            activityContent = `
                <p class="instructions" data-lang-key="mindfulMovementsIntro">${translations[currentLanguage]?.mindfulMovementsIntro || "Find a comfortable space where you can move a little."}</p>
                <ul style="margin-top:15px; list-style-position: inside; padding-left: 20px;">
                    <li data-lang-key="mindfulMovementsPrompt1" style="margin-bottom: 10px;">${translations[currentLanguage]?.mindfulMovementsPrompt1 || "Start with some gentle neck stretches."}</li>
                    <li data-lang-key="mindfulMovementsPrompt2" style="margin-bottom: 10px;">${translations[currentLanguage]?.mindfulMovementsPrompt2 || "Move to shoulder rolls."}</li>
                    <li data-lang-key="mindfulMovementsPrompt3" style="margin-bottom: 10px;">${translations[currentLanguage]?.mindfulMovementsPrompt3 || "Try some gentle wrist and ankle circles."}</li>
                    <li data-lang-key="mindfulMovementsPrompt4" style="margin-bottom: 10px;">${translations[currentLanguage]?.mindfulMovementsPrompt4 || "If you have space, try a gentle torso twist."}</li>
                </ul>
                <p style="margin-top:15px;" data-lang-key="mindfulMovementsOutro">${translations[currentLanguage]?.mindfulMovementsOutro || "Remember to listen to your body."}</p>
                <div class="audio-guide" style="margin-top:20px;">
                    <p data-lang-key="audioGuideLabel">${translations[currentLanguage]?.audioGuideLabel || "Listen to guided instructions (optional):"}</p>
                    <audio controls style="width: 100%; margin-top: 5px;">
                        <source src="audio/${currentLanguage}/mindful_movements.mp3" type="audio/mpeg">
                        Your browser does not support the audio element.
                    </audio>
                </div>
            `;
            break;
        case 'sensoryAwareness':
            activityContent = `
                <p class="instructions" data-lang-key="sensoryAwarenessIntro">${translations[currentLanguage]?.sensoryAwarenessIntro || "This activity helps you tune into your senses."}</p>
                <ul style="margin-top:15px; list-style-position: inside; padding-left: 20px;">
                    <li data-lang-key="sensoryAwarenessPromptSight" style="margin-bottom: 10px;">${translations[currentLanguage]?.sensoryAwarenessPromptSight || "Sight: Look around you."}</li>
                    <li data-lang-key="sensoryAwarenessPromptSound" style="margin-bottom: 10px;">${translations[currentLanguage]?.sensoryAwarenessPromptSound || "Sound: Close your eyes for a moment."}</li>
                    <li data-lang-key="sensoryAwarenessPromptSmell" style="margin-bottom: 10px;">${translations[currentLanguage]?.sensoryAwarenessPromptSmell || "Smell: What can you smell right now?"}</li>
                    <li data-lang-key="sensoryAwarenessPromptTouch" style="margin-bottom: 10px;">${translations[currentLanguage]?.sensoryAwarenessPromptTouch || "Touch: Pick up an object near you."}</li>
                    <li data-lang-key="sensoryAwarenessPromptTaste" style="margin-bottom: 10px;">${translations[currentLanguage]?.sensoryAwarenessPromptTaste || "Taste: Take a small bite or sip."}</li>
                </ul>
                <p style="margin-top:15px;" data-lang-key="sensoryAwarenessOutro">${translations[currentLanguage]?.sensoryAwarenessOutro || "Focusing on your senses can help ground you."}</p>
                <div class="audio-guide" style="margin-top:20px;">
                    <p data-lang-key="audioGuideLabel">${translations[currentLanguage]?.audioGuideLabel || "Listen to guided instructions (optional):"}</p>
                    <audio controls style="width: 100%; margin-top: 5px;">
                         <source src="audio/${currentLanguage}/sensory_awareness.mp3" type="audio/mpeg">
                        Your browser does not support the audio element.
                    </audio>
                </div>
            `;
            break;
        case 'natureObservation':
            activityContent = `
                <p class="instructions" data-lang-key="natureObservationIntro">${translations[currentLanguage]?.natureObservationIntro || "Find a comfortable spot where you can observe nature."}</p>
                <ul style="margin-top:15px; list-style-position: inside; padding-left: 20px;">
                    <li data-lang-key="natureObservationPrompt1" style="margin-bottom: 10px;">${translations[currentLanguage]?.natureObservationPrompt1 || "Look closely at a plant or flower."}</li>
                    <li data-lang-key="natureObservationPrompt2" style="margin-bottom: 10px;">${translations[currentLanguage]?.natureObservationPrompt2 || "If you can see animals, observe their movements."}</li>
                    <li data-lang-key="natureObservationPrompt3" style="margin-bottom: 10px;">${translations[currentLanguage]?.natureObservationPrompt3 || "Look up at the sky."}</li>
                    <li data-lang-key="natureObservationPrompt4" style="margin-bottom: 10px;">${translations[currentLanguage]?.natureObservationPrompt4 || "Listen to the sounds of nature."}</li>
                </ul>
                <p style="margin-top:15px;" data-lang-key="natureObservationOutro">${translations[currentLanguage]?.natureObservationOutro || "Spending a few moments observing nature can be calming."}</p>
                <div class="audio-guide" style="margin-top:20px;">
                    <p data-lang-key="audioGuideLabel">${translations[currentLanguage]?.audioGuideLabel || "Listen to guided instructions (optional):"}</p>
                    <audio controls style="width: 100%; margin-top: 5px;">
                        <source src="audio/${currentLanguage}/nature_observation.mp3" type="audio/mpeg">
                        Your browser does not support the audio element.
                    </audio>
                </div>
            `;
            break;
        case 'kindnessReflection':
            activityContent = `
                <p class="instructions" data-lang-key="kindnessReflectionIntro">${translations[currentLanguage]?.kindnessReflectionIntro || "Take a few quiet moments to think about kindness."}</p>
                <ul style="margin-top:15px; list-style-position: inside; padding-left: 20px;">
                    <li data-lang-key="kindnessReflectionPrompt1" style="margin-bottom: 10px;">${translations[currentLanguage]?.kindnessReflectionPrompt1 || "Think about a time someone was kind to you."}</li>
                    <li data-lang-key="kindnessReflectionPrompt2" style="margin-bottom: 10px;">${translations[currentLanguage]?.kindnessReflectionPrompt2 || "Recall a time you were kind to someone else."}</li>
                    <li data-lang-key="kindnessReflectionPrompt3" style="margin-bottom: 10px;">${translations[currentLanguage]?.kindnessReflectionPrompt3 || "Consider small, everyday acts of kindness."}</li>
                    <li data-lang-key="kindnessReflectionPrompt4" style="margin-bottom: 10px;">${translations[currentLanguage]?.kindnessReflectionPrompt4 || "How can you bring more kindness into your day?"}</li>
                </ul>
                <p style="margin-top:15px;" data-lang-key="kindnessReflectionOutro">${translations[currentLanguage]?.kindnessReflectionOutro || "Reflecting on kindness can help us appreciate it more."}</p>
                <div class="audio-guide" style="margin-top:20px;">
                    <p data-lang-key="audioGuideLabel">${translations[currentLanguage]?.audioGuideLabel || "Listen to guided reflection (optional):"}</p> 
                    <audio controls style="width: 100%; margin-top: 5px;">
                        <source src="audio/${currentLanguage}/kindness_reflection.mp3" type="audio/mpeg">
                        Your browser does not support the audio element.
                    </audio>
                </div>
            `;
            break;
        case 'mindfulColoring':
            activityContent = `
                <p class="instructions">${translations[currentLanguage]?.modalContent?.mindfulColoring?.introduction || "Engage your senses by focusing on the act of coloring."}</p>
                <div id="coloring-page-selector" class="coloring-page-selector">
                    <p data-lang-key="coloringPageChoose">${translations[currentLanguage]?.coloringPageChoose || "Choose an image to color:"}</p>
                    <!-- Thumbnails will be added here by JS -->
                </div>
                <div id="coloring-page-canvas-area" class="coloring-page-canvas-area" style="display:none;">
                    <!-- SVG will be loaded here -->
                </div>
                <div id="coloring-palette-container" class="coloring-palette-container" style="display:none;">
                    <!-- Color palette will be added here by JS -->
                </div>
                 <button id="reset-coloring-button" class="activity-action-button" style="display:none;" data-lang-key="resetColorsButton">${translations[currentLanguage]?.resetColorsButton || "Reset Colors"}</button>
            `;
            break;
        case 'positiveAffirmations':
            activityContent = `
                <p class="instructions" data-lang-key="modalContent.positiveAffirmations.introduction">${translations[currentLanguage]?.modalContent?.positiveAffirmations?.introduction || "Affirmations are positive statements..."}</p>
                <ul style="margin-top:10px; list-style-position: inside; padding-left: 20px;">
                    ${(translations[currentLanguage]?.modalContent?.positiveAffirmations?.affirmationsList || ["Affirmation 1", "Affirmation 2"]).map(aff => `<li>${aff}</li>`).join('')}
                </ul>
                <p style="margin-top:10px;" data-lang-key="affirmationsCreateOwn">${translations[currentLanguage]?.affirmationsCreateOwn || "You can also create your own affirmations!"}</p>
                <div style="margin-top: 20px;">
                    <textarea id="user-affirmation-text" rows="3" style="width: 100%; padding: 10px; border-radius: 5px; border: 1px solid var(--border-color);" placeholder="${translations[currentLanguage]?.affirmationInputPlaceholder || "Type your own affirmation here..."}"></textarea>
                    <button id="save-affirmation-button" onclick="saveUserAffirmation()" class="activity-action-button" data-lang-key="saveMyAffirmationButton">${translations[currentLanguage]?.saveMyAffirmationButton || "Save My Affirmation"}</button>
                </div>
                <div id="user-affirmations-list" style="margin-top: 20px;">
                    <h4 data-lang-key="mySavedAffirmationsTitle">${translations[currentLanguage]?.mySavedAffirmationsTitle || "My Saved Affirmations:"}</h4>
                    <ul id="user-affirmations-ul" class="past-entries-list"></ul>
                </div>
            `;
            break;
        case 'mindfulStorytelling':
            activityContent = `
                <p class="instructions">${translations[currentLanguage]?.modalContent?.mindfulStorytelling?.introduction || "Engage your imagination..."}</p>
                <p style="margin-top:10px;"><strong>${translations[currentLanguage]?.modalContent?.mindfulStorytelling?.promptCreate?.split(':')[0] || "Create a Story"}:</strong> ${translations[currentLanguage]?.modalContent?.mindfulStorytelling?.promptCreate?.split(':')[1] || " Start with a simple prompt..."}</p>
                <p style="margin-top:10px;"><strong>${translations[currentLanguage]?.modalContent?.mindfulStorytelling?.promptListen?.split(':')[0] || "Listen to a Story"}:</strong> ${translations[currentLanguage]?.modalContent?.mindfulStorytelling?.promptListen?.split(':')[1] || " Find a calming story..."}</p>
                <div class="audio-guide" style="margin-top:15px;">
                    <audio controls style="width:100%;">
                        <source src="audio/mindful-story.mp3" type="audio/mpeg">
                        Your browser does not support the audio element. (Placeholder: mindful-story.mp3)
                    </audio>
                </div>
                 <textarea rows="3" style="width: 100%; margin-top:15px; padding: 10px; border-radius: 5px; border: 1px solid var(--border-color);" placeholder="${translations[currentLanguage]?.modalContent?.mindfulStorytelling?.storyPlaceholder || "Start writing your story here..."}"></textarea>
            `;
            break;
        default:
            titleElement.textContent = "Activity";
            activityContent = '<p>Activity not found.</p>';
            break;
    }

    contentElement.innerHTML = activityContent;

    if (type === 'gratitudeJournal') {
        displayJournalPrompt('gratitude');
        displayGratitudeEntries();
    }
    if (type === 'emotionCheckIn') {
        displayJournalPrompt('emotion');
        displayEmotionalCheckIns();
    }
    if (type === 'positiveAffirmations') { 
        displayUserAffirmations();
    }
    if (type === 'mindfulDrawing') {
        initializeDrawingCanvas();
    }
    if (type === 'mindfulColoring') {
        initializeColoringPageSelector();
    }


    const activityAudioElement = contentElement.querySelector('audio');
    if (activityAudioElement) {
        activityAudioElement.load(); 
        let progressDisplay = contentElement.querySelector('.audio-progress-text');
        if (!progressDisplay) {
            progressDisplay = document.createElement('div');
            progressDisplay.className = 'audio-progress-text';
            progressDisplay.textContent = '00:00 / 00:00';
            if (activityAudioElement.parentElement.classList.contains('audio-guide')) {
                 activityAudioElement.parentElement.insertAdjacentElement('afterend', progressDisplay);
            } else {
                activityAudioElement.insertAdjacentElement('afterend', progressDisplay);
            }
        } else {
             progressDisplay.textContent = '00:00 / 00:00';
        }

        activityAudioElement.addEventListener('loadedmetadata', () => {
            progressDisplay.textContent = `${formatTime(activityAudioElement.currentTime)} / ${formatTime(activityAudioElement.duration)}`;
        });
        activityAudioElement.addEventListener('timeupdate', () => {
            progressDisplay.textContent = `${formatTime(activityAudioElement.currentTime)} / ${formatTime(activityAudioElement.duration)}`;
        });
    }

    if (!isRefresh) {
        modal.classList.add('show');
    }
}

function saveUserAffirmation() {
    const affirmationTextElement = document.getElementById('user-affirmation-text');
    const affirmationText = affirmationTextElement.value.trim();
    const saveButton = document.getElementById('save-affirmation-button');

    if (affirmationText === "") {
        showFeedbackMessage(translations[currentLanguage]?.affirmationEmptyAlert || "Please write an affirmation.", 'error');
        return;
    }

    let userAffirmations = JSON.parse(localStorage.getItem('userAffirmations')) || [];

    if (editingAffirmationIndex !== null) { 
        userAffirmations[editingAffirmationIndex] = affirmationText;
        showFeedbackMessage(translations[currentLanguage]?.affirmationUpdatedSuccess || "Affirmation updated!", 'success');
    } else { 
        if (userAffirmations.includes(affirmationText)) {
            showFeedbackMessage(translations[currentLanguage]?.affirmationExistsAlert || "This affirmation is already saved.", 'info');
            return;
        }
        userAffirmations.push(affirmationText);
        showFeedbackMessage(translations[currentLanguage]?.affirmationSavedSuccess || "Affirmation saved!", 'success');
    }
    
    localStorage.setItem('userAffirmations', JSON.stringify(userAffirmations));
    affirmationTextElement.value = ''; 
    editingAffirmationIndex = null; 
    if (saveButton) { 
        saveButton.textContent = translations[currentLanguage]?.saveMyAffirmationButton || "Save My Affirmation";
        saveButton.setAttribute('data-lang-key', 'saveMyAffirmationButton');
    }
    displayUserAffirmations(); 
}

function editUserAffirmation(index) {
    let userAffirmations = JSON.parse(localStorage.getItem('userAffirmations')) || [];
    if (index >= 0 && index < userAffirmations.length) {
        const affirmationTextElement = document.getElementById('user-affirmation-text');
        const saveButton = document.getElementById('save-affirmation-button');
        
        if(affirmationTextElement && saveButton) {
            affirmationTextElement.value = userAffirmations[index];
            affirmationTextElement.focus();
            editingAffirmationIndex = index;
            saveButton.textContent = translations[currentLanguage]?.updateAffirmationButton || "Update Affirmation";
            saveButton.removeAttribute('data-lang-key'); 
        }
    }
}

function deleteUserAffirmation(index) {
    let userAffirmations = JSON.parse(localStorage.getItem('userAffirmations')) || [];
    if (index >= 0 && index < userAffirmations.length) {
        userAffirmations.splice(index, 1);
        localStorage.setItem('userAffirmations', JSON.stringify(userAffirmations));
        showFeedbackMessage(translations[currentLanguage]?.affirmationDeletedSuccess || "Affirmation deleted.", 'success');
        
        if (editingAffirmationIndex === index) {
            const affirmationTextElement = document.getElementById('user-affirmation-text');
            const saveButton = document.getElementById('save-affirmation-button');
            if (affirmationTextElement) affirmationTextElement.value = '';
            editingAffirmationIndex = null;
            if (saveButton) {
                saveButton.textContent = translations[currentLanguage]?.saveMyAffirmationButton || "Save My Affirmation";
                saveButton.setAttribute('data-lang-key', 'saveMyAffirmationButton');
            }
        }
        displayUserAffirmations();
    }
}


function displayUserAffirmations() {
    const ul = document.getElementById('user-affirmations-ul');
    if (!ul) return; 
    ul.innerHTML = ''; 
    let userAffirmations = JSON.parse(localStorage.getItem('userAffirmations')) || [];
    if (userAffirmations.length === 0) {
        const li = document.createElement('li');
        li.textContent = translations[currentLanguage]?.noSavedAffirmations || "You haven't saved any affirmations yet.";
        li.className = 'empty-entries-message'; 
        ul.appendChild(li);
    } else {
        userAffirmations.forEach((affirmation, index) => {
            const li = document.createElement('li');
            li.className = 'affirmation-list-item';

            const textSpan = document.createElement('span');
            textSpan.textContent = affirmation;
            textSpan.className = 'affirmation-text-item';
            li.appendChild(textSpan);

            const controlsDiv = document.createElement('div');
            controlsDiv.className = 'affirmation-item-controls';

            const editButton = document.createElement('button');
            editButton.innerHTML = `<i class="fas fa-edit"></i> ${translations[currentLanguage]?.editButtonText || "Edit"}`;
            editButton.className = 'affirmation-edit-button';
            editButton.onclick = () => editUserAffirmation(index);
            controlsDiv.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = `<i class="fas fa-trash-alt"></i> ${translations[currentLanguage]?.deleteButtonText || "Delete"}`;
            deleteButton.className = 'affirmation-delete-button';
            deleteButton.onclick = () => {
                if (confirm(translations[currentLanguage]?.confirmDeleteAffirmation || "Are you sure you want to delete this affirmation?")) {
                    deleteUserAffirmation(index);
                }
            };
            controlsDiv.appendChild(deleteButton);
            
            li.appendChild(controlsDiv);
            ul.appendChild(li);
        });
    }
}

function saveGratitude() {
    const gratitudeTextElement = document.getElementById('gratitude-text');
    const gratitudeText = gratitudeTextElement.value.trim();
    if (gratitudeText === "") {
        showFeedbackMessage(translations[currentLanguage]?.gratitudeJournalEmptyAlert || "Please write something you are grateful for.", 'error');
        return;
    }
    const newEntry = {
        text: gratitudeText,
        timestamp: new Date().toISOString()
    };
    let gratitudeEntries = JSON.parse(localStorage.getItem('userGratitudeEntries')) || [];
    gratitudeEntries.push(newEntry);
    localStorage.setItem('userGratitudeEntries', JSON.stringify(gratitudeEntries));
    showFeedbackMessage(translations[currentLanguage]?.gratitudeJournalSavedSuccess || "Gratitude entry saved!", 'success');
    gratitudeTextElement.value = ''; 
    displayGratitudeEntries();
}

function displayGratitudeEntries() {
    const listElement = document.getElementById('gratitude-entries-list');
    if (!listElement) return;
    listElement.innerHTML = '';
    let gratitudeEntries = JSON.parse(localStorage.getItem('userGratitudeEntries')) || [];
    if (gratitudeEntries.length === 0) {
        const li = document.createElement('li');
        li.textContent = translations[currentLanguage]?.noGratitudeEntriesYet || "You haven't saved any gratitude entries yet.";
        li.className = 'empty-entries-message';
        listElement.appendChild(li);
    } else {
        gratitudeEntries.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); 
        gratitudeEntries.forEach(entry => {
            const li = document.createElement('li');
            const timestamp = new Date(entry.timestamp);
            const formattedTime = timestamp.toLocaleString(currentLanguage, { 
                year: 'numeric', month: 'long', day: 'numeric', 
                hour: 'numeric', minute: '2-digit' 
            });
            li.innerHTML = `<strong>${formattedTime}:</strong><br>${entry.text.replace(/\n/g, '<br>')}`;
            listElement.appendChild(li);
        });
    }
}

function saveEmotionalCheckIn() {
    const inputElement = document.getElementById('emotionalCheckInInput');
    if (!inputElement) {
        console.error('emotionalCheckInInput element not found.');
        return;
    }
    const checkInText = inputElement.value.trim();
    if (checkInText === "") {
        showFeedbackMessage(translations[currentLanguage]?.modalContent?.emotionCheckIn?.emptyTextareaAlert || "Please write something before saving.", 'error');
        return;
    }
    const newEntry = {
        text: checkInText,
        timestamp: new Date().toISOString()
    };
    let emotionalCheckIns = JSON.parse(localStorage.getItem('userEmotionalCheckIns')) || [];
    emotionalCheckIns.push(newEntry);
    localStorage.setItem('userEmotionalCheckIns', JSON.stringify(emotionalCheckIns));
    showFeedbackMessage(translations[currentLanguage]?.modalContent?.emotionCheckIn?.checkInSavedSuccess || "Your emotional check-in has been saved.", 'success');
    inputElement.value = ''; 
    displayEmotionalCheckIns(); 
}

function displayEmotionalCheckIns() {
    const listElement = document.getElementById('emotionalCheckInList');
    if (!listElement) {
        return; 
    }
    listElement.innerHTML = ''; 
    let emotionalCheckIns = JSON.parse(localStorage.getItem('userEmotionalCheckIns')) || [];
    if (emotionalCheckIns.length === 0) {
        const li = document.createElement('li');
        li.textContent = translations[currentLanguage]?.modalContent?.emotionCheckIn?.noCheckInsYet || "You haven't saved any check-ins yet.";
        li.className = 'empty-entries-message';
        listElement.appendChild(li);
    } else {
        emotionalCheckIns.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        emotionalCheckIns.forEach(entry => {
            const li = document.createElement('li');
            const timestamp = new Date(entry.timestamp);
            const formattedTime = timestamp.toLocaleString(currentLanguage, { 
                year: 'numeric', month: 'long', day: 'numeric', 
                hour: 'numeric', minute: '2-digit' 
            });
            li.innerHTML = `<strong>${formattedTime}:</strong><br>${entry.text.replace(/\n/g, '<br>')}`;
            listElement.appendChild(li);
        });
    }
}

function startPractice(practiceType, isRefresh = false) {
    const practiceDetails = practiceDataStore[practiceType];
    if (!practiceDetails) {
        console.error(`Details not found for practice type: ${practiceType}`);
        showFeedbackMessage(translations[currentLanguage]?.generalError || 'Selected practice is currently unavailable.', 'error');
        return;
    }
    const modal = document.getElementById('practice-modal');
    if (!isRefresh) { 
        clearCurrentActivityIndicator(); 
        const practiceCard = document.querySelector(`.practice-card[data-item-id="${practiceType}"]`);
        if (practiceCard) {
            practiceCard.classList.add('current-item');
            currentlyActiveCardElement = practiceCard;
        }
    }
    modal.dataset.currentPracticeType = practiceType; 
    const { titleKey, simpleDescriptionKey, audioFileBase, modalContentKey } = practiceDetails;
    const titleElement = document.getElementById('practice-title');
    const descriptionElement = document.getElementById('practice-description');
    const audioElement = document.getElementById('practice-audio');
    const audioSourceElement = audioElement ? audioElement.querySelector('source') : null;
    const favoriteIcon = modal ? modal.querySelector('.favorite-icon.practice-favorite-icon') : null;
    const progressDisplay = document.getElementById('audio-progress-display');
    if (!modal || !titleElement || !descriptionElement || !audioElement || !audioSourceElement || !favoriteIcon || !progressDisplay) {
        console.error('Practice modal elements (including progress display) not found!');
        return;
    }
    progressDisplay.textContent = "00:00 / 00:00";
    titleElement.textContent = translations[currentLanguage]?.[titleKey] || practiceDetails.titleKey || 'Practice Title';
    let descriptionHtml = '';
    const richContent = translations[currentLanguage]?.modalContent?.[modalContentKey];
    if (richContent && richContent.introduction) {
        descriptionHtml = `<p>${richContent.introduction.replace(/\n/g, '<br>')}</p>`;
        if (richContent.steps && Array.isArray(richContent.steps) && richContent.steps.length > 0) {
            descriptionHtml += '<ol style="padding-left: 20px; margin-top:10px;">'; 
            richContent.steps.forEach(step => {
                descriptionHtml += `<li style="margin-bottom: 5px;">${step.replace(/\n/g, '<br>')}</li>`;
            });
            descriptionHtml += '</ol>';
        }
        descriptionElement.innerHTML = descriptionHtml;
    } else if (translations[currentLanguage]?.[simpleDescriptionKey]) {
        descriptionElement.innerHTML = `<p>${translations[currentLanguage][simpleDescriptionKey].replace(/\n/g, '<br>')}</p>`;
    } else {
        descriptionElement.innerHTML = '<p>Description not available.</p>';
    }
    const langSpecificAudioFile = `audio/${currentLanguage}/${audioFileBase}`;
    if (audioSourceElement) audioSourceElement.src = langSpecificAudioFile; 
    audioElement.load(); 
    const onLoadedMetadata = () => {
        progressDisplay.textContent = `${formatTime(audioElement.currentTime)} / ${formatTime(audioElement.duration)}`;
    };
    const onTimeUpdate = () => {
        progressDisplay.textContent = `${formatTime(audioElement.currentTime)} / ${formatTime(audioElement.duration)}`;
    };
    if (audioElement._onLoadedMetadata) {
        audioElement.removeEventListener('loadedmetadata', audioElement._onLoadedMetadata);
    }
    if (audioElement._onTimeUpdate) {
        audioElement.removeEventListener('timeupdate', audioElement._onTimeUpdate);
    }
    audioElement._onLoadedMetadata = onLoadedMetadata; 
    audioElement._onTimeUpdate = onTimeUpdate;
    audioElement.addEventListener('loadedmetadata', audioElement._onLoadedMetadata);
    audioElement.addEventListener('timeupdate', audioElement._onTimeUpdate);
    favoriteIcon.dataset.itemId = practiceType; 
    updateFavoriteIcon(favoriteIcon, practiceType, 'practice');
    if(!isRefresh) {
        modal.classList.add('show'); 
    }
}

// --- Drawing Canvas Functions ---
function initializeDrawingCanvas() {
    drawingCanvas = document.getElementById('mindful-drawing-canvas');
    if (!drawingCanvas) return;
    drawingCtx = drawingCanvas.getContext('2d');

    const modalContent = drawingCanvas.closest('.modal-content');
    const containerWidth = modalContent ? modalContent.clientWidth - 40 : 500; 
    drawingCanvas.width = containerWidth;
    drawingCanvas.height = Math.min(300, containerWidth * 0.6); 


    drawingCtx.strokeStyle = currentColor;
    drawingCtx.lineWidth = currentBrushSize;
    drawingCtx.lineCap = 'round';
    drawingCtx.lineJoin = 'round';

    drawingCanvas.addEventListener('mousedown', startDrawing);
    drawingCanvas.addEventListener('mousemove', draw);
    drawingCanvas.addEventListener('mouseup', stopDrawing);
    drawingCanvas.addEventListener('mouseout', stopDrawing); 
    drawingCanvas.addEventListener('touchstart', startDrawingTouch, { passive: false });
    drawingCanvas.addEventListener('touchmove', drawTouch, { passive: false });
    drawingCanvas.addEventListener('touchend', stopDrawing);


    const colorPicker = document.getElementById('drawing-color-picker');
    const brushSizeSlider = document.getElementById('drawing-brush-size');
    const brushSizeValue = document.getElementById('drawing-brush-size-value');
    const clearButton = document.getElementById('drawing-clear-canvas');

    if (colorPicker) {
        colorPicker.value = currentColor; 
        colorPicker.addEventListener('input', (e) => {
            currentColor = e.target.value;
            if(drawingCtx) drawingCtx.strokeStyle = currentColor;
        });
    }
    if (brushSizeSlider && brushSizeValue) {
        brushSizeSlider.value = currentBrushSize; 
        brushSizeValue.textContent = `${currentBrushSize}px`;
        brushSizeSlider.addEventListener('input', (e) => {
            currentBrushSize = e.target.value;
            if(drawingCtx) drawingCtx.lineWidth = currentBrushSize;
            brushSizeValue.textContent = `${currentBrushSize}px`;
        });
    }
    if (clearButton) {
        clearButton.onclick = () => {
            if(drawingCtx) drawingCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
        };
    }
}

function getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}
function getTouchPos(canvas, touchEvt) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: touchEvt.touches[0].clientX - rect.left,
        y: touchEvt.touches[0].clientY - rect.top
    };
}


function startDrawing(e) {
    isDrawing = true;
    const pos = getMousePos(drawingCanvas, e);
    [lastX, lastY] = [pos.x, pos.y];
    drawingCtx.beginPath(); 
    drawingCtx.moveTo(lastX, lastY);
}
function startDrawingTouch(e) {
    e.preventDefault(); 
    isDrawing = true;
    const pos = getTouchPos(drawingCanvas, e);
    [lastX, lastY] = [pos.x, pos.y];
    drawingCtx.beginPath();
    drawingCtx.moveTo(lastX, lastY);
}


function draw(e) {
    if (!isDrawing) return;
    const pos = getMousePos(drawingCanvas, e);
    drawingCtx.lineTo(pos.x, pos.y);
    drawingCtx.stroke();
    [lastX, lastY] = [pos.x, pos.y];
}
function drawTouch(e) {
    if (!isDrawing) return;
    e.preventDefault(); 
    const pos = getTouchPos(drawingCanvas, e);
    drawingCtx.lineTo(pos.x, pos.y);
    drawingCtx.stroke();
    [lastX, lastY] = [pos.x, pos.y];
}

function stopDrawing() {
    if (isDrawing) {
        drawingCtx.closePath(); 
        isDrawing = false;
    }
}

function removeDrawingEventListeners() {
    if (drawingCanvas) {
        drawingCanvas.removeEventListener('mousedown', startDrawing);
        drawingCanvas.removeEventListener('mousemove', draw);
        drawingCanvas.removeEventListener('mouseup', stopDrawing);
        drawingCanvas.removeEventListener('mouseout', stopDrawing);
        drawingCanvas.removeEventListener('touchstart', startDrawingTouch);
        drawingCanvas.removeEventListener('touchmove', drawTouch);
        drawingCanvas.removeEventListener('touchend', stopDrawing);
    }
}
// --- End Drawing Canvas Functions ---

// --- Coloring Page Functions ---
function initializeColoringPageSelector() {
    const selectorContainer = document.getElementById('coloring-page-selector');
    const canvasArea = document.getElementById('coloring-page-canvas-area');
    const paletteContainer = document.getElementById('coloring-palette-container');
    const resetButton = document.getElementById('reset-coloring-button');


    if (!selectorContainer || !canvasArea || !paletteContainer) return;

    selectorContainer.innerHTML = `<p data-lang-key="coloringPageChoose">${translations[currentLanguage]?.coloringPageChoose || "Choose an image to color:"}</p>`;
    
    const thumbsContainer = document.createElement('div');
    thumbsContainer.className = 'coloring-thumbs-grid';
    coloringPagesData.forEach(page => {
        const thumbButton = document.createElement('button');
        thumbButton.className = 'coloring-page-thumb';
        thumbButton.innerHTML = `<i class="fas fa-image"></i> <span data-lang-key="${page.nameKey}">${translations[currentLanguage]?.[page.nameKey] || page.id}</span>`;
        thumbButton.onclick = () => loadColoringPage(page);
        thumbsContainer.appendChild(thumbButton);
    });
    selectorContainer.appendChild(thumbsContainer);

    selectorContainer.style.display = 'block';
    canvasArea.style.display = 'none';
    paletteContainer.style.display = 'none';
    if(resetButton) resetButton.style.display = 'none';
}

function loadColoringPage(pageData) {
    const selectorContainer = document.getElementById('coloring-page-selector');
    const canvasArea = document.getElementById('coloring-page-canvas-area');
    const paletteContainer = document.getElementById('coloring-palette-container');
    const resetButton = document.getElementById('reset-coloring-button');

    selectorContainer.style.display = 'none';
    canvasArea.style.display = 'block'; 
    paletteContainer.style.display = 'flex'; 
    if(resetButton) resetButton.style.display = 'inline-block';

    canvasArea.innerHTML = `<p class="loading-message" data-lang-key="coloringPageLoading">${translations[currentLanguage]?.coloringPageLoading || "Loading"} "<span data-lang-key="${pageData.nameKey}">${translations[currentLanguage]?.[pageData.nameKey] || pageData.id}</span>"...</p>`;

    fetch(`./images/${pageData.svgFile}`) // Assumes SVGs are in an 'images' folder
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok for ${pageData.svgFile}: ${response.statusText}`);
            }
            return response.text();
        })
        .then(svgText => {
            canvasArea.innerHTML = svgText;
            selectedColoringPageSVGElement = canvasArea.querySelector('svg');
            if (selectedColoringPageSVGElement) {
                setupSVGColoringListeners(selectedColoringPageSVGElement);
            } else {
                canvasArea.innerHTML = `<p class="error-message">Error: Could not parse SVG.</p>`;
            }
        })
        .catch(error => {
            console.error('Error fetching or parsing SVG:', error);
            canvasArea.innerHTML = `<p class="error-message">Error loading coloring page: ${pageData.nameKey}. Please check if the file exists in the 'images' folder.</p>`;
        });
    
    const colors = ['#FF6347', '#FFD700', '#ADFF2F', '#00FFFF', '#4169E1', '#EE82EE', 
                    '#FA8072', '#F0E68C', '#90EE90', '#ADD8E6', '#DDA0DD', '#FFB6C1',
                    '#FFFFFF', '#A9A9A9', '#000000', '#8B4513'];
    paletteContainer.innerHTML = ''; 
    colors.forEach((color, index) => {
        const colorButton = document.createElement('button');
        colorButton.className = 'color-palette-button';
        colorButton.style.backgroundColor = color;
        colorButton.dataset.color = color;
        colorButton.setAttribute('aria-label', `Select color ${color}`);
        if (index === 0) { // Make the first color active by default
            colorButton.classList.add('active');
            currentColorForColoring = color;
        }
        colorButton.onclick = (e) => {
            paletteContainer.querySelectorAll('.color-palette-button').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            currentColorForColoring = e.target.dataset.color;
        };
        paletteContainer.appendChild(colorButton);
    });

    if(resetButton) {
        resetButton.onclick = () => {
            if (selectedColoringPageSVGElement) {
                const paths = selectedColoringPageSVGElement.querySelectorAll('path, circle, rect, ellipse, polygon, line'); // Common SVG shapes
                paths.forEach(p => {
                    // Only reset fill if it's not 'none' or transparent (to preserve unfillable areas or outlines)
                    const currentFill = p.getAttribute('fill');
                    if (currentFill && currentFill.toLowerCase() !== 'none' && currentFill.toLowerCase() !== 'transparent') {
                        p.style.fill = ''; // Reset to original or remove inline style
                        // If SVGs have default fills, you might need a more complex reset
                        // For now, this clears inline fills applied by the user.
                    }
                });
                showFeedbackMessage(translations[currentLanguage]?.colorsReset || "Colors reset.", "info");
            }
        }
    }
}

function setupSVGColoringListeners(svgElement) {
    if (!svgElement) return;
    const paths = svgElement.querySelectorAll('path, circle, rect, ellipse, polygon, line'); // Target common SVG shapes
    paths.forEach(path => {
        // Add a class to style interactable paths if needed (e.g., hover)
        // path.classList.add('colorable-path'); 
        path.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event from bubbling up to parent if needed
            const targetPath = e.currentTarget;
            // Check if it's an element that should be filled (e.g., not a stroke-only line if you want to preserve those)
            // This simple version fills any clicked path.
            // You might need more complex logic based on your SVG structure (e.g., ignore paths with fill="none")
            const currentFill = targetPath.getAttribute('fill');
            if (currentFill && currentFill.toLowerCase() === 'none') {
                // Don't color paths that are explicitly set to no fill (often used for invisible hit areas or complex structures)
                return;
            }
            targetPath.style.fill = currentColorForColoring;
        });
    });
}