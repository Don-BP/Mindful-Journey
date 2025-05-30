const translations = {
    en: {
        // Nav
        navHome: "Home",
        navPractices: "Practices",
        navStudentZone: "Student Zone",
        navAbout: "About",
        navDailyAffirmation: "Daily Affirmation",
        // Hero
        heroTitle: "Welcome to Mindful Journey",
        heroSubtitle: "Your personal guide to mindfulness and wellness",
        heroButton: "Start Your Practice",
        // Practices Section
        practicesTitle: "Guided Practices",
        practiceBreathingTitle: "Focus on Breathing",
        practiceBreathingDesc: "Learn to focus your attention on your breath",
        practiceBodyScanTitle: "Body Scan",
        practiceBodyScanDesc: "Explore awareness of your body sensations",
        practiceMindfulMovementTitle: "Mindful Movement",
        practiceMindfulMovementDesc: "Connect your body and mind through movement",
        practiceLovingKindnessTitle: "Loving Kindness",
        practiceLovingKindnessDesc: "Cultivate kindness and compassion",
        practiceMindfulWalkingTitle: "Mindful Walking",
        practiceMindfulWalkingDesc: "Practice awareness while walking",
        practiceMindfulEatingTitle: "Mindful Eating",
        practiceMindfulEatingDesc: "Bring awareness to the experience of eating",
        practiceBreathingSpaceTitle: "Three Minute Breathing Space",
        practiceBreathingSpaceDesc: "A short practice to reconnect",
        practiceSoundsThoughtsTitle: "Sounds & Thoughts",
        practiceSoundsThoughtsDesc: "Observe sounds and thoughts without judgment",
        practiceMindfulSeeingTitle: "Mindful Seeing",
        practiceMindfulSeeingDesc: "Observe your surroundings with fresh eyes",
        practiceGratitudeMeditationTitle: "Gratitude Meditation",
        practiceGratitudeMeditationDesc: "Focus on and appreciate things you're grateful for",
        practiceMindfulListeningMusicTitle: "Mindful Listening to Music",
        practiceMindfulListeningMusicDesc: "Deeply listen to a piece of music",
        // Student Zone Section
        studentZoneTitle: "Student Zone",
        activityGratitudeTitle: "Gratitude Journal",
        activityGratitudeDesc: "Write down three things you're grateful for each day",
        activityDrawingTitle: "Mindful Drawing",
        activityDrawingDesc: "Create art while focusing on the present moment",
        activityListeningTitle: "Mindful Listening",
        activityListeningDesc: "Practice active listening with different sounds",
        activityEmotionTitle: "Emotion Check-In",
        activityEmotionDesc: "Explore and understand your emotions",
        activityColoringTitle: "Mindful Coloring",
        activityColoringDesc: "Engage your senses with creative coloring",
        activityAffirmationsTitle: "Positive Affirmations",
        activityAffirmationsDesc: "Cultivate a positive mindset with affirmations",
        activityStorytellingTitle: "Mindful Storytelling",
        activityStorytellingDesc: "Create or listen to stories with focused attention",
        startActivityButton: "Start Activity",
        affirmationsCreateOwn: "You can also create your own affirmations!",
        affirmationInputPlaceholder: "Type your own affirmation here...",
        saveMyAffirmationButton: "Save My Affirmation",
        mySavedAffirmationsTitle: "My Saved Affirmations:",
        affirmationEmptyAlert: "Please write an affirmation.",
        affirmationExistsAlert: "This affirmation is already saved.",
        affirmationSavedAlert: "Affirmation saved!",
        noSavedAffirmations: "You haven't saved any affirmations yet.",
        activityMovementsTitle: "Mindful Movements",
        activityMovementsDesc: "Gentle stretches and movements to connect with your body",
        mindfulMovementsModalTitle: "Mindful Movements & Stretching",
        mindfulMovementsIntro: "Find a comfortable space where you can move a little. These gentle movements are designed to help you connect with your body and release tension.",
        mindfulMovementsPrompt1: "Start with some gentle neck stretches. Slowly tilt your head from side to side, then gently look up and down. Feel the stretch.",
        mindfulMovementsPrompt2: "Move to shoulder rolls. Roll your shoulders forwards a few times, then backwards. Notice any sensations.",
        mindfulMovementsPrompt3: "Try some gentle wrist and ankle circles. How does this movement feel?",
        mindfulMovementsPrompt4: "If you have space, try a gentle torso twist. Sitting or standing, slowly twist your upper body from side to side.",
        mindfulMovementsOutro: "Remember to listen to your body and only move in ways that feel comfortable and safe.",
        audioGuideLabel: "Listen to guided instructions (optional):",
        activitySensoryTitle: "Sensory Awareness",
        activitySensoryDesc: "Explore the world around you by focusing on one sense at a time",
        sensoryAwarenessModalTitle: "Sensory Awareness Exploration",
        sensoryAwarenessIntro: "This activity helps you tune into your senses. Choose one sense to focus on (sight, sound, smell, taste, or touch) or follow the prompts to explore several.",
        sensoryAwarenessPromptSight: "Sight: Look around you. Notice colors, shapes, and textures you hadn't paid attention to before. Find something small and examine it closely.",
        sensoryAwarenessPromptSound: "Sound: Close your eyes for a moment. What sounds can you hear? Notice sounds near and far, loud and soft.",
        sensoryAwarenessPromptSmell: "Smell: What can you smell right now? If possible, find something with a distinct smell (like a fruit or a flower) and gently inhale its aroma.",
        sensoryAwarenessPromptTouch: "Touch: Pick up an object near you. Notice its texture, temperature, and weight. You can also focus on the sensation of your clothes on your skin or your feet on the floor.",
        sensoryAwarenessPromptTaste: "Taste (if you have something to eat/drink): Take a small bite or sip. Notice the flavors, textures, and temperature in your mouth slowly.",
        sensoryAwarenessOutro: "Focusing on your senses can help ground you in the present moment.",
        activityNatureTitle: "Nature Observation",
        activityNatureDesc: "Connect with the natural world by observing plants, animals, or the sky",
        natureObservationModalTitle: "Observing Nature's Wonders",
        natureObservationIntro: "Find a comfortable spot where you can observe nature, whether it's a plant indoors, a view from your window, or being outside.",
        natureObservationPrompt1: "Look closely at a plant or flower. Notice its colors, shapes, and textures. Are there any insects or dew drops?",
        natureObservationPrompt2: "If you can see animals (birds, insects, squirrels), observe their movements and behaviors without disturbing them.",
        natureObservationPrompt3: "Look up at the sky. What do you see? Notice the clouds, their shapes, and how they move. If it's night, observe the moon and stars.",
        natureObservationPrompt4: "Listen to the sounds of nature. Can you hear birds, wind, rustling leaves, or rain?",
        natureObservationOutro: "Spending a few moments observing nature can be calming and refreshing.",
        activityKindnessTitle: "Kindness Reflection",
        activityKindnessDesc: "Reflect on acts of kindness, given and received",
        kindnessReflectionModalTitle: "Reflecting on Kindness",
        kindnessReflectionIntro: "Take a few quiet moments to think about kindness. This can be kindness you've shown to others, or kindness others have shown to you.",
        kindnessReflectionPrompt1: "Think about a time recently when someone was kind to you. What did they do? How did it make you feel?",
        kindnessReflectionPrompt2: "Recall a time you were kind to someone else. What motivated you? How do you think it made the other person feel? How did it make you feel?",
        kindnessReflectionPrompt3: "Consider small, everyday acts of kindness. These can be as simple as a smile, holding a door, or offering help.",
        kindnessReflectionPrompt4: "How can you bring a little more kindness into your day today, for yourself or for others?",
        kindnessReflectionOutro: "Reflecting on kindness can help us appreciate it more and inspire us to be kinder.",
        // About Section
        aboutTitle: "About Mindful Journey",
        aboutText: "Mindful Journey is an initiative by Brain Power to bring mindfulness and wellness education to students and adults in Japan. Based on the Mindfulness in Schools Project (MiSP), our platform provides guided practices and resources for developing mindfulness skills.",
        // Footer
        footerText: "&copy; 2025 Brain Power Mindfulness & Wellness",
        // Modal Titles (will need to be dynamic in app.js for practice/activity specific titles)
        // General
        logoText: "Mindful Journey",

        // Modal Generic
        modalCloseButton: "Close",
        modalAudioPlayerTitle: "Guided Audio:",
        modalEndPracticeButton: "End Practice",
        modalStartActivityButton: "Start Activity", // Already exists, but good to group
        affirmationPopupTitle: "Your Daily Affirmation",
        activityModalTitlePlaceholder: "Activity",
        activityModalContentPlaceholder: "Activity content will appear here.",
        gratitudeJournalPrompt: "Take a few moments to write down three things you are grateful for today.",
        gratitudeJournalPlaceholder: "Type here...",
        gratitudeJournalEmptyAlert: "Please write something before saving.",
        gratitudeJournalSavedAlert: "Entry saved! (Logged to console for now)",
        saveButtonText: "Save Entry",
        mindfulDrawingPrompt: "Find a piece of paper and something to draw with. Focus on the sensation of drawing, the lines, and the colors. Let your creativity flow without judgment.",
        mindfulDrawingTip: "There's no right or wrong way to do this, just enjoy the process!",

        // Modal Specific Content
        modalContent: {
            // --- Guided Practices ---
            breathing: {
                title: "Focus on Breathing",
                introduction: "This practice helps you anchor your attention to your breath, a constant and calming presence.",
                steps: [
                    "Find a comfortable position, either sitting on a chair or cushion, or lying down.",
                    "Gently close your eyes, or lower your gaze if you prefer.",
                    "Bring your awareness to the physical sensations of your breath. Notice where you feel it most vividly – perhaps in your nostrils, your chest, or your abdomen.",
                    "Observe the natural rhythm of your breath, without trying to change it. Simply follow the inflow and outflow.",
                    "When your mind wanders, as it naturally will, gently acknowledge the thought and then softly redirect your attention back to your breath.",
                    "Continue for a few minutes, or as long as you feel comfortable."
                ]
            },
            bodyScan: {
                title: "Body Scan",
                introduction: "This practice guides you to bring gentle, curious attention to different parts of your body, noticing any sensations without judgment.",
                steps: [
                    "Lie down on your back if possible, or sit comfortably. Let your arms rest by your sides.",
                    "Close your eyes if you feel comfortable doing so.",
                    "Bring your attention to the toes of your left foot. Notice any sensations – tingling, warmth, pressure, or nothing at all. Simply observe.",
                    "Slowly move your awareness up your left leg – through the foot, ankle, calf, shin, knee, thigh – spending a moment with each part.",
                    "Repeat this process with your right leg, starting from the toes and moving upwards.",
                    "Now bring your attention to your pelvis, abdomen, and lower back. Then move to your chest and upper back.",
                    "Scan your attention through your hands, arms, and shoulders.",
                    "Finally, bring your awareness to your neck, face, and head, noticing any sensations.",
                    "Rest for a few moments, allowing your whole body to be present and relaxed."
                ]
            },
            mindfulMovement: {
                title: "Mindful Movement",
                introduction: "Engage in gentle movements with full awareness, noticing how your body feels as it moves.",
                steps: [
                    "Stand or sit in a way that allows for gentle movement.",
                    "Begin with some gentle neck stretches. Slowly tilt your head from side to side, then gently nod up and down. Notice the sensations in your neck and shoulders.",
                    "Move to shoulder rolls. Inhale as you bring your shoulders up towards your ears, and exhale as you roll them back and down.",
                    "Extend your arms out to the sides and make gentle circles, first in one direction, then the other.",
                    "If standing, you can try gentle torso twists, or slow, mindful steps in place.",
                    "Focus on the sensations of movement, the stretching, and the breath. Move slowly and with intention."
                ]
            },
            lovingKindness: {
                title: "Loving Kindness Meditation",
                introduction: "Cultivate feelings of warmth, kindness, and compassion for yourself and others.",
                steps: [
                    "Find a comfortable seated position. Close your eyes gently.",
                    "Bring to mind someone you care about deeply, someone for whom it's easy to feel warmth and kindness. Silently repeat phrases like: 'May you be happy. May you be healthy. May you be safe. May you live with ease.'",
                    "Now, extend these wishes to yourself: 'May I be happy. May I be healthy. May I be safe. May I live with ease.'",
                    "Next, think of a neutral person, someone you don't have strong feelings about. Extend the same wishes to them.",
                    "If you feel ready, bring to mind someone with whom you have difficulty. Extend these wishes of loving-kindness to them as well.",
                    "Finally, extend these wishes to all beings everywhere: 'May all beings be happy. May all beings be healthy. May all beings be safe. May all beings live with ease.'",
                    "Rest in this feeling of expansive kindness for a few moments."
                ]
            },
            mindfulWalking: {
                title: "Mindful Walking",
                introduction: "Bring awareness to the simple act of walking, noticing the sensations in your feet and body.",
                steps: [
                    "Find a space where you can walk back and forth a few paces, or walk in a slow circle.",
                    "Stand still for a moment, feeling your feet on the ground.",
                    "Begin to walk very slowly. Pay attention to the sensation of lifting one foot, moving it through the air, placing it down, and the shift of weight.",
                    "Notice the contact of your foot with the ground – heel, sole, toes.",
                    "Coordinate your breath with your steps if you like, perhaps inhaling for a few steps and exhaling for a few steps.",
                    "When your mind wanders, gently bring your attention back to the sensations of walking.",
                    "Continue for your desired duration."
                ]
            },
            mindfulEating: {
                title: "Mindful Eating",
                introduction: "Transform a simple meal or snack into a practice of mindfulness by paying full attention to the experience of eating.",
                steps: [
                    "Take a small piece of food (e.g., a raisin, a nut, a piece of fruit).",
                    "First, look at the food. Notice its color, texture, shape, and size as if you've never seen it before.",
                    "Touch the food. Explore its surface with your fingers.",
                    "Bring the food to your nose and smell it. Notice its aroma.",
                    "Slowly bring the food to your mouth. Notice how your hand and arm know exactly where to go. Place it in your mouth but don't chew yet.",
                    "Explore the sensations of the food in your mouth. Notice its texture and taste on your tongue.",
                    "When you're ready, begin to chew very slowly. Notice the change in texture and the release of flavors. Pay attention to the act of chewing itself.",
                    "Before you swallow, notice the intention to swallow. Then, consciously swallow the food, following its path down your throat.",
                    "Take a moment to notice the aftertaste and any lingering sensations."
                ]
            },
            breathingSpace: {
                title: "Three Minute Breathing Space",
                introduction: "A brief practice to help you step out of automatic pilot and reconnect with the present moment.",
                steps: [
                    "Step 1: Awareness. Bring your awareness to your inner experience. Ask: What is my experience right now? What thoughts are going through my mind? What feelings are here? What body sensations am I aware of? Acknowledge these without judgment.",
                    "Step 2: Gathering. Gently redirect your full attention to your breath. Experience the sensations of the breath in your body, the rise and fall. Use the breath as an anchor to the present moment.",
                    "Step 3: Expanding. Expand your awareness around your breathing to include your whole body, your posture, and facial expression. Sense the space around you. Hold this broader awareness as you prepare to re-engage with your day."
                ]
            },
            soundsThoughts: {
                title: "Sounds & Thoughts",
                introduction: "Practice observing sounds and thoughts as they arise and pass, without getting caught up in them.",
                steps: [
                    "Sit comfortably and close your eyes or lower your gaze.",
                    "First, bring your attention to the sounds around you. Listen to sounds near and far, without labeling them or judging them. Simply let them come and go, like clouds in the sky.",
                    "Notice if any sounds trigger thoughts or feelings. Just observe this process.",
                    "After a few minutes, shift your attention to your thoughts. Observe your thoughts as they arise in your mind. See them as mental events, passing through.",
                    "Try not to engage with the content of the thoughts, or follow their storyline. Simply note them: 'thinking, thinking.'",
                    "If you find yourself carried away by a thought, gently acknowledge it and return your focus to observing the flow of thoughts.",
                    "Continue for as long as you feel comfortable."
                ]
            },
            mindfulSeeing: {
                title: "Mindful Seeing",
                introduction: "Explore your visual environment with fresh, curious eyes, as if seeing things for the first time.",
                steps: [
                    "Choose an object to focus on – it could be a natural object like a flower or a stone, or an everyday item.",
                    "Look at the object with gentle attention. Notice its colors, shapes, textures, and how light interacts with it.",
                    "Try to see it without labels or pre-conceived ideas. Just observe its visual qualities.",
                    "Let your gaze wander over the object, exploring its details.",
                    "If your mind starts to analyze or judge, gently bring your attention back to simply seeing.",
                    "You can also practice mindful seeing with your broader surroundings, noticing the interplay of light and shadow, colors and forms around you."
                ]
            },
            gratitudeMeditation: {
                title: "Gratitude Meditation",
                introduction: "Focus on and appreciate the good things in your life, big or small, cultivating a sense of gratitude.",
                steps: [
                    "Sit comfortably and allow your body to relax.",
                    "Bring to mind something you are grateful for. It could be a person, a place, an opportunity, a simple pleasure, or a quality within yourself.",
                    "Hold this in your awareness. Notice how it feels in your body and mind to appreciate this.",
                    "Silently say 'thank you' or express your gratitude in your own way.",
                    "Continue by bringing to mind other things you are grateful for, one by one. Allow yourself to fully experience the feeling of gratitude for each.",
                    "You can focus on recent events or long-standing aspects of your life.",
                    "End the practice by carrying this sense of gratitude with you."
                ]
            },
            mindfulListeningMusic: {
                title: "Mindful Listening to Music",
                introduction: "Engage in deep, focused listening to a piece of music, noticing its various elements without distraction.",
                steps: [
                    "Choose a piece of music. Instrumental music often works well, but any music you enjoy can be used.",
                    "Find a comfortable position where you can listen without interruption.",
                    "As the music begins, bring your full attention to the sounds. Notice the different instruments, melodies, harmonies, and rhythms.",
                    "Try to listen without analyzing or judging the music. Simply let the sounds wash over you.",
                    "If your mind wanders, gently bring it back to the experience of listening.",
                    "Notice any emotions or sensations that arise as you listen.",
                    "Listen to the entire piece with this focused awareness."
                ]
            },

            // --- Student Zone Activities ---
            gratitudeJournal: {
                title: "Gratitude Journal",
                introduction: "Take a few moments to reflect on and write down things you are grateful for today.",
                prompt: "What are three things you are grateful for today?",
                placeholder: "1. ...\n2. ...\n3. ...",
                saveButton: "Save Entry"
            },
            mindfulDrawing: {
                title: "Mindful Drawing",
                introduction: "Engage your senses and focus on the present moment as you create a drawing. There's no right or wrong way to do it.",
                prompt: "Start drawing whatever comes to mind. Focus on the sensation of the pen or pencil on the paper, the colors you choose, and the shapes that emerge. Let go of any judgment.",
                canvasPlaceholder: "Your drawing area. (Note: Actual drawing canvas functionality is not implemented in this text-based version.)"
            },
            mindfulListening: {
                title: "Mindful Listening Activity",
                introduction: "This activity helps you practice focused listening. An audio clip will play. Try to notice as many different sounds as you can.",
                prompt: "Listen carefully to the sounds. What do you hear?",
                afterAudioPrompt: "What sounds did you notice? You can list them or just reflect internally.",
                audioPlayerLabel: "Listen to the soundscape:"
            },
            emotionCheckIn: {
                title: "Emotion Check-In",
                introduction: "Take a moment to notice and name how you're feeling right now, without judgment.",
                prompt: "How are you feeling right now? (e.g., happy, sad, calm, anxious, excited, tired)",
                inputPlaceholder: "Type your feeling(s) here...",
                reflectionPrompt: "Where do you feel this emotion in your body? What does it feel like?",
                detailedInputLabel: "Share more about how you're feeling:",
                detailedInputPlaceholder: "Write your thoughts and feelings here...",
                saveButtonText: "Save Check-in",
                checkInSavedAlert: "Your emotional check-in has been saved.",
                emptyTextareaAlert: "Please write something before saving.",
                savedCheckInsTitle: "Your Past Check-ins:",
                noCheckInsYet: "You haven't saved any check-ins yet."
            },
            mindfulColoring: {
                title: "Mindful Coloring",
                introduction: "Engage your senses by focusing on the act of coloring. Choose colors that appeal to you and notice the sensation of applying them.",
                prompt: "Select a coloring page (imagine one here!) and begin coloring. Pay attention to the colors, the movement of your hand, and the texture of the page.",
                coloringPagePlaceholder: "Imagine a beautiful coloring page here. (Note: Actual coloring functionality is not implemented in this text-based version.)"
            },
            positiveAffirmations: {
                title: "Positive Affirmations",
                introduction: "Affirmations are positive statements that can help you challenge and overcome self-sabotaging and negative thoughts. Repeat them to yourself, believing in their power.",
                prompt: "Choose an affirmation below, or create your own. Repeat it silently or aloud several times, focusing on its meaning.",
                affirmationsList: [
                    "I am capable and strong.",
                    "I choose to be happy and grateful today.",
                    "I am learning and growing every day.",
                    "I treat myself with kindness and respect.",
                    "I can overcome challenges."
                ],
                customAffirmationPrompt: "Or, write your own positive affirmation:"
            },
            mindfulStorytelling: {
                title: "Mindful Storytelling",
                introduction: "Engage your imagination and focus by creating or listening to a story with mindful attention.",
                promptCreate: "Think of a simple story. It could be about your day, a dream, or something entirely made up. Focus on the details as you tell it (even if just to yourself).",
                promptListen: "If listening to a story (imagine an audio player here), pay close attention to the words, the tone of voice, and the images that form in your mind. If your mind wanders, gently bring it back.",
                storyPlaceholder: "Start writing your story here, or imagine listening to one..."
            }
        }

    },
    ja: {
        // Nav
        navHome: "ホーム",
        navPractices: "実践",
        navStudentZone: "生徒ゾーン",
        navAbout: "概要",
        navDailyAffirmation: "今日のアファメーション",
        // Hero
        heroTitle: "マインドフルジャーニーへようこそ",
        heroSubtitle: "マインドフルネスとウェルネスへのあなたの個人的なガイド",
        heroButton: "実践を始める",
        // Practices Section
        practicesTitle: "ガイド付き実践",
        practiceBreathingTitle: "呼吸に集中する",
        practiceBreathingDesc: "呼吸に注意を集中することを学ぶ",
        practiceBodyScanTitle: "ボディスキャン",
        practiceBodyScanDesc: "身体感覚の意識を探る",
        practiceMindfulMovementTitle: "マインドフルムーブメント",
        practiceMindfulMovementDesc: "動きを通して体と心をつなぐ",
        practiceLovingKindnessTitle: "慈悲の瞑想",
        practiceLovingKindnessDesc: "優しさと思いやりの心を育む",
        practiceMindfulWalkingTitle: "マインドフルウォーキング",
        practiceMindfulWalkingDesc: "歩きながら意識を実践する",
        practiceMindfulEatingTitle: "マインドフルイーティング",
        practiceMindfulEatingDesc: "食べることの経験に意識を向ける",
        practiceBreathingSpaceTitle: "3分間の呼吸空間",
        practiceBreathingSpaceDesc: "再接続するための短い実践",
        practiceSoundsThoughtsTitle: "音と思考",
        practiceSoundsThoughtsDesc: "判断せずに音や思考を観察する",
        practiceMindfulSeeingTitle: "マインドフルシーイング",
        practiceMindfulSeeingDesc: "新鮮な目で周囲を観察する",
        practiceGratitudeMeditationTitle: "感謝の瞑想",
        practiceGratitudeMeditationDesc: "感謝していることに焦点を当て、感謝する",
        practiceMindfulListeningMusicTitle: "音楽をマインドフルに聴く",
        practiceMindfulListeningMusicDesc: "音楽作品を深く聴く",
        // Student Zone Section
        studentZoneTitle: "生徒ゾーン",
        activityGratitudeTitle: "感謝ジャーナル",
        activityGratitudeDesc: "毎日感謝していることを3つ書く",
        activityDrawingTitle: "マインドフルドローイング",
        activityDrawingDesc: "現在の瞬間に集中してアートを作成する",
        activityListeningTitle: "マインドフルリスニング",
        activityListeningDesc: "さまざまな音でアクティブリスニングを練習する",
        activityEmotionTitle: "感情チェックイン",
        activityEmotionDesc: "自分の感情を探り、理解する",
        activityColoringTitle: "マインドフルカラーリング",
        activityColoringDesc: "創造的なカラーリングで感覚を刺激する",
        activityAffirmationsTitle: "ポジティブなアファメーション",
        activityAffirmationsDesc: "アファメーションでポジティブな考え方を育む",
        activityStorytellingTitle: "マインドフルストーリーテリング",
        activityStorytellingDesc: "集中して物語を作ったり聞いたりします",
        startActivityButton: "アクティビティを開始",
        affirmationsCreateOwn: "自分でアファメーションを作ることもできます！",
        affirmationInputPlaceholder: "ここに自分のアファメーションを入力してください...",
        saveMyAffirmationButton: "マイアファメーションを保存",
        mySavedAffirmationsTitle: "保存したアファメーション：",
        affirmationEmptyAlert: "アファメーションを記入してください。",
        affirmationExistsAlert: "このアファメーションは既に保存されています。",
        affirmationSavedAlert: "アファメーションが保存されました！",
        noSavedAffirmations: "まだアファメーションを保存していません。",
        activityMovementsTitle: "マインドフルムーブメント",
        activityMovementsDesc: "身体とつながるための優しいストレッチと動き",
        mindfulMovementsModalTitle: "マインドフルムーブメント＆ストレッチ",
        mindfulMovementsIntro: "少し動ける快適なスペースを見つけてください。これらの優しい動きは、身体とつながり、緊張を和らげるのに役立つように設計されています。",
        mindfulMovementsPrompt1: "まず、優しい首のストレッチから始めましょう。ゆっくりと頭を左右に傾け、次に優しく上下を見ます。ストレッチを感じてください。",
        mindfulMovementsPrompt2: "肩回しに移ります。肩を数回前に回し、次に後ろに回します。どんな感覚があるか注目してください。",
        mindfulMovementsPrompt3: "優しい手首と足首の回し運動を試してみてください。この動きはどのように感じますか？",
        mindfulMovementsPrompt4: "スペースがあれば、優しい胴体のひねりを試してみてください。座っていても立っていても、上半身をゆっくりと左右にひねります。",
        mindfulMovementsOutro: "自分の身体の声に耳を傾け、快適で安全だと感じる方法でのみ動くことを忘れないでください。",
        audioGuideLabel: "ガイド付き指示を聞く（オプション）：",
        activitySensoryTitle: "感覚の意識",
        activitySensoryDesc: "一度に一つの感覚に焦点を当てて、あなたの周りの世界を探求しましょう",
        sensoryAwarenessModalTitle: "感覚の意識の探求",
        sensoryAwarenessIntro: "このアクティビティは、あなたの感覚に同調するのに役立ちます。焦点となる感覚を一つ選ぶか（視覚、聴覚、嗅覚、味覚、触覚）、プロンプトに従っていくつかを探求してください。",
        sensoryAwarenessPromptSight: "視覚：あなたの周りを見渡してください。以前は気づかなかった色、形、質感に気づきましょう。何か小さなものを見つけて、それを注意深く調べてください。",
        sensoryAwarenessPromptSound: "聴覚：少しの間、目を閉じてください。どんな音が聞こえますか？近くの音、遠くの音、大きな音、小さな音に気づきましょう。",
        sensoryAwarenessPromptSmell: "嗅覚：今、何を嗅ぐことができますか？可能であれば、はっきりとした匂いのするもの（果物や花など）を見つけて、その香りを優しく吸い込んでください。",
        sensoryAwarenessPromptTouch: "触覚：近くにある物を手に取ってください。その質感、温度、重さに気づきましょう。また、肌に対する服の感覚や床に対する足の感覚に焦点を当てることもできます。",
        sensoryAwarenessPromptTaste: "味覚（何か食べ物や飲み物がある場合）：少し一口食べるか、一口飲んでください。口の中の風味、質感、温度をゆっくりと味わってください。",
        sensoryAwarenessOutro: "感覚に焦点を当てることは、現在の瞬間にあなたをグラウンディングさせるのに役立ちます。",
        activityNatureTitle: "自然観察",
        activityNatureDesc: "植物、動物、または空を観察して、自然界とつながりましょう",
        natureObservationModalTitle: "自然の驚異の観察",
        natureObservationIntro: "屋内の植物、窓からの眺め、または屋外であっても、自然を観察できる快適な場所を見つけてください。",
        natureObservationPrompt1: "植物や花をよく見てください。その色、形、質感に気づきましょう。昆虫や露のしずくはありますか？",
        natureObservationPrompt2: "動物（鳥、昆虫、リスなど）が見える場合は、邪魔をせずにその動きや行動を観察してください。",
        natureObservationPrompt3: "空を見上げてください。何が見えますか？雲、その形、そしてそれらがどのように動くかに気づきましょう。夜であれば、月と星を観察してください。",
        natureObservationPrompt4: "自然の音に耳を傾けてください。鳥のさえずり、風の音、葉のざわめき、または雨の音が聞こえますか？",
        natureObservationOutro: "自然を観察する数分間は、心を落ち着かせ、リフレッシュさせることができます。",
        activityKindnessTitle: "親切のリフレクション",
        activityKindnessDesc: "与えられた、そして受け取った親切な行為を振り返る",
        kindnessReflectionModalTitle: "親切を振り返る",
        kindnessReflectionIntro: "静かな数分間を取って、親切について考えてみましょう。これは、あなたが他の人に示した親切、または他の人があなたに示した親切です。",
        kindnessReflectionPrompt1: "最近誰かがあなたに親切にしてくれた時のことを考えてみてください。彼らは何をしましたか？それはあなたをどのように感じさせましたか？",
        kindnessReflectionPrompt2: "あなたが他の誰かに親切にした時のことを思い出してください。何があなたを動機づけましたか？それは他の人をどのように感じさせたと思いますか？それはあなたをどのように感じさせましたか？",
        kindnessReflectionPrompt3: "日常の小さな親切な行為を考えてみてください。これらは、笑顔、ドアを押さえること、または助けを申し出ることなど、簡単なものです。",
        kindnessReflectionPrompt4: "今日、自分自身または他の人のために、もう少し親切をどのようにあなたの生活にもたらすことができますか？",
        kindnessReflectionOutro: "親切を振り返ることは、私たちがそれをより感謝し、より親切になるように私たちを鼓舞するのに役立ちます。",
        // About Section
        aboutTitle: "マインドフルジャーニーについて",
        aboutText: "マインドフルジャーニーは、日本の生徒と大人にマインドフルネスとウェルネス教育を提供するためのブレインパワーによるイニシアチブです。マインドフルネス・イン・スクール・プロジェクト（MiSP）に基づいて、私たちのプラットフォームはマインドフルネススキルを開発するためのガイド付き実践とリソースを提供します。",
        // Footer
        footerText: "&copy; 2025 ブレインパワー マインドフルネス & ウェルネス",
// ... (rest of the code remains the same)
        // Modal Titles (will need to be dynamic in app.js for practice/activity specific titles)
        // General
        logoText: "マインドフルジャーニー",

        // Modal Generic
        modalCloseButton: "閉じる",
        modalAudioPlayerTitle: "ガイド付き音声：",
        modalEndPracticeButton: "実践を終了",
        modalStartActivityButton: "アクティビティを開始", // 既存だがグループ化のため
        affirmationPopupTitle: "今日のアファメーション",
        activityModalTitlePlaceholder: "アクティビティ",
        activityModalContentPlaceholder: "アクティビティの内容はここに表示されます。",
        gratitudeJournalPrompt: "今日感謝していることを3つ書いてみましょう。",
        gratitudeJournalPlaceholder: "ここに記入してください…",
        gratitudeJournalEmptyAlert: "保存する前に何か書いてください。",
        gratitudeJournalSavedAlert: "エントリーが保存されました！（現時点ではコンソールにログが出力されます）",
        saveButtonText: "保存する",
        mindfulDrawingPrompt: "紙と描くものを用意しましょう。描く感覚、線、色に集中してください。判断せずに創造性を発揮しましょう。",
        mindfulDrawingTip: "正しい方法も間違った方法もありません。プロセスを楽しんでください！", // Added comma here

        // Modal Specific Content
        modalContent: {
            // --- Guided Practices ---
            breathing: {
                title: "呼吸に集中する",
                introduction: "この実践は、常に穏やかな存在である呼吸に注意を固定するのに役立ちます。",
                steps: [
                    "椅子やクッションに座るか、横になるか、快適な姿勢を見つけてください。",
                    "優しく目を閉じるか、好みに応じて視線を下げてください。",
                    "呼吸の身体的感覚に意識を向けてください。鼻孔、胸、腹部のどこで最も鮮明に感じるか注意してください。",
                    "呼吸の自然なリズムを観察し、変えようとしないでください。単に吸ったり吐いたりするのに従ってください。",
                    "心が自然にさまようときは、優しくその考えを認め、そっと呼吸に注意を戻してください。",
                    "数分間、または快適に感じる限り続けてください。"
                ]
            },
            bodyScan: {
                title: "ボディスキャン",
                introduction: "この実践は、判断せずにあらゆる感覚に気づきながら、体のさまざまな部分に優しく好奇心旺盛な注意を向けるように導きます。",
                steps: [
                    "可能であれば仰向けに横になるか、快適に座ってください。腕は体の横に休ませてください。",
                    "快適であれば目を閉じてください。",
                    "左足のつま先に注意を向けてください。チクチクする感じ、暖かさ、圧迫感、または何もないかなど、あらゆる感覚に注意してください。単に観察してください。",
                    "左足をゆっくりと上に向けて意識を動かします。足、足首、ふくらはぎ、すね、膝、太ももを通り、各部分で少し時間を費やします。",
                    "つま先から上に向かって、右足でもこのプロセスを繰り返します。",
                    "次に、骨盤、腹部、腰に注意を向けます。次に、胸と背中の上部に移動します。",
                    "手、腕、肩に注意を向けます。",
                    "最後に、首、顔、頭に意識を向け、あらゆる感覚に気づきます。",
                    "数分間休み、体全体が存在しリラックスできるようにします。"
                ]
            },
            mindfulMovement: {
                title: "マインドフルムーブメント",
                introduction: "体が動くときにどのように感じるかに気づきながら、完全な意識を持って穏やかな動きに従事します。",
                steps: [
                    "穏やかな動きができるように立つか座ってください。",
                    "穏やかな首のストレッチから始めます。ゆっくりと頭を左右に傾け、次に優しく上下にうなずきます。首と肩の感覚に注意してください。",
                    "肩回しに移動します。息を吸いながら肩を耳に近づけ、息を吐きながら肩を後ろに回して下げます。",
                    "腕を横に伸ばし、穏やかな円を描きます。最初は一方向に、次にもう一方の方向に。",
                    "立っている場合は、穏やかな胴体のひねりや、その場でのゆっくりとしたマインドフルなステップを試すことができます。",
                    "動きの感覚、ストレッチ、呼吸に集中してください。ゆっくりと意図を持って動いてください。"
                ]
            },
            lovingKindness: {
                title: "慈悲の瞑想",
                introduction: "自分自身と他者に対する温かさ、優しさ、思いやりの感情を育みます。",
                steps: [
                    "快適な座位を見つけてください。優しく目を閉じてください。",
                    "深く気にかけている人、温かさや優しさを感じやすい人を心に思い浮かべてください。「あなたが幸せでありますように。あなたが健康でありますように。あなたが安全でありますように。あなたが安らかに暮らせますように」といったフレーズを静かに繰り返します。",
                    "次に、これらの願いを自分自身に向けてください。「私が幸せでありますように。私が健康でありますように。私が安全でありますように。私が安らかに暮らせますように」。",
                    "次に、中立的な人、強い感情を抱いていない人を思い浮かべてください。同じ願いを彼らにも向けてください。",
                    "準備ができていると感じたら、困難を抱えている人を心に思い浮かべてください。彼らにもこれらの慈悲の願いを向けてください。",
                    "最後に、これらの願いをあらゆる場所にいるすべての存在に向けてください。「すべての存在が幸せでありますように。すべての存在が健康でありますように。すべての存在が安全でありますように。すべての存在が安らかに暮らせますように」。",
                    "この広大な優しさの感覚の中で数分間休んでください。"
                ]
            },
            mindfulWalking: {
                title: "マインドフルウォーキング",
                introduction: "足と体の感覚に気づきながら、歩くという単純な行為に意識を向けます。",
                steps: [
                    "数歩前後に歩けるスペース、またはゆっくりとした円を描いて歩けるスペースを見つけてください。",
                    "少しの間静止し、足が地面についているのを感じてください。",
                    "非常にゆっくりと歩き始めてください。片方の足を上げ、空中を移動させ、下ろし、体重が移動する感覚に注意してください。",
                    "かかと、足の裏、つま先など、足と地面との接触に注意してください。",
                    "よろしければ、呼吸をステップに合わせます。たとえば、数ステップ息を吸い、数ステップ息を吐きます。",
                    "心がさまようときは、優しく歩く感覚に注意を戻してください。",
                    "希望する時間続けてください。"
                ]
            },
            mindfulEating: {
                title: "マインドフルイーティング",
                introduction: "食事の経験に十分な注意を払うことで、簡単な食事や軽食をマインドフルネスの実践に変えます。",
                steps: [
                    "少量の食べ物（例：レーズン、ナッツ、果物のかけら）を取ります。",
                    "まず、食べ物を見てください。初めて見るかのように、その色、質感、形、大きさに注意してください。",
                    "食べ物に触れてください。指でその表面を探ってください。",
                    "食べ物を鼻に近づけて匂いを嗅いでください。その香りに注意してください。",
                    "ゆっくりと食べ物を口に運びます。手と腕がどこへ行くべきかを正確に知っていることに注意してください。口に入れますが、まだ噛まないでください。",
                    "口の中の食べ物の感覚を探ってください。舌の上の質感と味に注意してください。",
                    "準備ができたら、非常にゆっくりと噛み始めます。質感の変化と風味の放出に注意してください。噛むという行為そのものに注意を払ってください。",
                    "飲み込む前に、飲み込むという意図に注意してください。次に、意識的に食べ物を飲み込み、喉を下っていく経路を追ってください。",
                    "後味や残っている感覚に気づくために少し時間を取ってください。"
                ]
            },
            breathingSpace: {
                title: "3分間の呼吸空間",
                introduction: "自動操縦から抜け出し、現在の瞬間に再接続するのに役立つ短い実践。",
                steps: [
                    "ステップ1：気づき。内なる経験に意識を向けます。「私の現在の経験は何ですか？私の心にはどんな考えが浮かんでいますか？ここにはどんな感情がありますか？どんな身体感覚に気づいていますか？」と尋ねます。判断せずにこれらを認めます。",
                    "ステップ2：集める。呼吸に完全に注意を向け直します。体の中の呼吸の感覚、上昇と下降を体験します。呼吸を現在の瞬間へのアンカーとして使用します。",
                    "ステップ3：拡大する。呼吸の周りの意識を体全体、姿勢、表情を含むように拡大します。周りの空間を感じます。一日の活動に再び従事する準備をしながら、このより広い意識を保ちます。"
                ]
            },
            soundsThoughts: {
                title: "音と思考",
                introduction: "音や思考が現れては消えていくのを、それらに巻き込まれることなく観察する練習をします。",
                steps: [
                    "快適に座り、目を閉じるか視線を下げてください。",
                    "まず、周りの音に注意を向けてください。近くの音や遠くの音に耳を傾け、ラベルを付けたり判断したりしないでください。空の雲のように、ただ来ては去っていくのに任せてください。",
                    "音が思考や感情を引き起こすかどうかに注意してください。このプロセスをただ観察してください。",
                    "数分後、注意を思考に移します。心に浮かぶ思考を観察します。それらを精神的な出来事、通り過ぎるものとして見てください。",
                    "思考の内容に関与したり、その筋書きを追ったりしないようにしてください。単に「考えている、考えている」とメモしてください。",
                    "思考に夢中になっていることに気づいたら、優しくそれを認め、思考の流れを観察することに焦点を戻してください。",
                    "快適に感じる限り続けてください。"
                ]
            },
            mindfulSeeing: {
                title: "マインドフルシーイング",
                introduction: "初めて物事を見るかのように、新鮮で好奇心旺盛な目で視覚環境を探ります。",
                steps: [
                    "焦点を当てる対象を選びます。花や石のような自然物でも、日常品でもかまいません。",
                    "穏やかな注意を払って対象を見てください。その色、形、質感、光がどのように相互作用するかに注意してください。",
                    "ラベルや先入観なしにそれを見ようとしてください。単にその視覚的性質を観察してください。",
                    "視線を対象の上でさまよわせ、その詳細を探ってください。",
                    "心が分析したり判断したりし始めたら、優しく注意を単に見ることに戻してください。",
                    "また、周りの光と影、色と形の相互作用に気づきながら、より広い周囲でマインドフルシーイングを練習することもできます。"
                ]
            },
            gratitudeMeditation: {
                title: "感謝の瞑想",
                introduction: "大小を問わず、人生の良いことに焦点を当てて感謝し、感謝の気持ちを育みます。",
                steps: [
                    "快適に座り、体をリラックスさせてください。",
                    "感謝していることを心に思い浮かべてください。それは人、場所、機会、単純な喜び、または自分自身の資質かもしれません。",
                    "これを意識の中に留めてください。これを感謝することが体と心でどのように感じるかに注意してください。",
                    "静かに「ありがとう」と言うか、独自の方法で感謝の気持ちを表してください。",
                    "感謝している他のことを一つずつ心に思い浮かべながら続けます。それぞれに対する感謝の気持ちを十分に体験できるようにしてください。",
                    "最近の出来事や人生の長年の側面に焦点を当てることができます。",
                    "この感謝の気持ちを持ち続けて実践を終えてください。"
                ]
            },
            mindfulListeningMusic: {
                title: "音楽をマインドフルに聴く",
                introduction: "気を散らすことなく、そのさまざまな要素に気づきながら、音楽作品を深く集中的に聴くことに従事します。",
                steps: [
                    "音楽作品を選びます。器楽曲はうまくいくことが多いですが、好きな音楽なら何でも使用できます。",
                    "中断されることなく聴くことができる快適な場所を見つけてください。",
                    "音楽が始まったら、音に完全に注意を向けてください。さまざまな楽器、メロディー、ハーモニー、リズムに注意してください。",
                    "音楽を分析したり判断したりせずに聴いてみてください。単に音があなたを洗い流すのに任せてください。",
                    "心がさまようときは、優しく聴くという経験に戻してください。",
                    "聴きながら生じる感情や感覚に注意してください。",
                    "この集中した意識で作品全体を聴いてください。"
                ]
            },

            // --- Student Zone Activities ---
            gratitudeJournal: {
                title: "感謝ジャーナル",
                introduction: "今日感謝していることを振り返り、書き留めるために数分間取ってください。",
                prompt: "今日感謝していることは何ですか？3つ挙げてください。",
                placeholder: "1. ...\n2. ...\n3. ...",
                saveButton: "エントリーを保存"
            },
            mindfulDrawing: {
                title: "マインドフルドローイング",
                introduction: "絵を描きながら感覚を刺激し、現在の瞬間に集中します。正しい方法も間違った方法もありません。",
                prompt: "心に浮かんだものを何でも描き始めてください。紙の上のペンや鉛筆の感覚、選んだ色、現れる形に集中してください。あらゆる判断を手放してください。",
                canvasPlaceholder: "あなたの描画エリア。（注意：実際の描画キャンバス機能はこのテキストベースのバージョンでは実装されていません。）"
            },
            mindfulListening: {
                title: "マインドフルリスニングアクティビティ",
                introduction: "このアクティビティは、集中して聴く練習をするのに役立ちます。オーディオクリップが再生されます。できるだけ多くの異なる音に気づくようにしてください。",
                prompt: "音を注意深く聴いてください。何が聞こえますか？",
                afterAudioPrompt: "どんな音に気づきましたか？リストアップするか、内省することができます。",
                audioPlayerLabel: "サウンドスケープを聴く："
            },
            emotionCheckIn: {
                title: "感情チェックイン",
                introduction: "判断せずに、今どのように感じているかに気づき、名前を付けるために少し時間を取ってください。",
                prompt: "今どんな気分ですか？（例：幸せ、悲しい、穏やか、不安、興奮している、疲れている）",
                inputPlaceholder: "ここにあなたの感情を入力してください...",
                reflectionPrompt: "この感情を体のどこで感じますか？どんな感じがしますか？",
                detailedInputLabel: "今の気持ちについて詳しく教えてください：",
                detailedInputPlaceholder: "ここにあなたの考えや感情を書いてください…",
                saveButtonText: "チェックインを保存",
                checkInSavedAlert: "感情チェックインが保存されました。",
                emptyTextareaAlert: "保存する前に何か書いてください。",
                savedCheckInsTitle: "過去のチェックイン：",
                noCheckInsYet: "まだチェックインを保存していません。"
            },
            mindfulColoring: {
                title: "マインドフルカラーリング",
                introduction: "色を塗るという行為に集中することで感覚を刺激します。魅力的な色を選び、それらを塗る感覚に注意してください。",
                prompt: "塗り絵ページを選び（ここに想像してください！）、色を塗り始めてください。色、手の動き、ページの質感に注意を払ってください。",
                coloringPagePlaceholder: "ここに美しい塗り絵ページを想像してください。（注意：実際の塗り絵機能はこのテキストベースのバージョンでは実装されていません。）"
            },
            positiveAffirmations: {
                title: "ポジティブなアファメーション",
                introduction: "アファメーションは、自己破壊的で否定的な考えに挑戦し、克服するのに役立つ肯定的な記述です。それらの力を信じて、自分自身に繰り返してください。",
                prompt: "以下のアファメーションを選ぶか、独自のものを考案してください。その意味に集中しながら、静かにまたは声に出して数回繰り返してください。",
                affirmationsList: [
                    "私は有能で強いです。",
                    "私は今日、幸せで感謝することを選びます。",
                    "私は毎日学び成長しています。",
                    "私は自分自身を優しさと敬意を持って扱います。",
                    "私は困難を乗り越えることができます。"
                ],
                customAffirmationPrompt: "または、独自のポジティブなアファメーションを書いてください："
            },
            mindfulStorytelling: {
                title: "マインドフルストーリーテリング",
                introduction: "マインドフルな注意を払って物語を作成したり聴いたりすることで、想像力を刺激し集中します。",
                promptCreate: "簡単な物語を考えてください。それはあなたの一日、夢、または完全に作り話かもしれません。それを語るとき（たとえ自分自身にだけだとしても）、詳細に集中してください。",
                promptListen: "物語を聴いている場合（ここにオーディオプレーヤーを想像してください）、言葉、声のトーン、心に浮かぶイメージに細心の注意を払ってください。心がさまようときは、優しくそれに戻してください。",
                storyPlaceholder: "ここにあなたの物語を書き始めるか、聴いているのを想像してください..."
            }
        }

    },
    affirmations: [
        { en: "I am capable of amazing things.", ja: "私には素晴らしいことができる。" },
        { en: "I choose to be happy today.", ja: "私は今日、幸せであることを選びます。" },
        { en: "I am strong and resilient.", ja: "私は強く、立ち直る力がある。" },
        { en: "I embrace new beginnings.", ja: "私は新しい始まりを受け入れます。" },
        { en: "I am worthy of love and joy.", ja: "私は愛と喜びに値する。" },
        { en: "I trust the journey of my life.", ja: "私は自分の人生の旅を信頼します。" },
        { en: "I am grateful for all that I have.", ja: "私は持っているすべてのものに感謝しています。" },
        { en: "I radiate positivity.", ja: "私はポジティブさを放ちます。" },
        { en: "I am calm and at peace.", ja: "私は穏やかで平和です。" },
        { en: "I believe in myself.", ja: "私は自分自身を信じています。" },
        { en: "Every day is a fresh start.", ja: "毎日が新しいスタートです。" },
        { en: "I am surrounded by abundance.", ja: "私は豊かさに囲まれています。" },
        { en: "I am a magnet for miracles.", ja: "私は奇跡を引き寄せる磁石です。" },
        { en: "I am confident in my abilities.", ja: "私は自分の能力に自信を持っています。" },
        { en: "I attract positive energy.", ja: "私はポジティブなエネルギーを引き寄せます。" },
        { en: "I am enough.", ja: "私はこれで十分です。" },
        { en: "I am proud of who I am becoming.", ja: "私はなりつつある自分を誇りに思います。" },
        { en: "I can overcome any challenge.", ja: "私はどんな挑戦も乗り越えられます。" },
        { en: "My potential is limitless.", ja: "私の可能性は無限です。" },
        { en: "I am creating the life of my dreams.", ja: "私は夢の人生を創造しています。" },
        { en: "I am open to receiving all good things.", ja: "私はすべての良いものを受け入れる準備ができています。" },
        { en: "I am a source of inspiration to others.", ja: "私は他の人々にとってインスピレーションの源です。" },
        { en: "I am filled with energy and vitality.", ja: "私はエネルギーと活力に満ちています。" },
        { en: "I make a positive difference in the world.", ja: "私は世界にポジティブな変化をもたらします。" },
        { en: "I am at peace with my past.", ja: "私は自分の過去と和解しています。" },
        { en: "I look forward to a bright future.", ja: "私は明るい未来を楽しみにしています。" },
        { en: "I am kind to myself and others.", ja: "私は自分自身と他の人に親切です。" },
        { en: "I am a work in progress, and that's okay.", ja: "私は成長過程にあり、それで大丈夫です。" },
        { en: "I choose courage over fear.", ja: "私は恐れよりも勇気を選びます。" },
        { en: "I am exactly where I need to be.", ja: "私はまさにいるべき場所にいます。" }
        // Add more affirmations here to ensure a large pool
    ]
};
