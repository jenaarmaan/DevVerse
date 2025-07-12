
import { db } from './config';
import { collection, doc, getDoc, getDocs, setDoc, updateDoc, serverTimestamp, query, where, deleteDoc, addDoc, DocumentReference, arrayUnion, writeBatch } from 'firebase/firestore';
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

export type ContributorRole = 'Owner' | 'Maintainer' | 'Viewer';

export interface Contributor {
    uid: string;
    email: string;
    role: ContributorRole;
}

export interface Project {
    id: string; // Document ID
    name: string;
    description: string;
    visibility: 'public' | 'private';
    contributors: Contributor[];
    contributorsData?: Contributor[]; // Optional, used for client-side hydration
    ownerId: string;
    techStack: string[];
    readme: string; 
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

export async function addCourse(courseData: Omit<Course, 'id'>, id: string): Promise<void> {
    const courseRef = doc(db, 'courses', id);
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
// USER FUNCTIONS
// =================================================================

export async function getUserByEmail(email: string): Promise<{uid: string, email: string} | null> {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        return null;
    }
    
    const userDoc = querySnapshot.docs[0];
    return {
        uid: userDoc.id,
        email: userDoc.data().email
    };
}

// Function to create a user document when they sign up
export async function createUserDocument(user: { uid: string; email: string | null }) {
    if (!user.email) return;
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, { email: user.email }, { merge: true });
}


// =================================================================
// PROJECT DEPLOYER FUNCTIONS
// =================================================================

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

  // Also add a reference to the user's subcollection
  const userProjectRef = doc(db, 'users', currentUser.uid, 'projects', projectRef.id);
  await setDoc(userProjectRef, { owned: true });

  return projectRef;
}

export async function getUserProjects(userId: string): Promise<{ owned: Project[]; contributed: Project[] }> {
    if (!userId) {
        console.log("No user ID provided, returning empty arrays.");
        return { owned: [], contributed: [] };
    }
    try {
        const ownedQuery = query(collection(db, "projects"), where("ownerId", "==", userId));
        const contributedQuery = query(collection(db, "projects"), where("contributors", "array-contains", { uid: userId, role: 'Viewer' })); // Basic query, needs refinement for roles
        
        const [ownedSnapshot, contributedSnapshot] = await Promise.all([
            getDocs(ownedQuery),
            getDocs(query(collection(db, "projects"), where("contributors.uid", "==", userId)))
        ]);

        const owned = ownedSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Project)).sort((a,b) => (b.updatedAt?.toMillis() || 0) - (a.updatedAt?.toMillis() || 0));
        
        // Filter out projects the user owns from their contributed list
        const contributed = contributedSnapshot.docs
            .map(doc => ({ ...doc.data(), id: doc.id } as Project))
            .filter(p => p.ownerId !== userId)
            .sort((a,b) => (b.updatedAt?.toMillis() || 0) - (a.updatedAt?.toMillis() || 0));

        return { owned, contributed };

    } catch (error) {
        console.error(`Error fetching projects for user ${userId}:`, error);
        return { owned: [], contributed: [] };
    }
}


export async function getProjectById(projectId: string): Promise<Project | null> {
    try {
        const projectRef = doc(db, 'projects', projectId);
        const projectSnap = await getDoc(projectRef);

        if (!projectSnap.exists()) {
            console.error(`Project with ID "${projectId}" not found in Firestore.`);
            return null;
        }
        
        const projectData = { id: projectSnap.id, ...projectSnap.data() } as Project
        
        // Attach contributor data for easier access on the client
        projectData.contributorsData = projectData.contributors || [];
        
        return projectData;
    } catch (error) {
        console.error("Error fetching project by ID:", error);
        return null;
    }
}

export async function updateProjectReadme(projectId: string, readmeContent: string): Promise<void> {
  const projectRef = doc(db, 'projects', projectId);
  await updateDoc(projectRef, {
    readme: readmeContent,
    updatedAt: serverTimestamp(),
  });
}

export async function updateProject(projectId: string, data: Partial<Omit<Project, 'id'>>) {
    const projectRef = doc(db, 'projects', projectId);
    await updateDoc(projectRef, {
        ...data,
        updatedAt: serverTimestamp()
    });
}

export async function deleteProject(projectId: string) {
    const projectRef = doc(db, 'projects', projectId);
    await deleteDoc(projectRef);
}

export async function addContributor(projectId: string, userId: string, userEmail: string): Promise<void> {
    const projectRef = doc(db, 'projects', projectId);
    
    const newContributor: Contributor = {
        uid: userId,
        email: userEmail,
        role: 'Viewer' // Default role
    };

    await updateDoc(projectRef, {
        contributors: arrayUnion(newContributor),
        updatedAt: serverTimestamp()
    });
}
