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
                {/*<div className="pickup">*/}
                {/*    <div className="pickup-title">PICK UP</div>*/}
                {/*    {topRank && (*/}
                {/*        <RankCardView*/}
                {/*            key={topRank.id}*/}
                {/*            bookId={topRank.bookId}*/}
                {/*            title={topRank.title}*/}
                {/*            description={topRank.description}*/}
                {/*            imageUrl={topRank.imageUrl}*/}
                {/*        />*/}
                {/*    )}*/}
                {/*</div>*/}
                <div className="topics">
                    <div className="topics-title">TOPICS ALL</div>
                    <ul className="cardList">
                        {books.map((item) => (
                            <CardView
                                      key={item.id}
                                      id={item.id}
                                      title={item.title}
                                      description={item.description}
                                      sourceSite={item.sourceSite}
                                      imageUrl={item.imageUrl}
                                       />
                        ))}
                    </ul>
                </div>
            </main>

            <style jsx>{`
.main-image {
  width: 100%;
  height: 25em;
  position: relative;
  background-image: url('/main-image.png');
  background-color: white;
  background-size: cover; 
  background-repeat: no-repeat;
  background-position: center top; 
}

.main-image img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center center;
}

.pickup {
  margin-top: 4em;
  margin-bottom: 8em;
}

.topics {
  padding-top: 4em;
  padding-left: 2em;
  padding-right: 2em;
  margin-bottom: 8em;
  width: 100%;
  background: linear-gradient(180deg, rgba(9, 180, 164, 0.29) 0%, #09B4A4 99.48%);
}

.pickup-title, .topics-title {
  font-family: 'Futura';
  font-style: normal;
  font-weight: 700;
  font-size: 64px;
  line-height: 85px;
  text-align: center;
  margin-bottom: 1em;
}
        .cardList {
          display: grid;
          grid-template-columns: repeat(3, 1fr); /* PCの場合は3列にする */
          gap: 2em; /* カード間の間隔を設定 */
          grid-template-columns: repeat(3, 1fr);
          justify-items: initial;
        }

        /* Mobile styles */
        @media (max-width: 767px) {
          .main-image {
            height: 30em;
          }
        
          .pickup-title, .topics-title {
            font-size: 40px;
            line-height: 55px;
          }
          
          
          .cardList {
              list-style: none;
              padding: 0;
              margin: 0;
              display: grid;
              grid-template-columns: 1fr;
              gap: 20px;
              justify-items: center;
            grid-template-columns: 1fr; /* モバイルの場合は1列にする */
          }
        }

      `}</style>
        </>
    );
}
