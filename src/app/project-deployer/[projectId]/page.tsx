import { db } from './config';
import { collection, doc, getDoc, getDocs, setDoc, updateDoc, serverTimestamp, query, where, deleteDoc, addDoc, DocumentReference } from 'firebase/firestore';
import type { Course } from '../courses-data';
import type { QuizResult } from '@/app/learn/skillbridge/practice/quiz/actions';
import { auth } from './config';

export interface UserProgress {
    courseId: string;
    progress: number;
    completed: boolean;
    startedAt: any;
    lastUpdatedAt: any;
}

export interface Project {
    id: string; // Document ID
    name: string;
    description: string;
    visibility: 'public' | 'private';
    contributors: string[]; // array of user IDs
    ownerId: string;
    techStack: string[];
    createdAt: any;
    updatedAt: any;
}

// =================================================================
// COURSE FUNCTIONS
// =================================================================

export async function getCourses(): Promise<Course[]> {
  try {
    const coursesCol = collection(db, 'courses');
    const coursesSnapshot = await getDocs(coursesCol);
    
    if (coursesSnapshot.empty) {
      console.warn("Firestore 'courses' collection is empty. Please seed the database for the app to function correctly.");
      return [];
    }
    
    const coursesList = coursesSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Course));
    return coursesList;
  } catch (error) {
    console.error("Error fetching courses from Firestore:", error);
    return [];
  }
}

export async function getCourseById(courseId: string): Promise<Course | null> {
    const courseRef = doc(db, 'courses', courseId);
    const courseSnap = await getDoc(courseRef);

    if (!courseSnap.exists()) {
        console.error(`Course with ID "${courseId}" not found in Firestore.`);
        return null;
    }
    return { id: courseSnap.id, ...courseSnap.data() } as Course;
}

export async function addCourse(courseData: Course): Promise<void> {
    const courseRef = doc(db, 'courses', courseData.id);
    await setDoc(courseRef, courseData);
}

export async function deleteCourse(courseId: string): Promise<void> {
    const courseRef = doc(db, 'courses', courseId);
    await deleteDoc(courseRef);
}


export async function getUserProgress(userId: string): Promise<UserProgress[]> {
  if (!userId) return [];
  try {
    const progressCol = collection(db, 'users', userId, 'progress');
    const progressSnapshot = await getDocs(progressCol);
    const progressList = progressSnapshot.docs.map(doc => ({
      courseId: doc.id,
      ...doc.data()
    } as UserProgress));
    return progressList;
  } catch (error) {
    console.error("Error fetching user progress:", error);
    return [];
  }
}

export async function getCourseProgress(userId: string, courseId: string): Promise<UserProgress | null> {
  if (!userId) return null;
  try {
    const progressRef = doc(db, 'users', userId, 'progress', courseId);
    const progressSnap = await getDoc(progressRef);
    if (progressSnap.exists()) {
      return { courseId: progressSnap.id, ...progressSnap.data() } as UserProgress;
    }
    return null;
  } catch (error) {
    console.error("Error fetching single course progress:", error);
    return null;
  }
}

export async function updateCourseProgress(userId: string, courseId: string, newProgress: number) {
    if (!userId || !courseId) return;

    const progressRef = doc(db, 'users', userId, 'progress', courseId);
    const progressSnap = await getDoc(progressRef);
    
    const validatedProgress = Math.max(0, Math.min(newProgress, 100));
    const completed = validatedProgress === 100;

    try {
        if (progressSnap.exists()) {
            await updateDoc(progressRef, {
                progress: validatedProgress,
                completed,
                lastUpdatedAt: serverTimestamp(),
            });
        } else {
            await setDoc(progressRef, {
                progress: validatedProgress,
                completed,
                startedAt: serverTimestamp(),
                lastUpdatedAt: serverTimestamp(),
            });
        }
    } catch (error) {
        console.error("Error updating course progress:", error);
    }
}

export async function getCompletedCourses(userId: string): Promise<Course[]> {
    if (!userId) return [];
    const progressCol = collection(db, 'users', userId, 'progress');
    const q = query(progressCol, where("completed", "==", true));
    const querySnapshot = await getDocs(q);

    const courseIds = querySnapshot.docs.map(doc => doc.id);
    if (courseIds.length === 0) return [];

    const coursePromises = courseIds.map(id => getCourseById(id));
    const courses = (await Promise.all(coursePromises)).filter(Boolean) as Course[];
    return courses;
}


// =================================================================
// QUIZ FUNCTIONS
// =================================================================

export async function saveQuizResult(userId: string, result: Omit<QuizResult, 'id'>) {
  if (!userId) throw new Error("User ID is required to save quiz results.");
  const quizResultRef = doc(db, 'users', userId, 'quizzes', result.courseId);
  await setDoc(quizResultRef, result);
}

export async function getQuizResultsForUser(userId: string): Promise<QuizResult[]> {
  if (!userId) return [];
  const quizzesCol = collection(db, 'users', userId, 'quizzes');
  const snapshot = await getDocs(quizzesCol);
  
  return snapshot.docs.map(doc => {
    const data = doc.data();
    const completedAt = data.completedAt?.toDate ? data.completedAt.toDate() : new Date();
    
    return {
        courseId: doc.id,
        score: data.score,
        timeTaken: data.timeTaken,
        completedAt: completedAt,
        timePerQuestion: data.timePerQuestion
    } as QuizResult;
  });
}

// =================================================================
// PROJECT DEPLOYER FUNCTIONS
// =================================================================

/**
 * Creates a new project in the 'projects' collection.
 * @param projectData - The project data, excluding the ID.
 * @returns The document reference of the newly created project.
 */
export async function addProject(projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<DocumentReference> {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error("User must be authenticated to create a project.");
  }
  
  const projectsCol = collection(db, 'projects');
  const newProjectData = {
    ...projectData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const projectRef = await addDoc(projectsCol, newProjectData);

  return projectRef;
}


/**
 * Fetches all projects for a given user.
 * @param userId - The ID of the user.
 * @returns A promise that resolves to an array of projects.
 */
export async function getUserProjects(userId: string): Promise<Project[]> {
    if (!userId) {
        console.log("No user ID provided, returning empty array.");
        return [];
    }
    try {
        const q = query(collection(db, "projects"), where("ownerId", "==", userId));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            console.log(`No projects found for user ${userId}.`);
            return [];
        }
        
        const projectsList = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Project));
        return projectsList.sort((a, b) => {
            const dateA = a.updatedAt?.toMillis() || 0;
            const dateB = b.updatedAt?.toMillis() || 0;
            return dateB - dateA;
        });

    } catch (error) {
        console.error(`Error fetching projects for user ${userId}:`, error);
        return [];
    }
}

/**
 * Fetches a single project by its document ID.
 * @param projectId - The ID of the project document.
 * @returns A promise that resolves to the project data or null if not found.
 */
export async function getProjectById(projectId: string): Promise<Project | null> {
    const projectRef = doc(db, 'projects', projectId);
    const projectSnap = await getDoc(projectRef);

    if (!projectSnap.exists()) {
        console.error(`Project with ID "${projectId}" not found in Firestore.`);
        return null;
    }
    return { id: projectSnap.id, ...projectSnap.data() } as Project;
}