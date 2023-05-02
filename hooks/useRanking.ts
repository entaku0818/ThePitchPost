import { useEffect, useState } from 'react'
import {getTopRank, Ranking} from '../firebase/ranking'


export type UseRankOutput = {
    isLoading: boolean
    topRank: Ranking | null
}

const BOOK_DEFAULT_OUTPUT: UseRankOutput = {
    isLoading: true,
    topRank: null,
}


export function useTopRank(): UseRankOutput {
    const [output, setOutput] = useState(BOOK_DEFAULT_OUTPUT)

    useEffect(() => {
        void (async () => {
            const topRank = await getTopRank()
            setOutput({ isLoading: false, topRank })
        })()
    }, [])

    return output
}