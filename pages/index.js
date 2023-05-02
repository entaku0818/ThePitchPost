import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '../styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })
import { useBooks } from '../hooks/useBooks'
import { useTopRank } from '../hooks/useRanking'
import CardView from "./CardView";
import Header from "../components/header";
import RankCardView from "./RankCardView";

export default function Home() {
    const { isLoading, books } = useBooks();
    const { isLoadingRank, topRank } = useTopRank();
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
                <div className="pickup">
                    <div className="pickup-title">PICK UP</div>
                    {topRank && (
                        <RankCardView
                            key={topRank.id}
                            id={topRank.id}
                            title={topRank.title}
                            description={topRank.description}
                            imageUrl={topRank.imageUrl}
                        />
                    )}
                </div>
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
          width: 100%;
          height: 50em;
          position: relative; /* 相対位置指定を有効にする */
          background-image: url('/main-image.png');
        }

        .main-image img {
          width: 100%; /* 画像の幅を親要素に合わせて100%に設定 */
          height: 100%; /* 画像の高さを親要素に合わせて100%に設定 */
          object-fit: contain; /* 画像を親要素にフィットさせる */
          object-position: center center; /* 画像を中央に表示する */
        }
        
        
        .pickup{
          margin-top: 4em;
          margin-bottom: 8em;
        }
        .pickup-title{
            font-family: 'Futura';
            font-style: normal;
            font-weight: 700;
            font-size: 64px;
            line-height: 85px;
            text-align: center;
        }

        .main-image {
          width: 100%;
          height: 50em;
          position: relative; /* 相対位置指定を有効にする */
          background-image: url('/main-image.png');
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
