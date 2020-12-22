import Head from 'next/head'
import Weather from '../components/weather'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Weather Test</title>
        <link rel="icon" href="https://stepzen.com/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h2 className={styles.h2}>
          Weather test
        </h2>
        <div className="grid">
          <Weather/>
          </div>
      </main>

      <footer className={styles.footer}>
        <p>Some footer,eh?</p>
      </footer>
    </div>
  )
}
