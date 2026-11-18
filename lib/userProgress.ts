// Helper to manage user-specific progress in LocalStorage
export function recordLessonCompletion(lessonId: string) {
  if (typeof window === "undefined") return;

  const activeId = localStorage.getItem("current_userId");
  if (!activeId) return;

  const key = `progress_${activeId}`;
  try {
    const existing = JSON.parse(localStorage.getItem(key) || '{"completedLessons": []}');
    if (!existing.completedLessons.includes(lessonId)) {
      existing.completedLessons.push(lessonId);
      localStorage.setItem(key, JSON.stringify(existing));
    }
  } catch (e) {
    console.error("Error saving user progress:", e);
  }
}

export function recordPracticeScore(score: number, total: number) {
  if (typeof window === "undefined") return;

  const activeId = localStorage.getItem("current_userId");
  if (!activeId) return;

  const key = `progress_${activeId}`;
  try {
    const existing = JSON.parse(localStorage.getItem(key) || '{"completedLessons": []}');
    existing.practiceScore = { score, total };
    if (!existing.completedLessons.includes("practice")) {
      existing.completedLessons.push("practice");
    }
    localStorage.setItem(key, JSON.stringify(existing));
  } catch (e) {
    console.error("Error saving practice score:", e);
  }
}

export function getUserProgress(): { completedLessons: string[]; practiceScore: { score: number; total: number } | null } {
  if (typeof window === "undefined") {
    return { completedLessons: [], practiceScore: null };
  }

  const activeId = localStorage.getItem("current_userId");
  if (!activeId) return { completedLessons: [], practiceScore: null };

  try {
    const stored = localStorage.getItem(`progress_${activeId}`);
    if (stored) return JSON.parse(stored);
  } catch (e) {
    console.error("Error loading progress:", e);
  }

  return { completedLessons: [], practiceScore: null };
}
