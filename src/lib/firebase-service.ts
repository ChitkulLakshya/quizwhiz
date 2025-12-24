/**
 * Firebase Service Layer
 * All Firestore operations use the singleton db instance from @/firebase
 * NO Firebase initialization happens here - it's all handled in firebase.ts
 * Fully type-safe with explicit DocumentReference and CollectionReference types
 */

import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  type DocumentReference,
  type CollectionReference,
  type FieldValue,
} from "firebase/firestore";

import { db } from "@/firebase";
import { Quiz, Question, Participant } from "@/types/quiz";

// Type helpers for Firestore operations
type QuizCollection = CollectionReference<Omit<Quiz, "id">>;
type QuizDocument = DocumentReference<Quiz>;
type QuestionCollection = CollectionReference<Omit<Question, "id">>;
type ParticipantCollection = CollectionReference<Omit<Participant, "id">>;

// Generate random 6-digit quiz code
export const generateQuizCode = (): string =>
  Math.floor(100000 + Math.random() * 900000).toString();

// ---------------------- QUIZZES ----------------------

/**
 * Create a new quiz in Firestore
 * @param title - Quiz title
 * @param description - Quiz description
 * @param userEmail - Email of the user creating the quiz
 * @returns Promise resolving to the created quiz document ID
 */
export const createQuiz = async (
  title: string,
  description: string,
  userEmail: string
): Promise<string> => {
  console.log("🟢 createQuiz called");
  console.log("📝 Quiz data:", { title, description, userEmail });
  console.log("🔍 db instance:", db ? "exists" : "missing");

  try {
    // Type-safe quiz data with serverTimestamp
    // createdAt will be a FieldValue when writing, becomes Timestamp when reading
    const quizData: Omit<Quiz, "id" | "createdAt"> & { createdAt: FieldValue } = {
      title,
      description,
      createdBy: userEmail, // Store email instead of userId
      createdAt: serverTimestamp(),
      status: "draft",
      currentQuestionIndex: -1,
      code: generateQuizCode(),
    };

    console.log("🚀 Writing to Firestore…");
    console.log("📦 Quiz payload:", { ...quizData, createdAt: "[serverTimestamp]" });

    // Type-safe collection reference
    const quizzesRef: QuizCollection = collection(
      db,
      "quizzes"
    ) as QuizCollection;

    const docRef = await addDoc(quizzesRef, quizData);

    console.log("✅ Quiz created successfully!");
    console.log("📄 Quiz document ID:", docRef.id);
    console.log("🔵 Firestore write completed");

    return docRef.id;
  } catch (error) {
    console.error("❌ Firestore write failed:", error);
    console.error("🔍 Error details:", {
      name: error instanceof Error ? error.name : "Unknown",
      message: error instanceof Error ? error.message : String(error),
      code: (error as any)?.code,
    });
    throw error;
  }
};

// ---------------------- GET QUIZ ----------------------

/**
 * Get a quiz by its document ID
 * @param quizId - The quiz document ID
 * @returns Promise resolving to Quiz object or null if not found
 */
export const getQuiz = async (quizId: string): Promise<Quiz | null> => {
  try {
    console.log("🔍 Fetching quiz:", quizId);
    
    // Type-safe document reference
    const quizRef: QuizDocument = doc(db, "quizzes", quizId) as QuizDocument;
    const snap = await getDoc(quizRef);

    if (snap.exists()) {
      const data = snap.data() as Quiz;
      console.log("✅ Quiz found:", data.title);
      return data;
    }

    console.log("⚠️ Quiz not found:", quizId);
    return null;
  } catch (error) {
    console.error("❌ Error fetching quiz:", error);
    throw error;
  }
};

/**
 * Get a quiz by its join code
 * @param code - The 6-digit quiz code
 * @returns Promise resolving to Quiz object or null if not found
 */
export const getQuizByCode = async (code: string): Promise<Quiz | null> => {
  try {
    console.log("🔍 Searching quiz by code:", code);
    
    const quizzesRef: QuizCollection = collection(
      db,
      "quizzes"
    ) as QuizCollection;
    const q = query(quizzesRef, where("code", "==", code));
    const snap = await getDocs(q);

    if (snap.empty) {
      console.log("⚠️ No quiz found with code:", code);
      return null;
    }

    const data = snap.docs[0].data() as Quiz;
    console.log("✅ Quiz found by code:", data.title);
    return data;
  } catch (error) {
    console.error("❌ Error searching quiz by code:", error);
    throw error;
  }
};

/**
 * Update quiz status
 * @param quizId - The quiz document ID
 * @param status - New status value
 */
export const updateQuizStatus = async (
  quizId: string,
  status: Quiz["status"]
): Promise<void> => {
  try {
    console.log("🔄 Updating quiz status:", { quizId, status });
    
    const quizRef: QuizDocument = doc(db, "quizzes", quizId) as QuizDocument;
    await updateDoc(quizRef, { status });

    console.log("✅ Quiz status updated");
  } catch (error) {
    console.error("❌ Error updating quiz status:", error);
    throw error;
  }
};

// ---------------------- QUESTIONS ----------------------

/**
 * Add a question to a quiz
 * @param quizId - The quiz document ID
 * @param data - Question data (without id and quizId)
 * @returns Promise resolving to the created question document ID
 */
export const addQuestion = async (
  quizId: string,
  data: Omit<Question, "id" | "quizId">
): Promise<string> => {
  try {
    console.log("➕ Adding question to quiz:", quizId);
    
    // Type-safe question data
    const questionData: Omit<Question, "id"> = {
      ...data,
      quizId,
    };

    // Type-safe subcollection reference
    const questionsRef: QuestionCollection = collection(
      db,
      "quizzes",
      quizId,
      "questions"
    ) as QuestionCollection;

    const docRef = await addDoc(questionsRef, questionData);

    console.log("✅ Question added:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("❌ Error adding question:", error);
    throw error;
  }
};

/**
 * Get all questions for a quiz
 * @param quizId - The quiz document ID
 * @returns Promise resolving to array of Question objects
 */
export const getQuestions = async (quizId: string): Promise<Question[]> => {
  try {
    console.log("🔍 Fetching questions for quiz:", quizId);
    
    const questionsRef: QuestionCollection = collection(
      db,
      "quizzes",
      quizId,
      "questions"
    ) as QuestionCollection;
    
    const q = query(questionsRef, orderBy("order", "asc"));
    const snap = await getDocs(q);
    const questions = snap.docs.map((d) => d.data() as Question);

    console.log("✅ Found questions:", questions.length);
    return questions;
  } catch (error) {
    console.error("❌ Error fetching questions:", error);
    throw error;
  }
};

/**
 * Delete a question from a quiz
 * @param quizId - The quiz document ID
 * @param questionId - The question document ID
 */
export const deleteQuestion = async (
  quizId: string,
  questionId: string
): Promise<void> => {
  try {
    console.log("🗑️ Deleting question:", { quizId, questionId });
    
    // Type-safe document reference for subcollection
    const questionRef: DocumentReference<Question> = doc(
      db,
      "quizzes",
      quizId,
      "questions",
      questionId
    ) as DocumentReference<Question>;
    
    await deleteDoc(questionRef);

    console.log("✅ Question deleted");
  } catch (error) {
    console.error("❌ Error deleting question:", error);
    throw error;
  }
};

// ---------------------- PARTICIPANTS ----------------------

/**
 * Join a quiz as a participant
 * @param quizId - The quiz document ID
 * @param name - Participant name
 * @returns Promise resolving to the created participant document ID
 */
export const joinQuiz = async (
  quizId: string,
  name: string
): Promise<string> => {
  try {
    console.log("👤 Joining quiz:", { quizId, name });
    
    // Type-safe participant data with serverTimestamp
    const participantData: Omit<Participant, "id" | "joinedAt"> & {
      joinedAt: FieldValue;
    } = {
      name,
      quizId,
      joinedAt: serverTimestamp(),
      totalScore: 0,
      answers: [],
    };

    // Type-safe subcollection reference
    const participantsRef: ParticipantCollection = collection(
      db,
      "quizzes",
      quizId,
      "participants"
    ) as ParticipantCollection;

    const docRef = await addDoc(participantsRef, participantData);

    console.log("✅ Participant joined:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("❌ Error joining quiz:", error);
    throw error;
  }
};

/**
 * Get all participants for a quiz
 * @param quizId - The quiz document ID
 * @returns Promise resolving to array of Participant objects
 */
export const getParticipants = async (
  quizId: string
): Promise<Participant[]> => {
  try {
    console.log("🔍 Fetching participants for quiz:", quizId);
    
    const participantsRef: ParticipantCollection = collection(
      db,
      "quizzes",
      quizId,
      "participants"
    ) as ParticipantCollection;
    
    const snap = await getDocs(participantsRef);
    const participants = snap.docs.map((d) => d.data() as Participant);

    console.log("✅ Found participants:", participants.length);
    return participants;
  } catch (error) {
    console.error("❌ Error fetching participants:", error);
    throw error;
  }
};

// ---------------------- REALTIME SUBSCRIPTIONS ----------------------

/**
 * Subscribe to real-time quiz updates
 * @param quizId - The quiz document ID
 * @param callback - Callback function that receives Quiz updates
 * @returns Unsubscribe function
 */
export const subscribeToQuiz = (
  quizId: string,
  callback: (quiz: Quiz) => void
): (() => void) => {
  console.log("👂 Subscribing to quiz updates:", quizId);
  
  const quizRef: QuizDocument = doc(db, "quizzes", quizId) as QuizDocument;
  
  return onSnapshot(quizRef, (snap) => {
    if (snap.exists()) {
      const data = snap.data() as Quiz;
      console.log("📡 Quiz update received:", data.title);
      callback(data);
    } else {
      console.log("⚠️ Quiz document does not exist");
    }
  });
};

/**
 * Subscribe to real-time question updates for a quiz
 * @param quizId - The quiz document ID
 * @param callback - Callback function that receives Question[] updates
 * @returns Unsubscribe function
 */
export const subscribeToQuestions = (
  quizId: string,
  callback: (questions: Question[]) => void
): (() => void) => {
  console.log("👂 Subscribing to question updates:", quizId);
  
  const questionsRef: QuestionCollection = collection(
    db,
    "quizzes",
    quizId,
    "questions"
  ) as QuestionCollection;
  
  const q = query(questionsRef, orderBy("order", "asc"));
  
  return onSnapshot(q, (snap) => {
    const questions = snap.docs.map((d) => d.data() as Question);
    console.log("📡 Question updates received:", questions.length);
    callback(questions);
  });
};
