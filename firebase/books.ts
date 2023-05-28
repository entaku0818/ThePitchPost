import {collection, getDocs, getFirestore, limit, query} from 'firebase/firestore'
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
        books.push({ ...book, id: doc.id })
    })

    return books
}



export async function getBook(id: string): Promise<Book | null> {
    if (!id) {
        return null;
    }
    const bookRef = doc(db, 'books', id);
    const bookDoc = await getDoc(bookRef);

    if (bookDoc.exists()) {
        const book = bookDoc.data() as Book;
        return { ...book, id: bookDoc.id };
    } else {
        return null;
    }
}

