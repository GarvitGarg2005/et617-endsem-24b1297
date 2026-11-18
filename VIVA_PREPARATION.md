# 🎯 ET 617 Comprehensive Viva Voce Preparation Guide (Roll No: 24B1297)

## Identity Token & Exam Card
* **Roll No:** 24B1297
* **Problem (P):** P2 — Contextual Language & Literacy Application
* **Topic (T):** T10 — Hindi for Bhojpuri-speaking learners: श/स and ड़
* **Learner Context (L):** L1 — Class 6–8 rural govt school student, parent's phone, 30 min/evening
* **Constraint (C):** C2 — Learner's own language (Hindi native UI + bilingual English toggle)
* **Live App:** https://et617-24b1297.vercel.app
* **Repo:** https://github.com/GarvitGarg2005/et617-endsem-24b1297

---

## PART 1: The Live Walkthrough (Examiner Task 1)
The examiner will ask: *"Show the correct path and the misconception path on the live app."*

### 1. Show the Correct Path (Mastery Scenario):
1. Go to `https://et617-24b1297.vercel.app`
2. Enter student name **"रामू" (Ramu)** $\rightarrow$ Click **"🚀 शुरू करें!"**.
3. Point out: The Dashboard loads a brand-new, isolated session for Ramu.
4. Click **"अभ्यास करो"** (`/practice`).
5. On Question 1: *"___ेर — सही अक्षर चुनो (lion के लिए)"* $\rightarrow$ Select **"शेर (श)"**.
6. **What to highlight to examiner:**
   * Instant green positive feedback banner (`bg-green-100`).
   * Explains semantic meaning: शेर = lion (jungle king).
   * Telemetry logs an `answer_correct` event to Firebase.

### 2. Show the Misconception Path (Bhojpuri Interference Scenario):
1. Reset or advance to a question with a common Bhojpuri misconception (e.g. Q1 picking **"सेर"**, or Q3 picking **"लडका"** without nukta).
2. **What to highlight to examiner:**
   * The app **does not punish** the student with a generic red cross.
   * Instead, it displays the specific **Bhojpuri Scaffolding Card**:  
     *"💡 भोजपुरी संदर्भ: भोजपुरी में श और स एक जैसे सुनाई देते हैं, यह स्वाभाविक है! लेकिन मानक हिंदी में शेर (lion) में 'श' आता है। 'सेर' नाप-तौल की पुरानी इकाई है।"*
3. Now navigate to **"AI बातचीत अभ्यास"** (`/chat`):
   * Type or click the chip: `"मैं सादी जा रहा हूँ"` (Bhojpuri dialect for wedding).
   * **Show the Design Challenge resolution:** The AI attaches the badge `🗣️ भोजपुरी बोली पहचानी गई` (Bhojpuri Dialect Acknowledged).
   * It tells the student: *"यह आपकी बोली की मिठास है, गलत नहीं है! लेकिन स्कूल में लिखते समय 'शादी' (wedding 💒) लिखना चाहिए।"*
   * Contrast this with an actual error: Type `"सक्ति"` $\rightarrow$ The app tags it `✏️ वर्तनी सुधार` (Spelling Correction) and marks it as an error to be corrected.

---

## PART 2: Why Question (Examiner Task 2)
The examiner will ask: *"Explain one design decision tied to your persona or constraint."*

### Prepared Script to Deliver:
> *"Sir/Ma'am, our learner context is **L1** — Ramu, a 12-year-old Class 7 student in a rural government school in Ballia, UP, studying on his father's shared budget Android phone for 30 minutes in the evening.*  
>  
> *A critical design decision tied to his context was the **dual-input scaffolding: an On-Screen Hindi Virtual Keyboard combined with clean Text-to-Speech audio synthesis**.*  
>  
> *1. **Why the On-Screen Keyboard:** Most budget phones in rural households do not have Devanagari voice or typing keyboards properly configured in browser web views. Forcing the child to type complex conjuncts or nuktas on an English keyboard creates extraneous cognitive load (Sweller's Cognitive Load Theory). Our on-screen keyboard places the four target phonemes (**श, स, ड़, ड**) as prominent, one-tap buttons alongside common words like 'लड़का' and 'सड़क'.*  
>  
> *2. **Why Speech Synthesis:** In Bhojpuri, /ʃ/ and /s/ are acoustically merged into dental [s]. Reading alone cannot teach phonological contrast. By integrating auditory TTS alongside visual articulation models (palatal vs dental), Ramu hears the vocal tract placement directly, fulfilling Constraint C2 in the learner's own language."*

---

## PART 3: Live Change Request (Examiner Task 3)
The examiner gives one live code modification while watching your screen.

### How to handle ANY change in seconds:
All learning content, questions, dialect patterns, and rules are isolated in:  
📁 `lib/content.ts` (and `lib/speech.ts`)

| Possible Live Change Request | Exact File & How to Change It |
| :--- | :--- |
| *"Add a new question to the practice quiz"* | Open `lib/content.ts` $\rightarrow$ Add an object to `PRACTICE_QUESTIONS` array. |
| *"Change the feedback text for a misconception"* | Open `lib/content.ts` $\rightarrow$ Edit the `misconception` field in `PRACTICE_QUESTIONS`. |
| *"Add a new Bhojpuri dialect word to the AI detector"* | Open `lib/content.ts` $\rightarrow$ Add `{ bhojpuri: "...", hindi: "...", context: "..." }` to `DIALECT_PATTERNS`. |
| *"Change a button color or text label"* | Edit the respective page in `app/practice/page.tsx` or `app/chat/page.tsx`. |

---

## PART 4: Critical Self-Reflection (What couldn't be done vs. Future improvements)

### What couldn't be fully done in the 2-hour window:
1. **Full Automatic Speech Recognition (ASR / Voice-In):**
   * While we implemented spoken audio output (TTS), full speech-to-text recognition for accented Bhojpuri-Hindi dialect requires fine-tuned acoustic models (like AI4Bharat's IndicWav2Vec) which require high server infrastructure not feasible in a 2-hour frontend build.
2. **Offline Local Storage PWA Caching:**
   * While the app works on low data with no media over 1MB, full offline service worker caching for complete zero-internet usage was scoped out in favor of real-time Firebase telemetry.

### What can be done better in future iterations:
1. **Gamified Spaced Repetition (Leitner System):**
   * Re-testing words where Ramu previously exhibited Bhojpuri transfer after 24 and 48 hours to ensure long-term memory encoding (Atkinson-Shiffrin Model).
2. **Teacher Dashboard (C5 constraint pairing):**
   * Allowing the rural school teacher to view common classroom phoneme error clusters directly from the Firestore clickstream database.
