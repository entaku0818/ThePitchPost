import { collection, getDocs, getFirestore } from 'firebase/firestore'
import {db} from '../firebase/firebase' // Initialize FirebaseApp
import { doc, getDoc } from 'firebase/firestore';


export type Ranking = {
    id: string
    bookId: string
    title: string
    description: string
    imageUrl: string
    url: string
}

export async function getBooks(): Promise<Ranking[]> {
    const rankings = new Array<Ranking>()
    const rankingsSnapshot = await getDocs(collection(db, '/ranking'))

    rankingsSnapshot.forEach((doc) => {
        const book = doc.data() as Ranking
        rankings.push({ ...book, id: doc.id })
    })

    return rankings
}



export async function getTopRank(): Promise<Ranking | null> {
    const rankings = new Array<Ranking>()
    const rankingsSnapshot = await getDocs(collection(db, '/ranking'))

    rankingsSnapshot.forEach((doc) => {
        const book = doc.data() as Ranking
        rankings.push({ ...book, id: doc.id })
    })
    return rankings[0];
}

