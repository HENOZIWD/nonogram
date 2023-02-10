import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import { getAllGameCards, IGameCard } from './lib/game'

export async function getStaticProps() {
  const gameCardsData = await getAllGameCards();

  return {
    props: {
      // Props must be returned as a plain object from getStaticProps.
      // Because gameCardsData is array, it must be converted to Object.
      gameCardsData,
    },
  }
}

export default function Home({ gameCardsData }: { gameCardsData: IGameCard[] }) {

  return (
    <>
      <Head>
        <title>Nonogram - Logic puzzle</title>
        <meta name="description" content="Picture logic puzzle" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div>
          <h1>
            Nonogram
          </h1>
          <br />
          <p style={{ textAlign: 'center'}}>
            Logic puzzle
          </p>
        </div>
        <div className={styles.grid}>
          {gameCardsData.map((card: IGameCard) => (
            <Link
              key={card.id}
              href={`/game/${card.id}`}
              className={styles.card}
            >
              <h2>
                {card.title}&nbsp;<span>&gt;</span>
              </h2>
              <p>
                {card.description}
              </p>
            </Link>
          ))}
          <Link
            href={'/game/custom'}
            className={styles.card}
          >
            <h2>
              Custom&nbsp;<span>&gt;</span>
            </h2>
            <p>
              Make your own!
            </p>
          </Link>
        </div>
      </main>
    </>
  )
}
