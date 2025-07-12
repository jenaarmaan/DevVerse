
'use server';

import { revalidatePath } from 'next/cache';
import { updateProject, deleteProject, getProjectById } from '@/lib/firebase/firestore';
import { auth } from '@/lib/firebase/config';
import { redirect } from 'next/navigation';

export async function updateProjectAction(projectId: string, formData: FormData) {
    const currentUser = auth.currentUser;
    if (!currentUser) {
        throw new Error("You must be logged in to update a project.");
    }
    
    const project = await getProjectById(projectId);
    if (project?.ownerId !== currentUser.uid) {
        throw new Error("You are not authorized to update this project.");
    }

    const dataToUpdate = {
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        visibility: formData.get('visibility') as 'public' | 'private',
    };
    
    await updateProject(projectId, dataToUpdate);

    revalidatePath(`/project-deployer/repo/${projectId}`);
    revalidatePath(`/project-deployer/repo/${projectId}/settings`);
    return { success: true, message: 'Project updated successfully.' };
}

export async function deleteProjectAction(projectId: string) {
    const currentUser = auth.currentUser;
     if (!currentUser) {
        throw new Error("You must be logged in to delete a project.");
    }
    
    const project = await getProjectById(projectId);
    if (project?.ownerId !== currentUser.uid) {
        throw new Error("You are not authorized to delete this project.");
    }

    await deleteProject(projectId);

    revalidatePath('/project-deployer');
    redirect('/project-deployer');
}
