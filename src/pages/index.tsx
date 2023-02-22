import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import { getAllGameCards } from '@/lib/game'
import { useState } from 'react'

export interface IGameCard {
  id: string;
  title: string;
  description: string;
  size: number;
}

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

  const [filteredGameCards, setFilteredGameCards] = useState<IGameCard[]>(gameCardsData.slice());

  const onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();

    const filter = +event.target.value;
    // console.log(filter + "/" + typeof filter);

    console.log(filter + typeof filter);

    if (filter === 0) {
      setFilteredGameCards(gameCardsData.slice());
      // console.log("default");
    }
    else {
      let filtered: IGameCard[] = [];
      gameCardsData.map((card: IGameCard) => {
        if (card.size === filter) {
          filtered.push(card);
        }
      })
      // console.log(filtered);
      setFilteredGameCards(filtered);
    }
  }

  return (
    <>
      <Head>
        <title>Nonogram - Logic puzzle</title>
        <meta name="description" content="Picture logic puzzle" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.title}>
          <h1>
            Nonogram
          </h1>
          <br />
          <p style={{ textAlign: 'center'}}>
            Logic puzzle
          </p>
        </div>
        <select onChange={onSelectChange} style={{ margin: '1.5rem'}}>
          <option value={0}>All</option>
          <option value={5}>5x5</option>
          <option value={10}>10x10</option>
          <option value={15}>15x15</option>
          <option value={25}>25x25</option>
          <option value={50}>50x50</option>
          <option value={100}>100x100</option>
        </select>
        <div className={styles.grid}>
          <Link
            href={'/game/imageCustom'}
            className={styles.card}
            style={{ backgroundColor: '#c6c6c6' }}
          >
            <h2>
              Image Custom&nbsp;<span>&gt;</span>
            </h2>
            <p>
              Make your own with image!
            </p>
          </Link>
          <Link
            href={'/game/custom'}
            className={styles.card}
            style={{ backgroundColor: '#c6c6c6' }}
          >
            <h2>
              Custom&nbsp;<span>&gt;</span>
            </h2>
            <p>
              Make your own!
            </p>
          </Link>
          {filteredGameCards.map((card: IGameCard) => (
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
              <p>
                {card.size}x{card.size}
              </p>
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}
