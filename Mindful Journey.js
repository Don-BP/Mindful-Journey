let currentLanguage = localStorage.getItem('appLanguage') || 'en';
let currentAffirmationObject = null; 
let userFavorites = {};
let currentlyActiveCardElement = null; 
let feedbackTimeout;


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
            if (itemCategory === 'practice' && newIcon.closest('#practice-modal')) {
            } else if (itemCategory === 'affirmation' && newIcon.closest('#affirmation-modal')) {
            } else {
            }
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
        }
    });
    const langSwitcherButton = document.getElementById('lang-switcher');
    if (langSwitcherButton) {
        langSwitcherButton.textContent = lang === 'en' ? '日本語' : 'EN';
    }

    const affirmationModalInstance = document.getElementById('affirmation-modal');
    if (affirmationModalInstance && affirmationModalInstance.style.display === 'flex' && currentAffirmationObject) {
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
    if (activityModal.style.display === 'flex') {
        const currentActivityType = activityModal.dataset.currentActivityType;
        if (currentActivityType) {
            openActivity(currentActivityType, true); 
        }
    }
    const practiceModal = document.getElementById('practice-modal');
    if (practiceModal.style.display === 'flex') {
        const currentPracticeType = practiceModal.dataset.currentPracticeType;
        if (currentPracticeType) {
            startPractice(currentPracticeType, true); 
        }
    }
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
        // Adjust scroll to account for sticky header height
        const headerHeight = document.querySelector('header')?.offsetHeight || 0;
        window.scrollTo({ top: targetSection.offsetTop - headerHeight - 10 , behavior: 'smooth' });
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
            affirmationModalInstance.style.display = 'flex';

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
            affirmationModal.style.display = 'none';
            currentAffirmationObject = null;
        };
    }

    window.addEventListener('click', (event) => {
        if (event.target === affirmationModal) {
            affirmationModal.style.display = 'none';
            currentAffirmationObject = null;
        }
    });

    const practiceModal = document.getElementById('practice-modal');
    const practiceCloseBtn = practiceModal.querySelector('.practice-close'); 
    const practiceAudioProgressDisplay = document.getElementById('audio-progress-display');
    
    if(practiceCloseBtn) {
        practiceCloseBtn.onclick = () => {
            practiceModal.style.display = 'none';
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
            practiceModal.style.display = 'none';
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
            activityModal.style.display = 'none';
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
            activityModal.style.display = 'none';
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

    // Hamburger Menu Logic
    const hamburgerButton = document.getElementById('hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const mainElement = document.querySelector('main'); 

    if (hamburgerButton && navLinks) {
        hamburgerButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent click from immediately closing via mainElement listener
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

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('mobile-nav-active')) {
                    navLinks.classList.remove('mobile-nav-active');
                    hamburgerButton.setAttribute('aria-expanded', 'false');
                    const icon = hamburgerButton.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                    document.body.classList.remove('mobile-nav-open');
                }
            });
        });

        // Close menu if clicked outside on main content or header (but not on nav itself)
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

    switch(type) {
        case 'gratitudeJournal':
            activityContent = `
                <p class="instructions" data-lang-key="gratitudeJournalPrompt">${translations[currentLanguage]?.gratitudeJournalPrompt || "Take a few moments to write down three things you are grateful for today."}</p>
                <textarea id="gratitude-text" rows="5" placeholder="${translations[currentLanguage]?.gratitudeJournalPlaceholder || "Type here..."}" style="width: 100%; margin-top: 10px; padding: 10px; border-radius: 5px; border: 1px solid #ccc;"></textarea>
                <button onclick="saveGratitude()" class="activity-action-button" data-lang-key="saveButtonText">${translations[currentLanguage]?.saveButtonText || "Save Entry"}</button>
                <div id="past-gratitude-entries" style="margin-top: 20px;">
                    <h4 data-lang-key="pastGratitudeEntriesTitle">${translations[currentLanguage]?.pastGratitudeEntriesTitle || "Your Past Gratitude Entries:"}</h4>
                    <ul id="gratitude-entries-list" class="past-entries-list"></ul>
                </div>
            `;
            break;
        case 'mindfulDrawing':
            activityContent = `
                <p class="instructions" data-lang-key="mindfulDrawingPrompt">${translations[currentLanguage]?.mindfulDrawingPrompt || "Find a piece of paper and something to draw with. Focus on the sensation of drawing, the lines, and the colors. Let your creativity flow without judgment."}</p>
                <p style="margin-top:10px;" data-lang-key="mindfulDrawingTip">${translations[currentLanguage]?.mindfulDrawingTip || "There's no right or wrong way to do this, just enjoy the process!"}</p>
                <div style="margin-top: 15px; text-align:center;">
                    <img src="https://via.placeholder.com/300x200.png?text=Mindful+Drawing+Space" alt="Mindful Drawing Placeholder" style="max-width:100%; border-radius: 5px;">
                </div>
                <div style="margin-top: 20px;">
                    <p data-lang-key="mindfulDrawingOnlineToolsPrompt">${translations[currentLanguage]?.mindfulDrawingOnlineToolsPrompt || "Here are some online drawing tools you can explore:"}</p>
                    <ul>
                        <li><a href="https://sketch.io/sketchpad/" target="_blank" rel="noopener noreferrer">Sketchpad</a></li>
                        <li><a href="https://jspaint.app/" target="_blank" rel="noopener noreferrer">JS Paint (classic MS Paint)</a></li>
                        <li><a href="https://kleki.com/" target="_blank" rel="noopener noreferrer">Kleki</a></li>
                    </ul>
                </div>
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
        case 'emotionCheckIn':
            activityContent = `
                <p class="instructions" data-lang-key="modalContent.emotionCheckIn.introduction">${translations[currentLanguage]?.modalContent?.emotionCheckIn?.introduction || "Take a moment to notice and name how you're feeling right now, without judgment."}</p>
                
                <label for="emotionalCheckInInput" style="display:block; margin-top:15px;" data-lang-key="modalContent.emotionCheckIn.detailedInputLabel">${translations[currentLanguage]?.modalContent?.emotionCheckIn?.detailedInputLabel || "Share more about how you're feeling:"}</label>
                <textarea id="emotionalCheckInInput" rows="5" placeholder="${translations[currentLanguage]?.modalContent?.emotionCheckIn?.detailedInputPlaceholder || "Write your thoughts and feelings here..."}" style="width: 100%; margin-top: 5px; padding: 10px; border-radius: 5px; border: 1px solid #ccc; box-sizing: border-box;"></textarea>
                <button onclick="saveEmotionalCheckIn()" class="activity-action-button" data-lang-key="modalContent.emotionCheckIn.saveButtonText">${translations[currentLanguage]?.modalContent?.emotionCheckIn?.saveButtonText || "Save Check-in"}</button>

                <div id="pastEmotionalCheckIns" style="margin-top: 20px;">
                    <h4 data-lang-key="modalContent.emotionCheckIn.savedCheckInsTitle">${translations[currentLanguage]?.modalContent?.emotionCheckIn?.savedCheckInsTitle || "Your Past Check-ins:"}</h4>
                    <ul id="emotionalCheckInList" class="past-entries-list"></ul>
                </div>
                <p style="margin-top:15px;" data-lang-key="modalContent.emotionCheckIn.reflectionPrompt">${translations[currentLanguage]?.modalContent?.emotionCheckIn?.reflectionPrompt || "Where do you feel this emotion in your body? What does it feel like?"}</p>
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
                <p style="margin-top:10px;">${translations[currentLanguage]?.modalContent?.mindfulColoring?.prompt || "Select a coloring page and begin coloring."}</p>
                <div style="margin-top: 15px; text-align:center;">
                    <img src="https://via.placeholder.com/300x200.png?text=Mindful+Coloring+Example" alt="Mindful Coloring Placeholder" style="max-width:100%; border-radius: 5px;">
                </div>
                <div style="margin-top: 20px;">
                     <p data-lang-key="mindfulColoringPrintablesPrompt">${translations[currentLanguage]?.mindfulColoringPrintablesPrompt || "Here are some links to printable coloring pages:"}</p>
                    <ul>
                        <li><a href="https://www.justcolor.net/mandalas/" target="_blank" rel="noopener noreferrer">Just Color - Mandalas</a></li>
                        <li><a href="https://www.crayola.com/free-coloring-pages/adult-coloring-pages/" target="_blank" rel="noopener noreferrer">Crayola - Adult Coloring Pages</a></li>
                        <li><a href="https://www.itsybitsyfun.com/coloring-pages.html" target="_blank" rel="noopener noreferrer">Itsy Bitsy Fun - Coloring Pages</a></li>
                    </ul>
                </div>
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
                    <textarea id="user-affirmation-text" rows="3" style="width: 100%; padding: 10px; border-radius: 5px; border: 1px solid #ccc;" placeholder="${translations[currentLanguage]?.affirmationInputPlaceholder || "Type your own affirmation here..."}"></textarea>
                    <button onclick="saveUserAffirmation()" class="activity-action-button" data-lang-key="saveMyAffirmationButton">${translations[currentLanguage]?.saveMyAffirmationButton || "Save My Affirmation"}</button>
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
                 <textarea rows="3" style="width: 100%; margin-top:15px; padding: 10px; border-radius: 5px; border: 1px solid #ccc;" placeholder="${translations[currentLanguage]?.modalContent?.mindfulStorytelling?.storyPlaceholder || "Start writing your story here..."}"></textarea>
            `;
            break;
        default:
            titleElement.textContent = "Activity";
            activityContent = '<p>Activity not found.</p>';
            break;
    }

    contentElement.innerHTML = activityContent;

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

    if (type === 'gratitudeJournal') {
        displayGratitudeEntries();
    }
    if (type === 'emotionCheckIn') {
        displayEmotionalCheckIns();
    }
    if (type === 'positiveAffirmations') { 
        displayUserAffirmations();
    }

    if (!isRefresh) {
        modal.style.display = 'flex';
    }
}

function saveUserAffirmation() {
    const affirmationTextElement = document.getElementById('user-affirmation-text');
    const affirmationText = affirmationTextElement.value.trim();
    if (affirmationText === "") {
        showFeedbackMessage(translations[currentLanguage]?.affirmationEmptyAlert || "Please write an affirmation.", 'error');
        return;
    }

    let userAffirmations = JSON.parse(localStorage.getItem('userAffirmations')) || [];
    if (userAffirmations.includes(affirmationText)) {
        showFeedbackMessage(translations[currentLanguage]?.affirmationExistsAlert || "This affirmation is already saved.", 'info');
        return;
    }
    userAffirmations.push(affirmationText);
    localStorage.setItem('userAffirmations', JSON.stringify(userAffirmations));

    showFeedbackMessage(translations[currentLanguage]?.affirmationSavedSuccess || "Affirmation saved!", 'success');
    affirmationTextElement.value = ''; 
    displayUserAffirmations(); 
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
        userAffirmations.forEach(affirmation => {
            const li = document.createElement('li');
            li.textContent = affirmation;
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
    if (audioSourceElement) audioSourceElement.src = langSpecificAudioFile; // Check if source element exists
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
        modal.style.display = 'flex'; 
    }
}