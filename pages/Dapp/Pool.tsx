import Head from 'next/head';
import Link from 'next/link';
import Footers from '@/components/Footer';
import Pool from '@/components/DApp/Pool';
import DappNavbar from '@/components/DApp/DappNavbar';
import styles from '@/styles/style';



export default function Fpool() {
  return (
    <>
     <Head>
        <title>Growth Finance Pool</title>
        <meta name="description" content="Taking over the World of Finance" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <section id='pool'>
      <div className='bg-black w-full overflow-hidden'>
        <div className={`${styles.paddingX}`}>
          <div className={`${styles.boxWidth}`}>
          <DappNavbar/>
          </div>
        </div>
        <div className={`bg-gradient-to-t from-black to-neutral-900 ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Pool/>
        </div>
        </div>
        <div className='sm:hidden flex  item-end justify-between p-5  '>
          <Link href='/'>
            <div className='font-semibold'>Swap</div>
          </Link>
          <Link href='/Dapp/Farm'>
            <div className='font-semibold'>Farm</div>
          </Link>
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
