import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '../styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })
import { useBooks } from '../hooks/useBooks'
import CardView from "./CardView";


export default function Home() {
  const { isLoading, books } = useBooks()
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
          <ul>
              {books.map((item) => (
                  <CardView
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      description={item.description}
                      imageUrl={item.imageUrl}
                  />
              ))}
          </ul>
      </main>

    </>
  )
}
