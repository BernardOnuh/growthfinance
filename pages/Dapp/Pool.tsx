import Head from 'next/head';
import Footers from '@/components/Footer';
import Pool from '@/components/DApp/Pool';
import DappNavbar from '@/components/DApp/DappNavbar';
import styles from '@/styles/style';



export default function Fpool() {
  return (
    <>
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
