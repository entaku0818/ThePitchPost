import {addDoc, collection, getDoc, serverTimestamp} from 'firebase/firestore';
import {db} from './firebase' // Initialize FirebaseApp
import { getDocs, query, where } from 'firebase/firestore';

export type Comment = {
    id: string;
    bookId: string;
    userId: string;
    displayName: string;
    comment: string;
    createdAt: Date;
};

export async function addComment(bookId: string, userId: string, displayName: string, comment: string) {
    const commentsRef = collection(db, 'comments');
    const newComment = {
        bookId,
        userId,
        displayName,
        comment,
        createdAt: serverTimestamp(),
    };
    await addDoc(commentsRef, newComment);
}

export async function getComments(bookId: string): Promise<Comment[]> {
    console.log(bookId);
    const commentsRef = collection(db, 'comments');
    const q = query(commentsRef, where('bookId', '==', bookId));
    const querySnapshot = await getDocs(q);

    const comments: Comment[] = [];
    querySnapshot.forEach((doc) => {
        const comment = doc.data() as Comment;
        comments.push({ ...comment, id: doc.id });
    });
    console.log(comments);
    return comments;
}