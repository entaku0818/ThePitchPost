import {collection, getDocs, getFirestore, limit, query, updateDoc} from 'firebase/firestore'
import {db} from '../firebase/firebase' // Initialize FirebaseApp
import { doc, getDoc } from 'firebase/firestore';


export type Book = {
    id: string
    title: string
    description: string
    imageUrl: string
    url: string
    sourceSite: string
    createdAt: Date
}

export async function getBooks(): Promise<Book[]> {
    const books = new Array<Book>()
    const booksSnapshot = await getDocs(query(collection(db, 'books'), limit(100)));


    booksSnapshot.forEach((doc) => {
        const book = doc.data() as Book
        const bookId = doc.id

        updateListViewCount(bookId)

        books.push({ ...book, id: doc.id })
    })

    return books
}

async function updateListViewCount(bookId: string): Promise<void> {
    const bookRef = doc(db, 'books', bookId)
    const bookDoc = await getDoc(bookRef)

    if (bookDoc.exists()) {
        const currentViews = bookDoc.data().listViews || 0
        const newViews = currentViews + 1

        await updateDoc(bookRef, { listViews: newViews })
    }
}

export async function getBook(id: string): Promise<Book | null> {
    if (!id) {
        return null;
    }
    const bookRef = doc(db, 'books', id);
    const bookDoc = await getDoc(bookRef);

    if (bookDoc.exists()) {
        const book = bookDoc.data() as Book;
        const currentViews = bookDoc.data().detailViews || 0
        const newViews = currentViews + 1
        await updateDoc(bookRef, { detailViews: newViews })
        return { ...book, id: bookDoc.id };
    } else {
        return null;
    }
}

