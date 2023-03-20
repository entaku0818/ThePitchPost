import { collection, getDocs, getFirestore } from 'firebase/firestore'
import {db} from './firebase' // Initialize FirebaseApp

export type Book = {
    id: string
    title: string
    description: string
    imageUrl: string
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