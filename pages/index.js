import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '../styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })
import { useBooks } from '../hooks/useBooks'
import CardView from "./CardView";
import Header from "../components/header";


export default function Home() {
  const { isLoading, books } = useBooks()
  return (
    <>
      <Head>
        <title>the-pitch-post</title>
        <meta name="description" content="the-pitch-post" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0"　/>
        <link rel="icon" href="/favicon.ico" />

      </Head>
        <Header/>
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
