import { collection, getDocs, getFirestore } from 'firebase/firestore'
import {db} from '../firebase/firebase' // Initialize FirebaseApp
import { doc, getDoc } from 'firebase/firestore';


export type Book = {
    id: string
    title: string
    description: string
    imageUrl: string
    url: string
}

export async function getBooks(): Promise<Book[]> {
    const books = new Array<Book>()
    const booksSnapshot = await getDocs(collection(db, '/books'))

    booksSnapshot.forEach((doc) => {
        const book = doc.data() as Book
        books.push({ ...book, id: doc.id })
    })

    return books
}



export async function getBook(id: string): Promise<Book | null> {
    console.log(id)
    const bookRef = doc(db, 'books', id);
    const bookDoc = await getDoc(bookRef);

    if (bookDoc.exists()) {
        const book = bookDoc.data() as Book;
        return { ...book, id: bookDoc.id };
    } else {
        return null;
    }
}