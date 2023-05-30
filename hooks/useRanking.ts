import { useEffect, useState } from 'react'
import {getTopRank, Ranking} from '../firebase/ranking'
import {Book, getRankBooks} from '../firebase/books'


export type UseRankOutput = {
    isLoading: boolean
    topRank: Book | null
}

const BOOK_DEFAULT_OUTPUT: UseRankOutput = {
    isLoading: true,
    topRank: null,
}


export function useTopRank(): UseRankOutput {
    const [output, setOutput] = useState(BOOK_DEFAULT_OUTPUT)

    useEffect(() => {
        void (async () => {
            const topRankBooks = await getRankBooks()
            const firstBook = topRankBooks[0];
            console.log(topRankBooks)
            setOutput({ isLoading: false, topRank:firstBook })
        })()
    }, [])

    return output
}