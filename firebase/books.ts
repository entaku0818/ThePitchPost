import { collection, getDocs, getFirestore } from 'firebase/firestore'
import {db} from './firebase' // Initialize FirebaseApp

export type Book = {
    id: string
    title: string
    author: string
    price: number
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