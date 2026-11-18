// Clickstream data collection utility
// Logs every user action to Firebase Firestore for learning analytics
import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export interface ClickstreamEvent {
  userId: string;
  sessionId: string;
  eventType: 
    | "page_view" 
    | "click" 
    | "answer_submit" 
    | "answer_correct" 
    | "answer_incorrect" 
    | "misconception_detected"
    | "dialect_acknowledged"
    | "hint_requested" 
    | "lesson_start" 
    | "lesson_complete" 
    | "chat_message_sent" 
    | "chat_response_received"
    | "language_toggle";
  page: string;
  detail?: string;        // e.g., which question, what answer
  metadata?: Record<string, unknown>; // extra data
}

// Generate a unique session ID
export function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

// Log an event to Firestore
export async function logEvent(event: ClickstreamEvent): Promise<void> {
  try {
    await addDoc(collection(db, "clickstream"), {
      ...event,
      timestamp: serverTimestamp(),
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    // Fallback: store in localStorage if Firestore fails
    console.error("Clickstream log error:", error);
    const fallbackEvents = JSON.parse(localStorage.getItem("clickstream_fallback") || "[]");
    fallbackEvents.push({ ...event, createdAt: new Date().toISOString() });
    localStorage.setItem("clickstream_fallback", JSON.stringify(fallbackEvents));
  }
}

// Log a page view
export function logPageView(userId: string, sessionId: string, page: string): void {
  logEvent({ userId, sessionId, eventType: "page_view", page });
}
