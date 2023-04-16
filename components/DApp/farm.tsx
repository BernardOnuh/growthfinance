import React, {useState, useEffect} from 'react';
import { Collapse } from 'antd';
import styles from '@/styles/style';
import Link from 'next/link'

const Farm = () =>{
    const { Panel } = Collapse;

    const accordion = (
        <>
        <div className='grid grid-cols-4 gap-4 items-center justify-center text-center'>
            <div className=''>
                <img src='/2.png' width={20} height={20}/>
            </div>
            <div>$1000</div>
            <div><img src='/2.png' width={20} height={20}/>50GWR/Day</div>
            <div>100%</div>
        </div>
        </>
    )


return(
    <section className={`${styles.flexCenter} ${styles.paddingY}`}>
    <div className='bg-black border-gray-300 border-2 rounded-md md:w-[80%] w-[90%] min-h-fit md:grid md:grid-cols-3 gap-10 p-5'> 
        <div className='justify-center items-center bg-neutral-900 text-center rounded-md'>
            <div className='py-3 text-4xl font-bold'>
                Growth Finance
            </div>
            <p className='py-3 text-xl font-semibold'>Farm TVL:$1,000,000</p>
            <Link href='/'>
                View Vault
            </Link>
        </div>
        <div className='md:col-span-2 py-5 px-3'>
            <div className='grid grid-cols-4 gap-5 md:gap-4 text-center'>
                <div className='sm:font-bold font-medium text-xl cursor-pointer'>Stake</div>
                <div className='sm:font-bold font-medium text-xl cursor-pointer'>TVL</div>
                <div className='sm:font-bold font-medium text-xl cursor-pointer sm:flex hidden'>Allocation</div>
                <div className='sm:font-bold font-medium text-xl cursor-pointer'>APR</div>
            </div>
            <div>
                <Collapse
                bordered={false}
                defaultActiveKey={['1']}>
                    <Panel key={'1'} header='Lets Go' className='text-white'><p className='text-white'>ok</p></Panel>
                </Collapse>
            </div>
        </div>
    </div>   
    </section>
)
}

export default Farm;