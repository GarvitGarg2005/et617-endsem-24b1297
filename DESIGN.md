# DESIGN.md — ET 617 End-Semester Examination

## Identity Card
| Field | Value |
|-------|-------|
| **Roll No.** | 24B1297 |
| **P — Problem** | P2 — Contextual language and literacy application |
| **T — Topic** | T10 — Hindi for Bhojpuri-speaking learners: श/स and ड़ |
| **L — Learner** | L1 — Class 6–8, rural govt school, parent's Android phone, 30 min/evening |
| **C — Constraint** | C2 — Learner's own language (Hindi + Bhojpuri context); English toggle optional |

---

## D1 — Educational Problem

भोजपुरी-भाषी ग्रामीण विद्यार्थी (कक्षा 6-8) को हिंदी में श/स और ड़ के सही उपयोग में कठिनाई होती है। भोजपुरी में श और स की ध्वनि अक्सर एक ही होती है, जिससे विद्यार्थी हिंदी लिखते समय इन्हें आपस में बदल देते हैं। इसी प्रकार, ड़ की ध्वनि भोजपुरी में कम प्रयोग होती है, जिससे इसे लिखने और पहचानने में त्रुटि होती है। यह ऐप भोजपुरी संदर्भ में हिंदी वर्तनी और उच्चारण सिखाता है, जिससे विद्यार्थी अपनी बोली को बनाए रखते हुए मानक हिंदी सीख सकें।

**Context of use:** A rural Class 6-8 student uses a parent's Android phone for ~30 minutes in the evening after school. The app must work on a low-end device with the UI entirely in Hindi.

### Learning Outcomes (measurable, action-verb based)
1. **पहचानना (Identify):** विद्यार्थी श और स वाले शब्दों को सही ढंग से पहचान सकेगा और उनमें अंतर बता सकेगा। *(Bloom's: Remember/Understand)*
2. **प्रयोग करना (Apply):** विद्यार्थी वाक्यों में श, स और ड़ का सही उपयोग कर सकेगा। *(Bloom's: Apply)*
3. **अंतर करना (Distinguish):** विद्यार्थी अपनी भोजपुरी बोली की विशेषताओं और मानक हिंदी वर्तनी नियमों के बीच अंतर समझ सकेगा। *(Bloom's: Analyze)*

---

## D2 — Learner Persona

| Field | Detail |
|-------|--------|
| **नाम** | रामू कुमार |
| **आयु** | 12 वर्ष, कक्षा 7 |
| **स्थान** | बलिया, उत्तर प्रदेश — ग्रामीण सरकारी विद्यालय |
| **घर की भाषा** | भोजपुरी |
| **विद्यालय की भाषा** | हिंदी माध्यम |
| **पूर्व ज्ञान** | हिंदी वर्णमाला जानता है, सरल वाक्य लिख-पढ़ सकता है, लेकिन श/स और ड़ में गड़बड़ी करता है |
| **उपकरण** | पिता का Android फोन (Jio phone), शाम को 30 मिनट |
| **प्रेरणा** | हिंदी परीक्षा में अच्छे अंक लाना, कक्षा में गलतियों पर शर्मिंदगी से बचना |
| **भ्रांति 1 (Misconception)** | "शेर" और "सेर" में कोई फर्क नहीं है — दोनों एक ही ध्वनि हैं (भोजपुरी प्रभाव) |
| **भ्रांति 2 (Misconception)** | ड़ की ध्वनि ड जैसी ही है — "पड़ना" को "पडना" लिखना सही है |

---

## D3 — Educational Content Plan

### Learning Activity: "हिंदी मित्र — श, स और ड़ सीखो"

**Concept explanation:**
- श vs स: When to use which, with Bhojpuri context (भोजपुरी में ये आवाज़ एक लगती है, लेकिन हिंदी में अलग हैं)
- ड़: How it differs from ड, with everyday words (सड़क, पड़ोसी, लड़का)

**5+ Tasks in 2+ formats:**
1. **शब्द पहचान (MCQ):** "___ेर" — सही अक्षर चुनो: श या स? (शेर = lion, सेर = a measure)
2. **खाली जगह भरो (Fill-in-blank):** "मैं विद्यालय में हिंदी प___ता हूँ" (पढ़ता)
3. **सही/गलत (True/False):** "शक्ति" को "सक्ति" लिखना सही है — सही या गलत?
4. **जोड़ी मिलाओ (Matching):** श-शब्दों को स-शब्दों से अलग करो
5. **बातचीत अभ्यास (Conversational):** AI chatbot से हिंदी में बातचीत — chatbot गलत श/स उपयोग पकड़ता है
6. **वाक्य सुधार (Sentence correction):** गलत वाक्य को सुधारो

**Feedback design:**
- ✅ Correct: Positive reinforcement in Hindi + Bhojpuri encouragement
- ❌ Misconception 1 (श/स confusion): "भोजपुरी में ये आवाज़ मिलती-जुलती लगती है, यह स्वाभाविक है! लेकिन हिंदी में श = sha और स = sa अलग हैं। याद रखो: शेर (lion) 🦁 और सेर (measurement) ⚖️"
- ❌ Misconception 2 (ड़/ड confusion): "ड़ में नीचे बिंदी होती है — जीभ तालू पर मारकर बोलो: ल-ड़-का। ड में बिंदी नहीं: ड-मरू"

---

## Design Constraint (C2) Implementation
- All UI text, instructions, feedback, and content in Hindi
- Bhojpuri context and examples used in explanations
- English toggle available but not default
- Error messages acknowledge Bhojpuri as valid — distinction between dialect features and Hindi spelling errors

---

## Design Challenge Answer (Preview)
**Dialect variation vs Error:**
- **Dialect (acceptable):** Student types "सरम" in conversational practice — this is the Bhojpuri form of "शरम" (shyness). The app recognizes this as a Bhojpuri dialectal feature, acknowledges it, and gently shows the standard Hindi form.
- **Error:** Student types "समय" when asked to write "शमा" (candle). This is a genuine spelling error (wrong word entirely). The app marks it as incorrect and provides corrective feedback.

---

## Tech Stack
- **Framework:** Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **AI:** Google Gemini API for conversational practice + hardcoded fallback responses
- **Database:** Firebase Firestore (clickstream + user data)
- **Auth:** Firebase Email/Password
- **Hosting:** Vercel (et617-24b1297.vercel.app)
- **NLP Feature:** Conversational practice chatbot in Hindi with spelling/grammar correction
