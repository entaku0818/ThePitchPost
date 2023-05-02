import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '../styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })
import { useBooks } from '../hooks/useBooks'
import CardView from "./CardView";
import Header from "../components/header";

export default function Home() {
    const { isLoading, books } = useBooks();
    return (
        <>
            <Head>
                <title>the-pitch-post</title>
                <meta name="description" content="the-pitch-post" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className="main-image"></div>
            <main className={styles.main}>
                <ul className={styles.cardList}>
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

            <style jsx>{`
        .main-image {
        width: 1440px;
        height: 600px;
          position: relative; /* 相対位置指定を有効にする */


        
          background-image: url('/main-image.png');
          /* Add other background properties and styles */
        }

        .main-image img {
          width: 100%; /* 画像の幅を親要素に合わせて100%に設定 */
          height: 100%; /* 画像の高さを親要素に合わせて100%に設定 */
          object-fit: contain; /* 画像を親要素にフィットさせる */
          object-position: center center; /* 画像を中央に表示する */
        }

        /* Add more custom styles as needed */
        .cardList {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }
      `}</style>
        </>
    );
}
