import Head from 'next/head';
import Footers from '@/components/Footer';
import Farm from '@/components/DApp/farm';
import DappNavbar from '@/components/DApp/DappNavbar';
import styles from '@/styles/style';



export default function Farms() {
  return (
    <>
      <section id='farm'>
      <div className='bg-black w-full overflow-hidden'>
        <div className={`${styles.paddingX}`}>
          <div className={`${styles.boxWidth}`}>
          <DappNavbar/>
          </div>
        </div>
        <div className={`bg-gradient-to-t from-black to-neutral-900 ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
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
