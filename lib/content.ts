// Hardcoded fallback responses for when Gemini API fails
// These simulate the AI conversational practice for Hindi learning

export const FALLBACK_CHAT_RESPONSES: Record<string, string> = {
  // Greetings
  "नमस्ते": "नमस्ते! 🙏 मैं हिंदी मित्र हूँ। आज हम श, स और ड़ के बारे में बात करेंगे। क्या आप तैयार हैं?",
  "हाँ": "बहुत अच्छा! 😊 चलिए शुरू करते हैं। क्या आप जानते हैं 'शेर' और 'सेर' में क्या फ़र्क है?",
  "नहीं": "कोई बात नहीं! 😊 हम धीरे-धीरे सीखेंगे। पहले बताओ, क्या तुम 'श' और 'स' की आवाज़ में फ़र्क जानते हो?",
  
  // Default fallback
  "default": "बहुत अच्छा प्रयास! 👏 याद रखो:\n• 'श' (sha) — जैसे: शेर 🦁, शक्ति, विशाल\n• 'स' (sa) — जैसे: सेब 🍎, सड़क, समय\n• 'ड़' — जैसे: लड़का, सड़क, पड़ोसी\n\nक्या आप एक वाक्य बनाकर दिखाओगे जिसमें 'श' या 'स' हो?",
};

// Dialect vs Error detection rules (hardcoded)
export interface SpellingCheck {
  type: "error" | "dialect" | "correct";
  original: string;
  correction?: string;
  feedback: string;
}

// Known Bhojpuri dialect variations (acceptable, but show standard Hindi)
export const DIALECT_PATTERNS: Array<{ bhojpuri: string; hindi: string; context: string }> = [
  { bhojpuri: "सरम", hindi: "शरम", context: "भोजपुरी में 'शरम' को 'सरम' बोला जाता है — यह आपकी बोली की विशेषता है! मानक हिंदी में इसे 'शरम' लिखते हैं।" },
  { bhojpuri: "सादी", hindi: "शादी", context: "भोजपुरी में 'शादी' को 'सादी' बोलना आम है। यह गलत नहीं है, लेकिन हिंदी में 'शादी' लिखो।" },
  { bhojpuri: "सहर", hindi: "शहर", context: "भोजपुरी में 'शहर' को 'सहर' कहते हैं — यह बोली का अंतर है। हिंदी में 'शहर' लिखो।" },
  { bhojpuri: "साम", hindi: "शाम", context: "भोजपुरी में 'शाम' को 'साम' बोलते हैं। बोलने में ठीक है, लिखने में 'शाम' सही है।" },
  { bhojpuri: "बड", hindi: "बड़", context: "भोजपुरी में 'ड़' को 'ड' बोलना सामान्य है। लेकिन हिंदी में 'बड़ा' में ड़ (नुक्ते वाला) लिखना ज़रूरी है।" },
];

// Common spelling errors (actual mistakes, not dialect)
export const ERROR_PATTERNS: Array<{ wrong: string; correct: string; feedback: string }> = [
  { wrong: "सक्ति", correct: "शक्ति", feedback: "❌ यह गलत है। 'शक्ति' में 'श' आता है, 'स' नहीं। 'शक्ति' का मतलब है power/strength। याद रखो: श + क + ति = शक्ति 💪" },
  { wrong: "सेर", correct: "शेर", feedback: "⚠️ ध्यान दो! 'शेर' (🦁 lion) में 'श' आता है। 'सेर' एक पुरानी माप है (measurement)। दोनों अलग-अलग शब्द हैं!" },
  { wrong: "विसाल", correct: "विशाल", feedback: "❌ 'विशाल' में 'श' आता है। वि + शा + ल = विशाल (बहुत बड़ा)। 'स' नहीं, 'श' लिखो।" },
  { wrong: "पडना", correct: "पड़ना", feedback: "❌ 'पड़ना' में 'ड़' (नुक्ते वाला ड) आता है। ड और ड़ में फ़र्क है: ड = Da, ड़ = ṛa (जीभ तालू को छूती है)।" },
  { wrong: "लडका", correct: "लड़का", feedback: "❌ 'लड़का' में 'ड़' लगता है, 'ड' नहीं। ल + ड़ + का = लड़का। नुक्ता (बिंदी) ज़रूरी है!" },
  { wrong: "सडक", correct: "सड़क", feedback: "❌ 'सड़क' में 'ड़' आता है। स + ड़ + क = सड़क। बिना नुक्ते के 'सडक' गलत है।" },
];

// Lesson content
export const LESSONS = {
  shaSa: {
    title: "श और स का अंतर",
    titleEn: "Difference between Sha (श) and Sa (स)",
    subtitle: "भोजपुरी बोलने वालों के लिए विशेष पाठ",
    subtitleEn: "Special lesson tailored for Bhojpuri speakers",
    videoUrl: "https://www.youtube-nocookie.com/embed/5a17pP9fUvg", // Educational Hindi phonetics demo
    explanation: `भोजपुरी में "श" और "स" की आवाज़ अक्सर एक जैसी लगती है। लेकिन हिंदी में ये दो अलग-अलग अक्षर हैं:

**श (sha)** — जीभ तालू के पास जाती है
उदाहरण: शेर 🦁, शक्ति 💪, शाम 🌅, शादी 💒, विशाल

**स (sa)** — जीभ दाँतों के पास रहती है  
उदाहरण: सेब 🍎, समय ⏰, सड़क 🛣️, सपना 💭, नमस्ते 🙏

💡 **याद रखने का तरीका:** 
"शेर शक्तिशाली है" — इसमें तीनों 'श' हैं!
"सेब समय पर खाओ" — इसमें दोनों 'स' हैं!`,
    explanationEn: `In Bhojpuri, the sounds of "श" (sha) and "स" (sa) often sound identical. However, in standard Hindi, they are distinct consonants:

**श (sha)** — Palatal sound (tongue reaches near hard palate)
Examples: शेर (lion), शक्ति (strength), शाम (evening), शादी (wedding)

**स (sa)** — Dental sound (tongue touches near teeth)
Examples: सेब (apple), समय (time), सड़क (road), सपना (dream)

💡 **Mnemonic rule:**
"शेर शक्तिशाली है" (The lion is powerful) — all use 'श'!
"सेब समय पर खाओ" (Eat apple on time) — all use 'स'!`,
    examples: [
      { word: "शेर", meaning: "lion 🦁", letter: "श", phonetic: "sher" },
      { word: "सेर", meaning: "a measurement ⚖️", letter: "स", phonetic: "ser" },
      { word: "शाम", meaning: "evening 🌅", letter: "श", phonetic: "shaam" },
      { word: "साम", meaning: "(Bhojpuri: evening)", letter: "स (भोजपुरी)", phonetic: "saam" },
      { word: "शक्ति", meaning: "power 💪", letter: "श", phonetic: "shakti" },
      { word: "सपना", meaning: "dream 💭", letter: "स", phonetic: "sapna" },
    ],
  },
  da: {
    title: "ड़ को पहचानो",
    titleEn: "Mastering the Flap sound: ड़ vs ड",
    subtitle: "ड और ड़ में फ़र्क सीखो",
    subtitleEn: "Learn the distinction between retroflex stop and flap",
    videoUrl: "https://www.youtube-nocookie.com/embed/oQ4YxP9bEcg",
    explanation: `ड़ एक खास हिंदी अक्षर है। भोजपुरी में इसकी आवाज़ 'ड' जैसी लगती है, लेकिन हिंदी में ये अलग है।

**ड (Da)** — जीभ ऊपर लगती है और रुकती है
उदाहरण: डमरू 🥁, डर 😨, डिब्बा 📦

**ड़ (ṛa)** — जीभ ऊपर लगती है और फिसलती है (flap sound)
उदाहरण: लड़का 👦, सड़क 🛣️, पड़ोसी 🏘️, कड़ा, बड़ा

💡 **याद रखने का तरीका:**
ड़ = ड + नुक्ता (नीचे बिंदी)
"लड़का सड़क पर दौड़ रहा है" — तीनों में ड़!`,
    explanationEn: `ड़ is a unique Hindi consonant (flap). In Bhojpuri, it is frequently pronounced as plain 'ड', but standard Hindi strictly distinguishes them.

**ड (Da)** — Retroflex plosive (stop): tongue taps firmly.
Examples: डमरू (drum), डर (fear), डिब्बा (box)

**ड़ (ṛa)** — Retroflex flap: tongue curls up and rapidly flaps down (has a dot/nukta below).
Examples: लड़का (boy), सड़क (road), पड़ोसी (neighbour)

💡 **Mnemonic rule:**
ड़ = ड + nukta (bottom dot)
"लड़का सड़क पर दौड़ रहा है" — all three words have 'ड़'!`,
    examples: [
      { word: "लड़का", meaning: "boy 👦", letter: "ड़", phonetic: "laṛkā" },
      { word: "सड़क", meaning: "road 🛣️", letter: "ड़", phonetic: "saṛak" },
      { word: "पड़ोसी", meaning: "neighbour 🏘️", letter: "ड़", phonetic: "paṛosī" },
      { word: "डर", meaning: "fear 😨", letter: "ड", phonetic: "ḍar" },
      { word: "डमरू", meaning: "damru 🥁", letter: "ड", phonetic: "ḍamrū" },
      { word: "दौड़", meaning: "run 🏃", letter: "ड़", phonetic: "dauṛ" },
    ],
  },
  advancedSentences: {
    title: "पाठ ३: वाक्य में प्रयोग और वर्तनी",
    titleEn: "Lesson 3: Sentence Usage and Contextual Spelling",
    subtitle: "दैनिक जीवन के वाक्यों में श, स, और ड़",
    subtitleEn: "Real-world conversational sentences with sha, sa, and da",
    explanation: `अब जब आपने अलग-अलग शब्दों में 'श', 'स', और 'ड़' को पहचान लिया है, तो आइए देखते हैं कि वाक्यों में इनका सही प्रयोग कैसे करें।

**उदाहरण १:** "रमेश **शाम** को बाज़ार से **सेब** लाया।"
(यहाँ 'शाम' में श है और 'सेब' में स)

**उदाहरण २:** "वह **लड़का** चौड़ी **सड़क** पर जा रहा है।"
(यहाँ 'लड़का' और 'सड़क' दोनों में ड़ है)

**भोजपुरी भाषी के लिए विशेष ध्यान:**
बोलचाल में यदि आप "रमेश साम को बाज़ार गइल" कहते हैं, तो यह आपकी बोली में मधुर है, लेकिन लिखित हिंदी में "शाम" और "सड़क" लिखना ही शुद्ध माना जाता है।`,
    explanationEn: `Now that you have learned to distinguish 'श', 'स', and 'ड़' in individual words, let us observe their usage in full sentences.

**Example 1:** "रमेश **शाम** को बाज़ार से **सेब** लाया।" (Ramesh brought apples in the evening.)
('शाम' uses श, 'सेब' uses स)

**Example 2:** "वह **लड़का** चौड़ी **सड़क** पर जा रहा है।" (That boy is walking on a wide road.)
(Both 'लड़का' and 'सड़क' use ड़ with nukta)

**Bhojpuri Sociolinguistic Note:**
When speaking informally, dialect variation is natural and valued. But in formal school writing, standard orthography ("शाम", "सड़क") is required.`,
    examples: [
      { word: "रमेश शाम को आया", meaning: "Ramesh came in evening", letter: "श", phonetic: "Ramesh shaam ko aaya" },
      { word: "सड़क साफ़ है", meaning: "Road is clean", letter: "स + ड़", phonetic: "Sadak saaf hai" },
      { word: "बड़ा पेड़", meaning: "Big tree", letter: "ड़", phonetic: "Bada ped" },
      { word: "सच्ची शांति", meaning: "True peace", letter: "स + श", phonetic: "Sacchi shanti" }
    ]
  }
};

// Practice questions
export const PRACTICE_QUESTIONS = [
  // MCQ format
  {
    id: 1,
    type: "mcq" as const,
    question: "\"___ेर\" — सही अक्षर चुनो (lion के लिए):",
    options: ["शेर (श)", "सेर (स)"],
    correct: 0,
    explanation: "शेर (🦁 lion) में 'श' आता है। सेर एक पुरानी माप है।",
    misconception: "भोजपुरी में श और स एक लगते हैं, लेकिन हिंदी में 'शेर' में 'श' सही है।",
  },
  {
    id: 2,
    type: "mcq" as const,
    question: "\"___पना\" — सही अक्षर चुनो (dream के लिए):",
    options: ["सपना (स)", "शपना (श)"],
    correct: 0,
    explanation: "सपना (💭 dream) में 'स' आता है।",
    misconception: null,
  },
  {
    id: 3,
    type: "mcq" as const,
    question: "\"ल___का\" — सही विकल्प चुनो (boy के लिए):",
    options: ["लड़का (ड़)", "लडका (ड)"],
    correct: 0,
    explanation: "लड़का (👦) में 'ड़' (नुक्ते वाला) आता है, 'ड' नहीं।",
    misconception: "भोजपुरी में ड़ की जगह ड बोला जाता है, लेकिन लिखने में नुक्ता ज़रूरी है।",
  },
  // Fill in the blank
  {
    id: 4,
    type: "fill" as const,
    question: "रात को आसमान में चाँद और _____तारे दिखते हैं। (write: सितारे or शितारे)",
    correct: "सितारे",
    wrongAnswer: "शितारे",
    explanation: "सितारे (⭐ stars) में 'स' आता है।",
    misconception: null,
  },
  {
    id: 5,
    type: "fill" as const,
    question: "मेरे ___दोसी बहुत अच्छे हैं। (write: पड़ोसी or पडोसी)",
    correct: "पड़ोसी",
    wrongAnswer: "पडोसी",
    explanation: "पड़ोसी (🏘️ neighbour) में 'ड़' आता है।",
    misconception: "ड़ में नीचे बिंदी (नुक्ता) होती है। बिना नुक्ते के गलत है।",
  },
  // True/False
  {
    id: 6,
    type: "truefalse" as const,
    question: "\"शक्ति\" को \"सक्ति\" लिखना सही है।",
    correct: false,
    explanation: "❌ गलत! 'शक्ति' (💪 power) में 'श' आता है। 'सक्ति' गलत वर्तनी है।",
    misconception: "भोजपुरी प्रभाव से श को स बोलना आम है, लेकिन लिखने में 'श' सही है।",
  },
  {
    id: 7,
    type: "truefalse" as const,
    question: "\"सड़क\" में 'ड़' (नुक्ते वाला ड) आता है।",
    correct: true,
    explanation: "✅ सही! सड़क (🛣️ road) में 'ड़' आता है।",
    misconception: null,
  },
  // Matching
  {
    id: 8,
    type: "matching" as const,
    question: "सही जोड़ी मिलाओ:",
    pairs: [
      { left: "शेर", right: "🦁 lion" },
      { left: "सेब", right: "🍎 apple" },
      { left: "लड़की", right: "👧 girl" },
      { left: "शाम", right: "🌅 evening" },
    ],
    explanation: "श वाले शब्द: शेर, शाम | स वाले शब्द: सेब | ड़ वाले शब्द: लड़की",
  },
];

// Gemini system prompt for conversational practice
export const GEMINI_SYSTEM_PROMPT = `You are "हिंदी मित्र" (Hindi Mitra), a friendly Hindi language tutor helping Bhojpuri-speaking students (Class 6-8, rural India) learn correct Hindi spelling, specifically:
1. The difference between श (sha) and स (sa)
2. When to use ड़ (with nukta) vs ड (without nukta)

CRITICAL RULES:
- ALWAYS respond in Hindi (Devanagari script). Never use English except for emoji.
- Be warm, encouraging, and patient. Use simple Hindi suitable for Class 6-8.
- Use emoji to make learning fun 😊
- When a student makes a श/स or ड/ड़ error, correct them gently.
- IMPORTANT: Distinguish between DIALECT VARIATION and ACTUAL ERROR:
  * DIALECT: If student writes "सादी" instead of "शादी", acknowledge this is Bhojpuri dialect ("यह भोजपुरी बोली है, गलत नहीं है!") but show the standard Hindi form.
  * ERROR: If student writes "सक्ति" instead of "शक्ति", mark it as an error and teach the correct spelling.
- Give examples from daily life in rural India (खेत, गाँव, बाज़ार, स्कूल).
- After 2-3 exchanges, give a small practice question.
- Keep responses short (2-4 sentences max).
- Never use complex grammar terms. Explain like talking to a friend.

START by greeting the student in Hindi and asking their name.`;
