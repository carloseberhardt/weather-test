import Head from 'next/head'
import Weather from '../components/weather'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Weather Test</title>
        <script src="https://cdn.jsdelivr.net/npm/@fingerprintjs/fingerprintjs-pro@3/dist/fp.min.js" onload="initFingerprintJS()" key="src1"/>
        <script src="/scripts/initFingerprint.js" key="src2"/>
      </Head>
      <main className={styles.main}>
        <h2 className={styles.h2}>
          Weather test
        </h2>
        <div className="grid">
          <Weather/>
          </div>
      </main>
    </div>
  )
}
