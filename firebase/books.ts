import {collection, getDocs, getFirestore, limit, orderBy, Query, query, updateDoc} from 'firebase/firestore'
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
    listViews: number
    detailViews: number
}

export async function getBooks(): Promise<Book[]> {
    const books = new Array<Book>()
    const booksSnapshot = await getDocs(query(collection(db, 'books'), orderBy('createdAt', 'desc'), limit(100)))


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



export async function getRankBooks(): Promise<Book[]> {
    const books: Book[] = [];
    const currentTime = new Date();
    const twentyFourHoursAgo = new Date(currentTime.getTime() - 24 * 60 * 60 * 1000); // 24時間前の時刻を計算

    const queryRef: Query = query(
        collection(db, 'books'),
        orderBy('createdAt', 'desc'),
        limit(100)
    );

    const booksSnapshot = await getDocs(queryRef);

    let mostViewedBook: Book | null = null;
    let maxViews = -1;

    booksSnapshot.forEach((doc) => {
        console.log(doc.data())
        const book = doc.data() as Book;
        const bookId = doc.id;

        updateListViewCount(bookId);

        if (book.detailViews > maxViews) {
            mostViewedBook = { ...book, id: doc.id };
            maxViews = book.detailViews;
        }

        const createdAt = book.createdAt;

        books.push({ ...book, id: doc.id });

    });

    if (mostViewedBook) {
        // 24時間以内で最も閲覧されている記事を配列の先頭に追加
        books.unshift(mostViewedBook);
    }

    return books;
}

