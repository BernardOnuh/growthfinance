import Head from 'next/head';
import Footers from '../components/Footer';
import Swap from '../components/DApp/Swap';
import Farm from '../components/DApp/farm';
import DappNavbar from '../components/DApp/DappNavbar';
import styles from '@/styles/style';



export default function Home() {
  return (
    <>
      <Head>
        <title>Growth Finance</title>
        <meta name="description" content="Taking over the World of Finance" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <section id='swap'>
      <div className='bg-black w-full overflow-hidden'>
        <div className={`${styles.paddingX}`}>
          <div className={`${styles.boxWidth}`}>
          <DappNavbar/>
          </div>
        </div>
        <div className={`bg-gradient-to-t from-black to-neutral-900 ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          {/*<Swap/>*/}
          <Farm/>
        </div>
        </div>
        <div className={`bg-black ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
        <Footers/>
        </div>
        </div>
      </div>
      </section>
    </>
  )
}
