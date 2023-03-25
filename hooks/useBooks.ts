import { useEffect, useState } from 'react'
import {Book, getBook, getBooks} from '../firebase/books'

export type UseBooksOutput = {
    isLoading: boolean
    books: Book[]
}

const DEFAULT_OUTPUT: UseBooksOutput = {
    isLoading: true,
    books: [],
}

export type UseBookOutput = {
    isLoading: boolean
    book: Book | null
}

const BOOK_DEFAULT_OUTPUT: UseBookOutput = {
    isLoading: true,
    book: null,
}

export function useBooks(): UseBooksOutput {
    const [output, setOutput] = useState(DEFAULT_OUTPUT)

    useEffect(() => {
        void (async () => {
            const books = await getBooks()
            setOutput({ isLoading: false, books })
        })()
    }, [])

    return output
}

export function useBook(id): UseBookOutput {
    const [output, setOutput] = useState(BOOK_DEFAULT_OUTPUT)

    useEffect(() => {
        void (async () => {
            const book = await getBook(id)
            setOutput({ isLoading: false, book })
        })()
    }, [])

    return output
}